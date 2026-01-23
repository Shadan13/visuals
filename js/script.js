let prevScrollPos = window.pageYOffset;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;
    const navbarHeight = navbar.offsetHeight;

    if (prevScrollPos < currentScrollPos) {
        navbar.style.top = `-${navbarHeight+5}px`; // hide
    } else {
        navbar.style.top = '0'; // show
    }

    prevScrollPos = currentScrollPos;
});

const introContent = document.querySelector('.intro-content');
const scrollDownArrow = document.querySelector('.scroll-down');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const fadeRate = (window.innerHeight / 4.25);
    const opacity = 1 - (scrollPosition / fadeRate);

    if (introContent) {
        introContent.style.opacity = Math.max(0, opacity);
    }
    
    if (scrollDownArrow) {
        scrollDownArrow.style.opacity = scrollPosition > 50 ? '0' : '1';
    }
});

const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the item is visible
    rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits bottom
};

const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once visible
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.exhibit').forEach(exhibit => {
    fadeObserver.observe(exhibit);
});

const resizeObserver = new ResizeObserver(entries => { 
    entries.forEach(entry => {
        const img = entry.target;
        const width = entry.contentRect.width; 
        const exhibit = img.closest('.exhibit');
        const plaque = exhibit.querySelector('.plaque');
        if (plaque) {
            plaque.style.maxWidth = `${width}px`;
        }
    });
});

document.querySelectorAll('.frame img').forEach(img => {
    resizeObserver.observe(img);
});