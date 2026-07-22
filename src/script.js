// ========== NAVBAR TOGGLE ==========
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
    });

    // Close menu when clicking a link (mobile)
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
        });
    });
}

// ========== NAVBAR SCROLL EFFECT ==========
const nav = document.querySelector('nav');
if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-2xl');
            nav.style.paddingTop = '0.75rem';
            nav.style.paddingBottom = '0.75rem';
        } else {
            nav.classList.remove('shadow-2xl');
            nav.style.paddingTop = '';
            nav.style.paddingBottom = '';
        }
    });
}

// ========== SCROLL TO TOP ==========
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollToTopBtn.classList.remove('hidden');
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (window.scrollY <= 400) scrollToTopBtn.classList.add('hidden');
            }, 300);
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== SCROLL REVEAL ANIMATION ==========
const revealElements = document.querySelectorAll('.product-card, .feature-bar, .newsletter-bar, section > div > h2, .badge');

const revealOnScroll = () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight - 80) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Init: set starting state for reveal
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ========== IMAGE VIEWER (Katalog page) ==========
const imageViewer = document.getElementById('imageViewer');
const viewerImg = document.getElementById('viewerImg');
const closeViewer = document.getElementById('closeViewer');

if (imageViewer && viewerImg) {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            viewerImg.src = item.src;
            imageViewer.classList.remove('hidden');
            imageViewer.classList.add('flex');
        });
    });

    if (closeViewer) {
        closeViewer.addEventListener('click', () => {
            imageViewer.classList.add('hidden');
            imageViewer.classList.remove('flex');
        });
    }

    imageViewer.addEventListener('click', (e) => {
        if (e.target === imageViewer) {
            imageViewer.classList.add('hidden');
            imageViewer.classList.remove('flex');
        }
    });
}

// ========== PRODUCT DETAIL MODAL & SLIDER ==========
const productModal = document.getElementById('productModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalName = document.getElementById('modalName');
const modalCategory = document.getElementById('modalCategory');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalBadge = document.getElementById('modalBadge');
const modalWaBtn = document.getElementById('modalWaBtn');

// Slider controls
const modalSliderWrapper = document.getElementById('modalSliderWrapper');
const modalSliderLabel = document.getElementById('modalSliderLabel');
const modalSliderPrev = document.getElementById('modalSliderPrev');
const modalSliderNext = document.getElementById('modalSliderNext');
const modalSliderDots = document.getElementById('modalSliderDots');

let modalImages = [];
let activeModalImgIndex = 0;

function updateModalSlider() {
    if (!modalSliderWrapper || !modalImages.length) return;
    
    // Slide images horizontally
    modalSliderWrapper.style.transform = `translateX(-${activeModalImgIndex * 100}%)`;
    
    // Update label text
    const currentImg = modalImages[activeModalImgIndex];
    modalSliderLabel.textContent = currentImg.label || `Dokumentasi #${activeModalImgIndex + 1}`;
    
    // Update dots style
    const dotsList = modalSliderDots.querySelectorAll('span');
    dotsList.forEach((dot, idx) => {
        if (idx === activeModalImgIndex) {
            dot.className = "w-2.5 h-2.5 rounded-full bg-neon transition-all duration-300";
        } else {
            dot.className = "w-2 h-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80 transition-all duration-300 cursor-pointer";
        }
    });
}

function initModalSlider(imagesArray) {
    modalImages = imagesArray.filter(img => img.url); // filter out empty URLs
    activeModalImgIndex = 0;
    
    if (!modalSliderWrapper) return;
    
    // Clear previous images and dots
    modalSliderWrapper.innerHTML = '';
    modalSliderDots.innerHTML = '';
    
    if (modalImages.length === 0) {
        modalSliderLabel.classList.add('hidden');
        modalSliderPrev.classList.add('hidden');
        modalSliderNext.classList.add('hidden');
        return;
    }
    
    modalSliderLabel.classList.remove('hidden');
    
    // Create image elements
    modalImages.forEach((img) => {
        const slide = document.createElement('div');
        slide.className = "w-full h-full flex-shrink-0";
        
        const image = document.createElement('img');
        image.src = img.url;
        image.alt = img.label || 'Dokumentasi Tanaman';
        image.className = "w-full h-full object-cover";
        
        slide.appendChild(image);
        modalSliderWrapper.appendChild(slide);
    });
    
    // Create dot indicators & toggle navigation button visibilities
    if (modalImages.length > 1) {
        modalSliderPrev.classList.remove('hidden');
        modalSliderNext.classList.remove('hidden');
        
        modalImages.forEach((_, idx) => {
            const dot = document.createElement('span');
            dot.addEventListener('click', () => {
                activeModalImgIndex = idx;
                updateModalSlider();
            });
            modalSliderDots.appendChild(dot);
        });
    } else {
        modalSliderPrev.classList.add('hidden');
        modalSliderNext.classList.add('hidden');
    }
    
    updateModalSlider();
}

if (modalSliderPrev) {
    modalSliderPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        activeModalImgIndex = (activeModalImgIndex - 1 + modalImages.length) % modalImages.length;
        updateModalSlider();
    });
}

