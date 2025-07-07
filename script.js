
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Initialize animations when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Hero section animations
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
                stagger: 0.2,
                delay: 0.6,
                ease: 'power3.out'
            });

            // Animate sections on scroll
            gsap.utils.toArray('.section').forEach(section => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                });
            });

            // Animate service cards
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

            // Animate portfolio items
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

            // Animate testimonials
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

            // Floating animation for skills
            gsap.utils.toArray('.skill').forEach(skill => {
                gsap.to(skill, {
                    y: -5,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            });

            // Mobile Navigation
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');

            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
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

            // Portfolio filtering
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
                                duration: 0.3,
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

            // Form submission
            const contactForm = document.getElementById('contactForm');

            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Animate form submission
                gsap.to('.contact-form button', {
                    duration: 0.3,
                    backgroundColor: '#4CAF50',
                    onComplete: function() {
                        alert('Thank you for your message! I will get back to you soon.');
                        contactForm.reset();
                        gsap.to('.contact-form button', {
                            duration: 0.3,
                            backgroundColor: 'var(--primary-color)'
                        });
                    }
                });
            });

            // Sticky header on scroll
            window.addEventListener('scroll', () => {
                const header = document.querySelector('header');
                header.classList.toggle('sticky', window.scrollY > 0);
            });

            // Scroll to top button
            const scrollTopBtn = document.getElementById('scrollTop');

            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollTopBtn.classList.add('active');
                } else {
                    scrollTopBtn.classList.remove('active');
                }
            });

            scrollTopBtn.addEventListener('click', () => {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: 0,
                    ease: 'power3.out'
                });
            });

            // Theme toggle functionality
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

            function toggleTheme() {
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

            // Typing animation for hero text
            function typeWriter() {
                const heroTitle = document.querySelector('.hero h1');
                const originalHTML = heroTitle.innerHTML;
                
                // Save the original HTML structure
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = originalHTML;
                
                // Create cursor element
                const cursor = document.createElement('span');
                cursor.className = 'typewriter-cursor';
                heroTitle.innerHTML = '';
                heroTitle.appendChild(cursor);
                
                let textToType = '';
                let htmlStructure = [];
                
                // Extract text nodes while preserving HTML structure
                function extractText(node, parentTag = '') {
                    if (node.nodeType === Node.TEXT_NODE) {
                        textToType += node.textContent;
                        htmlStructure.push({
                            type: 'text',
                            content: node.textContent,
                            parentTag: parentTag
                        });
                    } else {
                        const tag = node.tagName.toLowerCase();
                        htmlStructure.push({
                            type: 'tagStart',
                            tag: tag,
                            attrs: Array.from(node.attributes).map(attr => ({
                                name: attr.name,
                                value: attr.value
                            }))
                        });
                        
                        // Process child nodes
                        for (let child of node.childNodes) {
                            extractText(child, tag);
                        }
                        
                        htmlStructure.push({
                            type: 'tagEnd',
                            tag: tag
                        });
                    }
                }
                
                extractText(tempDiv);
                
                let currentChar = 0;
                let currentPosition = 0;
                
                function typeNextLetter() {
                    if (currentPosition < htmlStructure.length) {
                        const currentItem = htmlStructure[currentPosition];
                        
                        if (currentItem.type === 'tagStart') {
                            // Open HTML tag
                            let tag = `<${currentItem.tag}`;
                            currentItem.attrs.forEach(attr => {
                                tag += ` ${attr.name}="${attr.value}"`;
                            });
                            tag += '>';
                            heroTitle.insertAdjacentHTML('beforeend', tag);
                            currentPosition++;
                            setTimeout(typeNextLetter, 50);
                        } 
                        else if (currentItem.type === 'tagEnd') {
                            // Close HTML tag
                            heroTitle.insertAdjacentHTML('beforeend', `</${currentItem.tag}>`);
                            currentPosition++;
                            setTimeout(typeNextLetter, 50);
                        } 
                        else if (currentItem.type === 'text' && currentChar < currentItem.content.length) {
                            // Type next character
                            heroTitle.insertAdjacentText('beforeend', currentItem.content[currentChar]);
                            currentChar++;
                            
                            // Move cursor to the end
                            cursor.remove();
                            heroTitle.appendChild(cursor);
                            
                            // Vary speed slightly for natural effect
                            const speed = Math.random() * 50 + 50; // Between 50-100ms
                            setTimeout(typeNextLetter, speed);
                        } 
                        else {
                            // Move to next text node
                            currentChar = 0;
                            currentPosition++;
                            setTimeout(typeNextLetter, 100);
                        }
                    } else {
                        // Animation complete - remove cursor
                        cursor.style.display = 'none';
                    }
                }
                
                // Start typing after a short delay
                setTimeout(typeNextLetter, 500);
            }
            
            // Start the typing animation
            typeWriter();
        });
    
