exports.handler = async (event, context) => {
    // Import inside handler
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const { JWT } = require('google-auth-library');
    
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { email, font, textType, textSize, timestamp, verified } = JSON.parse(event.body);

        console.log('Saving email data:', { email, font, textType, textSize });
        console.log('Sheet ID:', process.env.GOOGLE_SHEET_ID?.substring(0, 10) + '...');
        console.log('Service account:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);

        // Validate environment variables
        if (!process.env.GOOGLE_SHEET_ID) {
            throw new Error('GOOGLE_SHEET_ID not configured');
        }
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
            throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL not configured');
        }
        if (!process.env.GOOGLE_PRIVATE_KEY) {
            throw new Error('GOOGLE_PRIVATE_KEY not configured');
        }

        console.log('Creating JWT auth...');
        
        // Create JWT client for authentication
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });

        console.log('Initializing Google Sheet document...');
        
        // Initialize the sheet with JWT auth
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

        console.log('Loading sheet info...');
        await doc.loadInfo();
        console.log('Sheet loaded successfully! Title:', doc.title);

        // Get the first sheet
        const sheet = doc.sheetsByIndex[0];
        
        if (!sheet) {
            console.error('No sheets found in the document');
            throw new Error('No sheets found in the spreadsheet');
        }

        console.log('Using sheet:', sheet.title);
        console.log('Sheet has', sheet.rowCount, 'rows');

        // Load the header row to ensure it exists
        await sheet.loadHeaderRow();
        console.log('Headers:', sheet.headerValues);

        console.log('Adding new row with data...');
        
        // Add the new row
        const newRow = await sheet.addRow({
            Email: email,
            Font: font,
            'Text Type': textType,
            'Text Size': textSize + ' cm',
            Timestamp: timestamp,
            Verified: verified ? 'Yes' : 'No'
        });

        console.log('✅ Row added successfully! Row number:', newRow.rowNumber);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true,
                rowNumber: newRow.rowNumber 
            })
        };

    } catch (error) {
        console.error('❌ Error saving to Google Sheets:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        
        if (error.response) {
            console.error('API Response:', error.response.data);
        }

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Failed to save email data',
                details: error.message,
                errorType: error.name
            })
        };
    }
};