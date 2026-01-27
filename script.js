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

// Get all HTML elements (with null checks)
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
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Populate font dropdown
if (fontSelect) {
    handwritingFonts.sort().forEach(font => {
        const option = document.createElement('option');
        option.value = font;
        option.textContent = font;
        fontSelect.appendChild(option);
    });
}

if (fontCount) {
    fontCount.textContent = `${handwritingFonts.length} handwriting fonts available`;
}

// Update preview
function updatePreview() {
    if (!fontSelect || !preview) return;
    const selectedFont = fontSelect.value;
    preview.style.fontFamily = `'${selectedFont}', cursive`;
    preview.textContent = 'The quick brown fox jumps over the lazy dog'.substring(0, 40);
}

// Update file size estimate
function updateSizeEstimate() {
    if (!pagesSelect || !sizeEstimate) return;
    const pages = parseInt(pagesSelect.value);
    const estimatedSize = Math.round(pages * 0.2 * 10) / 10;
    sizeEstimate.textContent = `~${estimatedSize} MB`;
}

if (fontSelect) fontSelect.addEventListener('change', updatePreview);
if (pagesSelect) pagesSelect.addEventListener('change', updateSizeEstimate);

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
if (generateBtn && emailModal) {
    generateBtn.addEventListener('click', function() {
        emailModal.classList.add('active');
        if (userEmailInput) userEmailInput.value = '';
        if (emailError) emailError.classList.remove('show');
        if (userEmailInput) userEmailInput.classList.remove('error');
    });
}

if (cancelBtn && emailModal) {
    cancelBtn.addEventListener('click', () => emailModal.classList.remove('active'));
}

// Send verification code
if (sendCodeBtn) {
    sendCodeBtn.addEventListener('click', async function() {
        const email = userEmailInput ? userEmailInput.value.trim() : '';
        
        if (!validateEmail(email)) {
            if (emailError) {
                emailError.textContent = 'Please enter a valid email address';
                emailError.classList.add('show');
            }
            if (userEmailInput) userEmailInput.classList.add('error');
            return;
        }

        sendCodeBtn.disabled = true;
        sendCodeBtn.textContent = 'Sending...';

        const result = await sendVerificationCode(email);

        if (result.success) {
            if (emailModal) emailModal.classList.remove('active');
            if (codeModal) codeModal.classList.add('active');
            if (displayEmail) displayEmail.textContent = email;
            if (verificationCodeInput) verificationCodeInput.value = '';
            if (codeError) codeError.classList.remove('show');
        } else {
            if (emailError) {
                emailError.textContent = 'Failed to send code. Please try again.';
                emailError.classList.add('show');
            }
        }

        sendCodeBtn.disabled = false;
        sendCodeBtn.textContent = 'Send Code';
    });
}

if (resendCodeBtn) {
    resendCodeBtn.addEventListener('click', async function() {
        resendCodeBtn.disabled = true;
        resendCodeBtn.textContent = 'Sending...';
        const result = await sendVerificationCode(verificationData.email);
        if (result.success) alert('New code sent!');
        else alert('Failed to send code.');
        resendCodeBtn.disabled = false;
        resendCodeBtn.textContent = 'Resend';
    });
}

if (codeCancelBtn && codeModal) {
    codeCancelBtn.addEventListener('click', function() {
        codeModal.classList.remove('active');
        verificationData = { email: '', code: '', timestamp: null };
    });
}

if (verifyCodeBtn) {
    verifyCodeBtn.addEventListener('click', async function() {
        const enteredCode = verificationCodeInput ? verificationCodeInput.value.trim() : '';
        
        if (enteredCode.length !== 6) {
            if (codeError) {
                codeError.textContent = 'Please enter a 6-digit code';
                codeError.classList.add('show');
            }
            return;
        }

        const codeAge = Date.now() - verificationData.timestamp;
        if (codeAge > 10 * 60 * 1000) {
            if (codeError) {
                codeError.textContent = 'Code expired. Request a new code.';
                codeError.classList.add('show');
            }
            return;
        }

        if (enteredCode !== verificationData.code) {
            if (codeError) {
                codeError.textContent = 'Invalid code. Try again.';
                codeError.classList.add('show');
            }
            return;
        }

        if (codeModal) codeModal.classList.remove('active');
        
        const selectedFont = fontSelect ? fontSelect.value : 'Dancing Script';
        const selectedContent = contentSelect ? contentSelect.value : 'pangram';
        const selectedPages = pagesSelect ? parseInt(pagesSelect.value) : 1;
        const selectedSize = sizeSelect ? sizeSelect.value : '0.9';
        
        await saveEmailData(verificationData.email, selectedFont, selectedContent, selectedPages, selectedSize);
        await generatePDF();
        
        verificationData = { email: '', code: '', timestamp: null };
    });
}

