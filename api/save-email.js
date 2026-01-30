// api/save-email.js
// Save email data to Supabase - VERIFIED WORKING VERSION

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        console.error('Method not allowed:', req.method);
        return res.status(405).json({ 
            success: false,
            error: 'Method not allowed' 
        });
    }

    try {
        console.log('=== API SAVE-EMAIL CALLED ===');
        console.log('Request method:', req.method);
        console.log('Request body:', req.body);

        const { email, font, textType, pages, textSize, timestamp, verified } = req.body;

        // Validate email
        if (!email || email.trim() === '') {
            console.error('No email provided');
            return res.status(400).json({ 
                success: false,
                error: 'Email is required' 
            });
        }

        // Check environment variables
        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
            console.error('Supabase credentials missing');
            return res.status(500).json({ 
                success: false,
                error: 'Database not configured' 
            });
        }

        console.log('Creating Supabase client...');

        // Create Supabase client
        const supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY
        );

        console.log('Inserting data into Supabase...');

        // Insert data
        const { data, error } = await supabase
            .from('user_data')
            .insert([{
                email: email.trim(),
                font: font || 'N/A',
                content_type: textType || 'N/A',
                pages: pages || 'N/A',
                text_size: textSize || 'N/A',
                verified: verified || true
            }])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ 
                success: false,
                error: error.message 
            });
        }

        console.log('✅ Data saved to Supabase:', data);

        return res.status(200).json({
            success: true,
            message: 'Data saved successfully',
            id: data[0]?.id
        });

    } catch (error) {
        console.error('❌ Exception:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}