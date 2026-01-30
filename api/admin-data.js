// api/admin-data.js
// Secure API to retrieve all user data (admin only)

// In-memory database (for production, use PostgreSQL, MongoDB, or Supabase)
// This will reset when Vercel restarts, but works for testing
let userData = [];

// Helper: Verify admin token (simple version - in production use JWT)
function verifyToken(token) {
    // In production, verify JWT token
    // For now, just check if token exists
    return token && token.length > 0;
}

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Check authorization
        const authHeader = req.headers.authorization;
        const token = authHeader?.replace('Bearer ', '');

        if (!verifyToken(token)) {
            return res.status(401).json({ 
                success: false,
                error: 'Unauthorized' 
            });
        }

        // Return data
        return res.status(200).json({
            success: true,
            data: userData,
            count: userData.length
        });

    } catch (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}

// Export userData so save-email-db.js can access it
export { userData };