if (verificationCodeInput) {
    verificationCodeInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (codeError) codeError.classList.remove('show');
    });
}

if (userEmailInput) {
    userEmailInput.addEventListener('keypress', e => { 
        if (e.key === 'Enter' && sendCodeBtn) sendCodeBtn.click(); 
    });
    userEmailInput.addEventListener('input', () => {
        if (emailError) emailError.classList.remove('show');
        userEmailInput.classList.remove('error');
    });
}

if (verificationCodeInput) {
    verificationCodeInput.addEventListener('keypress', e => { 
        if (e.key === 'Enter' && verifyCodeBtn) verifyCodeBtn.click(); 
    });
}

// Preview PDF
if (previewBtn) {
    previewBtn.addEventListener('click', async function() {
        await generatePreview();
    });
}

if (closePreviewBtn && previewModal) {
    closePreviewBtn.addEventListener('click', () => previewModal.classList.remove('active'));
}

if (previewCloseBtn && previewModal) {
    previewCloseBtn.addEventListener('click', () => previewModal.classList.remove('active'));
}

if (previewDownloadBtn && previewModal && generateBtn) {
    previewDownloadBtn.addEventListener('click', () => {
        previewModal.classList.remove('active');
        generateBtn.click();
    });
}

async function generatePreview() {
    if (!previewBtn) return;
    
    previewBtn.disabled = true;
    previewBtn.textContent = 'Generating Preview...';

    try {
        const selectedFont = fontSelect ? fontSelect.value : 'Dancing Script';
        const selectedContent = contentSelect ? contentSelect.value : 'pangram';
        const selectedSize = sizeSelect ? parseFloat(sizeSelect.value) : 0.9;
        const pages = pagesSelect ? parseInt(pagesSelect.value) : 1;

        const canvas = await createPDFPage(selectedFont, selectedContent, selectedSize, 0);
        
        if (previewCanvas) {
            const ctx = previewCanvas.getContext('2d');
            previewCanvas.width = canvas.width;
            previewCanvas.height = canvas.height;
            ctx.drawImage(canvas, 0, 0);
        }

        const previewFontName = document.getElementById('preview-font-name');
        const previewContentName = document.getElementById('preview-content-name');
        const previewPagesName = document.getElementById('preview-pages-name');
        const previewSizeName = document.getElementById('preview-size-name');
        const previewFileSize = document.getElementById('preview-file-size');

        if (previewFontName) previewFontName.textContent = selectedFont;
        if (previewContentName && contentSelect) {
            previewContentName.textContent = contentSelect.options[contentSelect.selectedIndex].text;
        }
        if (previewPagesName) previewPagesName.textContent = pages;
        if (previewSizeName) previewSizeName.textContent = selectedSize + ' cm';
        if (previewFileSize && sizeEstimate) {
            previewFileSize.textContent = sizeEstimate.textContent;
        }

        if (previewModal) previewModal.classList.add('active');
    } catch (error) {
        console.error('Preview error:', error);
        alert('Error generating preview: ' + error.message);
    } finally {
        previewBtn.disabled = false;
        previewBtn.textContent = '👁️ Preview PDF';
    }
}

// Create a single PDF page
async function createPDFPage(font, contentType, textSize, pageNumber) {
    console.log(`Creating page ${pageNumber + 1}...`);
    
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
        const textContent = textOptions[contentType];
        practiceTexts = Array.isArray(textContent) ? textContent : [textContent];
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
    await new Promise(resolve => setTimeout(resolve, 200));

    console.log('Capturing with html2canvas...');
    const canvas = await html2canvas(container, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
    });

    document.body.removeChild(container);
    console.log(`Page ${pageNumber + 1} canvas created:`, canvas.width, 'x', canvas.height);
    return canvas;
}

