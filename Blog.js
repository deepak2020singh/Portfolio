document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });

        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeSwitch.checked = true;
        }
    }

    // Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Blog Hero Animations
    gsap.from('.blog-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.blog-meta', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.blog-hero-image img', {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        delay: 0.5,
        ease: 'power3.out'
    });

    // Blog Content Animations
    gsap.utils.toArray('article > *').forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // Author Bio Animations
    gsap.from('.author-content img', {
        scrollTrigger: {
            trigger: '.author-bio',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.author-content > div', {
        scrollTrigger: {
            trigger: '.author-bio',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
    });

    // Related Posts Animations
    gsap.utils.toArray('.related-post-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out'
        });
    });

    // Comments Animations
    gsap.from('.comment-form', {
        scrollTrigger: {
            trigger: '.comments',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.utils.toArray('.comment').forEach((comment, index) => {
        gsap.from(comment, {
            scrollTrigger: {
                trigger: comment,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });

    // Initialize Vanilla Tilt for Related Posts
    VanillaTilt.init(document.querySelectorAll('.related-post-card'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3
    });

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
