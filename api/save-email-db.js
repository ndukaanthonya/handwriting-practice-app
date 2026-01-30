// api/save-email-db.js
// Save user data to in-memory database (viewable in admin dashboard)

// In-memory database (shared with admin-data.js)
let userData = [];

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
        const { email, font, textType, pages, textSize } = req.body;

        // Validate email
        if (!email) {
            return res.status(400).json({ 
                success: false,
                error: 'Email is required' 
            });
        }

        // Create data entry
        const entry = {
            id: Date.now().toString(),
            email,
            font: font || 'N/A',
            textType: textType || 'N/A',
            pages: pages || 'N/A',
            textSize: textSize || 'N/A',
            timestamp: new Date().toISOString(),
            verified: true
        };

        // Add to database
        userData.push(entry);

        console.log('Data saved:', entry);
        console.log('Total entries:', userData.length);

        return res.status(200).json({
            success: true,
            message: 'Data saved successfully',
            id: entry.id
        });

    } catch (error) {
        console.error('Error saving data:', error);
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}

// Export userData
export { userData };