if (modalSliderNext) {
    modalSliderNext.addEventListener('click', (e) => {
        e.stopPropagation();
        activeModalImgIndex = (activeModalImgIndex + 1) % modalImages.length;
        updateModalSlider();
    });
}

let activeProduct = null;

function openProductModal(card) {
    if (!productModal) return;

    modalName.textContent = card.dataset.name || '';
    modalCategory.textContent = card.dataset.category || '';
    modalDesc.textContent = card.dataset.desc || '';
    modalPrice.textContent = card.dataset.price || '';
    modalBadge.textContent = card.dataset.badge || '';
    
    // Formulate a friendly, informal single-item query asking about stock
    const singleMessage = `Permisi Pak, mau tanya untuk tanaman/buah/bibit *${card.dataset.name || ''}*, stoknya masih ada gak ya?`;
    modalWaBtn.href = `https://wa.me/6281234567890?text=${encodeURIComponent(singleMessage)}`;

    // Set active product data for Add to Cart action
    activeProduct = {
        name: card.dataset.name || '',
        price: card.dataset.price || '',
        image: card.dataset.images ? card.dataset.images.split(',')[0].trim() : card.querySelector('img')?.src || '',
        category: card.dataset.category || ''
    };

    // Parse image list
    const images = [];
    
    // If the card has custom data-images comma separated
    if (card.dataset.images) {
        const customImgs = card.dataset.images.split(',');
        customImgs.forEach((url, idx) => {
            images.push({ url: url.trim(), label: `Foto Dokumentasi #${idx + 1}` });
        });
    } else {
        // Fallback to default bibit and hasil
        if (card.dataset.imgBibit) {
            images.push({ url: card.dataset.imgBibit, label: '🌱 Kondisi Bibit Tanaman' });
        }
        if (card.dataset.imgHasil) {
            images.push({ url: card.dataset.imgHasil, label: '🌿 Contoh Hasil / Buah Dewasa' });
        }
    }
    
    initModalSlider(images);

    productModal.classList.remove('hidden');
    productModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    if (!productModal) return;
    productModal.classList.add('hidden');
    productModal.classList.remove('flex');
    document.body.style.overflow = '';
}

// Attach click to all product cards with data attributes
document.querySelectorAll('.product-card[data-name]').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't open modal if clicking an actual link inside the card
        if (e.target.closest('a[href]')) return;
        openProductModal(card);
    });
});

// Close handlers
if (modalClose) modalClose.addEventListener('click', closeProductModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeProductModal);

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProductModal();
});

// ========== CLIENT-SIDE SEARCH FILTER ==========
const navSearchInput = document.getElementById('nav-search-input');
const mobileSearchInput = document.getElementById('mobile-search-input');
const mainSearchInput = document.getElementById('main-search-input');

