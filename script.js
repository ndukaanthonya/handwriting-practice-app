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
const contentSelect = document.getElementById('content-select');
const pagesSelect = document.getElementById('pages-select');
const sizeSelect = document.getElementById('size-select');
const preview = document.getElementById('preview');
const generateBtn = document.getElementById('generate-btn');
const previewBtn = document.getElementById('preview-btn');
const loading = document.getElementById('loading');
const successMessage = document.getElementById('success-message');
const a4Container = document.getElementById('a4-container');
const fontCount = document.getElementById('font-count');
const themeToggle = document.getElementById('theme-toggle');
const sizeEstimate = document.getElementById('size-estimate');

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

// Preview modal elements
const previewModal = document.getElementById('preview-modal');
const previewCanvas = document.getElementById('preview-canvas');
const closePreviewBtn = document.getElementById('close-preview-btn');
const previewCloseBtn = document.getElementById('preview-close-btn');
const previewDownloadBtn = document.getElementById('preview-download-btn');

// Text options for practice
const textOptions = {
    pangram: 'The quick brown fox jumps over the lazy dog',
    alphabet: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
    numbers: '0 1 2 3 4 5 6 7 8 9',
    lowercase: 'a b c d e f g h i j k l m n o p q r s t u v w x y z',
    common: 'the and for are but not you all can her was one our',
    combined: [
        'The quick brown fox jumps over the lazy dog',
        'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        'a b c d e f g h i j k l m n o p q r s t u v w x y z',
        '0 1 2 3 4 5 6 7 8 9'
    ]
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
    preview.style.fontFamily = `'${selectedFont}', cursive`;
    preview.textContent = 'The quick brown fox jumps over the lazy dog'.substring(0, 40);
}

// Update file size estimate
function updateSizeEstimate() {
    const pages = parseInt(pagesSelect.value);
    const estimatedSize = Math.round(pages * 0.2 * 10) / 10; // ~0.2 MB per page
    sizeEstimate.textContent = `~${estimatedSize} MB`;
}

fontSelect.addEventListener('change', updatePreview);
pagesSelect.addEventListener('change', updateSizeEstimate);

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Generate 6-digit verification code
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send verification code
async function sendVerificationCode(email) {
    try {
        const code = generateVerificationCode();
        verificationData.email = email;
        verificationData.code = code;
        verificationData.timestamp = Date.now();

        const response = await fetch('/.netlify/functions/send-verification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code })
        });

        if (!response.ok) throw new Error('Failed to send verification code');
        return { success: true };
    } catch (error) {
        console.error('Error sending code:', error);
        return { success: false, error: error.message };
    }
}

// Save email data
async function saveEmailData(email, font, contentType, pages, textSize) {
    try {
        const response = await fetch('/.netlify/functions/save-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                font,
                textType: contentType,
                pages: pages + ' pages',
                textSize,
                timestamp: new Date().toISOString(),
                verified: true
            })
        });

        if (!response.ok) throw new Error('Failed to save email data');
        return { success: true };
    } catch (error) {
        console.error('Error saving email:', error);
        return { success: false };
    }
}

// Show email modal
generateBtn.addEventListener('click', function() {
    emailModal.classList.add('active');
    userEmailInput.value = '';
    emailError.classList.remove('show');
    userEmailInput.classList.remove('error');
});

cancelBtn.addEventListener('click', () => emailModal.classList.remove('active'));

// Send verification code
sendCodeBtn.addEventListener('click', async function() {
    const email = userEmailInput.value.trim();
    
    if (!validateEmail(email)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        userEmailInput.classList.add('error');
        return;
    }

    sendCodeBtn.disabled = true;
    sendCodeBtn.textContent = 'Sending...';

    const result = await sendVerificationCode(email);

    if (result.success) {
        emailModal.classList.remove('active');
        codeModal.classList.add('active');
        displayEmail.textContent = email;
        verificationCodeInput.value = '';
        codeError.classList.remove('show');
    } else {
        emailError.textContent = 'Failed to send code. Please try again.';
        emailError.classList.add('show');
    }

    sendCodeBtn.disabled = false;
    sendCodeBtn.textContent = 'Send Code';
});

resendCodeBtn.addEventListener('click', async function() {
    resendCodeBtn.disabled = true;
    resendCodeBtn.textContent = 'Sending...';
    const result = await sendVerificationCode(verificationData.email);
    if (result.success) alert('New code sent!');
    else alert('Failed to send code.');
    resendCodeBtn.disabled = false;
    resendCodeBtn.textContent = 'Resend';
});

codeCancelBtn.addEventListener('click', function() {
    codeModal.classList.remove('active');
    verificationData = { email: '', code: '', timestamp: null };
});

