// Global state
let currentView = 'home';
let currentTheme = 'dark';
let cart = [];
let printSettings = {
    color: false,
    doubleSided: false,
    copies: 1,
    pages: 0
};
let uploadedFile = null;
let particles = [];
let particleCanvas, particleCtx;
let animationId;
let sounds = {};
let typingInterval;

// Products data with enhanced information
const products = [
    { id: 1, name: 'Premium Notebook', price: 25, emoji: '📓', category: 'writing' },
    { id: 2, name: 'Gel Pen (Blue)', price: 10, emoji: '🖊️', category: 'writing' },
    { id: 3, name: 'Gel Pen (Black)', price: 10, emoji: '✒️', category: 'writing' },
    { id: 4, name: 'Mechanical Pencil', price: 15, emoji: '✏️', category: 'writing' },
    { id: 5, name: 'Magic Eraser', price: 8, emoji: '🧽', category: 'tools' },
    { id: 6, name: 'Steel Ruler', price: 18, emoji: '📏', category: 'tools' },
    { id: 7, name: 'Neon Highlighter', price: 22, emoji: '🖍️', category: 'writing' },
    { id: 8, name: 'Heavy Duty Stapler', price: 55, emoji: '📎', category: 'tools' },
    { id: 9, name: 'Adhesive Stick', price: 15, emoji: '🏷️', category: 'tools' },
    { id: 10, name: 'Premium A4 Paper', price: 35, emoji: '📄', category: 'paper' },
    { id: 11, name: 'Document Folder', price: 25, emoji: '📁', category: 'storage' },
    { id: 12, name: 'Scientific Calculator', price: 180, emoji: '🧮', category: 'electronics' }
];

