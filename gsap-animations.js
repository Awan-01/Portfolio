// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Hero section animation
function initHeroAnimations() {
    gsap.from('.hero-title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.hero-description', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.6,
        ease: 'power3.out'
    });

    gsap.from('.hero-buttons', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.9,
        ease: 'power3.out'
    });

    gsap.from('.shape-1', {
        duration: 1.5,
        scale: 0,
        opacity: 0,
        delay: 0.6,
        ease: 'elastic.out(1, 0.5)'
    });

    gsap.from('.shape-2', {
        duration: 1.5,
        scale: 0,
        opacity: 0,
        delay: 0.8,
        ease: 'elastic.out(1, 0.5)'
    });

    gsap.from('.shape-3', {
        duration: 1.5,
        scale: 0,
        opacity: 0,
        delay: 1,
        ease: 'elastic.out(1, 0.5)'
    });
}

// Section animations
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });
}

// Skill items animation
function initSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: '.skills-container',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -20,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });
}

// Project cards animation
function initProjectsAnimation() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: '.projects-container',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });
}

// Certificate cards animation
function initCertificatesAnimation() {
    const certificateCards = document.querySelectorAll('.certificate-card');

    certificateCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: '.certificates-container',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });
}

// Contact form animation
function initContactAnimation() {
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-container',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-container',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out'
    });
}

// Navbar animation
function initNavbarAnimation() {
    gsap.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
}

// Initialize all animations
function initAllAnimations() {
    initNavbarAnimation();
    initHeroAnimations();
    initSectionAnimations();
    initSkillsAnimation();
    initProjectsAnimation();
    initCertificatesAnimation();
    initContactAnimation();
}

// Wait for page load to start animations
window.addEventListener('load', () => {
    // Animations will be triggered after loading screen is hidden
    // See main.js for the loading screen logic
});

// Initialize animations when called from main.js after loading screen
function initAnimations() {
    initAllAnimations();
}