function filterProducts(query) {
    const cards = document.querySelectorAll('.product-card');
    const lowerQuery = query.toLowerCase().trim();
    cards.forEach(card => {
        const name = (card.dataset.name || card.querySelector('h3')?.textContent || '').toLowerCase();
        const category = (card.dataset.category || '').toLowerCase();
        if (name.includes(lowerQuery) || category.includes(lowerQuery)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

if (navSearchInput) {
    navSearchInput.addEventListener('input', (e) => {
        filterProducts(e.target.value);
        if (mobileSearchInput) mobileSearchInput.value = e.target.value;
        if (mainSearchInput) mainSearchInput.value = e.target.value;
    });
}

if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', (e) => {
        filterProducts(e.target.value);
        if (navSearchInput) navSearchInput.value = e.target.value;
        if (mainSearchInput) mainSearchInput.value = e.target.value;
    });
}

if (mainSearchInput) {
    mainSearchInput.addEventListener('input', (e) => {
        filterProducts(e.target.value);
        if (navSearchInput) navSearchInput.value = e.target.value;
        if (mobileSearchInput) mobileSearchInput.value = e.target.value;
        // Reset category buttons highlighting to All if they type something custom
        setActiveCategoryButton(btnCatAll);
    });
}

// ========== CATEGORY BUTTONS FILTER ==========
const btnCatAll = document.getElementById('btn-cat-all');
const btnCatBuah = document.getElementById('btn-cat-buah');
const btnCatBibit = document.getElementById('btn-cat-bibit');

const catButtons = [btnCatAll, btnCatBuah, btnCatBibit];

function setActiveCategoryButton(activeBtn) {
    if (!activeBtn) return;
    catButtons.forEach(btn => {
        if (btn) {
            if (btn === activeBtn) {
                btn.className = "px-6 py-2.5 rounded-full text-xs font-bold bg-neon text-dark transition-all duration-300 shadow-md";
            } else {
                btn.className = "px-6 py-2.5 rounded-full text-xs font-bold bg-dark-card text-gray-300 hover:bg-neon hover:text-dark transition-all duration-300 border border-gray-800 hover:border-neon";
            }
        }
    });
}

if (btnCatAll) {
    btnCatAll.addEventListener('click', () => {
        filterProducts('');
        setActiveCategoryButton(btnCatAll);
        if (mainSearchInput) mainSearchInput.value = '';
        if (navSearchInput) navSearchInput.value = '';
        if (mobileSearchInput) mobileSearchInput.value = '';
    });
}

if (btnCatBuah) {
    btnCatBuah.addEventListener('click', () => {
        filterProducts('buah');
        setActiveCategoryButton(btnCatBuah);
        if (mainSearchInput) mainSearchInput.value = '';
        if (navSearchInput) navSearchInput.value = '';
        if (mobileSearchInput) mobileSearchInput.value = '';
    });
}

if (btnCatBibit) {
    btnCatBibit.addEventListener('click', () => {
        filterProducts('bibit');
        setActiveCategoryButton(btnCatBibit);
        if (mainSearchInput) mainSearchInput.value = '';
        if (navSearchInput) navSearchInput.value = '';
        if (mobileSearchInput) mobileSearchInput.value = '';
    });
}

// ========== URL PARAMETER FILTER ==========
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        filterProducts(categoryParam);
        if (navSearchInput) navSearchInput.value = categoryParam;
        if (mobileSearchInput) mobileSearchInput.value = categoryParam;
        if (mainSearchInput) mainSearchInput.value = categoryParam;
        
        // Highlight active button
        if (categoryParam.toLowerCase() === 'buah') {
            setActiveCategoryButton(btnCatBuah);
        } else if (categoryParam.toLowerCase() === 'bibit') {
            setActiveCategoryButton(btnCatBibit);
        }
    }
});

// ========== TESTIMONIAL SLIDER ==========
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.testi-dot');
const prevBtn = document.getElementById('prev-testi');
const nextBtn = document.getElementById('next-testi');

let currentSlide = 0;

function showSlide(index) {
    if (!slides.length) return;
    
    // Normalize index
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((slide, i) => {
        if (i === currentSlide) {
            slide.classList.remove('hidden');
            // Small timeout to allow transition to occur after removing hidden class
            setTimeout(() => {
                slide.classList.remove('opacity-0', 'translate-x-10');
                slide.classList.add('opacity-100', 'translate-x-0');
            }, 20);
        } else {
            slide.classList.add('hidden', 'opacity-0', 'translate-x-10');
            slide.classList.remove('opacity-100', 'translate-x-0');
        }
    });

    dots.forEach((dot, i) => {
        if (i === currentSlide) {
            dot.classList.remove('bg-gray-300');
            dot.classList.add('bg-neon');
        } else {
            dot.classList.remove('bg-neon');
            dot.classList.add('bg-gray-300');
        }
    });
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
        });
    });

    // Auto play every 6 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 6000);
}

