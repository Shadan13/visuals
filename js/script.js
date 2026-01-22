let prevScrollPos = window.pageYOffset;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos < currentScrollPos) {
        navbar.style.transition = 'top 0.8s ease-in-out';
        navbar.style.top = '-100px'; // hide
    } else {
        navbar.style.transition = 'top 0.8s ease-in-out';
        navbar.style.top = '0'; // show
    }

    prevScrollPos = currentScrollPos;

    navbar.addEventListener('transitionend', () => {
        navbar.style.transition = 'ease 0.3s'; // change transition duration after transformation is complete
    });
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