// Enhanced AI responses with more personality
const aiResponses = {
    greeting: "Hi there! 👋 I'm your futuristic CampusKart AI assistant. I'm here to help you navigate our 24/7 digital campus store. What can I help you discover today?",
    
    items: `🚀 **Welcome to our futuristic inventory!** 
    <br><br>📝 **Writing Essentials:**
    <br>• Premium Notebooks (₹25) - High-quality paper
    <br>• Gel Pens - Blue/Black (₹10) - Smooth writing
    <br>• Mechanical Pencils (₹15) - Precision writing
    <br>• Neon Highlighters (₹22) - Bright colors
    <br><br>🔧 **Smart Tools:**
    <br>• Magic Erasers (₹8) - Clean removal
    <br>• Steel Rulers (₹18) - Perfect measurements
    <br>• Heavy Duty Staplers (₹55) - Professional grade
    <br>• Adhesive Sticks (₹15) - Strong bonding
    <br><br>📋 **Paper & Storage:**
    <br>• Premium A4 Paper (₹35) - Crisp quality
    <br>• Document Folders (₹25) - Organization
    <br>• Scientific Calculators (₹180) - Advanced functions
    <br><br>🔥 Visit our **Shop** section to add items to your cart!`,
    
    printing: `⚡ **Next-Gen Printing Services:**
    <br><br>🖨️ **Ultra-Fast Printing:**
    <br>• Black & White: ₹1 per page (30-second delivery)
    <br>• Full Color: ₹2 per page (45-second delivery) 
    <br>• Double-sided: 50% page savings
    <br><br>📱 **Smart Process:**
    <br>1. 📤 Upload your file (PDF, images, docs)
    <br>2. ⚙️ Choose your preferences 
    <br>3. 💳 Pay instantly via digital wallet
    <br>4. ⏱️ Collect in under 60 seconds!
    <br><br>🎯 **Pro Features:**
    <br>• AI quality enhancement
    <br>• Smart page optimization
    <br>• Eco-friendly options
    <br><br>Ready to print? Visit our **Print** section!`,
    
    location: `🗺️ **CampusKart Hub Locations:**
    <br><br>🎓 **Campus Zones:**
    <br>• University libraries & study halls
    <br>• Hostel common areas & lobbies  
    <br>• Coaching centers & tutorial hubs
    <br>• Co-working spaces & maker labs
    <br>• PG accommodations & student centers
    <br><br>⚡ **24/7 Availability:**
    <br>• No closing hours - Always accessible
    <br>• AI-powered inventory management
    <br>• Instant restocking notifications
    <br>• Smart location finder via GPS
    <br><br>📍 Find your nearest CampusKart using our smart locator!`,
    
    payment: `💫 **Futuristic Payment Methods:**
    <br><br>📱 **Digital Wallets:**
    <br>• UPI (All major apps supported)
    <br>• Google Pay with smart suggestions
    <br>• PhonePe with instant rewards
    <br>• Paytm with cashback offers
    <br>• Amazon Pay integration
    <br><br>🔐 **Security Features:**
    <br>• Biometric authentication
    <br>• Blockchain transaction verification
    <br>• AI fraud detection
    <br>• Instant payment confirmation
    <br><br>💎 **Premium Features:**
    <br>• Auto-pay for regulars
    <br>• Smart spending analytics
    <br>• Loyalty point system
    <br><br>💳 100% secure, 0% hassle!`,
    
    speed: `🚀 **Lightning-Speed Service:**
    <br><br>⚡ **Performance Metrics:**
    <br>• Printing: 30-45 seconds average
    <br>• Stationery dispensing: 5-10 seconds  
    <br>• Payment processing: 2-3 seconds
    <br>• AI response time: Instant
    <br><br>🎯 **Optimization Features:**
    <br>• Predictive inventory stocking
    <br>• Queue-free smart ordering
    <br>• Parallel processing systems
    <br>• Real-time status updates
    <br><br>⏰ **Always Available:**
    <br>• 24/7/365 operation
    <br>• No maintenance downtime
    <br>• Weather-independent service
    <br><br>🏆 Faster than traditional stores by 10x!`,
    
    help: `🤖 **Your AI Campus Companion:**
    <br><br>💡 **I can assist you with:**
    <br>• 🛍️ Product recommendations & comparisons
    <br>• 🖨️ Printing troubleshooting & optimization  
    <br>• 💰 Pricing information & deals
    <br>• 📍 Location finding & navigation
    <br>• 💳 Payment methods & wallet setup
    <br>• 📊 Usage analytics & spending insights
    <br>• 🔧 Technical support & guidance
    <br><br>🎯 **Smart Features:**
    <br>• Learning your preferences
    <br>• Personalized suggestions  
    <br>• Proactive notifications
    <br>• Multi-language support
    <br><br>Ask me anything! I'm your 24/7 digital assistant! 😊`,
    
    default: `Thanks for reaching out! 🌟
    <br><br>🤖 **I'm here to help with:**
    <br>• 📦 Stationery products & recommendations
    <br>• 🖨️ Printing services & technical support
    <br>• 📍 Machine locations & availability
    <br>• 💳 Payment options & wallet integration
    <br>• ⏰ Service timings & speed information
    <br>• 🎯 Personalized shopping assistance
    <br><br>🚀 What would you like to explore today?`
};

// Particle class for background effects
class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * particleCanvas.height;
    }
    
    reset() {
        this.x = Math.random() * particleCanvas.width;
        this.y = 0;
        this.speed = Math.random() * 2 + 0.5;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim();
    }
    
    update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * 0.01) * 0.5;
        
        if (this.y > particleCanvas.height) {
            this.reset();
        }
    }
    
    draw() {
        particleCtx.save();
        particleCtx.globalAlpha = this.opacity;
        particleCtx.fillStyle = this.color;
        particleCtx.beginPath();
        particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        particleCtx.fill();
        particleCtx.restore();
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 CampusKart Futuristic App initializing...');
    
    try {
        // Initialize core systems
        initializeParticleSystem();
        initializeSounds();
        initializeTheme();
        
        // Load content
        loadProducts();
        updateCartDisplay();
        
        // Show initial view with animation
        showView('home');
        
        // Initialize AI assistant
        initializeAIAssistant();
        
        // Add global event listeners
        addGlobalEventListeners();
        
        console.log('✨ CampusKart app initialized successfully!');
        
        // Play startup sound
        playSound('hover');
        
    } catch (error) {
        console.error('❌ Error during initialization:', error);
    }
});

