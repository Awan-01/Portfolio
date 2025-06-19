// Loading Screen
window.addEventListener('load', () => {
    // Simulate loading time for demonstration
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.classList.add('hidden');
        
        // Start animations after loading
        initAnimations();
    }, 2000);
});

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    
    document.querySelector('.scroll-progress').style.width = scrollProgress + '%';
});

// Mobile navigation toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle nav
    navLinks.classList.toggle('active');
    
    // Burger animation
    burger.classList.toggle('active');
    
    // Animate links
    navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        navLinksItems.forEach(link => {
            link.style.animation = '';
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
const successOverlay = document.getElementById('successOverlay');

function showSuccessOverlay() {
    successOverlay.classList.add('show');
    let countdown = 5;
    const countdownElement = document.getElementById('countdown');
    
    const timer = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(timer);
            window.location.href = '#';
            setTimeout(() => {
                successOverlay.classList.remove('show');
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 500);
        }
    }, 1000);
}

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form inputs
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitButton = document.querySelector('.submit-button');
        
        // Reset previous error states
        const inputs = [nameInput, emailInput, subjectInput, messageInput];
        inputs.forEach(input => input.classList.remove('error'));
        
        // Validate inputs
        let isValid = true;
        
        // Validate name (minimum 2 characters)
        if (nameInput.value.trim().length < 2) {
            nameInput.classList.add('error');
            isValid = false;
            showMessage('error', 'Name must be at least 2 characters');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add('error');
            isValid = false;
            showMessage('error', 'Please enter a valid email address');
            return;
        }
        
        // Validate subject (minimum 3 characters)
        if (subjectInput.value.trim().length < 3) {
            subjectInput.classList.add('error');
            isValid = false;
            showMessage('error', 'Subject must be at least 3 characters');
            return;
        }
        
        // Validate message (minimum 10 characters)
        if (messageInput.value.trim().length < 10) {
            messageInput.classList.add('error');
            isValid = false;
            showMessage('error', 'Message must be at least 10 characters');
            return;
        }
        
        if (isValid) {
            try {
                // Disable submit button and show loading state
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Prepare template parameters
                const templateParams = {
                    from_name: nameInput.value.trim(),
                    from_email: emailInput.value.trim(),
                    subject: subjectInput.value.trim(),
                    message: messageInput.value.trim()
                };
                
                // Send email using EmailJS
                await emailjs.send(
                    'service_xxcx297',   // Your service ID
                    'template_4kz08mn',  // Your template ID
                    templateParams
                );
                
                // Reset form
                contactForm.reset();
                
                // Show success overlay and handle redirect
                showSuccessOverlay();
                
            } catch (error) {
                console.error('Error:', error);
                showMessage('error', 'Failed to send message. Please email directly to awanmansuri007@gmail.com');
            } finally {
                // Re-enable submit button and restore original text
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
            }
        }
    });
}

// Micro Interactions
function addRippleEffect() {
    const buttons = document.querySelectorAll('.cta-button, .project-link, .certificate-link, .submit-button, .social-link, .back-to-top');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Back to top button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

// Dynamic background color based on scroll position
function updateDynamicBackground() {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPosition / maxScroll;
    
    // Create a dynamic hue value based on scroll position
    const hue = Math.floor(240 + (scrollPercentage * 120)); // From blue to purple
    const saturation = 70 + (scrollPercentage * 10); // Slightly increase saturation
    const lightness = 15 - (scrollPercentage * 5); // Slightly decrease lightness
    
    // Apply the color to the background
    document.body.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

window.addEventListener('scroll', updateDynamicBackground);

// Initialize all animations and interactions
function initAnimations() {
    addRippleEffect();
    updateDynamicBackground();
}

// Console greeting
console.log(`%cAwan Mansuri's Portfolio`, 
    'color: #6e45e2; font-size: 18px; font-weight: bold;');
console.log(`%cBuilt with HTML, CSS, JavaScript, GSAP, and Three.js`, 
    'color: #88d3ce; font-size: 14px;');
console.log(`%cGitHub: https://github.com/Awan-01 | LinkedIn: https://www.linkedin.com/in/awan-mansuri-88224b299`, 
    'color: #f8f9fa; font-size: 12px;');
