// 100+ Handwriting Fonts Collection
const handwritingFonts = [
    'Allura', 'Arizonia', 'Alex Brush', 'Architects Daughter', 'Bad Script',
    'Ballet', 'Berkshire Swash', 'Bilbo', 'Bilbo Swash Caps', 'Caveat',
    'Charm', 'Courgette', 'Damion', 'Dancing Script', 'Dawning of a New Day',
    'Dekko', 'Delius', 'Devonshire', 'Dr Sugiyama', 'Eagle Lake',
    'Engagement', 'Ephesis', 'Euphoria Script', 'Felipa', 'Fondamento',
    'Give You Glory', 'Gloria Hallelujah', 'Grand Hotel', 'Great Vibes', 'Homemade Apple',
    'Indie Flower', 'Italianno', 'Just Another Hand', 'Kalam', 'Kaushan Script',
    'Kristi', 'La Belle Aurore', 'League Script', 'Leckerli One', 'Liu Jian Mao Cao',
    'Lobster', 'Lobster Two', 'Long Cang', 'Loved by the King', 'Lovers Quarrel',
    'Ma Shan Zheng', 'Marck Script', 'Meddon', 'Meie Script', 'Merienda',
    'Miss Fajardose', 'Monsieur La Doulaise', 'Montez', 'Mr Dafoe', 'Mr De Haviland',
    'Mrs Saint Delafield', 'Mrs Sheppards', 'Nanum Pen Script', 'Neucha', 'Norican',
    'Nothing You Could Do', 'Over the Rainbow', 'Pacifico', 'Parisienne', 'Passero One',
    'Patrick Hand', 'Permanent Marker', 'Petit Formal Script', 'Pinyon Script', 'Princess Sofia',
    'Qwigley', 'Rancho', 'Reenie Beanie', 'Rochester', 'Rock Salt',
    'Rosarivo', 'Rouge Script', 'Ruge Boogie', 'Ruthie', 'Sacramento',
    'Satisfy', 'Schoolbell', 'Sedgwick Ave', 'Shadows Into Light', 'Shojumaru',
    'Smooch', 'Snippet', 'Sofadi One', 'Sofia', 'Stalemate',
    'Sue Ellen Francisco', 'Sunshiney', 'Swanky and Moo Moo', 'Tangerine', 'The Girl Next Door',
    'Tillana', 'Vibur', 'Vollkorn', 'Walter Turncoat', 'Yellowtail',
    'Yeseva One', 'Zeyada', 'Zhi Mang Xing', 'Playwrite AU NSW', 'Playwrite AU VIC',
    'Playwrite BE VLG', 'Playwrite CL', 'Playwrite CU', 'Playwrite DE Grund', 'Playwrite GB S',
    'Playwrite IN', 'Playwrite IT Moderna', 'Playwrite MX', 'Playwrite NZ', 'Playwrite US Modern',
    'Borel', 'Gideon Roman', 'Handlee', 'Julee', 'Klee One'
];

// Get all the HTML elements we need to work with
const fontSelect = document.getElementById('font-select');
const textSelect = document.getElementById('text-select');
const preview = document.getElementById('preview');
const generateBtn = document.getElementById('generate-btn');
const loading = document.getElementById('loading');
const successMessage = document.getElementById('success-message');
const a4Container = document.getElementById('a4-container');
const fontCount = document.getElementById('font-count');

// Modal elements
const emailModal = document.getElementById('email-modal');
const userEmailInput = document.getElementById('user-email');
const emailError = document.getElementById('email-error');
const confirmBtn = document.getElementById('confirm-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Text options for practice
const textOptions = {
    pangram: 'The quick brown fox jumps over the lazy dog',
    alphabet: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
    numbers: '0 1 2 3 4 5 6 7 8 9',
    lowercase: 'a b c d e f g h i j k l m n o p q r s t u v w x y z',
    common: 'the and for are but not you all can her was one our'
};

// Initialize EmailJS with your public key
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // REPLACE THIS with your actual EmailJS public key
})();

// Populate the font dropdown with all 105 fonts
handwritingFonts.sort().forEach(font => {
    const option = document.createElement('option');
    option.value = font;
    option.textContent = font;
    fontSelect.appendChild(option);
});

// Display how many fonts are available
fontCount.textContent = `${handwritingFonts.length} handwriting fonts available`;

// Function to update the preview when user changes selections
function updatePreview() {
    const selectedFont = fontSelect.value;
    const selectedTextKey = textSelect.value;
    const text = textOptions[selectedTextKey];

    preview.style.fontFamily = `'${selectedFont}', cursive`;
    preview.textContent = text.substring(0, 30) + (text.length > 30 ? '...' : '');
}

