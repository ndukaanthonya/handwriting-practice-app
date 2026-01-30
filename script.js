// ===================================
// TRAYCE - HANDWRITING PRACTICE APP
// Live Preview - All Changes Update Instantly
// ===================================

// ===================================
// HANDWRITING FONTS COLLECTION (105+)
// ===================================

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

// ===================================
// DOM ELEMENTS
// ===================================

const fontSelect = document.getElementById('font-select');
const pangramSelect = document.getElementById('pangram-select');
const customTextInput = document.getElementById('custom-text-input');
const charCount = document.getElementById('char-count');
const contentSelect = document.getElementById('content-select');
const pagesSelect = document.getElementById('pages-select');
const sizeSelect = document.getElementById('size-select');
const fontCount = document.getElementById('font-count');
const sizeEstimate = document.getElementById('size-estimate');
const customTextGroup = document.getElementById('custom-text-group');
const sheetContent = document.getElementById('sheet-content');

// Buttons
const downloadBtn = document.getElementById('download-btn');
const themeToggle = document.getElementById('theme-toggle');

// Text mode radios
const modePreset = document.getElementById('mode-preset');
const modeCustom = document.getElementById('mode-custom');

// Modals
const emailModal = document.getElementById('email-modal');
const userEmailInput = document.getElementById('user-email');
const emailError = document.getElementById('email-error');
const sendCodeBtn = document.getElementById('send-code-btn');
const cancelBtn = document.getElementById('cancel-btn');

const codeModal = document.getElementById('code-modal');
const displayEmail = document.getElementById('display-email');
const verificationCodeInput = document.getElementById('verification-code');
const codeError = document.getElementById('code-error');
const verifyCodeBtn = document.getElementById('verify-code-btn');
const codeCancelBtn = document.getElementById('code-cancel-btn');
const resendCodeBtn = document.getElementById('resend-code-btn');

const coffeeModal = document.getElementById('coffee-modal');
const coffeeCloseBtn = document.getElementById('coffee-close-btn');

// ===================================
// 1. VERIFICATION DATA
// ===================================
let verificationData = {
    email: '',
    code: '',
    timestamp: null
};


// ===================================
// INITIALIZATION
// ===================================

function init() {
    console.log('🚀 Trayce App Starting...');
    initTheme();
    populateFonts();
    updateLivePreview();
    updateSizeEstimate();
    setupEventListeners();
    console.log('✅ Trayce App Ready!');
}

// ===================================
// THEME MANAGEMENT
// ===================================

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// ===================================
// FONT MANAGEMENT
// ===================================

function populateFonts() {
    if (!fontSelect) return;
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = 'Dancing Script';
    defaultOption.textContent = 'Dancing Script (Default)';
    fontSelect.appendChild(defaultOption);
    
    handwritingFonts.sort().forEach(font => {
        if (font !== 'Dancing Script') {
            const option = document.createElement('option');
            option.value = font;
            option.textContent = font;
            fontSelect.appendChild(option);
        }
    });
    
    if (fontCount) {
        fontCount.textContent = `${handwritingFonts.length} handwriting fonts available`;
    }
}

// ===================================
// LIVE PREVIEW UPDATE
// ===================================

