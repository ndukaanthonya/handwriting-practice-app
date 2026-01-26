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

        console.log('=== SAVING EMAIL DATA ===');
        console.log('Email:', email);
        console.log('Font:', font);
        console.log('Text Type:', textType);
        console.log('Text Size:', textSize);

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

        console.log('Initializing Google Sheet...');
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

        console.log('Loading sheet info...');
        await doc.loadInfo();
        console.log('Sheet loaded! Title:', doc.title);

        // Get the first sheet
        let sheet = doc.sheetsByIndex[0];
        
        if (!sheet) {
            console.log('No sheet found, creating new sheet...');
            sheet = await doc.addSheet({ 
                title: 'Emails',
                headerValues: ['Email', 'Font', 'Text Type', 'Text Size', 'Timestamp', 'Verified'] 
            });
            console.log('New sheet created:', sheet.title);
        } else {
            console.log('Using existing sheet:', sheet.title);
        }

        // Load the sheet to get current data
        await sheet.loadHeaderRow();
        console.log('Current headers:', sheet.headerValues);
        console.log('Current row count:', sheet.rowCount);

        // Check if headers exist, if not, set them
        if (!sheet.headerValues || sheet.headerValues.length === 0) {
            console.log('No headers found, setting headers...');
            await sheet.setHeaderRow(['Email', 'Font', 'Text Type', 'Text Size', 'Timestamp', 'Verified']);
            console.log('Headers set successfully');
        }

        // Load existing rows to check
        const rows = await sheet.getRows();
        console.log('Existing rows before adding:', rows.length);

        console.log('Adding new row...');
        
        // Add the new row - this should APPEND, not replace
        const newRow = await sheet.addRow({
            'Email': email,
            'Font': font,
            'Text Type': textType,
            'Text Size': textSize + ' cm',
            'Timestamp': timestamp,
            'Verified': verified ? 'Yes' : 'No'
        });

        console.log('✅ Row added successfully!');
        console.log('New row number:', newRow.rowNumber);
        
        // Verify the row was added
        const updatedRows = await sheet.getRows();
        console.log('Total rows after adding:', updatedRows.length);

        // Double-check by reading the last row
        const lastRow = updatedRows[updatedRows.length - 1];
        console.log('Last row email:', lastRow.get('Email'));

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true,
                rowNumber: newRow.rowNumber,
                totalRows: updatedRows.length
            })
        };

    } catch (error) {
        console.error('❌ ERROR saving to Google Sheets:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Failed to save email data',
                details: error.message
            })
        };
    }
};