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

// Get all HTML elements
const fontSelect = document.getElementById('font-select');
const textSelect = document.getElementById('text-select');
const sizeSelect = document.getElementById('size-select');
const preview = document.getElementById('preview');
const generateBtn = document.getElementById('generate-btn');
const loading = document.getElementById('loading');
const successMessage = document.getElementById('success-message');
const a4Container = document.getElementById('a4-container');
const fontCount = document.getElementById('font-count');
const themeToggle = document.getElementById('theme-toggle');

// Email modal elements
const emailModal = document.getElementById('email-modal');
const userEmailInput = document.getElementById('user-email');
const emailError = document.getElementById('email-error');
const sendCodeBtn = document.getElementById('send-code-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Code modal elements
const codeModal = document.getElementById('code-modal');
const displayEmail = document.getElementById('display-email');
const verificationCodeInput = document.getElementById('verification-code');
const codeError = document.getElementById('code-error');
const verifyCodeBtn = document.getElementById('verify-code-btn');
const codeCancelBtn = document.getElementById('code-cancel-btn');
const resendCodeBtn = document.getElementById('resend-code-btn');

// Text options for practice
const textOptions = {
    pangram: 'The quick brown fox jumps over the lazy dog',
    alphabet: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
    numbers: '0 1 2 3 4 5 6 7 8 9',
    lowercase: 'a b c d e f g h i j k l m n o p q r s t u v w x y z',
    common: 'the and for are but not you all can her was one our'
};

// Store verification data temporarily
let verificationData = {
    email: '',
    code: '',
    timestamp: null
};

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Toggle theme
themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Populate font dropdown
handwritingFonts.sort().forEach(font => {
    const option = document.createElement('option');
    option.value = font;
    option.textContent = font;
    fontSelect.appendChild(option);
});

fontCount.textContent = `${handwritingFonts.length} handwriting fonts available`;

// Update preview
function updatePreview() {
    const selectedFont = fontSelect.value;
    const selectedTextKey = textSelect.value;
    const text = textOptions[selectedTextKey];

    preview.style.fontFamily = `'${selectedFont}', cursive`;
    preview.textContent = text.substring(0, 30) + (text.length > 30 ? '...' : '');
}

fontSelect.addEventListener('change', updatePreview);
textSelect.addEventListener('change', updatePreview);

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Generate 6-digit verification code
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send verification code via Netlify Function
async function sendVerificationCode(email) {
    try {
        const code = generateVerificationCode();
        
        // Store code and timestamp
        verificationData.email = email;
        verificationData.code = code;
        verificationData.timestamp = Date.now();

        // Call Netlify Function to send email
        const response = await fetch('/.netlify/functions/send-verification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code })
        });

        if (!response.ok) {
            throw new Error('Failed to send verification code');
        }

        return { success: true };
    } catch (error) {
        console.error('Error sending code:', error);
        return { success: false, error: error.message };
    }
}

// Save email data to Google Sheets via Netlify Function
async function saveEmailData(email, font, textType, textSize) {
    try {
        const response = await fetch('/.netlify/functions/save-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                font,
                textType,
                textSize,
                timestamp: new Date().toISOString(),
                verified: true
            })
        });

        if (!response.ok) {
            throw new Error('Failed to save email data');
        }

        return { success: true };
    } catch (error) {
        console.error('Error saving email:', error);
        return { success: false, error: error.message };
    }
}

// Show email modal
generateBtn.addEventListener('click', function() {
    emailModal.classList.add('active');
    userEmailInput.value = '';
    emailError.classList.remove('show');
    userEmailInput.classList.remove('error');
});

// Cancel email modal
cancelBtn.addEventListener('click', function() {
    emailModal.classList.remove('active');
});

// Send verification code
sendCodeBtn.addEventListener('click', async function() {
    const email = userEmailInput.value.trim();
    
    if (!validateEmail(email)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        userEmailInput.classList.add('error');
        return;
    }

    // Disable button and show loading
    sendCodeBtn.disabled = true;
    sendCodeBtn.textContent = 'Sending...';

    // Send verification code
    const result = await sendVerificationCode(email);

    if (result.success) {
        // Hide email modal, show code modal
        emailModal.classList.remove('active');
        codeModal.classList.add('active');
        displayEmail.textContent = email;
        verificationCodeInput.value = '';
        codeError.classList.remove('show');
    } else {
        emailError.textContent = 'Failed to send code. Please try again.';
        emailError.classList.add('show');
    }

    // Re-enable button
    sendCodeBtn.disabled = false;
    sendCodeBtn.textContent = 'Send Code';
});

