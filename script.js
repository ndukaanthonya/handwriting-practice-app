// ====================================
// TRAYCE - COMPLETE JAVASCRIPT WITH KIDS MODE
// ====================================

// ====================================
// CONFIGURATION & CONSTANTS
// ====================================

const SUPABASE_URL = 'https://opcygfnslwsbbyhqydup.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wY3lnZm5zbHdzYmJ5aHF5ZHVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NjQ0MjcsImV4cCI6MjA4NTM0MDQyN30.PZMTMRexfv-XHeKUH-s0jPEZPbRZBZsRcYp-wuDkwdo';
const RESEND_API_KEY = 're_aJ5fTLxs_N5KjMsG9hXW2ThcbEku4Fhpx';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Handwriting Fonts (105 fonts)
const HANDWRITING_FONTS = [
    'Delius', 'Dancing Script', 'Pacifico', 'Shadows Into Light', 'Indie Flower',
    'Kalam', 'Permanent Marker', 'Caveat', 'Gloria Hallelujah', 'Architects Daughter',
    'Amatic SC', 'Patrick Hand', 'Covered By Your Grace', 'Reenie Beanie', 'Satisfy',
    'Cookie', 'Handlee', 'Homemade Apple', 'La Belle Aurore', 'Waiting for the Sunrise',
    'Calligraffitti', 'Just Another Hand', 'Rock Salt', 'Sunshiney', 'Sue Ellen Francisco',
    'Over the Rainbow', 'Schoolbell', 'Dawning of a New Day', 'Dekko', 'Gochi Hand',
    'Mr Dafoe', 'Mrs Saint Delafield', 'Nanum Pen Script', 'Neucha', 'Petit Formal Script',
    'Short Stack', 'Swanky and Moo Moo', 'Yellowtail', 'League Script', 'Monsieur La Doulaise',
    'Mr De Haviland', 'Niconne', 'Norican', 'Pinyon Script', 'Rochester', 'Tangerine',
    'Vibur', 'Zeyada', 'Bad Script', 'Charm', 'Gaegu', 'Gowun Batang', 'Gowun Dodum',
    'Hi Melody', 'Nanum Brush Script', 'Nanum Gothic', 'Nanum Myeongjo', 'Gamja Flower',
    'Dongle', 'Jua', 'Cute Font', 'Do Hyeon', 'Black Han Sans', 'Sunflower', 'Stylish',
    'Single Day', 'Dokdo', 'East Sea Dokdo', 'Black And White Picture', 'Hahmlet',
    'Yeon Sung', 'Song Myung', 'Gugi', 'Gothic A1', 'Poor Story', 'Kirang Haerang',
    'Grandiflora One', 'Praise', 'Luxurious Script', 'Send Flowers', 'Whisper',
    'Fuzzy Bubbles', 'Give You Glory', 'Loved by the King', 'Mountains of Christmas',
    'Crafty Girls', 'Annie Use Your Telescope', 'Coming Soon', 'The Girl Next Door',
    'Walter Turncoat', 'Julee', 'Just Me Again Down Here', 'Kristi', 'Unkempt',
    'Pangolin', 'Mali', 'Sriracha', 'Itim', 'Kodchasan', 'Maitree', 'Srisakdi', 'K2D'
];

// Signature Fonts (12 fonts)
const SIGNATURE_FONTS = [
    'Dancing Script', 'Pacifico', 'Great Vibes', 'Allura', 'Kaushan Script',
    'Courgette', 'Satisfy', 'Cookie', 'Mr De Haviland', 'Pinyon Script',
    'Tangerine', 'Luxurious Script'
];