// Initialize particle system
function initializeParticleSystem() {
    particleCanvas = document.getElementById('particleCanvas');
    particleCtx = particleCanvas.getContext('2d');
    
    function resizeCanvas() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    animateParticles();
}

// Animate particles
function animateParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    animationId = requestAnimationFrame(animateParticles);
}

// Initialize sound system
function initializeSounds() {
    // Create audio contexts for different sounds
    sounds.click = document.getElementById('clickSound');
    sounds.hover = document.getElementById('hoverSound');
    
    // Set volume levels
    if (sounds.click) sounds.click.volume = 0.3;
    if (sounds.hover) sounds.hover.volume = 0.2;
}

// Play sound with error handling
function playSound(soundName) {
    if (sounds[soundName]) {
        try {
            sounds[soundName].currentTime = 0;
            sounds[soundName].play().catch(e => {
                // Handle autoplay restrictions silently
                console.log('Sound autoplay restricted:', e);
            });
        } catch (error) {
            console.log('Sound play error:', error);
        }
    }
}

// Initialize theme system
function initializeTheme() {
    const savedTheme = localStorage.getItem('campuskart-theme');
    if (savedTheme) {
        setTheme(savedTheme);
    }
}

// Theme management
function toggleThemeMenu() {
    const menu = document.getElementById('themeMenu');
    menu.classList.toggle('active');
    playSound('click');
}

function setTheme(themeName) {
    currentTheme = themeName;
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('campuskart-theme', themeName);
    
    // Update particle colors
    particles.forEach(particle => {
        particle.color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim();
    });
    
    // Close theme menu
    const menu = document.getElementById('themeMenu');
    menu.classList.remove('active');
    
    // Play theme change sound
    playSound('click');
    
    // Add theme change animation
    document.body.style.transition = 'all 0.5s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 500);
    
    console.log(`🎨 Theme changed to: ${themeName}`);
}

// Close theme menu when clicking outside
document.addEventListener('click', function(e) {
    const themeSwitcher = document.querySelector('.theme-switcher');
    const themeMenu = document.getElementById('themeMenu');
    
    if (!themeSwitcher.contains(e.target)) {
        themeMenu.classList.remove('active');
    }
});

// Add global event listeners
function addGlobalEventListeners() {
    // Add hover sound effects to interactive elements
    const interactiveElements = document.querySelectorAll(
        'button, .nav-item, .nav-btn, .bottom-nav-item, .product-card, .cart-item, .quick-btn'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => playSound('hover'));
        element.addEventListener('click', () => playSound('click'));
    });
    
    // Add 3D tilt effect to cards
    const cards = document.querySelectorAll('.product-card, .stat, .pill');
    cards.forEach(card => {
        card.addEventListener('mousemove', handleCardTilt);
        card.addEventListener('mouseleave', resetCardTilt);
    });
}

// 3D card tilt effect
function handleCardTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
}

function resetCardTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
}

// Navigation functions with enhanced animations
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
    playSound('click');
}

function showView(viewName) {
    // Hide all views with fade out
    const views = document.querySelectorAll('.view');
    views.forEach(view => {
        if (view.style.display !== 'none') {
            view.style.opacity = '0';
            setTimeout(() => {
                view.style.display = 'none';
            }, 300);
        }
    });
    
    // Show selected view with fade in
    setTimeout(() => {
        const selectedView = document.getElementById(viewName);
        if (selectedView) {
            selectedView.style.display = 'block';
            setTimeout(() => {
                selectedView.style.opacity = '1';
            }, 50);
        }
        
        // Update navigation states
        updateNavigation(viewName);
        
        // Close mobile menu
        const menu = document.getElementById('mobileMenu');
        menu.classList.remove('active');
        
        currentView = viewName;
        
        // Trigger view-specific animations
        triggerViewAnimations(viewName);
        
        console.log(`📱 Switched to view: ${viewName}`);
    }, 300);
    
    playSound('click');
}