// Resend code
resendCodeBtn.addEventListener('click', async function() {
    resendCodeBtn.disabled = true;
    resendCodeBtn.textContent = 'Sending...';

    const result = await sendVerificationCode(verificationData.email);

    if (result.success) {
        alert('New code sent! Check your email.');
    } else {
        alert('Failed to send code. Please try again.');
    }

    resendCodeBtn.disabled = false;
    resendCodeBtn.textContent = 'Resend';
});

// Cancel code modal
codeCancelBtn.addEventListener('click', function() {
    codeModal.classList.remove('active');
    verificationData = { email: '', code: '', timestamp: null };
});

// Verify code and generate PDF
verifyCodeBtn.addEventListener('click', async function() {
    const enteredCode = verificationCodeInput.value.trim();
    
    if (enteredCode.length !== 6) {
        codeError.textContent = 'Please enter a 6-digit code';
        codeError.classList.add('show');
        verificationCodeInput.classList.add('error');
        return;
    }

    // Check if code expired (10 minutes)
    const currentTime = Date.now();
    const codeAge = currentTime - verificationData.timestamp;
    const tenMinutes = 10 * 60 * 1000;

    if (codeAge > tenMinutes) {
        codeError.textContent = 'Code expired. Please request a new code.';
        codeError.classList.add('show');
        verificationCodeInput.classList.add('error');
        return;
    }

    // Verify code
    if (enteredCode !== verificationData.code) {
        codeError.textContent = 'Invalid code. Please try again.';
        codeError.classList.add('show');
        verificationCodeInput.classList.add('error');
        return;
    }

    // Code is valid! Close modal and generate PDF
    codeModal.classList.remove('active');
    
    // Save email data to Google Sheets
    const selectedFont = fontSelect.value;
    const selectedTextKey = textSelect.value;
    const selectedSize = sizeSelect.value;
    
    await saveEmailData(verificationData.email, selectedFont, selectedTextKey, selectedSize);
    
    // Generate PDF
    await generatePDF();
    
    // Clear verification data
    verificationData = { email: '', code: '', timestamp: null };
});

// Allow only numbers in verification code input
verificationCodeInput.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
    codeError.classList.remove('show');
    verificationCodeInput.classList.remove('error');
});

// Allow Enter key in email input
userEmailInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendCodeBtn.click();
    }
});

// Allow Enter key in code input
verificationCodeInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        verifyCodeBtn.click();
    }
});

// Remove error on email input
userEmailInput.addEventListener('input', function() {
    emailError.classList.remove('show');
    userEmailInput.classList.remove('error');
});

