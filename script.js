

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
            duration: 0.8,
            ease: 'power2.out'
        })
        .from('.hero-title', {
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.hero-subtitle', {
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.hero-description', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.hero-buttons', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.social-links a', {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.hero-image', {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
        }, '-=0.5')
        .from('.floating-element', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        }, '-=0.5');

    // About section animations
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Skills section animations
    gsap.utils.toArray('.skill-category').forEach((category, index) => {
        gsap.from(category, {
            scrollTrigger: {
                trigger: category,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });

    // Projects section animations
    gsap.utils.toArray('.project-card').forEach((card, index) => {
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
            ease: 'power3.out'
        });
    });

    // Experience section animations
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });

    // Education section animations
    gsap.utils.toArray('.education-card').forEach((card, index) => {
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
            ease: 'power3.out'
        });
    });

    // Certifications section animations
    const certificationsSection = document.getElementById('certifications');
    if (certificationsSection) {
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
    } else {
        console.error('Certifications section not found in the DOM');
    }

    // Services section animations
    gsap.utils.toArray('.service-card').forEach((card, index) => {
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
            ease: 'power3.out'
        });
    });

    // Testimonials section animations
    gsap.from('.testimonials-slider', {
        scrollTrigger: {
            trigger: '#testimonials',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Blog section animations
    gsap.utils.toArray('.blog-card').forEach((card, index) => {
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
            ease: 'power3.out'
        });
    });

    // Contact section animations
    gsap.from('.contact-content', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) {
        console.error('Back to top button not found in the DOM');
        return;
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile Navigation Toggle
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!navToggle || !navMenu) {
        console.error('Navigation toggle or menu not found in the DOM');
        return;
    }

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('.nav-link, .btn-primary[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Testimonials Slider
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) {
        console.error('Testimonials slider not found in the DOM');
        return;
    }

    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentIndex = 0;

    if (!testimonials.length || !prevBtn || !nextBtn) {
        console.error('Testimonials or navigation buttons not found');
        return;
    }

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? testimonials.length - 1 : currentIndex - 1;
        showTestimonial(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
        showTestimonial(currentIndex);
    });

    // Auto-play slider
    setInterval(() => {
        currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
        showTestimonial(currentIndex);
    }, 5000);
}