// Listen for changes in the dropdowns
fontSelect.addEventListener('change', updatePreview);
textSelect.addEventListener('change', updatePreview);

// Function to validate email address
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show email modal when user clicks "Download PDF"
generateBtn.addEventListener('click', function() {
    emailModal.classList.add('active');
    userEmailInput.value = '';
    emailError.classList.remove('show');
    userEmailInput.classList.remove('error');
});

// Close modal when user clicks "Cancel"
cancelBtn.addEventListener('click', function() {
    emailModal.classList.remove('active');
});

// When user clicks "Continue" in the modal
confirmBtn.addEventListener('click', async function() {
    const email = userEmailInput.value.trim();
    
    // Validate the email
    if (!validateEmail(email)) {
        emailError.classList.add('show');
        userEmailInput.classList.add('error');
        return;
    }

    // Email is valid, close modal and generate PDF
    emailModal.classList.remove('active');
    await generatePDF(email);
});

// Allow user to press Enter key in email input
userEmailInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        confirmBtn.click();
    }
});

// Remove error message when user starts typing
userEmailInput.addEventListener('input', function() {
    emailError.classList.remove('show');
    userEmailInput.classList.remove('error');
});

// Main function to generate the PDF
async function generatePDF(email) {
    // Disable the button so user can't click multiple times
    generateBtn.disabled = true;
    loading.classList.add('active');
    successMessage.classList.remove('show');

    try {
        // Get the selected font and text
        const selectedFont = fontSelect.value;
        const selectedTextKey = textSelect.value;
        const text = textOptions[selectedTextKey];

        // Create the worksheet title
        a4Container.innerHTML = `
            <div class="worksheet-title">Handwriting Practice Worksheet</div>
        `;

        // Decide how many times to repeat the text
        const repetitions = selectedTextKey === 'alphabet' || selectedTextKey === 'numbers' ? 8 : 6;
        const lines = [];
        
        // Fill the lines array with repeated text
        for (let i = 0; i < repetitions; i++) {
            lines.push(text);
        }

        // Create HTML for each practice line
        lines.forEach(line => {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'practice-line';
            lineDiv.innerHTML = `
                <div class="practice-text" style="font-family: '${selectedFont}', cursive;">${line}</div>
                <div class="guide-line"></div>
            `;
            a4Container.appendChild(lineDiv);
        });

        // Wait for all fonts to load completely
        await document.fonts.ready;
        
        // Wait a bit more to ensure everything is rendered
        await new Promise(resolve => setTimeout(resolve, 100));

        // Capture the A4 container as an image using html2canvas
        const canvas = await html2canvas(a4Container, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });

        // Create a new PDF document using jsPDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Convert canvas to image and add to PDF
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        
        // Create a filename
        const fileName = `handwriting-practice-${selectedFont.replace(/\s+/g, '-').toLowerCase()}.pdf`;
        
        // Download the PDF
        pdf.save(fileName);

        // Get PDF as blob for email attachment
        const pdfBlob = pdf.output('blob');

        // Store download data (for analytics or backend)
        const downloadData = {
            email: email,
            font: selectedFont,
            textType: selectedTextKey,
            timestamp: new Date().toISOString(),
            fileName: fileName
        };

        console.log('Download Data:', downloadData);
        console.log('PDF Blob size:', pdfBlob.size, 'bytes');

        // Send email notification via EmailJS
        await sendEmailNotification(email, selectedFont, selectedTextKey, fileName);
        
        // Show success message
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);

        // Clear the A4 container
        a4Container.innerHTML = '';

    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Sorry, there was an error generating your worksheet. Please try again.');
    } finally {
        // Re-enable the button
        generateBtn.disabled = false;
        loading.classList.remove('active');
    }
}

// Function to send email via EmailJS
async function sendEmailNotification(email, font, textType, fileName) {
    try {
        const templateParams = {
            to_email: email,
            font: font,
            textType: textType,
            fileName: fileName,
            timestamp: new Date().toLocaleString()
        };

        await emailjs.send(
            'service_d5xxbx1',      // REPLACE THIS with your EmailJS service ID
            'YOUR_TEMPLATE_ID',     // REPLACE THIS with your EmailJS template ID
            templateParams
        );

        console.log('Email sent successfully to:', email);
    } catch (error) {
        console.error('Email sending failed:', error);
        // Don't show error to user - they still got their PDF download
    }
}

// Initialize the preview when page loads
document.fonts.ready.then(() => {
    updatePreview();
});

// Also update preview immediately for faster feedback
updatePreview();