function updateNavigation(activeView) {
    // Update all navigation elements
    const navElements = [
        '.nav-btn',
        '.nav-item', 
        '.bottom-nav-item'
    ];
    
    navElements.forEach(selector => {
        const items = document.querySelectorAll(selector);
        items.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.view === activeView) {
                item.classList.add('active');
            }
        });
    });
}

// Trigger view-specific animations
function triggerViewAnimations(viewName) {
    switch(viewName) {
        case 'home':
            animateHeroElements();
            break;
        case 'assistant':
            if (!document.getElementById('initialMessage').innerHTML) {
                typeAIMessage(aiResponses.greeting, 'initialMessage');
            }
            break;
        case 'shop':
            animateProductCards();
            break;
        case 'print':
            animatePrintElements();
            break;
    }
}

// Animate hero section elements
function animateHeroElements() {
    const heroElements = [
        '.hero-icon',
        '.hero-title', 
        '.hero-tagline',
        '.hero-headline h2',
        '.hero-headline p',
        '.feature-pills .pill',
        '.hero-buttons .btn',
        '.hero-stats .stat'
    ];
    
    heroElements.forEach((selector, index) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, i) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, (index * 200) + (i * 100));
        });
    });
}

// Animate product cards with stagger effect
function animateProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateY(180deg)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotateY(0deg)';
        }, index * 100);
    });
}

// Animate print section elements
function animatePrintElements() {
    const printElements = [
        '.upload-section',
        '.print-options',
        '.payment-section'
    ];
    
    printElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}

// Initialize AI Assistant with typing effect
function initializeAIAssistant() {
    const initialMessage = document.getElementById('initialMessage');
    if (initialMessage && !initialMessage.innerHTML) {
        // Will be triggered when assistant view is shown
    }
}

// Enhanced typing effect for AI messages
function typeAIMessage(message, elementId, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.innerHTML = '';
    let index = 0;
    const speed = 30; // milliseconds per character
    
    function type() {
        if (index < message.length) {
            // Handle HTML tags
            if (message.charAt(index) === '<') {
                const tagEnd = message.indexOf('>', index);
                if (tagEnd !== -1) {
                    element.innerHTML += message.substring(index, tagEnd + 1);
                    index = tagEnd + 1;
                } else {
                    element.innerHTML += message.charAt(index);
                    index++;
                }
            } else {
                element.innerHTML += message.charAt(index);
                index++;
            }
            
            // Scroll to bottom
            const messagesContainer = document.getElementById('chatMessages');
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
            
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }
    
    type();
}

// Print Service functions with enhanced UX
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        uploadedFile = file;
        
        // Enhanced file processing simulation
        const pages = Math.floor(Math.random() * 15) + 1;
        printSettings.pages = pages;
        
        // Animate file preview appearance
        const preview = document.getElementById('filePreview');
        const fileName = document.getElementById('fileName');
        const pageCount = document.getElementById('pageCount');
        
        // Update content
        fileName.textContent = file.name;
        pageCount.textContent = pages;
        
        // Show with animation
        preview.style.display = 'block';
        preview.style.opacity = '0';
        preview.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            preview.style.transition = 'all 0.5s ease';
            preview.style.opacity = '1';
            preview.style.transform = 'translateY(0)';
        }, 100);
        
        // Update upload area style
        const uploadArea = document.querySelector('.upload-area');
        uploadArea.style.borderColor = 'var(--neon-primary)';
        uploadArea.style.background = 'var(--glass-bg)';
        
        updatePrintPrice();
        document.getElementById('paymentBtn').disabled = false;
        
        playSound('click');
        console.log(`📄 File uploaded: ${file.name} (${pages} pages)`);
    }
}

function removeFile() {
    uploadedFile = null;
    printSettings.pages = 0;
    
    // Animate file preview removal
    const preview = document.getElementById('filePreview');
    preview.style.transition = 'all 0.3s ease';
    preview.style.opacity = '0';
    preview.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        preview.style.display = 'none';
        preview.style.transform = 'translateY(20px)';
    }, 300);
    
    // Reset upload area
    const uploadArea = document.querySelector('.upload-area');
    uploadArea.style.borderColor = 'var(--glass-border)';
    uploadArea.style.background = 'transparent';
    
    document.getElementById('fileInput').value = '';
    document.getElementById('pageCount').textContent = '0';
    updatePrintPrice();
    document.getElementById('paymentBtn').disabled = true;
    
    playSound('click');
}

