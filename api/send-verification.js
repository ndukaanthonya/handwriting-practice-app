const { Resend } = require('resend');

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
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Email and code are required' });
    }

    console.log('=== RESEND EMAIL START ===');
    console.log('To:', email);
    console.log('Code:', code);

    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: 'admin@trayce.xyz',
      to: email,
      subject: 'Your Verification Code - Handwriting Practice',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
              border-radius: 10px;
              padding: 40px;
              text-align: center;
              color: white;
            }
            .code {
              font-size: 48px;
              font-weight: bold;
              letter-spacing: 10px;
              background: white;
              color: #1e3c72;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
              display: inline-block;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
              opacity: 0.9;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>✍️ Handwriting Practice</h1>
            <p>Your verification code is:</p>
            <div class="code">${code}</div>
            <p class="footer">This code will expire in 10 minutes.</p>
            <p class="footer">If you didn't request this, please ignore this email.</p>
          </div>
        </body>
        </html>
      `
    });

    console.log('✅ Email sent! ID:', data.id);

    return res.status(200).json({ 
      success: true, 
      message: 'Verification code sent',
      id: data.id 
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send verification code',
      details: error.message 
    });
  }
};