// Generate full PDF
async function generatePDF() {
    console.log('=== PDF GENERATION START ===');
    
    if (generateBtn) generateBtn.disabled = true;
    if (loading) {
        loading.classList.add('active');
        loading.textContent = 'Starting PDF generation...';
    }
    if (successMessage) successMessage.classList.remove('show');

    try {
        const selectedFont = fontSelect ? fontSelect.value : 'Dancing Script';
        const selectedContent = contentSelect ? contentSelect.value : 'pangram';
        const selectedSize = sizeSelect ? parseFloat(sizeSelect.value) : 0.9;
        const totalPages = pagesSelect ? parseInt(pagesSelect.value) : 1;

        console.log('Settings:', {
            font: selectedFont,
            content: selectedContent,
            size: selectedSize,
            pages: totalPages
        });

        if (!window.jspdf) {
            throw new Error('jsPDF library not loaded. Please refresh the page.');
        }

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        console.log('PDF document created');

        // Generate pages
        for (let i = 0; i < totalPages; i++) {
            if (loading) loading.textContent = `Generating page ${i + 1} of ${totalPages}...`;
            console.log(`--- Page ${i + 1}/${totalPages} ---`);
            
            const canvas = await createPDFPage(selectedFont, selectedContent, selectedSize, i);
            const imgData = canvas.toDataURL('image/jpeg', 0.7);
            
            if (i > 0) pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
            
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        const fileName = `handwriting-${selectedFont.replace(/\s+/g, '-').toLowerCase()}-${totalPages}p.pdf`;
        console.log('Saving as:', fileName);
        
        pdf.save(fileName);
        console.log('=== PDF SAVED SUCCESSFULLY ===');

        if (successMessage) {
            successMessage.classList.add('show');
            setTimeout(() => {
                if (successMessage) successMessage.classList.remove('show');
            }, 5000);
        }

        setTimeout(() => showCoffeeModal(), 1000);

    } catch (error) {
        console.error('=== PDF GENERATION FAILED ===');
        console.error('Error:', error.message);
        console.error('Stack:', error.stack);
        alert(`Error generating PDF: ${error.message}\n\nPlease try with fewer pages or refresh the page.`);
    } finally {
        if (generateBtn) generateBtn.disabled = false;
        if (loading) {
            loading.classList.remove('active');
            loading.textContent = 'Processing...';
        }
    }
}

// Coffee Modal
const coffeeModal = document.getElementById('coffee-modal');
const coffeeCloseBtn = document.getElementById('coffee-close-btn');

function showCoffeeModal() {
    if (!coffeeModal) return;
    const lastDismissed = localStorage.getItem('coffeeDismissed');
    const now = Date.now();
    if (!lastDismissed || (now - parseInt(lastDismissed)) > 24 * 60 * 60 * 1000) {
        coffeeModal.classList.add('active');
    }
}

if (coffeeCloseBtn && coffeeModal) {
    coffeeCloseBtn.addEventListener('click', function() {
        coffeeModal.classList.remove('active');
        localStorage.setItem('coffeeDismissed', Date.now().toString());
    });
}

if (coffeeModal) {
    coffeeModal.addEventListener('click', function(e) {
        if (e.target === coffeeModal) {
            coffeeModal.classList.remove('active');
            localStorage.setItem('coffeeDismissed', Date.now().toString());
        }
    });
}

// Get download counter
async function updateDownloadCount() {
    const downloadCountEl = document.getElementById('download-count');
    if (!downloadCountEl) return;
    
    try {
        const response = await fetch('/.netlify/functions/get-stats');
        const data = await response.json();
        if (data.success) {
            downloadCountEl.textContent = data.totalDownloads.toLocaleString();
        } else {
            downloadCountEl.textContent = '100+';
        }
    } catch (error) {
        downloadCountEl.textContent = '100+';
    }
}

// Initialize
initTheme();
updatePreview();
updateSizeEstimate();
updateDownloadCount();
if (fontSelect && preview) {
    document.fonts.ready.then(() => updatePreview());
}