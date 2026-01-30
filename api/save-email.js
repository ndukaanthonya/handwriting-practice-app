// api/save-email.js
// Saves user email and worksheet data to Google Sheets

import { google } from 'googleapis';

// Google Sheets configuration
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const SHEET_NAME = 'UserData';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, font, textType, pages, textSize, timestamp, verified } = req.body;

        // Validate required fields
        if (!email) {
            console.error('Missing email in request');
            return res.status(400).json({ error: 'Email is required' });
        }

        console.log('Saving email data:', { email, font, textType, pages, textSize });

        // Create auth client
        const auth = new google.auth.GoogleAuth({
            credentials: {
                type: 'service_account',
                project_id: process.env.GOOGLE_PROJECT_ID,
                private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                client_id: process.env.GOOGLE_CLIENT_ID,
            },
            scopes: SCOPES,
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Prepare row data - MAKE SURE EMAIL IS FIRST COLUMN
        const values = [[
            email || 'N/A',                    // Column A: Email (CRITICAL)
            font || 'N/A',                     // Column B: Font
            textType || 'N/A',                 // Column C: Text Type
            pages || 'N/A',                    // Column D: Pages
            textSize || 'N/A',                 // Column E: Text Size
            timestamp || new Date().toISOString(), // Column F: Timestamp
            verified ? 'Yes' : 'No'            // Column G: Verified
        ]];

        console.log('Appending to Google Sheets:', values);

        // Append to sheet
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A:G`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: values,
            },
        });

        console.log('Google Sheets response:', response.data);

        return res.status(200).json({ 
            success: true, 
            message: 'Email saved successfully',
            updatedRange: response.data.updates.updatedRange 
        });

    } catch (error) {
        console.error('Error saving email:', error);
        return res.status(500).json({ 
            error: 'Failed to save email',
            details: error.message 
        });
    }
}