const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
});


// fitur sliders 
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
    resetAutoSlide();
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
    resetAutoSlide();
}

// Automatic slideshow
let autoSlideInterval = setInterval(nextSlide, 3000);

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 3000);
}
// fitur gallery
// Gallery image click handler
const galleryItems = document.querySelectorAll('.gallery-item');
const fullscreenViewer = document.getElementById('fullscreenViewer');
const fullscreenImage = document.getElementById('fullscreenImage');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        fullscreenImage.src = item.src; // Set clicked image as fullscreen image
        fullscreenViewer.classList.remove('hidden'); // Show fullscreen viewer
    });
});

// Close fullscreen when clicking outside the image
fullscreenViewer.addEventListener('click', () => {
    fullscreenViewer.classList.add('hidden'); // Hide fullscreen viewer
});

// Scroll to Top logic
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove('hidden');
        } else {
            scrollToTopBtn.classList.add('hidden');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}