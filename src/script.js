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

function openProductModal(card) {
    if (!productModal) return;

    modalName.textContent = card.dataset.name || '';
    modalCategory.textContent = card.dataset.category || '';
    modalDesc.textContent = card.dataset.desc || '';
    modalPrice.textContent = card.dataset.price || '';
    modalBadge.textContent = card.dataset.badge || '';
    modalWaBtn.href = card.dataset.wa || '#';

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