// Simple/Clean Fonts for Kids Mode (95 fonts)
const KIDS_FONTS = [
    'Arial', 'Verdana', 'Helvetica', 'Tahoma', 'Trebuchet MS', 'Georgia',
    'Times New Roman', 'Courier New', 'Lucida Console', 'Comic Sans MS', 'Impact',
    'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Source Sans Pro', 'Raleway',
    'PT Sans', 'Ubuntu', 'Merriweather', 'Playfair Display', 'Nunito', 'Poppins',
    'Oswald', 'Mukta', 'Rubik', 'Work Sans', 'Noto Sans', 'Oxygen', 'Quicksand',
    'Karla', 'Cabin', 'Barlow', 'Heebo', 'Titillium Web', 'Arimo', 'Hind',
    'Josefin Sans', 'Dosis', 'Muli', 'Bitter', 'Crimson Text', 'Exo 2', 'Fira Sans',
    'Libre Franklin', 'Libre Baskerville', 'Play', 'Assistant', 'Varela Round', 'Abel',
    'Asap', 'Yanone Kaffeesatz', 'Archivo', 'Cairo', 'Catamaran', 'Fjalla One',
    'Anton', 'Bebas Neue', 'Signika', 'Questrial', 'Pathway Gothic One', 'Acme',
    'Righteous', 'Patua One', 'Alfa Slab One', 'Hammersmith One', 'Concert One',
    'Bree Serif', 'Alegreya Sans', 'Maven Pro', 'Kanit', 'Prompt', 'Sarabun',
    'IBM Plex Sans', 'Architects Daughter', 'Shadows Into Light', 'Gloria Hallelujah',
    'Amatic SC', 'Permanent Marker', 'Pacifico', 'Lobster', 'Satisfy', 'Dancing Script',
    'Cookie', 'Great Vibes', 'Allura', 'Kaushan Script', 'Courgette', 'Caveat'
];

// Simple Sentences for Kids Mode
const SIMPLE_SENTENCES = [
    "This is a cat",
    "This is an apple",
    "I am a child",
    "The dog runs",
    "I like to play",
    "The sun is bright",
    "I love my family",
    "Birds can fly",
    "Fish swim in water",
    "I go to school",
    "Cats like milk",
    "Trees are green",
    "I can read",
    "Stars shine at night",
    "I help my mom"
];

// ====================================
// STATE MANAGEMENT
// ====================================

const state = {
    currentMode: 'handwriting',
    theme: localStorage.getItem('theme') || 'light',
    userEmail: null,
    verificationCode: null,
    handwriting: {
        font: 'Delius',
        size: 0.7,
        content: 'pangram',
        customText: '',
        pages: 1
    },
    signature: {
        activeTab: 'draw',
        font: 'Dancing Script',
        text: '',
        drawnSignature: null
    },
    kids: {
        font: 'Arial',
        size: 2.0,
        content: 'uppercase',
        sentence: 'This is a cat',
        customSentence: '',
        letter: 'A',
        theme: 'none',
        pages: 1
    }
};

// ====================================
// INITIALIZATION
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initModeToggle();
    initHandwritingMode();
    initSignatureMode();
    initKidsMode();
    initModals();
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', state.theme);
});

// ====================================
// THEME MANAGEMENT
// ====================================

function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Set initial icon
    themeIcon.textContent = state.theme === 'dark' ? '☀️' : '🌙';
    
    themeToggle.addEventListener('click', () => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        themeIcon.textContent = state.theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', state.theme);
    });
}

// ====================================
// MODE TOGGLE
// ====================================

function initModeToggle() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    const sections = document.querySelectorAll('.content-section');
    
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mode = button.dataset.mode;
            
            // Update state
            state.currentMode = mode;
            
            // Update UI
            modeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(`${mode}-section`).classList.add('active');
            
            // Update preview
            if (mode === 'handwriting') {
                updateHandwritingPreview();
            } else if (mode === 'kids') {
                updateKidsPreview();
            }
        });
    });
}

// ====================================
// HANDWRITING MODE
// ====================================