function updateLivePreview() {
    if (!sheetContent) return;
    
    // Get current settings
    const selectedFont = fontSelect ? fontSelect.value : 'Dancing Script';
    const selectedPangram = pangramSelect ? pangramSelect.value : 'The quick brown fox jumps over the lazy dog';
    const selectedContent = contentSelect ? contentSelect.value : 'combined';
    const isCustomMode = modeCustom && modeCustom.checked;
    const customText = customTextInput ? customTextInput.value.trim() : '';
    
    // Determine what text to display
    let practiceTexts = [];
    
    if (isCustomMode && customText) {
        // Custom text mode
        practiceTexts = customText.split('\n').filter(line => line.trim());
        if (practiceTexts.length === 0) {
            practiceTexts = [customText];
        }
    } else {
        // Preset mode
        if (selectedContent === 'combined') {
            practiceTexts = [
                selectedPangram,
                'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
                'a b c d e f g h i j k l m n o p q r s t u v w x y z',
                '0 1 2 3 4 5 6 7 8 9'
            ];
        } else if (selectedContent === 'pangram') {
            practiceTexts = [selectedPangram];
        } else if (selectedContent === 'alphabet') {
            practiceTexts = ['A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'];
        } else if (selectedContent === 'lowercase') {
            practiceTexts = ['a b c d e f g h i j k l m n o p q r s t u v w x y z'];
        } else if (selectedContent === 'numbers') {
            practiceTexts = ['0 1 2 3 4 5 6 7 8 9'];
        }
    }
    
    // Clear current content
    sheetContent.innerHTML = '';
    
    // Generate 8 lines (4 text + 4 faded copies)
    const totalLines = 8;
    let lineIndex = 0;
    
    for (let i = 0; i < practiceTexts.length && lineIndex < totalLines; i++) {
        const text = practiceTexts[i];
        
        // Main text line
        if (lineIndex < totalLines) {
            const lineGroup1 = document.createElement('div');
            lineGroup1.className = 'handwriting-line-group';
            
            const textElement1 = document.createElement('p');
            textElement1.className = 'practice-text';
            textElement1.style.fontFamily = `'${selectedFont}', cursive`;
            textElement1.textContent = text;
            
            lineGroup1.appendChild(textElement1);
            sheetContent.appendChild(lineGroup1);
            lineIndex++;
        }
        
        // Faded text line
        if (lineIndex < totalLines) {
            const lineGroup2 = document.createElement('div');
            lineGroup2.className = 'handwriting-line-group';
            
            const textElement2 = document.createElement('p');
            textElement2.className = 'practice-text practice-text-faded';
            textElement2.style.fontFamily = `'${selectedFont}', cursive`;
            textElement2.textContent = text;
            
            lineGroup2.appendChild(textElement2);
            sheetContent.appendChild(lineGroup2);
            lineIndex++;
        }
    }
    
    // Fill remaining lines with empty line groups
    while (lineIndex < totalLines) {
        const emptyLine = document.createElement('div');
        emptyLine.className = 'handwriting-line-group';
        sheetContent.appendChild(emptyLine);
        lineIndex++;
    }
}

// ===================================
// CUSTOM TEXT MANAGEMENT
// ===================================

function toggleCustomText() {
    if (!modePreset || !modeCustom || !customTextGroup) return;
    
    if (modeCustom.checked) {
        customTextGroup.style.display = 'block';
        if (contentSelect) contentSelect.disabled = true;
        if (pangramSelect) pangramSelect.disabled = true;
    } else {
        customTextGroup.style.display = 'none';
        if (contentSelect) contentSelect.disabled = false;
        if (pangramSelect) pangramSelect.disabled = false;
    }
    
    updateLivePreview();
}

function updateCharCount() {
    if (!customTextInput || !charCount) return;
    const length = customTextInput.value.length;
    charCount.textContent = length;
    
    if (length > 500) {
        customTextInput.value = customTextInput.value.substring(0, 500);
        charCount.textContent = '500';
    }
    
    updateLivePreview();
}

// ===================================
// SIZE ESTIMATE
// ===================================

function updateSizeEstimate() {
    if (!pagesSelect || !sizeEstimate) return;
    const pages = parseInt(pagesSelect.value);
    const estimatedSize = Math.round(pages * 0.2 * 10) / 10;
    sizeEstimate.textContent = `~${estimatedSize} MB`;
}

