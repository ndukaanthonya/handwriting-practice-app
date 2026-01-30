// api/admin-data.js
// Retrieve all user data for admin dashboard

// Global in-memory database (shared with save-email-db.js)
global.userData = global.userData || [];

// Simple token verification
function verifyToken(token) {
    // Basic check - token exists and is not empty
    // In production, use proper JWT verification
    return token && token.length > 10;
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
        return res.status(405).json({ 
            success: false,
            error: 'Method not allowed' 
        });
    }

    try {
        // Check authorization
        const authHeader = req.headers.authorization;
        const token = authHeader?.replace('Bearer ', '');

        console.log('Auth token received:', token ? 'Yes' : 'No');

        if (!verifyToken(token)) {
            console.log('Unauthorized access attempt');
            return res.status(401).json({ 
                success: false,
                error: 'Unauthorized' 
            });
        }

        console.log('Returning user data, total entries:', global.userData.length);

        // Return data (sorted by newest first)
        const sortedData = [...global.userData].sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
        });

        return res.status(200).json({
            success: true,
            data: sortedData,
            count: global.userData.length
        });

    } catch (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            details: error.message
        });
    }
}