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

// ========== PRODUCT DETAIL MODAL ==========
const productModal = document.getElementById('productModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalName = document.getElementById('modalName');
const modalCategory = document.getElementById('modalCategory');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalBadge = document.getElementById('modalBadge');
const modalImgBibit = document.getElementById('modalImgBibit');
const modalImgHasil = document.getElementById('modalImgHasil');
const modalWaBtn = document.getElementById('modalWaBtn');

function openProductModal(card) {
    if (!productModal) return;

    modalName.textContent = card.dataset.name || '';
    modalCategory.textContent = card.dataset.category || '';
    modalDesc.textContent = card.dataset.desc || '';
    modalPrice.textContent = card.dataset.price || '';
    modalBadge.textContent = card.dataset.badge || '';
    modalImgBibit.src = card.dataset.imgBibit || '';
    modalImgHasil.src = card.dataset.imgHasil || '';
    modalWaBtn.href = card.dataset.wa || '#';

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
