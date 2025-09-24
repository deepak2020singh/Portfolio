// Theme Toggle Functionality
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

// Check for saved theme preference or respect OS preference
if (localStorage.getItem('theme') === 'dark' || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))) {
    themeSwitch.checked = true;
    body.classList.add('dark-mode');
}

themeSwitch.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    this.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero section animation
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

gsap.from('.hero-image', {
    duration: 1,
    scale: 0.8,
    opacity: 0,
    delay: 1.2,
    ease: 'power3.out'
});

// Floating elements animation
gsap.to('.floating-element-1', {
    y: -20,
    rotation: 10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
});

gsap.to('.floating-element-2', {
    y: -15,
    rotation: -5,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    delay: 0.5
});

gsap.to('.floating-element-3', {
    y: -25,
    rotation: 15,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    delay: 1
});

// Section animations
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Skill bars animation
gsap.utils.toArray('.skill-progress').forEach(bar => {
    gsap.to(bar, {
        scrollTrigger: {
            trigger: bar,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        width: bar.getAttribute('data-width') + '%',
        duration: 1.5,
        ease: 'power3.out'
    });
});

// Project cards animation
gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.2,
        ease: 'power3.out'
    });
});

// Service cards animation
gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.2,
        ease: 'power3.out'
    });
});

// Blog cards animation
gsap.utils.toArray('.blog-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.2,
        ease: 'power3.out'
    });
});

// Timeline animation
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        x: i % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1,
        delay: i * 0.2,
        ease: 'power3.out'
    });
});

// Text animation for section titles
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('back-to-top');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--card-bg)';
        navbar.style.boxShadow = '0 5px 15px var(--shadow)';
        backToTop.classList.add('show');
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
        backToTop.classList.remove('show');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top functionality
document.getElementById('back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Testimonials slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const testimonialCount = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
    currentTestimonial = index;
}

document.querySelector('.testimonial-next').addEventListener('click', function() {
    let nextIndex = currentTestimonial + 1;
    if (nextIndex >= testimonialCount) nextIndex = 0;
    showTestimonial(nextIndex);
});

document.querySelector('.testimonial-prev').addEventListener('click', function() {
    let prevIndex = currentTestimonial - 1;
    if (prevIndex < 0) prevIndex = testimonialCount - 1;
    showTestimonial(prevIndex);
});

// Auto-rotate testimonials
setInterval(() => {
    let nextIndex = currentTestimonial + 1;
    if (nextIndex >= testimonialCount) nextIndex = 0;
    showTestimonial(nextIndex);
}, 5000);

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Here you would typically send the data to a server
        // For this example, we'll just show an alert
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
        
        // Reset the form
        this.reset();
    });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Simple validation
        if (email && email.includes('@')) {
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Resume download functionality
const resumeDownload = document.getElementById('resume-download');
if (resumeDownload) {
    resumeDownload.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create a simple PDF using jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add content to the PDF
        doc.setFontSize(22);
        doc.text('Deepak Singh - Android Developer', 20, 30);
        
        doc.setFontSize(16);
        doc.text('Professional Summary', 20, 50);
        doc.setFontSize(12);
        doc.text('Experienced Android developer with 4+ years of expertise in building modern,', 20, 60);
        doc.text('user-friendly mobile applications using Jetpack Compose, Kotlin, and Firebase.', 20, 67);
        
        doc.setFontSize(16);
        doc.text('Technical Skills', 20, 85);
        doc.setFontSize(12);
        doc.text('- Jetpack Compose, Kotlin, Java', 20, 95);
        doc.text('- MVVM Architecture, Room Database', 20, 102);
        doc.text('- Firebase, Ktor Client, Koin', 20, 109);
        doc.text('- Git, Android Studio, Figma', 20, 116);
        
        doc.setFontSize(16);
        doc.text('Experience', 20, 134);
        doc.setFontSize(12);
        doc.text('Senior Android Developer - Tech Solutions Inc. (2022-Present)', 20, 144);
        doc.text('Android Developer - Mobile First Co. (2020-2022)', 20, 151);
        doc.text('Junior Android Developer - StartUp Ventures (2019-2020)', 20, 158);
        
        // Save the PDF
        doc.save('Deepak_Singh_Resume.pdf');
    });
}

// Bubble animation enhancement
function enhanceBubbles() {
    const bubbles = document.querySelectorAll('.bubble');
    
    bubbles.forEach(bubble => {
        // Randomize initial positions
        const randomLeft = Math.random() * 100;
        bubble.style.left = `${randomLeft}%`;
        
        // Randomize sizes
        const randomSize = 20 + Math.random() * 50;
        bubble.style.width = `${randomSize}px`;
        bubble.style.height = `${randomSize}px`;
        
        // Randomize animation delays and durations
        const randomDelay = Math.random() * 5;
        const randomDuration = 10 + Math.random() * 15;
        
        bubble.style.animationDelay = `${randomDelay}s`;
        bubble.style.animationDuration = `${randomDuration}s`;
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Initialize enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    enhanceBubbles();
    
    // Add intersection observer for elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.skill-category, .project-card, .timeline-item, .service-card, .blog-card').forEach(el => {
        observer.observe(el);
    });
});

// Add a simple typing effect for the hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 100);
    }
});
