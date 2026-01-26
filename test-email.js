const nodemailer = require('nodemailer');

// Replace these with your actual credentials
const EMAIL_USER = 'ndukaanthonya@gmail.com';  // ← PUT YOUR GMAIL HERE
const EMAIL_PASS = 'kdbholforkppohyy';      // ← PUT YOUR 16-CHAR APP PASSWORD HERE

async function testEmail() {
    try {
        console.log('Creating transporter...');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        });

        console.log('Verifying connection...');
        await transporter.verify();
        console.log('✅ SMTP connection verified!');

        console.log('Sending test email...');
        const info = await transporter.sendMail({
            from: EMAIL_USER,
            to: EMAIL_USER, // Send to yourself
            subject: 'Test Email from Handwriting App',
            text: 'If you receive this, your email is working!',
            html: '<h1>Success!</h1><p>Your email configuration works!</p>'
        });

        console.log('✅ Email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('\n🎉 Everything works! Your credentials are correct.');
        
    } catch (error) {
        console.error('❌ ERROR:', error.message);
        
        if (error.code === 'EAUTH') {
            console.error('\n🔴 Authentication failed!');
            console.error('Possible issues:');
            console.error('1. App password is wrong');
            console.error('2. 2-Step Verification not enabled');
            console.error('3. Email address is wrong');
        }
        
        console.error('\nFull error:', error);
    }
}

testEmail();