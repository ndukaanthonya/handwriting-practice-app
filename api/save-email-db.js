async function saveEmailData(email, font, contentType, pages, textSize) {
    try {
        console.log('=== SAVING EMAIL DATA ===');
        console.log('Email:', email);
        console.log('Font:', font);
        console.log('Content Type:', contentType);
        console.log('Pages:', pages);
        console.log('Text Size:', textSize);

        const response = await fetch('/api/save-email-db', {  // ← Changed endpoint
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                email: email,
                font: font,
                textType: contentType,
                pages: pages + ' pages',
                textSize: textSize,
                timestamp: new Date().toISOString(),
                verified: true
            })
        });

        const result = await response.json();
        console.log('API Response:', result);

        if (response.ok && result.success) {
            console.log('✅ Email saved successfully!');
            return { success: true };
        } else {
            console.error('❌ Failed to save:', result.error);
            return { success: false };
        }

    } catch (error) {
        console.error('❌ Error saving email:', error);
        return { success: false };
    }
}