// Form Handling and Resume Download
function initForms() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    const resumeButton = document.getElementById('resume-download');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            console.log('Contact Form Submitted:', Object.fromEntries(formData));
            contactForm.reset();
            alert('Thank you for your message! I will get back to you soon.');
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            console.log('Newsletter Subscription:', email);
            newsletterForm.reset();
            alert('Thank you for subscribing to my newsletter!');
        });
    }

    if (resumeButton) {
        resumeButton.addEventListener('click', generateResumePDF);
    } else {
        console.error('Resume download button not found in the DOM');
    }

    function generateResumePDF() {
        if (!window.jspdf) {
            alert('PDF generation library failed to load. Please try again later.');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.setTextColor(108, 99, 255); // Primary color
        doc.text('Deepak Singh', 20, 20);
        doc.setFontSize(12);
        doc.setTextColor(51, 51, 51); // Text color
        doc.text('Android Developer', 20, 30);
        doc.text('deepak.singh@example.com | +1 (555) 123-4567 | New Delhi, India', 20, 40);

        // Divider
        doc.setDrawColor(108, 99, 255);
        doc.line(20, 45, 190, 45);

        // Professional Summary
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('Professional Summary', 20, 55);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('Passionate Android developer with over 4 years of experience building modern, user-friendly mobile applications. Expertise in Jetpack Compose, Kotlin, and Firebase, with a focus on MVVM architecture and clean code practices.', 20, 65, { maxWidth: 170 });

        // Work Experience
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('Work Experience', 20, 85);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('Senior Android Developer - Tech Solutions Inc.', 20, 95);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('2022 - Present', 20, 102);
        doc.text('Led a team of 5 developers in building modern Android applications using Jetpack Compose and Kotlin. Implemented CI/CD pipelines, reducing deployment time by 40%.', 20, 108, { maxWidth: 170 });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('Android Developer - Mobile First Co.', 20, 125);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('2020 - 2022', 20, 132);
        doc.text('Developed and maintained 10+ applications with 100K+ downloads. Integrated Firebase for analytics and crash reporting, improving app stability by 30%.', 20, 138, { maxWidth: 170 });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('Junior Android Developer - StartUp Ventures', 20, 155);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('2019 - 2020', 20, 162);
        doc.text('Built commercial applications using Java and XML. Transitioned to Kotlin and learned modern Android development practices.', 20, 168, { maxWidth: 170 });

        // Education
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('Education', 20, 185);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('Master of Computer Applications - Delhi Technological University', 20, 195);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('2017 - 2020, GPA: 3.8/4.0', 20, 202);
        doc.text('Specialized in Mobile Application Development and Software Engineering.', 20, 208, { maxWidth: 170 });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('Bachelor of Computer Science - University of Delhi', 20, 225);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('2014 - 2017, GPA: 3.6/4.0', 20, 232);
        doc.text('Focused on foundational computer science concepts and programming.', 20, 238, { maxWidth: 170 });

        // Skills
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('Skills', 20, 255);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('• Jetpack Compose, Kotlin, Java', 20, 262);
        doc.text('• MVVM Architecture, Room Database, WorkManager', 20, 268);
        doc.text('• Firebase, RESTful APIs, Ktor Client', 20, 274);
        doc.text('• Git, Android Studio, Koin, CI/CD', 20, 280);

        // Certifications
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('Certifications', 20, 295);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('• Associate Android Developer, Google, 2022', 20, 302);
        doc.text('• Android Architecture Masterclass, Udacity, 2021', 20, 308);
        doc.text('• Firebase Professional, Google Cloud, 2020', 20, 314);
        doc.text('• Jetpack Compose Specialist, Android Developers, 2023', 20, 320);

        // Save the PDF
        doc.save('Deepak_Singh_Resume.pdf');
    }
}

// Enhance Bubble Animations
function enhanceBubbles() {
    const bubbles = document.querySelectorAll('.bubble');
    if (!bubbles.length) {
        console.error('Bubbles not found in the DOM');
        return;
    }

    bubbles.forEach((bubble, index) => {
        gsap.to(bubble, {
            x: () => Math.random() * 100 - 50,
            y: () => -window.innerHeight - 100,
            scale: () => Math.random() * 0.5 + 0.5,
            opacity: 0,
            duration: () => Math.random() * 10 + 10,
            ease: 'none',
            repeat: -1,
            delay: index * 2,
            onRepeat: () => {
                gsap.set(bubble, {
                    x: Math.random() * window.innerWidth,
                    y: window.innerHeight + 100,
                    opacity: 1
                });
            }
        });
    });
}

// Typing Effect for Hero Subtitle
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) {
        console.error('Hero subtitle not found in the DOM');
        return;
    }

    const words = ['Android Developer', 'Kotlin Specialist', 'Jetpack Compose Expert', 'Firebase Pro'];
    let wordIndex = 0;
    let letterIndex = 0;
    let currentWord = '';
    let isDeleting = false;

    function type() {
        if (wordIndex >= words.length) {
            wordIndex = 0;
        }

        currentWord = words[wordIndex];

        if (isDeleting) {
            subtitle.textContent = currentWord.substring(0, letterIndex--);
            if (letterIndex < 0) {
                isDeleting = false;
                wordIndex++;
            }
        } else {
            subtitle.textContent = currentWord.substring(0, letterIndex++);
            if (letterIndex > currentWord.length) {
                isDeleting = true;
                setTimeout(type, 1500);
                return;
            }
        }

        setTimeout(type, isDeleting ? 100 : 150);
    }

    type();
}




