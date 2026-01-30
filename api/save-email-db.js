// api/save-email-db.js
// Save user data to in-memory database

// IMPORTANT: In-memory storage - resets on server restart
// For permanent storage, upgrade to Supabase/MongoDB/Postgres

// Global in-memory database (shared across function invocations)
global.userData = global.userData || [];

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
        return res.status(405).json({ 
            success: false,
            error: 'Method not allowed' 
        });
    }

    try {
        console.log('Received request body:', req.body);

        const { email, font, textType, pages, textSize } = req.body;

        // Validate email
        if (!email || email.trim() === '') {
            console.error('No email provided');
            return res.status(400).json({ 
                success: false,
                error: 'Email is required' 
            });
        }

        // Create data entry
        const entry = {
            id: Date.now().toString(),
            email: email.trim(),
            font: font || 'N/A',
            textType: textType || 'N/A',
            pages: pages || 'N/A',
            textSize: textSize || 'N/A',
            timestamp: new Date().toISOString(),
            verified: true
        };

        // Add to global database
        global.userData.push(entry);

        console.log('✅ Data saved successfully:', entry);
        console.log('Total entries in database:', global.userData.length);

        // Return success
        return res.status(200).json({
            success: true,
            message: 'Data saved successfully',
            id: entry.id,
            totalEntries: global.userData.length
        });

    } catch (error) {
        console.error('❌ Error saving data:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            details: error.message
        });
    }
}