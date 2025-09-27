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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initBackToTop();
    initMobileNavigation();
    initSmoothScrolling();
    initTestimonialsSlider();
    initForms();
    enhanceBubbles();
    initTypingEffect();
});

// Enhanced GSAP animations
function initScrollAnimations() {
    // Hero section animations
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from('.floating-tag', {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.hero-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.7')
        .from('.hero-description', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.7')
        .from('.hero-buttons', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.7')
        .from('.social-links a', {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-image', {
            scale: 0.8,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        }, '-=1');

    // Enhanced floating elements animation
    gsap.to('.floating-element-1', {
        y: -20,
        rotation: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    gsap.to('.floating-element-2', {
        y: -25,
        rotation: -8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 0.5
    });

    gsap.to('.floating-element-3', {
        y: -30,
        rotation: 12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 1
    });

    // Section animations with ScrollTrigger
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

    // Education section animations (left to right)
    gsap.utils.toArray('.education-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });

    // Certifications section animations
    gsap.utils.toArray('.certification-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            stagger: 0.1
        });
    });

    // Text animation for section titles
    gsap.utils.toArray('.section-title').forEach((title, index) => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });
}

// Fixed back-to-top functionality
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Navbar background
        if (scrollY > 50) {
            navbar.style.background = 'var(--card-bg)';
            navbar.style.boxShadow = '0 5px 15px var(--shadow)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
        
        // Back to top button - FIXED: Always show when scrolled down
        if (scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced mobile navigation
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Animate hamburger to X
        gsap.to('.bar:nth-child(1)', {
            rotation: this.classList.contains('active') ? 45 : 0,
            y: this.classList.contains('active') ? 8 : 0,
            duration: 0.3
        });
        
        gsap.to('.bar:nth-child(2)', {
            opacity: this.classList.contains('active') ? 0 : 1,
            duration: 0.3
        });
        
        gsap.to('.bar:nth-child(3)', {
            rotation: this.classList.contains('active') ? -45 : 0,
            y: this.classList.contains('active') ? -8 : 0,
            duration: 0.3
        });
    });

    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Reset hamburger animation
            gsap.to('.bar:nth-child(1)', {
                rotation: 0,
                y: 0,
                duration: 0.3
            });
            
            gsap.to('.bar:nth-child(2)', {
                opacity: 1,
                duration: 0.3
            });
            
            gsap.to('.bar:nth-child(3)', {
                rotation: 0,
                y: 0,
                duration: 0.3
            });
        });
    });
}

// Enhanced smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Testimonials slider
function initTestimonialsSlider() {
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

    // Next button
    document.querySelector('.testimonial-next')?.addEventListener('click', function() {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonialCount) nextIndex = 0;
        showTestimonial(nextIndex);
    });

    // Previous button
    document.querySelector('.testimonial-prev')?.addEventListener('click', function() {
        let prevIndex = currentTestimonial - 1;
        if (prevIndex < 0) prevIndex = testimonialCount - 1;
        showTestimonial(prevIndex);
    });

    // Auto-rotate testimonials
    if (testimonialCount > 0) {
        setInterval(() => {
            let nextIndex = currentTestimonial + 1;
            if (nextIndex >= testimonialCount) nextIndex = 0;
            showTestimonial(nextIndex);
        }, 5000);
    }
}

// Form handling
function initForms() {
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[type="text"]').value;
            const message = this.querySelector('textarea').value;
            
            // Here you would typically send the data to a server
            // For this example, we'll just show an alert
            alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
            
            // Reset the form
            this.reset();
        });
    }

    // Newsletter form
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
            
            // Create a simple PDF using jsPDF (if available)
            if (typeof jsPDF !== 'undefined') {
                const doc = new jsPDF();
                
                // Add content to the PDF
                doc.setFontSize(22);
                doc.text('Deepak Singh - Android Developer', 20, 30);
                
                doc.setFontSize(16);
                doc.text('Professional Summary', 20, 50);
                doc.setFontSize(12);
                doc.text('Experienced Android developer with 4+ years of expertise in building modern,', 20, 60);
                doc.text('user-friendly mobile applications using Jetpack Compose, Kotlin, and Firebase.', 20, 67);
                
                // Save the PDF
                doc.save('Deepak_Singh_Resume.pdf');
            } else {
                // Fallback: redirect to a PDF file or show a message
                alert('Resume download functionality requires jsPDF library. Please contact me directly for my resume.');
            }
        });
    }
}

// Enhanced bubble animation with GSAP
function enhanceBubbles() {
    const bubbles = document.querySelectorAll('.bubble');
    
    bubbles.forEach((bubble, index) => {
        // Randomize properties for more natural look
        const randomLeft = Math.random() * 100;
        const randomSize = 20 + Math.random() * 60;
        const randomDelay = Math.random() * 8;
        const randomDuration = 12 + Math.random() * 20;
        
        gsap.set(bubble, {
            left: `${randomLeft}%`,
            width: `${randomSize}px`,
            height: `${randomSize}px`
        });
        
        // Animate bubbles with GSAP for better performance
        gsap.to(bubble, {
            y: -1200,
            x: index % 2 === 0 ? 100 : -100,
            rotation: 360,
            duration: randomDuration,
            delay: randomDelay,
            repeat: -1,
            ease: 'none',
            yoyo: false
        });
    });
}

// Enhanced typing effect
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const speed = 100;
        
        function typeWriter() {
            if (i < originalText.length) {
                subtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Add blinking cursor effect
                subtitle.innerHTML += '<span class="typing-cursor">|</span>';
                
                // Animate the cursor
                gsap.to('.typing-cursor', {
                    opacity: 0,
                    duration: 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'power2.inOut'
                });
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 1000);
    }
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

// Add intersection observer for additional animations
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
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .service-card, .blog-card, .education-card, .certification-card').forEach(el => {
    observer.observe(el);
});