function initHandwritingMode() {
    // Populate font select
    const fontSelect = document.getElementById('font-select');
    HANDWRITING_FONTS.forEach(font => {
        const option = document.createElement('option');
        option.value = font;
        option.textContent = font;
        option.style.fontFamily = font;
        if (font === 'Delius') option.selected = true;
        fontSelect.appendChild(option);
    });
    
    // Size slider
    const sizeSlider = document.getElementById('text-size');
    const sizeValue = document.getElementById('text-size-value');
    sizeSlider.addEventListener('input', (e) => {
        state.handwriting.size = parseFloat(e.target.value);
        sizeValue.textContent = `${state.handwriting.size}cm`;
        updateHandwritingPreview();
    });
    
    // Font select
    fontSelect.addEventListener('change', (e) => {
        state.handwriting.font = e.target.value;
        updateHandwritingPreview();
    });
    
    // Content type
    const contentType = document.getElementById('content-type');
    const customTextGroup = document.getElementById('custom-text-group');
    const customText = document.getElementById('custom-text');
    
    contentType.addEventListener('change', (e) => {
        state.handwriting.content = e.target.value;
        customTextGroup.classList.toggle('hidden', e.target.value !== 'custom');
        updateHandwritingPreview();
    });
    
    customText.addEventListener('input', (e) => {
        state.handwriting.customText = e.target.value;
        updateHandwritingPreview();
    });
    
    // Number of pages
    document.getElementById('num-pages').addEventListener('change', (e) => {
        state.handwriting.pages = parseInt(e.target.value);
    });
    
    // Download button
    document.getElementById('download-btn').addEventListener('click', () => {
        if (state.currentMode === 'handwriting') {
            showEmailModal();
        } else if (state.currentMode === 'signature') {
            generateSignaturePDF();
        } else if (state.currentMode === 'kids') {
            generateKidsPDF();
        }
    });
    
    // Initial preview
    updateHandwritingPreview();
}

function updateHandwritingPreview() {
    const preview = document.getElementById('preview');
    const content = getHandwritingContent();
    
    preview.innerHTML = '';
    preview.style.fontFamily = state.handwriting.font;
    preview.style.fontSize = `${state.handwriting.size}cm`;
    preview.style.lineHeight = '2';
    preview.style.padding = '2cm';
    preview.style.color = '#000';
    
    const lines = content.split('\n');
    lines.forEach(line => {
        const p = document.createElement('p');
        p.textContent = line;
        p.style.marginBottom = '0.5cm';
        preview.appendChild(p);
    });
}

function getHandwritingContent() {
    const { content, customText } = state.handwriting;
    
    const pangram = "The quick brown fox jumps over the lazy dog";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    
    switch (content) {
        case 'pangram':
            return pangram;
        case 'alphabet':
            return alphabet;
        case 'numbers':
            return numbers;
        case 'combined':
            return `${pangram}\n\n${alphabet}\n\n${numbers}`;
        case 'custom':
            return customText || 'Enter your custom text...';
        default:
            return pangram;
    }
}

// ====================================
// SIGNATURE MODE
// ====================================

function initSignatureMode() {
    // Populate signature fonts
    const signatureFont = document.getElementById('signature-font');
    SIGNATURE_FONTS.forEach(font => {
        const option = document.createElement('option');
        option.value = font;
        option.textContent = font;
        option.style.fontFamily = font;
        signatureFont.appendChild(option);
    });
    
    // Tab switching
    const tabs = document.querySelectorAll('.signature-tab');
    const tabContents = document.querySelectorAll('.signature-tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            state.signature.activeTab = tabName;
            
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
    
    // Canvas drawing
    initSignatureCanvas();
    
    // Generate tab
    const signatureText = document.getElementById('signature-text');
    const signaturePreview = document.getElementById('signature-preview');
    
    signatureText.addEventListener('input', (e) => {
        state.signature.text = e.target.value;
        updateSignaturePreview();
    });
    
    signatureFont.addEventListener('change', (e) => {
        state.signature.font = e.target.value;
        updateSignaturePreview();
    });
}

function initSignatureCanvas() {
    const canvas = document.getElementById('signature-canvas');
    const ctx = canvas.getContext('2d');
    const clearBtn = document.getElementById('clear-canvas');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    function startDrawing(e) {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        [lastX, lastY] = [x, y];
        state.signature.drawnSignature = canvas.toDataURL();
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });
    
    clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        state.signature.drawnSignature = null;
    });
}

function updateSignaturePreview() {
    const preview = document.getElementById('signature-preview');
    preview.style.fontFamily = state.signature.font;
    preview.textContent = state.signature.text || 'Your Name';
}

// ====================================
// KIDS MODE
// ====================================