// ===================================
// EMAIL VALIDATION
// ===================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// ===================================
// API CALLS
// ===================================
async function sendVerificationCode(email) {
    try {
        const code = generateVerificationCode();
        
        // CRITICAL: Store email in verificationData
        verificationData.email = email;
        verificationData.code = code;
        verificationData.timestamp = Date.now();

        console.log('Stored in verificationData:', verificationData);  // DEBUG

        const response = await fetch('/api/send-verification', {
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
// saveEmailData function:

async function saveEmailData(email, font, contentType, pages, textSize) {
    try {
        console.log('=== SAVING EMAIL DATA ===');
        console.log('Email:', email);
        console.log('Font:', font);
        console.log('Content Type:', contentType);
        console.log('Pages:', pages);
        console.log('Text Size:', textSize);

        // CRITICAL: Make sure email is not empty
        if (!email || email.trim() === '') {
            console.error('❌ Email is empty! Cannot save.');
            return { success: false, error: 'Email is empty' };
        }

        const response = await fetch('/api/save-email', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                email: email,  // Pass email directly
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
            return { success: false, error: result.error };
        }

    } catch (error) {
        console.error('❌ Error saving email:', error);
        return { success: false, error: error.message };
    }
}


// ===================================
// MODAL MANAGEMENT
// ===================================

function openEmailModal() {
    if (!emailModal) return;
    emailModal.classList.add('active');
    if (userEmailInput) userEmailInput.value = '';
    if (emailError) emailError.classList.remove('show');
}

function closeEmailModal() {
    if (!emailModal) return;
    emailModal.classList.remove('active');
}

function openCodeModal() {
    if (!codeModal) return;
    codeModal.classList.add('active');
    if (displayEmail) displayEmail.textContent = verificationData.email;
    if (verificationCodeInput) verificationCodeInput.value = '';
    if (codeError) codeError.classList.remove('show');
}

function closeCodeModal() {
    if (!codeModal) return;
    codeModal.classList.remove('active');
    verificationData = { email: '', code: '', timestamp: null };
}

function showCoffeeModal() {
    if (!coffeeModal) {
        console.error('Coffee modal element not found');
        return;
    }
    
    console.log('Showing coffee modal...');
    coffeeModal.classList.add('active');
}

function closeCoffeeModal() {
    if (!coffeeModal) return;
    coffeeModal.classList.remove('active');
    console.log('Coffee modal closed');
}

// ===================================
// PDF GENERATION
// ===================================

async function createPDFPage(font, contentType, textSize, pageNumber) {
    console.log(`Creating page ${pageNumber + 1}...`);
    
    const container = document.createElement('div');
    container.style.width = '210mm';
    container.style.height = '297mm';
    container.style.background = '#ffffff';
    container.style.padding = '20mm';
    container.style.boxSizing = 'border-box';
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    document.body.appendChild(container);

    const TARGET_LINES = 16;
    const titleHeightMm = 15;
    const watermarkHeightMm = 10;
    const usableHeightMm = 297 - 40 - titleHeightMm - watermarkHeightMm;
    const spacePerLineMm = usableHeightMm / TARGET_LINES;
    const fontSizePx = textSize * 37.8;
    const lineHeightMultiplier = 1.4;
    const textLineHeightMm = textSize * 10 * lineHeightMultiplier;
    const guideLinePositionMm = spacePerLineMm - 2;

    // Title
    const title = document.createElement('div');
    title.style.textAlign = 'center';
    title.style.fontSize = '18px';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '8mm';
    title.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    title.style.color = '#000';
    title.textContent = `Handwriting Practice - Page ${pageNumber + 1}`;
    container.appendChild(title);

    // Get content
    let practiceTexts = [];
    
    const isCustomMode = modeCustom && modeCustom.checked;
    const customText = customTextInput ? customTextInput.value.trim() : '';

    if (isCustomMode && customText) {
        practiceTexts = customText.split('\n').filter(line => line.trim());
        if (practiceTexts.length === 0) {
            practiceTexts = [customText];
        }
    } else {
        const selectedPangram = pangramSelect ? pangramSelect.value : 'The quick brown fox jumps over the lazy dog';
        
        if (contentType === 'combined') {
            practiceTexts = [
                selectedPangram,
                'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
                'a b c d e f g h i j k l m n o p q r s t u v w x y z',
                '0 1 2 3 4 5 6 7 8 9'
            ];
        } else if (contentType === 'pangram') {
            practiceTexts = [selectedPangram];
        } else if (contentType === 'alphabet') {
            practiceTexts = ['A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'];
        } else if (contentType === 'lowercase') {
            practiceTexts = ['a b c d e f g h i j k l m n o p q r s t u v w x y z'];
        } else if (contentType === 'numbers') {
            practiceTexts = ['0 1 2 3 4 5 6 7 8 9'];
        }
    }

    // Create exactly 16 lines
    let lineCount = 0;
    const linesPerText = Math.ceil(TARGET_LINES / practiceTexts.length);
    
    for (let text of practiceTexts) {
        for (let i = 0; i < linesPerText && lineCount < TARGET_LINES; i++) {
            const lineContainer = document.createElement('div');
            lineContainer.style.position = 'relative';
            lineContainer.style.height = `${spacePerLineMm}mm`;
            lineContainer.style.marginBottom = '0';
            lineContainer.style.overflow = 'hidden';

            const textDiv = document.createElement('div');
            textDiv.style.fontFamily = `'${font}', cursive`;
            textDiv.style.fontSize = `${fontSizePx}px`;
            textDiv.style.color = '#c0c0c0';
            textDiv.style.lineHeight = `${textLineHeightMm}mm`;
            textDiv.style.height = `${textLineHeightMm}mm`;
            textDiv.style.overflow = 'hidden';
            textDiv.style.position = 'relative';
            textDiv.style.top = '0';
            textDiv.textContent = text;

            const guideLine = document.createElement('div');
            guideLine.style.position = 'absolute';
            guideLine.style.bottom = `${spacePerLineMm - guideLinePositionMm}mm`;
            guideLine.style.left = '0';
            guideLine.style.right = '0';
            guideLine.style.height = '1.5px';
            guideLine.style.backgroundColor = '#000';

            lineContainer.appendChild(textDiv);
            lineContainer.appendChild(guideLine);
            container.appendChild(lineContainer);
            lineCount++;
        }
    }

    // Watermark
    const watermark = document.createElement('div');
    watermark.style.position = 'absolute';
    watermark.style.bottom = '12mm';
    watermark.style.left = '0';
    watermark.style.right = '0';
    watermark.style.textAlign = 'center';
    watermark.style.fontSize = '9px';
    watermark.style.color = '#aaa';
    watermark.style.fontStyle = 'italic';
    watermark.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    watermark.textContent = 'Made by Annaelechukwu';
    container.appendChild(watermark);

    await document.fonts.ready;
    await new Promise(resolve => setTimeout(resolve, 200));

    const canvas = await html2canvas(container, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123
    });

    document.body.removeChild(container);
    return canvas;
}

async function generatePDF() {
    console.log('=== PDF GENERATION START ===');
    
    if (downloadBtn) {
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = '<span class="material-symbols-outlined">refresh</span><span>Generating...</span>';
    }

    try {
        const selectedFont = fontSelect ? fontSelect.value : 'Dancing Script';
        const selectedContent = contentSelect ? contentSelect.value : 'pangram';
        const selectedSize = sizeSelect ? parseFloat(sizeSelect.value) : 0.9;
        const totalPages = pagesSelect ? parseInt(pagesSelect.value) : 1;

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

        for (let i = 0; i < totalPages; i++) {
            const canvas = await createPDFPage(selectedFont, selectedContent, selectedSize, i);
            const imgData = canvas.toDataURL('image/jpeg', 0.7);
            
            if (i > 0) pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
            
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        const fileName = `handwriting-${selectedFont.replace(/\s+/g, '-').toLowerCase()}-${totalPages}p.pdf`;
        pdf.save(fileName);

        setTimeout(() => showCoffeeModal(), 1000);

    } catch (error) {
        console.error('PDF generation failed:', error);
        alert(`Error generating PDF: ${error.message}\n\nPlease try with fewer pages or refresh the page.`);
    } finally {
        if (downloadBtn) {
            downloadBtn.disabled = false;
            downloadBtn.innerHTML = '<span class="material-symbols-outlined">download</span><span>Download PDF</span>';
        }
    }
}

// ===================================
// EVENT LISTENERS
// ===================================

function setupEventListeners() {
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Font selection - LIVE UPDATE
    if (fontSelect) {
        fontSelect.addEventListener('change', updateLivePreview);
    }

    // Pangram selection - LIVE UPDATE
    if (pangramSelect) {
        pangramSelect.addEventListener('change', updateLivePreview);
    }

    // Content selection - LIVE UPDATE
    if (contentSelect) {
        contentSelect.addEventListener('change', updateLivePreview);
    }

    // Text mode toggle
    if (modePreset) modePreset.addEventListener('change', toggleCustomText);
    if (modeCustom) modeCustom.addEventListener('change', toggleCustomText);

    // Custom text - LIVE UPDATE
    if (customTextInput) {
        customTextInput.addEventListener('input', updateCharCount);
    }

    // Size estimate
    if (pagesSelect) {
        pagesSelect.addEventListener('change', updateSizeEstimate);
    }

    // Download button
    if (downloadBtn) {
        downloadBtn.addEventListener('click', openEmailModal);
    }

    // Email modal
    if (cancelBtn) cancelBtn.addEventListener('click', closeEmailModal);

    if (sendCodeBtn) {
        sendCodeBtn.addEventListener('click', async function() {
            const email = userEmailInput ? userEmailInput.value.trim() : '';
            
            console.log('=== SEND CODE CLICKED ===');
            console.log('Email entered:', email);
            
            if (!validateEmail(email)) {
                if (emailError) {
                    emailError.textContent = 'Please enter a valid email address';
                    emailError.classList.add('show');
                }
                return;
            }
    
            sendCodeBtn.disabled = true;
            sendCodeBtn.textContent = 'Sending...';
    
            const result = await sendVerificationCode(email);
    
            if (result.success) {
                console.log('✅ Code sent, email stored:', verificationData.email);  // DEBUG
                closeEmailModal();
                openCodeModal();
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

    // Code modal
    if (codeCancelBtn) codeCancelBtn.addEventListener('click', closeCodeModal);

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

    if (verifyCodeBtn) {
        verifyCodeBtn.addEventListener('click', async function() {
            const enteredCode = verificationCodeInput ? verificationCodeInput.value.trim() : '';
            
            console.log('=== VERIFY CODE CLICKED ===');
            console.log('Entered code:', enteredCode);
            console.log('Stored code:', verificationData.code);
            console.log('Stored email:', verificationData.email);  // DEBUG
            
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
    
            // Code is correct!
            console.log('✅ Code verified!');
            closeCodeModal();
            
            // Get current settings
            const selectedFont = fontSelect ? fontSelect.value : 'Dancing Script';
            const selectedContent = contentSelect ? contentSelect.value : 'pangram';
            const selectedPages = pagesSelect ? parseInt(pagesSelect.value) : 1;
            const selectedSize = sizeSelect ? sizeSelect.value : '0.9';
            
            // CRITICAL: Use verificationData.email (not a new variable)
            const userEmail = verificationData.email;
            
            console.log('About to save with email:', userEmail);  // DEBUG
            
            // Save email data FIRST
            await saveEmailData(userEmail, selectedFont, selectedContent, selectedPages, selectedSize);
            
            // Then generate PDF
            await generatePDF();
        });
    }

    // Code input - numbers only
    if (verificationCodeInput) {
        verificationCodeInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (codeError) codeError.classList.remove('show');
        });
        
        verificationCodeInput.addEventListener('keypress', e => { 
            if (e.key === 'Enter' && verifyCodeBtn) verifyCodeBtn.click(); 
        });
    }

    // Email input
    if (userEmailInput) {
        userEmailInput.addEventListener('keypress', e => { 
            if (e.key === 'Enter' && sendCodeBtn) sendCodeBtn.click(); 
        });
        
        userEmailInput.addEventListener('input', () => {
            if (emailError) emailError.classList.remove('show');
        });
    }

    // Coffee modal
    if (coffeeCloseBtn) coffeeCloseBtn.addEventListener('click', closeCoffeeModal);
}

// ===================================
// START APP
// ===================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}