verifyCodeBtn.addEventListener('click', async function() {
    const enteredCode = verificationCodeInput.value.trim();
    
    if (enteredCode.length !== 6) {
        codeError.textContent = 'Please enter a 6-digit code';
        codeError.classList.add('show');
        return;
    }

    const codeAge = Date.now() - verificationData.timestamp;
    if (codeAge > 10 * 60 * 1000) {
        codeError.textContent = 'Code expired. Request a new code.';
        codeError.classList.add('show');
        return;
    }

    if (enteredCode !== verificationData.code) {
        codeError.textContent = 'Invalid code. Try again.';
        codeError.classList.add('show');
        return;
    }

    codeModal.classList.remove('active');
    
    const selectedFont = fontSelect.value;
    const selectedContent = contentSelect.value;
    const selectedPages = parseInt(pagesSelect.value);
    const selectedSize = sizeSelect.value;
    
    await saveEmailData(verificationData.email, selectedFont, selectedContent, selectedPages, selectedSize);
    await generatePDF();
    
    verificationData = { email: '', code: '', timestamp: null };
});

verificationCodeInput.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
    codeError.classList.remove('show');
});

userEmailInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendCodeBtn.click(); });
verificationCodeInput.addEventListener('keypress', e => { if (e.key === 'Enter') verifyCodeBtn.click(); });
userEmailInput.addEventListener('input', () => {
    emailError.classList.remove('show');
    userEmailInput.classList.remove('error');
});

// Preview PDF
previewBtn.addEventListener('click', async function() {
    await generatePreview();
});

closePreviewBtn.addEventListener('click', () => previewModal.classList.remove('active'));
previewCloseBtn.addEventListener('click', () => previewModal.classList.remove('active'));
previewDownloadBtn.addEventListener('click', () => {
    previewModal.classList.remove('active');
    generateBtn.click();
});

async function generatePreview() {
    previewBtn.disabled = true;
    previewBtn.textContent = 'Generating Preview...';

    try {
        const selectedFont = fontSelect.value;
        const selectedContent = contentSelect.value;
        const selectedSize = parseFloat(sizeSelect.value);
        const pages = parseInt(pagesSelect.value);

        // Generate first page only for preview
        const canvas = await createPDFPage(selectedFont, selectedContent, selectedSize, 0);
        
        // Display in preview modal
        const ctx = previewCanvas.getContext('2d');
        previewCanvas.width = canvas.width;
        previewCanvas.height = canvas.height;
        ctx.drawImage(canvas, 0, 0);

        // Update preview info
        document.getElementById('preview-font-name').textContent = selectedFont;
        document.getElementById('preview-content-name').textContent = contentSelect.options[contentSelect.selectedIndex].text;
        document.getElementById('preview-pages-name').textContent = pages;
        document.getElementById('preview-size-name').textContent = selectedSize + ' cm';
        document.getElementById('preview-file-size').textContent = sizeEstimate.textContent;

        previewModal.classList.add('active');
    } catch (error) {
        console.error('Preview error:', error);
        alert('Error generating preview');
    } finally {
        previewBtn.disabled = false;
        previewBtn.textContent = '👁️ Preview PDF';
    }
}

// Create a single PDF page
async function createPDFPage(font, contentType, textSize, pageNumber) {
    const container = document.createElement('div');
    container.style.width = '210mm';
    container.style.height = '297mm';
    container.style.background = 'white';
    container.style.padding = '20mm';
    container.style.boxSizing = 'border-box';
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    document.body.appendChild(container);

    const fontSizePx = textSize * 37.8;
    const textHeightMm = textSize * 10;
    const spacingMm = 5;
    const lineHeightMm = textHeightMm + spacingMm;
    const usableHeightMm = 234;
    const linesPerPage = Math.floor(usableHeightMm / lineHeightMm);

    // Title
    const title = document.createElement('div');
    title.style.textAlign = 'center';
    title.style.fontSize = '18px';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '10mm';
    title.textContent = `Handwriting Practice - Page ${pageNumber + 1}`;
    container.appendChild(title);

    // Get content for this page
    let practiceTexts = [];
    if (contentType === 'combined') {
        practiceTexts = textOptions.combined;
    } else {
        practiceTexts = [textOptions[contentType]];
    }

    // Create lines
    let lineCount = 0;
    for (let text of practiceTexts) {
        const repetitions = Math.ceil(linesPerPage / practiceTexts.length);
        for (let i = 0; i < repetitions && lineCount < linesPerPage; i++) {
            const lineDiv = document.createElement('div');
            lineDiv.style.position = 'relative';
            lineDiv.style.marginBottom = `${spacingMm}mm`;
            lineDiv.style.height = `${textHeightMm}mm`;

            const textDiv = document.createElement('div');
            textDiv.style.fontFamily = `'${font}', cursive`;
            textDiv.style.fontSize = `${fontSizePx}px`;
            textDiv.style.color = '#c0c0c0';
            textDiv.style.lineHeight = '1.0';
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
            container.appendChild(lineDiv);
            lineCount++;
        }
    }

    // Watermark
    const watermark = document.createElement('div');
    watermark.style.position = 'absolute';
    watermark.style.bottom = '15mm';
    watermark.style.left = '0';
    watermark.style.right = '0';
    watermark.style.textAlign = 'center';
    watermark.style.fontSize = '9px';
    watermark.style.color = '#aaa';
    watermark.style.fontStyle = 'italic';
    watermark.textContent = 'Made by Annaelechukwu';
    container.appendChild(watermark);

    await document.fonts.ready;
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(container, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
    });

    document.body.removeChild(container);
    return canvas;
}

