// api/admin-login.js
// Secure admin authentication with rate limiting and SHA-256

import crypto from 'crypto';

// Rate limiting store (in production, use Redis)
const loginAttempts = new Map();

// IMPORTANT: Set these in Vercel Environment Variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH; // SHA-256 hash of password

// Helper: Hash password with SHA-256
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Helper: Generate secure token
function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

// Helper: Check rate limit
function checkRateLimit(ip) {
    const now = Date.now();
    const attempts = loginAttempts.get(ip) || { count: 0, lastAttempt: 0 };
    
    // Reset after 15 minutes
    if (now - attempts.lastAttempt > 15 * 60 * 1000) {
        loginAttempts.set(ip, { count: 0, lastAttempt: now });
        return true;
    }
    
    // Block after 5 attempts
    if (attempts.count >= 5) {
        return false;
    }
    
    return true;
}

// Helper: Record failed attempt
function recordFailedAttempt(ip) {
    const attempts = loginAttempts.get(ip) || { count: 0, lastAttempt: 0 };
    attempts.count++;
    attempts.lastAttempt = Date.now();
    loginAttempts.set(ip, attempts);
}

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { username, password } = req.body;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // Check rate limit
        if (!checkRateLimit(clientIP)) {
            console.log(`Rate limit exceeded for IP: ${clientIP}`);
            return res.status(429).json({ 
                success: false,
                error: 'Too many failed attempts. Please try again in 15 minutes.' 
            });
        }

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ 
                success: false,
                error: 'Username and password required' 
            });
        }

        // Hash the provided password
        const passwordHash = hashPassword(password);

        // Check credentials
        if (username === ADMIN_USERNAME && passwordHash === ADMIN_PASSWORD_HASH) {
            // Success! Generate token
            const token = generateToken();
            
            console.log(`Successful login from IP: ${clientIP}`);
            
            // Reset attempts
            loginAttempts.delete(clientIP);
            
            return res.status(200).json({
                success: true,
                token: token,
                message: 'Login successful'
            });
        } else {
            // Failed login
            recordFailedAttempt(clientIP);
            
            console.log(`Failed login attempt from IP: ${clientIP}`);
            
            return res.status(401).json({
                success: false,
                error: 'Invalid username or password'
            });
        }

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}