function initKidsMode() {
    // Populate kids fonts
    const kidsFont = document.getElementById('kids-font');
    KIDS_FONTS.forEach(font => {
        const option = document.createElement('option');
        option.value = font;
        option.textContent = font;
        option.style.fontFamily = font;
        kidsFont.appendChild(option);
    });
    
    // Populate letter select (A-Z)
    const letterSelect = document.getElementById('letter-select');
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const option = document.createElement('option');
        option.value = letter;
        option.textContent = letter;
        letterSelect.appendChild(option);
    }
    
    // Size slider
    const sizeSlider = document.getElementById('kids-size');
    const sizeValue = document.getElementById('kids-size-value');
    sizeSlider.addEventListener('input', (e) => {
        state.kids.size = parseFloat(e.target.value);
        sizeValue.textContent = `${state.kids.size}cm`;
        updateKidsPreview();
    });
    
    // Font select
    kidsFont.addEventListener('change', (e) => {
        state.kids.font = e.target.value;
        updateKidsPreview();
    });
    
    // Content type
    const kidsContent = document.getElementById('kids-content');
    const sentenceGroup = document.getElementById('sentence-group');
    const customSentenceGroup = document.getElementById('custom-sentence-group');
    const singleLetterGroup = document.getElementById('single-letter-group');
    
    kidsContent.addEventListener('change', (e) => {
        state.kids.content = e.target.value;
        
        // Show/hide appropriate controls
        sentenceGroup.classList.toggle('hidden', e.target.value !== 'sentences');
        singleLetterGroup.classList.toggle('hidden', e.target.value !== 'single');
        
        updateKidsPreview();
    });
    
    // Sentence select
    const sentenceSelect = document.getElementById('sentence-select');
    sentenceSelect.addEventListener('change', (e) => {
        state.kids.sentence = e.target.value;
        customSentenceGroup.classList.toggle('hidden', e.target.value !== 'custom');
        updateKidsPreview();
    });
    
    // Custom sentence
    document.getElementById('custom-sentence').addEventListener('input', (e) => {
        state.kids.customSentence = e.target.value;
        updateKidsPreview();
    });
    
    // Letter select
    letterSelect.addEventListener('change', (e) => {
        state.kids.letter = e.target.value;
        updateKidsPreview();
    });
    
    // Theme select
    document.getElementById('kids-theme').addEventListener('change', (e) => {
        state.kids.theme = e.target.value;
        updateKidsPreview();
    });
    
    // Number of pages
    document.getElementById('kids-pages').addEventListener('change', (e) => {
        state.kids.pages = parseInt(e.target.value);
    });
    
    // Download button
    document.getElementById('kids-download').addEventListener('click', () => {
        generateKidsPDF();
    });
    
    // Initial preview
    updateKidsPreview();
}

function updateKidsPreview() {
    const preview = document.getElementById('kids-preview');
    const content = getKidsContent();
    
    // Apply theme
    preview.className = 'kids-preview';
    if (state.kids.theme !== 'none') {
        preview.classList.add(`theme-${state.kids.theme}`);
    }
    
    // Add theme decorations
    let decorationsHTML = '';
    if (state.kids.theme === 'ocean') {
        decorationsHTML = createThemeDecorations(['🐠', '🐟', '🐡', '🦈', '🐙', '🦀', '🐚', '⛵']);
    } else if (state.kids.theme === 'teddy') {
        decorationsHTML = createThemeDecorations(['🧸', '💕', '🎀', '🧸', '💕', '🎀']);
    } else if (state.kids.theme === 'space') {
        decorationsHTML = createThemeDecorations(['⭐', '🚀', '🌙', '🪐', '⭐', '🚀']);
    } else if (state.kids.theme === 'safari') {
        decorationsHTML = createThemeDecorations(['🦁', '🐘', '🦒', '🦓', '🐅', '🦜', '🐊', '🦜']);
    }
    
    preview.innerHTML = `
        ${decorationsHTML}
        <div class="kids-preview-content" style="font-family: ${state.kids.font}; font-size: ${state.kids.size}cm; line-height: 2; padding: 2cm; color: ${state.kids.theme === 'space' ? '#fff' : '#000'};">
            ${content}
        </div>
    `;
}

