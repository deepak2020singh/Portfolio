// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Hero section animations with GSAP
    gsap.from('.hero h1', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });
    
    gsap.from('.hero p', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    
    
    gsap.from('.hero-btns a', {
  duration: 1,
  y: 50,
  opacity: 0,
  stagger: 0.6,
  delay: 0.6, // Increased delay to ensure proper sequencing
  ease: 'power3.out',
  immediateRender: false // Ensures initial state is respected
});

    // Animate sections on scroll with GSAP ScrollTrigger
    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Animate service cards with GSAP
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    // Animate portfolio items with GSAP
    gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    // Animate testimonials with GSAP
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // GSAP animation for mobile menu
        if (navLinks.classList.contains('active')) {
            gsap.from('.nav-links li', {
                duration: 0.5,
                x: -50,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links with GSAP
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetElement,
                    offsetY: 80
                },
                ease: 'power2.inOut'
            });
        });
    });

    // Download CV fallback
    document.querySelector('.btn-download').addEventListener('click', function(e) {
        fetch('deepakcv.pdf')
            .then(response => {
                if (!response.ok) {
                    e.preventDefault();
                    const proceed = confirm('CV file is not available. Would you like to view it in a new tab instead?');
                    if (proceed) {
                        window.open('deepakcv.pdf', '_blank');
                    }
                }
            })
            .catch(error => {
                e.preventDefault();
                alert('CV download is currently unavailable. Please contact me directly for my resume.');
            });
    });

    // Portfolio filtering with GSAP animations
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    gsap.to(item, {
                        duration: 0.5,
                        opacity: 1,
                        display: 'block',
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(item, {
                        duration: 0.3,
                        opacity: 0,
                        display: 'none',
                        ease: 'power2.out'
                    });
                }
            });
        });
    });

    // Working contact form with validation and submission
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            submitBtn.classList.add('sending');
            formMessage.style.display = 'none';
            
            try {
                // Simulate form submission (replace with actual form submission)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
            } catch (error) {
                // Show error message
                formMessage.textContent = 'There was an error sending your message. Please try again later.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            } finally {
                // Reset button state
                submitBtn.classList.remove('sending');
                
                // Scroll to message with GSAP
                gsap.to(window, {
                    duration: 0.8,
                    scrollTo: {
                        y: formMessage,
                        offsetY: 20
                    },
                    ease: 'power2.out'
                });
            }
        });
    }

    // Scroll to top button with GSAP
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            gsap.to(scrollTopBtn, {
                duration: 0.3,
                opacity: 1,
                visibility: 'visible',
                ease: 'power2.out'
            });
        } else {
            gsap.to(scrollTopBtn, {
                duration: 0.3,
                opacity: 0,
                visibility: 'hidden',
                ease: 'power2.out'
            });
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1,
            scrollTo: 0,
            ease: 'power3.out'
        });
    });

    // Theme toggle functionality with GSAP ripple effect
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme') || 
                        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    function toggleTheme(event) {
        // Create ripple effect with GSAP
        const ripple = document.createElement('div');
        ripple.className = 'theme-ripple';
        document.body.appendChild(ripple);
        
        // Position ripple at click location
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        gsap.set(ripple, {
            left: `${x}px`,
            top: `${y}px`
        });
        
        // Animate ripple with GSAP
        gsap.to(ripple, {
            duration: 0.6,
            scale: 100,
            opacity: 0,
            ease: 'power2.out',
            onComplete: () => ripple.remove()
        });

        // Toggle theme
        body.classList.toggle('light-theme');
        
        if (body.classList.contains('light-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            mobileThemeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    }

    themeToggle.addEventListener('click', toggleTheme);
    mobileThemeToggle.addEventListener('click', toggleTheme);

    // Typing animation for hero text with GSAP
    function typeWriter() {
        const heroTitle = document.querySelector('.hero h1');
        const originalText = "Hi, I'm Deepak Singh\nMobile App Developer";
        
        // Clear the title and add cursor
        heroTitle.innerHTML = '<span class="typewriter-cursor"></span>';
        
        let i = 0;
        let lineBreakCount = 0;
        let isTypingName = false;
        
        function type() {
            if (i < originalText.length) {
                const currentChar = originalText.charAt(i);
                
                // Check if we're starting to type the name
                if (currentChar === 'D' && originalText.substring(i, i + 7) === 'Deepak ') {
                    isTypingName = true;
                    heroTitle.insertAdjacentHTML('beforeend', '<span class="name-highlight">');
                }
                
                // Check if we're ending the name
                if (isTypingName && currentChar === ' ') {
                    isTypingName = false;
                    heroTitle.insertAdjacentHTML('beforeend', '</span>');
                }
                
                // Handle line breaks
                if (currentChar === '\n') {
                    lineBreakCount++;
                    heroTitle.insertAdjacentHTML('beforeend', '<br>');
                } else {
                    heroTitle.insertAdjacentText('beforeend', currentChar);
                }
                
                // Move cursor to end
                const cursor = heroTitle.querySelector('.typewriter-cursor');
                cursor.remove();
                heroTitle.appendChild(cursor);
                
                i++;
                
                // Random typing speed for natural effect
                const speed = Math.random() * 50 + 50;
                setTimeout(type, speed);
            } else {
                // Animation complete - remove cursor
                const cursor = heroTitle.querySelector('.typewriter-cursor');
                if (cursor) {
                    gsap.to(cursor, {
                        duration: 0.3,
                        opacity: 0,
                        onComplete: () => cursor.remove()
                    });
                }
                
                // Ensure name highlight is properly closed
                if (isTypingName) {
                    heroTitle.insertAdjacentHTML('beforeend', '</span>');
                }
            }
        }
        
        // Start typing after a short delay
        setTimeout(type, 500);
    }
    
    // Start the typing animation
    typeWriter();

    // Floating animation for skills with GSAP
    gsap.utils.toArray('.skill').forEach(skill => {
        gsap.to(skill, {
            y: -5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
});
