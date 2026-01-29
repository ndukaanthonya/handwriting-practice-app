const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

module.exports = async (req, res) => {
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

    console.log('=== SAVING EMAIL DATA ===');
    console.log('Email:', email);

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    let sheet = doc.sheetsByIndex[0];
    
    if (!sheet) {
      sheet = await doc.addSheet({ 
        title: 'Emails',
        headerValues: ['Email', 'Font', 'Text Type', 'Text Size', 'Timestamp', 'Verified'] 
      });
    }

    await sheet.loadHeaderRow();

    if (!sheet.headerValues || sheet.headerValues.length === 0) {
      await sheet.setHeaderRow(['Email', 'Font', 'Text Type', 'Text Size', 'Timestamp', 'Verified']);
    }

    const newRow = await sheet.addRow({
      'Email': email,
      'Font': font,
      'Text Type': textType,
      'Text Size': textSize,
      'Timestamp': timestamp,
      'Verified': verified ? 'Yes' : 'No'
    });

    console.log('✅ Row added successfully!');

    return res.status(200).json({ 
      success: true,
      rowNumber: newRow.rowNumber
    });

  } catch (error) {
    console.error('❌ ERROR saving to Google Sheets:', error);
    return res.status(500).json({ 
      error: 'Failed to save email data',
      details: error.message
    });
  }
};