// Generate PDF function
async function generatePDF() {
    generateBtn.disabled = true;
    loading.classList.add('active');
    successMessage.classList.remove('show');

    try {
        const selectedFont = fontSelect.value;
        const selectedTextKey = textSelect.value;
        const selectedSize = parseFloat(sizeSelect.value);
        const text = textOptions[selectedTextKey];

        // Convert cm to pixels (1cm ≈ 37.8 pixels at 96 DPI)
        const fontSizePx = selectedSize * 37.8;

        // Clear and set up A4 container
        a4Container.innerHTML = '';
        a4Container.style.display = 'block';
        a4Container.style.position = 'absolute';
        a4Container.style.left = '-9999px';

        // Page dimensions in mm
        const pageHeightMm = 297; // A4 height
        const pageWidthMm = 210; // A4 width
        const topMarginMm = 20; // Top padding
        const bottomMarginMm = 20; // Bottom padding
        const leftRightMarginMm = 20; // Side padding

        // Reserve space for title and watermark
        const titleHeightMm = 15; // Space for title
        const watermarkHeightMm = 8; // Space for watermark

        // Calculate usable height for practice lines
        const usableHeightMm = pageHeightMm - topMarginMm - bottomMarginMm - titleHeightMm - watermarkHeightMm;
        // = 297 - 20 - 20 - 15 - 8 = 234mm

        // Each line needs: text height + spacing below
        const textHeightMm = selectedSize * 10; // Convert cm to mm
        const spacingBelowMm = 5; // Gap between guide line and next text
        const lineHeightMm = textHeightMm + spacingBelowMm;

        // Calculate how many lines fit
        const numberOfLines = Math.floor(usableHeightMm / lineHeightMm);
        
        console.log('PDF Generation Details:');
        console.log('- Text size:', selectedSize, 'cm');
        console.log('- Text height:', textHeightMm, 'mm');
        console.log('- Line height (text + spacing):', lineHeightMm, 'mm');
        console.log('- Usable height:', usableHeightMm, 'mm');
        console.log('- Number of lines that fit:', numberOfLines);

        // Create worksheet title
        const titleDiv = document.createElement('div');
        titleDiv.style.textAlign = 'center';
        titleDiv.style.fontSize = '18px';
        titleDiv.style.color = '#333';
        titleDiv.style.fontWeight = 'bold';
        titleDiv.style.marginBottom = '10mm';
        titleDiv.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        titleDiv.textContent = 'Handwriting Practice Worksheet';
        a4Container.appendChild(titleDiv);

        // Create practice lines container
        const linesContainer = document.createElement('div');
        linesContainer.style.marginBottom = '10mm';
        a4Container.appendChild(linesContainer);

        // Create practice lines
        for (let i = 0; i < numberOfLines; i++) {
            const lineDiv = document.createElement('div');
            lineDiv.style.position = 'relative';
            lineDiv.style.marginBottom = `${spacingBelowMm}mm`;
            lineDiv.style.height = `${textHeightMm}mm`;
            
            const textDiv = document.createElement('div');
            textDiv.style.fontFamily = `'${selectedFont}', cursive`;
            textDiv.style.fontSize = `${fontSizePx}px`;
            textDiv.style.color = '#c0c0c0';
            textDiv.style.lineHeight = '1.0';
            textDiv.style.height = `${textHeightMm}mm`;
            textDiv.style.overflow = 'hidden';
            textDiv.textContent = text;
            
            const guideLine = document.createElement('div');
            guideLine.style.position = 'absolute';
            guideLine.style.bottom = '0';
            guideLine.style.left = '0';
            guideLine.style.right = '0';
            guideLine.style.height = '1.5px';
            guideLine.style.backgroundColor = '#000';
            
            lineDiv.appendChild(textDiv);
            lineDiv.appendChild(guideLine);
            linesContainer.appendChild(lineDiv);
        }

        // Add watermark at bottom with proper spacing
        const watermarkDiv = document.createElement('div');
        watermarkDiv.style.position = 'absolute';
        watermarkDiv.style.bottom = `${bottomMarginMm - 5}mm`;
        watermarkDiv.style.left = '0';
        watermarkDiv.style.right = '0';
        watermarkDiv.style.textAlign = 'center';
        watermarkDiv.style.fontSize = '9px';
        watermarkDiv.style.color = '#aaa';
        watermarkDiv.style.fontStyle = 'italic';
        watermarkDiv.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        watermarkDiv.textContent = 'Made by Annaelechukwu';
        a4Container.appendChild(watermarkDiv);

        // Wait for fonts to load
        await document.fonts.ready;
        await new Promise(resolve => setTimeout(resolve, 300));

        console.log('Capturing with html2canvas...');

        // Capture with html2canvas - exact A4 dimensions
        const canvas = await html2canvas(a4Container, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            width: 794, // 210mm at 96 DPI
            height: 1123 // 297mm at 96 DPI
        });

        console.log('Creating PDF document...');

        // Create PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        
        const fileName = `handwriting-practice-${selectedFont.replace(/\s+/g, '-').toLowerCase()}-${selectedSize}cm.pdf`;
        
        console.log('Saving PDF:', fileName);
        console.log('Total lines created:', numberOfLines);
        pdf.save(fileName);

        // Show success message
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);

        // Clear container
        a4Container.innerHTML = '';

        // Show Buy Me a Coffee modal after successful download
        setTimeout(() => {
            showCoffeeModal();
        }, 1000);

    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Sorry, there was an error generating your worksheet. Please try again.');
    } finally {
        generateBtn.disabled = false;
        loading.classList.remove('active');
    }
}

// Buy Me a Coffee Modal
const coffeeModal = document.getElementById('coffee-modal');
const coffeeCloseBtn = document.getElementById('coffee-close-btn');

function showCoffeeModal() {
    // Check if user has dismissed the modal in the last 24 hours
    const lastDismissed = localStorage.getItem('coffeeDismissed');
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;

    if (!lastDismissed || (now - parseInt(lastDismissed)) > oneDayMs) {
        coffeeModal.classList.add('active');
    }
}

coffeeCloseBtn.addEventListener('click', function() {
    coffeeModal.classList.remove('active');
    // Remember that user dismissed it
    localStorage.setItem('coffeeDismissed', Date.now().toString());
});

// Also close if user clicks outside the modal
coffeeModal.addEventListener('click', function(e) {
    if (e.target === coffeeModal) {
        coffeeModal.classList.remove('active');
        localStorage.setItem('coffeeDismissed', Date.now().toString());
    }
});

// Initialize
initTheme();
document.fonts.ready.then(() => {
    updatePreview();
});
updatePreview();
``