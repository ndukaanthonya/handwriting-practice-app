const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { email, font, textType, textSize, timestamp, verified } = JSON.parse(event.body);

        // Initialize the Google Sheet
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

        // Authenticate with service account
        await doc.useServiceAccountAuth({
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        });

        // Load document properties and worksheets
        await doc.loadInfo();

        // Get the first sheet (or create if doesn't exist)
        let sheet = doc.sheetsByIndex[0];
        if (!sheet) {
            sheet = await doc.addSheet({ headerValues: ['Email', 'Font', 'Text Type', 'Text Size', 'Timestamp', 'Verified'] });
        }

        // Add row with user data
        await sheet.addRow({
            Email: email,
            Font: font,
            'Text Type': textType,
            'Text Size': textSize + ' cm',
            Timestamp: timestamp,
            Verified: verified ? 'Yes' : 'No'
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };

    } catch (error) {
        console.error('Error saving to Google Sheets:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to save email data' })
        };
    }
};