function createThemeDecorations(emojis) {
    let html = '<div class="theme-decorations">';
    const positions = [
        { top: '5%', left: '5%' },
        { top: '10%', right: '5%' },
        { top: '30%', left: '10%' },
        { top: '50%', right: '8%' },
        { bottom: '30%', left: '7%' },
        { bottom: '10%', right: '10%' }
    ];
    
    positions.forEach((pos, i) => {
        const emoji = emojis[i % emojis.length];
        const style = Object.entries(pos).map(([key, val]) => `${key}: ${val}`).join('; ');
        html += `<div class="decoration-emoji" style="${style}">${emoji}</div>`;
    });
    
    html += '</div>';
    return html;
}

function getKidsContent() {
    const { content, sentence, customSentence, letter } = state.kids;
    
    switch (content) {
        case 'uppercase':
            return 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z';
        case 'lowercase':
            return 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
        case 'numbers':
            return '0 1 2 3 4 5 6 7 8 9';
        case 'pairs':
            return 'Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz';
        case 'sentences':
            const text = sentence === 'custom' ? (customSentence || 'Type your sentence...') : sentence;
            return text;
        case 'math':
            return '+ - × ÷ = < > ( ) [ ]';
        case 'single':
            const upper = letter;
            const lower = letter.toLowerCase();
            // Repeat to fill page
            let repeated = '';
            for (let i = 0; i < 20; i++) {
                repeated += `${upper} ${lower} `;
            }
            return repeated;
        default:
            return 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z';
    }
}

// ====================================
// PDF GENERATION
// ====================================

async function generateHandwritingPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('portrait', 'cm', 'a4');
    
    const content = getHandwritingContent();
    const lines = content.split('\n');
    const { font, size, pages } = state.handwriting;
    
    pdf.setFont(font);
    pdf.setFontSize(size * 28.35); // Convert cm to points
    
    for (let page = 0; page < pages; page++) {
        if (page > 0) pdf.addPage();
        
        let y = 2;
        lines.forEach((line, index) => {
            if (y < 27) { // A4 height is ~29.7cm
                pdf.text(line, 2, y);
                y += size * 2; // Line height
            }
        });
        
        // Add watermark
        pdf.setTextColor(200, 200, 200);
        pdf.setFontSize(8);
        pdf.text('Generated by Trayce.xyz', 10.5, 28.5, { align: 'center' });
        pdf.setTextColor(0, 0, 0);
    }
    
    pdf.save('trayce-handwriting-practice.pdf');
    
    // Save to database
    await saveToDatabase('handwriting', pages);
}

async function generateSignaturePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('landscape', 'cm', [10.5, 14.8]); // A6 landscape
    
    if (state.signature.activeTab === 'draw' && state.signature.drawnSignature) {
        const img = new Image();
        img.src = state.signature.drawnSignature;
        await new Promise(resolve => {
            img.onload = () => {
                pdf.addImage(img, 'PNG', 1, 1, 12.8, 8.5);
                resolve();
            };
        });
    } else {
        pdf.setFont(state.signature.font);
        pdf.setFontSize(60);
        pdf.text(state.signature.text || 'Your Name', 7.4, 6, { align: 'center' });
    }
    
    pdf.save('trayce-signature.pdf');
    
    // Save to database
    await saveToDatabase('signature', 1);
}

async function generateKidsPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('portrait', 'cm', 'a4');
    
    const content = getKidsContent();
    const { font, size, pages, theme } = state.kids;
    
    for (let page = 0; page < pages; page++) {
        if (page > 0) pdf.addPage();
        
        // Add theme background
        if (theme === 'ocean') {
            pdf.setFillColor(219, 234, 254);
            pdf.rect(0, 0, 21, 29.7, 'F');
        } else if (theme === 'teddy') {
            pdf.setFillColor(252, 231, 243);
            pdf.rect(0, 0, 21, 29.7, 'F');
        } else if (theme === 'space') {
            pdf.setFillColor(30, 27, 75);
            pdf.rect(0, 0, 21, 29.7, 'F');
        } else if (theme === 'safari') {
            pdf.setFillColor(209, 250, 229);
            pdf.rect(0, 0, 21, 29.7, 'F');
        }
        
        // Add content
        pdf.setFont(font);
        pdf.setFontSize(size * 28.35);
        pdf.setTextColor(theme === 'space' ? 255 : 0);
        
        const textLines = pdf.splitTextToSize(content, 17);
        let y = 3;
        textLines.forEach(line => {
            if (y < 26) {
                pdf.text(line, 2, y);
                y += size * 2;
            }
        });
        
        // Add watermark
        pdf.setTextColor(200, 200, 200);
        pdf.setFontSize(8);
        pdf.text('Generated by Trayce.xyz', 10.5, 28.5, { align: 'center' });
    }
    
    pdf.save('trayce-kids-worksheet.pdf');
    
    // Save to database
    await saveToDatabase('kids', pages);
    
    // Show coffee modal after 3rd download
    checkCoffeeModal();
}

