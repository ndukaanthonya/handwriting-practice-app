// api/admin-data-supabase.js
// Get all user data from Supabase

import { createClient } from '@supabase/supabase-js';

// Simple token verification
function verifyToken(token) {
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

        if (!verifyToken(token)) {
            return res.status(401).json({ 
                success: false,
                error: 'Unauthorized' 
            });
        }

        // Create Supabase client
        const supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY
        );

        // Get all data, sorted by newest first
        const { data, error } = await supabase
            .from('user_data')
            .select('*')
            .order('timestamp', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ 
                success: false,
                error: error.message 
            });
        }

        console.log('Retrieved', data.length, 'records from Supabase');

        // Format data for dashboard
        const formattedData = data.map(item => ({
            id: item.id,
            email: item.email,
            font: item.font,
            textType: item.content_type,
            pages: item.pages,
            textSize: item.text_size,
            timestamp: item.timestamp,
            verified: item.verified
        }));

        return res.status(200).json({
            success: true,
            data: formattedData,
            count: data.length
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