// Generate full PDF
async function generatePDF() {
    generateBtn.disabled = true;
    loading.classList.add('active');
    loading.textContent = 'Starting PDF generation...';
    successMessage.classList.remove('show');

    try {
        const selectedFont = fontSelect.value;
        const selectedContent = contentSelect.value;
        const selectedSize = parseFloat(sizeSelect.value);
        const totalPages = parseInt(pagesSelect.value);

        console.log('Starting PDF generation:', {
            font: selectedFont,
            content: selectedContent,
            size: selectedSize,
            pages: totalPages
        });

        // Check if jsPDF is loaded
        if (!window.jspdf) {
            throw new Error('jsPDF library not loaded');
        }

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        console.log('PDF document created, generating pages...');

        // Generate pages
        for (let i = 0; i < totalPages; i++) {
            loading.textContent = `Generating page ${i + 1} of ${totalPages}...`;
            console.log(`Generating page ${i + 1}/${totalPages}`);
            
            try {
                const canvas = await createPDFPage(selectedFont, selectedContent, selectedSize, i);
                console.log(`Page ${i + 1} canvas created:`, canvas.width, 'x', canvas.height);
                
                const imgData = canvas.toDataURL('image/jpeg', 0.7);
                console.log(`Page ${i + 1} converted to image`);
                
                if (i > 0) {
                    pdf.addPage();
                    console.log(`Added new page ${i + 1}`);
                }
                
                pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
                console.log(`Page ${i + 1} added to PDF`);
                
                // Small delay between pages
                await new Promise(resolve => setTimeout(resolve, 100));
                
            } catch (pageError) {
                console.error(`Error generating page ${i + 1}:`, pageError);
                throw new Error(`Failed to generate page ${i + 1}: ${pageError.message}`);
            }
        }

        console.log('All pages generated, preparing download...');

        // Create filename
        const fileName = `handwriting-practice-${selectedFont.replace(/\s+/g, '-').toLowerCase()}-${totalPages}p.pdf`;
        console.log('Saving PDF as:', fileName);

        // Save PDF
        pdf.save(fileName);
        console.log('PDF saved successfully!');

        // Show success message
        successMessage.classList.add('show');
        setTimeout(() => successMessage.classList.remove('show'), 5000);

        // Show coffee modal after delay
        setTimeout(() => showCoffeeModal(), 1000);

    } catch (error) {
        console.error('❌ PDF Generation Error:', error);
        console.error('Error stack:', error.stack);
        alert(`Error generating PDF: ${error.message}\n\nPlease check the console for details or try with fewer pages.`);
    } finally {
        generateBtn.disabled = false;
        loading.classList.remove('active');
        loading.textContent = 'Processing...';
    }
}

// Coffee Modal
const coffeeModal = document.getElementById('coffee-modal');
const coffeeCloseBtn = document.getElementById('coffee-close-btn');

function showCoffeeModal() {
    const lastDismissed = localStorage.getItem('coffeeDismissed');
    const now = Date.now();
    if (!lastDismissed || (now - parseInt(lastDismissed)) > 24 * 60 * 60 * 1000) {
        coffeeModal.classList.add('active');
    }
}

coffeeCloseBtn.addEventListener('click', function() {
    coffeeModal.classList.remove('active');
    localStorage.setItem('coffeeDismissed', Date.now().toString());
});

coffeeModal.addEventListener('click', function(e) {
    if (e.target === coffeeModal) {
        coffeeModal.classList.remove('active');
        localStorage.setItem('coffeeDismissed', Date.now().toString());
    }
});

// Get download counter
async function updateDownloadCount() {
    try {
        const response = await fetch('/.netlify/functions/get-stats');
        const data = await response.json();
        if (data.success) {
            document.getElementById('download-count').textContent = data.totalDownloads.toLocaleString();
        } else {
            document.getElementById('download-count').textContent = '100+';
        }
    } catch (error) {
        document.getElementById('download-count').textContent = '100+';
    }
}

// Initialize
initTheme();
updatePreview();
updateSizeEstimate();
updateDownloadCount();
document.fonts.ready.then(() => updatePreview());