// ========== PRODUCT FILTER SYSTEM (Best Sellers) ==========
const filterPills = document.querySelectorAll('.filter-pill');
const productCards = document.querySelectorAll('#Produk .product-card');

if (filterPills.length && productCards.length) {
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active class from all pills
            filterPills.forEach(p => p.classList.remove('active'));
            // Add active class to clicked pill
            pill.classList.add('active');
            
            const filterValue = pill.dataset.filter;
            
            productCards.forEach(card => {
                const category = card.dataset.category.toLowerCase();
                
                let show = false;
                if (filterValue === 'all') {
                    show = true;
                } else if (filterValue === 'buah' && category.includes('buah')) {
                    show = true;
                } else if (filterValue === 'hias' && category.includes('hias')) {
                    show = true;
                } else if (filterValue === 'bibit' && category.includes('bibit')) {
                    show = true;
                }
                
                if (show) {
                    card.style.display = 'block';
                    // trigger layout reflow to allow transition
                    card.getBoundingClientRect();
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1) translateY(0)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95) translateY(12px)';
                    setTimeout(() => {
                        if (card.style.opacity === '0') {
                            card.style.display = 'none';
                        }
                    }, 350);
                }
            });
        });
    });
}

// ============================================================
//  SHOPPING CART SYSTEM (PERSISTENT VIA LOCALSTORAGE)
// ============================================================
let cart = JSON.parse(localStorage.getItem('simak_cart')) || [];

// DOM Elements for Cart
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartContainer = document.getElementById('cartContainer');
const cartCloseBtn = document.getElementById('cartCloseBtn');
const cartItemsList = document.getElementById('cartItemsList');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartCustName = document.getElementById('cartCustName');
const cartCustAddress = document.getElementById('cartCustAddress');
const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');
const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');

// Helper to parse price string to integer
function parsePrice(priceStr) {
    if (!priceStr) return 0;
    let cleaned = priceStr.replace(/Rp|\.|\s/gi, '');
    if (cleaned.toLowerCase().includes('rb')) {
        cleaned = cleaned.replace(/rb/gi, '000');
    }
    return parseInt(cleaned) || 0;
}

// Helper to format number to Rupiah format
function formatPrice(number) {
    return 'Rp ' + number.toLocaleString('id-ID');
}

// Save cart to local storage and update UI elements
function saveCart() {
    localStorage.setItem('simak_cart', JSON.stringify(cart));
    updateCartBadges();
}

// Update badges on mobile and desktop
function updateCartBadges() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(badge => {
        badge.textContent = totalCount;
        if (totalCount > 0) {
            badge.classList.remove('opacity-0');
            badge.classList.add('opacity-100');
        } else {
            badge.classList.remove('opacity-100');
            badge.classList.add('opacity-0');
        }
    });
}