function togglePrintType() {
    printSettings.color = !printSettings.color;
    const btn = document.getElementById('printTypeBtn');
    const priceDisplay = document.getElementById('priceDisplay');
    
    // Animate button change
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        if (printSettings.color) {
            btn.innerHTML = '<i class="fas fa-palette"></i> Color Print';
            btn.classList.add('active');
            priceDisplay.textContent = '₹2/page';
        } else {
            btn.innerHTML = '<i class="fas fa-print"></i> Black & White Print';
            btn.classList.remove('active');
            priceDisplay.textContent = '₹1/page';
        }
        
        btn.style.transform = 'scale(1)';
        updatePrintPrice();
    }, 150);
    
    playSound('click');
}

function toggleDoubleSided() {
    printSettings.doubleSided = !printSettings.doubleSided;
    const btn = document.getElementById('doubleSidedBtn');
    
    // Animate button change
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        if (printSettings.doubleSided) {
            btn.innerHTML = '<i class="fas fa-copy"></i> Double Sided';
            btn.classList.add('active');
        } else {
            btn.innerHTML = '<i class="fas fa-file"></i> Single Sided';
            btn.classList.remove('active');
        }
        
        btn.style.transform = 'scale(1)';
        updatePrintPrice();
    }, 150);
    
    playSound('click');
}

function changeCopies(delta) {
    const newCopies = Math.max(1, printSettings.copies + delta);
    if (newCopies !== printSettings.copies) {
        printSettings.copies = newCopies;
        
        // Animate count change
        const countElement = document.getElementById('copiesCount');
        countElement.style.transform = 'scale(1.2)';
        countElement.textContent = printSettings.copies;
        
        setTimeout(() => {
            countElement.style.transform = 'scale(1)';
        }, 200);
        
        updatePrintPrice();
        playSound('click');
    }
}

function updatePrintPrice() {
    const pricePerPage = printSettings.color ? 2 : 1;
    const totalPages = printSettings.pages * printSettings.copies;
    const adjustedPages = printSettings.doubleSided ? Math.ceil(totalPages / 2) : totalPages;
    const total = adjustedPages * pricePerPage;
    
    // Animate price change
    const priceElement = document.getElementById('totalPrice');
    priceElement.style.transform = 'scale(1.1)';
    priceElement.textContent = total.toFixed(2);
    
    setTimeout(() => {
        priceElement.style.transform = 'scale(1)';
    }, 200);
}

function processPayment() {
    if (!uploadedFile) {
        showNotification('Please upload a file first!', 'error');
        return;
    }
    
    const total = document.getElementById('totalPrice').textContent;
    const paymentBtn = document.getElementById('paymentBtn');
    
    // Animate payment processing
    paymentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    paymentBtn.disabled = true;
    
    setTimeout(() => {
        showNotification(
            `Payment of ₹${total} processed successfully! 🎉\nYour document is being printed. Please collect it from the machine in 30 seconds.`,
            'success'
        );
        
        // Reset form with animation
        resetPrintForm();
        
    }, 2000);
    
    playSound('click');
}

function resetPrintForm() {
    // Reset all settings
    removeFile();
    printSettings = { color: false, doubleSided: false, copies: 1, pages: 0 };
    
    // Reset UI elements
    const elements = [
        { id: 'printTypeBtn', html: '<i class="fas fa-print"></i> Black & White Print', active: false },
        { id: 'doubleSidedBtn', html: '<i class="fas fa-file"></i> Single Sided', active: false },
        { id: 'copiesCount', html: '1' },
        { id: 'priceDisplay', html: '₹1/page' },
        { id: 'paymentBtn', html: '<i class="fas fa-credit-card"></i> Pay & Print Now' }
    ];
    
    elements.forEach(({ id, html, active }) => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = html;
            if (active !== undefined) {
                element.classList.toggle('active', active);
            }
            if (id === 'paymentBtn') {
                element.disabled = true;
            }
        }
    });
}