// ====================================
// EMAIL VERIFICATION
// ====================================

function showEmailModal() {
    const modal = document.getElementById('email-modal');
    modal.classList.add('active');
}

function showCodeModal() {
    const modal = document.getElementById('code-modal');
    const emailSpan = document.getElementById('sent-email');
    emailSpan.textContent = state.userEmail;
    modal.classList.add('active');
}

function hideEmailModal() {
    document.getElementById('email-modal').classList.remove('active');
}

function hideCodeModal() {
    document.getElementById('code-modal').classList.remove('active');
}

async function sendVerificationCode() {
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value.trim();
    
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }
    
    state.userEmail = email;
    state.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Send email via Resend API
    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Trayce <noreply@trayce.xyz>',
                to: email,
                subject: 'Your Trayce Verification Code',
                html: `
                    <h2>Your Verification Code</h2>
                    <p>Enter this code to download your worksheet:</p>
                    <h1 style="font-size: 36px; color: #6366f1;">${state.verificationCode}</h1>
                    <p>This code will expire in 10 minutes.</p>
                `
            })
        });
        
        if (response.ok) {
            hideEmailModal();
            showCodeModal();
        } else {
            alert('Failed to send verification code. Please try again.');
        }
    } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send verification code. Please try again.');
    }
}

async function verifyCode() {
    const codeInput = document.getElementById('code-input');
    const code = codeInput.value.trim();
    
    if (code === state.verificationCode) {
        hideCodeModal();
        await generateHandwritingPDF();
    } else {
        alert('Invalid code. Please try again.');
    }
}

// ====================================
// DATABASE OPERATIONS
// ====================================

async function saveToDatabase(mode, pages) {
    try {
        const { error } = await supabase
            .from('downloads')
            .insert({
                email: state.userEmail,
                mode: mode,
                pages: pages,
                created_at: new Date().toISOString()
            });
        
        if (error) throw error;
    } catch (error) {
        console.error('Error saving to database:', error);
    }
}

// ====================================
// COFFEE MODAL
// ====================================

function checkCoffeeModal() {
    const downloadCount = parseInt(localStorage.getItem('downloadCount') || '0') + 1;
    localStorage.setItem('downloadCount', downloadCount);
    
    if (downloadCount === 3) {
        const coffeeModal = document.getElementById('coffee-modal');
        coffeeModal.classList.add('active');
    }
}

// ====================================
// MODAL INITIALIZATION
// ====================================

function initModals() {
    // Email modal
    document.getElementById('send-code-btn').addEventListener('click', sendVerificationCode);
    
    // Code modal
    document.getElementById('verify-code-btn').addEventListener('click', verifyCode);
    document.getElementById('resend-code-btn').addEventListener('click', sendVerificationCode);
    
    // Coffee modal
    document.getElementById('close-coffee').addEventListener('click', () => {
        document.getElementById('coffee-modal').classList.remove('active');
    });
    
    document.getElementById('maybe-later').addEventListener('click', () => {
        document.getElementById('coffee-modal').classList.remove('active');
    });
    
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// ====================================
// MOBILE OPTIMIZATION
// ====================================

// Prevent page refresh on mobile when switching apps
let isPageVisible = true;

document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
});

// Prevent iOS Safari refresh
window.addEventListener('pagehide', (e) => {
    if (isPageVisible) {
        e.preventDefault();
    }
});

// ====================================
// UTILITY FUNCTIONS
// ====================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to preview updates
const updateHandwritingPreview = debounce(updateHandwritingPreview, 300);
const updateKidsPreview = debounce(updateKidsPreview, 300);