// Render cart drawer items list
function renderCart() {
    if (!cartItemsList) return;
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="flex flex-col items-center justify-center text-center h-64 text-gray-400 gap-3">
                <svg class="w-12 h-12 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <p class="text-sm font-bold text-dark">Keranjang Anda kosong</p>
                <p class="text-xs text-gray-500 max-w-[200px] mx-auto">Yuk tambahkan tanaman segar untuk menghiasi pekarangan Anda!</p>
            </div>
        `;
        if (cartSubtotal) cartSubtotal.textContent = 'Rp 0';
        return;
    }
    
    let listHtml = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemPriceNum = parsePrice(item.price);
        const itemTotal = itemPriceNum * item.quantity;
        subtotal += itemTotal;
        
        listHtml += `
            <div class="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-150 relative group">
                <!-- Image -->
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl border border-gray-200">
                
                <!-- Info -->
                <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-dark text-xs sm:text-sm truncate pr-6">${item.name}</h4>
                    <p class="text-gray-500 text-[10px] sm:text-xs mt-0.5">${item.category}</p>
                    <div class="flex justify-between items-center mt-2.5">
                        <span class="font-extrabold text-dark text-xs sm:text-sm">${item.price}</span>
                        
                        <!-- Quantity Control -->
                        <div class="flex items-center gap-2 bg-white border border-gray-200 px-2 py-0.5 rounded-full">
                            <button onclick="changeQuantity('${item.name}', -1)" class="text-gray-400 hover:text-dark font-bold text-xs px-1.5 focus:outline-none">-</button>
                            <span class="text-[10px] sm:text-xs font-bold text-dark w-4 text-center">${item.quantity}</span>
                            <button onclick="changeQuantity('${item.name}', 1)" class="text-gray-400 hover:text-dark font-bold text-xs px-1.5 focus:outline-none">+</button>
                        </div>
                    </div>
                </div>
                
                <!-- Remove Button -->
                <button onclick="removeFromCart('${item.name}')" class="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition duration-300">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>
        `;
    });
    
    cartItemsList.innerHTML = listHtml;
    if (cartSubtotal) cartSubtotal.textContent = formatPrice(subtotal);
}

// Add item to cart
window.addToCart = function(product) {
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1
        });
    }
    saveCart();
    renderCart();
    closeProductModal();
    openCartDrawer();
}

// Remove item from cart
window.removeFromCart = function(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    renderCart();
}

// Change quantity of item
window.changeQuantity = function(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== name);
        }
        saveCart();
        renderCart();
    }
}

// Cart Drawer open/close functions
function openCartDrawer() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove('hidden');
    cartDrawer.classList.add('flex');
    // Micro timeout to trigger transition
    setTimeout(() => {
        if (cartContainer) cartContainer.classList.remove('translate-x-full');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
    if (!cartDrawer || !cartContainer) return;
    cartContainer.classList.add('translate-x-full');
    setTimeout(() => {
        cartDrawer.classList.add('hidden');
        cartDrawer.classList.remove('flex');
        document.body.style.overflow = '';
    }, 300);
}

// Attach event listeners for open/close drawer
document.querySelectorAll('.cart-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        renderCart();
        openCartDrawer();
    });
});

if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);
if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);

// Modal Add to Cart button click handler
if (modalAddToCartBtn) {
    modalAddToCartBtn.addEventListener('click', () => {
        if (activeProduct) {
            window.addToCart(activeProduct);
        }
    });
}

// Checkout via WhatsApp Handler
if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Keranjang Anda masih kosong. Silakan pilih tanaman terlebih dahulu.');
            return;
        }
        
        const nameInput = cartCustName ? cartCustName.value.trim() : '';
        const addressInput = cartCustAddress ? cartCustAddress.value.trim() : '';
        
        if (!nameInput) {
            alert('Silakan masukkan nama lengkap penerima.');
            if (cartCustName) cartCustName.focus();
            return;
        }
        
        if (!addressInput) {
            alert('Silakan masukkan alamat pengiriman lengkap.');
            if (cartCustAddress) cartCustAddress.focus();
            return;
        }
        
        // Construct WhatsApp message content
        let messageText = 'Permisi Pak, mau tanya untuk tanaman/buah/bibit:\n';
        
        cart.forEach((item, index) => {
            messageText += `${index + 1}. *${item.name}* (${item.quantity} pcs)\n`;
        });
        
        messageText += `\nstoknya masih ada gak ya?\n\n`;
        messageText += `*Rencana Pengiriman:*\n`;
        messageText += `- *Nama:* ${nameInput}\n`;
        messageText += `- *Alamat:* ${addressInput}`;
        
        // WA Link redirection (SIMAK's phone: 6281234567890)
        const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(messageText)}`;
        window.open(waUrl, '_blank');
        
        // Optional: clear cart after redirect
        // cart = [];
        // saveCart();
        // renderCart();
        // closeCartDrawer();
    });
}

// Initialize badges and theme events on page load
window.addEventListener('DOMContentLoaded', () => {
    updateCartBadges();
    
    // ============================================================
    //  THEME TOGGLE SYSTEM (DARK / LIGHT MODE)
    // ============================================================
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    
    // Function to handle Theme Toggle click
    function toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('simak_theme', isDark ? 'dark' : 'light');
    }
    
    // Attach Event Listeners to all toggle buttons (mobile and desktop)
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });
});