// Enhanced stationery shop functions
function loadProducts() {
    console.log('🛍️ Loading products with enhanced animations...');
    const grid = document.getElementById('productsGrid');
    if (!grid) {
        console.error('productsGrid element not found!');
        return;
    }
    
    grid.innerHTML = '';
    
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card glass-effect hover-3d';
        productCard.innerHTML = `
            <div class="product-emoji">${product.emoji}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price neon-text">₹${product.price}</div>
            <button class="add-to-cart neon-button" onclick="addToCart(${product.id})">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        `;
        
        // Add stagger animation
        productCard.style.opacity = '0';
        productCard.style.transform = 'translateY(50px)';
        
        grid.appendChild(productCard);
        
        // Animate in with delay
        setTimeout(() => {
            productCard.style.transition = 'all 0.6s ease';
            productCard.style.opacity = '1';
            productCard.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    console.log(`✨ Loaded ${products.length} products with animations`);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`Added another ${product.name} to cart! 🛒`, 'success');
    } else {
        cart.push({ ...product, quantity: 1 });
        showNotification(`${product.name} added to cart! ✨`, 'success');
    }
    
    updateCartDisplay();
    playSound('click');
    
    // Add visual feedback to the button
    const productCard = event.target.closest('.product-card');
    if (productCard) {
        productCard.style.transform = 'scale(1.05)';
        setTimeout(() => {
            productCard.style.transform = '';
        }, 200);
    }
}

function removeFromCart(productId) {
    const product = products.find(p => p.id === productId);
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    showNotification(`${product.name} removed from cart`, 'info');
    playSound('click');
}

function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(0, item.quantity + delta);
        if (item.quantity === 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
            playSound('click');
        }
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty 🛒</p>';
        cartTotal.textContent = '0';
        checkoutBtn.disabled = true;
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item glass-effect';
        cartItem.innerHTML = `
            <div>
                <span class="neon-text">${item.emoji} ${item.name}</span>
                <div style="font-size: 0.875rem; color: var(--text-secondary);">₹${item.price} × ${item.quantity} = ₹${itemTotal}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <button onclick="updateQuantity(${item.id}, -1)" class="neon-button" style="width: 2rem; height: 2rem; padding: 0;">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="neon-text" style="min-width: 2rem; text-align: center; font-weight: bold;">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)" class="neon-button" style="width: 2rem; height: 2rem; padding: 0;">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `;
        
        // Add stagger animation for cart items
        cartItem.style.opacity = '0';
        cartItem.style.transform = 'translateX(-20px)';
        cartItems.appendChild(cartItem);
        
        setTimeout(() => {
            cartItem.style.transition = 'all 0.3s ease';
            cartItem.style.opacity = '1';
            cartItem.style.transform = 'translateX(0)';
        }, index * 100);
    });
    
    // Animate total update
    cartTotal.style.transform = 'scale(1.1)';
    cartTotal.textContent = total;
    setTimeout(() => {
        cartTotal.style.transform = 'scale(1)';
    }, 200);
    
    checkoutBtn.disabled = false;
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty! 🛒', 'error');
        return;
    }
    
    const total = document.getElementById('cartTotal').textContent;
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Animate checkout process
    checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    checkoutBtn.disabled = true;
    
    setTimeout(() => {
        showNotification(
            `Order placed successfully! 🎉\nTotal: ₹${total}\nYour items will be dispensed shortly. Please collect them from the machine.`,
            'success'
        );
        
        // Clear cart with animation
        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
            }, index * 100);
        });
        
        setTimeout(() => {
            cart = [];
            updateCartDisplay();
        }, cartItems.length * 100 + 300);
        
    }, 2000);
    
    playSound('click');
}

// Enhanced AI Assistant functions
function askQuestion(question) {
    const input = document.getElementById('chatInput'); 
    input.value = question;
    sendMessage();
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message with animation
    addMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate and show AI response
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateAIResponse(message);
        addMessage(response, 'bot', true);
    }, 1000 + Math.random() * 1000);
    
    playSound('click');
}

function addMessage(content, sender, useTyping = false) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    if (sender === 'bot') {
        messageDiv.innerHTML = `
            <div class="message-avatar breathing-glow">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content glass-effect">
                <div class="typing-indicator" id="botMessage${Date.now()}"></div>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        if (useTyping) {
            const messageId = messageDiv.querySelector('.typing-indicator').id;
            typeAIMessage(content, messageId);
        } else {
            messageDiv.querySelector('.typing-indicator').innerHTML = content;
        }
    } else {
        messageDiv.innerHTML = `
            <div class="message-content glass-effect">${content}</div>
            <div class="message-avatar breathing-glow">
                <i class="fas fa-user"></i>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
    }
    
    // Animate message appearance
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.5s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator-message';
    typingDiv.innerHTML = `
        <div class="message-avatar breathing-glow">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content glass-effect">
            <div class="typing-indicator">AI is thinking...</div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingMessage = document.querySelector('.typing-indicator-message');
    if (typingMessage) {
        typingMessage.remove();
    }
}

function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Enhanced AI response logic with more intelligent matching
    if (message.includes('item') || message.includes('stationery') || message.includes('available') || message.includes('product')) {
        return aiResponses.items;
    }
    
    if (message.includes('print') || message.includes('cost') || message.includes('price') || message.includes('how much')) {
        return aiResponses.printing;
    }
    
    if (message.includes('location') || message.includes('where') || message.includes('machine') || message.includes('find')) {
        return aiResponses.location;
    }
    
    if (message.includes('payment') || message.includes('pay') || message.includes('upi') || message.includes('wallet')) {
        return aiResponses.payment;
    }
    
    if (message.includes('time') || message.includes('fast') || message.includes('quick') || message.includes('speed')) {
        return aiResponses.speed;
    }
    
    if (message.includes('help') || message.includes('support') || message.includes('problem') || message.includes('assist')) {
        return aiResponses.help;
    }
    
    return aiResponses.default;
}

function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message.replace(/\n/g, '<br>')}</span>
        <button onclick="this.parentElement.remove()" class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        zIndex: '10000',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--border-radius)',
        color: 'white',
        fontWeight: '600',
        fontSize: '0.95rem',
        maxWidth: '400px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.5s ease',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    });
    
    // Set background based on type
    const backgrounds = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)'
    };
    
    notification.style.background = backgrounds[type] || backgrounds.info;
    
    // Style close button
    const closeBtn = notification.querySelector('.notification-close');
    Object.assign(closeBtn.style, {
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        fontSize: '1rem',
        marginLeft: 'auto',
        padding: '0.25rem',
        opacity: '0.8',
        transition: 'opacity 0.3s ease'
    });
    
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.8');
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 500);
    }, 5000);
    
    playSound('click');
}

// Utility functions
function formatCurrency(amount) {
    return `₹${amount.toFixed(2)}`;
}

// Performance monitoring
function logPerformance(action) {
    console.log(`⚡ Performance: ${action} completed in ${performance.now()}ms`);
}

// Cleanup function
function cleanup() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    if (typingInterval) {
        clearInterval(typingInterval);
    }
}

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when tab is not visible
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    } else {
        // Resume animations when tab becomes visible
        animateParticles();
    }
});

// Handle page unload
window.addEventListener('beforeunload', cleanup);

// Add some fun easter eggs
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length) {
        if (konamiCode.every((key, i) => key === konamiSequence[i])) {
            activateEasterEgg();
            konamiCode = [];
        }
    }
});

function activateEasterEgg() {
    // Create rainbow particles
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle());
    }
    
    showNotification('🎉 Konami Code activated! Rainbow particles unlocked!', 'success');
    
    // Add rainbow effect to title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.animation = 'rainbow 2s linear infinite';
    }
}

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log('🚀 CampusKart Enhanced Script Loaded Successfully!');
console.log('💫 Features: Particle System, Theme Switcher, Sound Effects, Enhanced Animations');
console.log('🎮 Try the Konami Code for a surprise! ↑↑↓↓←→←→BA');
