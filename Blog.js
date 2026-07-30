document.addEventListener('DOMContentLoaded', () => {
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    initTheme();
    initNav();
    initAnimations();
    initTilt();
    initBackToTop();
});

/* Theme Toggle */
function initTheme() {
    const themeSwitch = document.getElementById('theme-switch');
    if (!themeSwitch) return;
    
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.body.classList.add('light-mode');
        themeSwitch.checked = true;
    }

    themeSwitch.addEventListener('change', () => {
        const isLight = themeSwitch.checked;
        document.body.classList.toggle('light-mode', isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

/* Navbar Scroll Effect & Mobile Menu */
function initNav() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
}

/* GSAP Animations */
function initAnimations() {
    if (!window.gsap) return;

    // Hero entrance
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.log-tag', { y: -20, opacity: 0, duration: 0.6 })
      .from('.blog-title', { y: 40, opacity: 0, duration: 0.9 }, '-=0.3')
      .from('.blog-tags span', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.5')
      .from('.blog-hero-image', { y: 40, opacity: 0, duration: 0.8 }, '-=0.3');

    // Content reveal
    gsap.utils.toArray('article > *').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
            opacity: 0, y: 30, duration: 0.8, ease: 'power3.out'
        });
    });

    // Sidebar reveal
    gsap.from('.author-bio', {
        scrollTrigger: { trigger: '.blog-sidebar', start: 'top 85%', toggleActions: 'play none none reverse' },
        opacity: 0, x: 30, duration: 0.8, ease: 'power3.out'
    });

    // Related posts reveal
    gsap.utils.toArray('.related-post-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
            opacity: 0, y: 40, duration: 0.7, delay: i * 0.1, ease: 'power3.out'
        });
    });

    // Comments reveal
    gsap.from('.comment-form', {
        scrollTrigger: { trigger: '.comments', start: 'top 80%', toggleActions: 'play none none reverse' },
        opacity: 0, x: -30, duration: 0.8, ease: 'power3.out'
    });
    gsap.utils.toArray('.comment').forEach((c, i) => {
        gsap.from(c, {
            scrollTrigger: { trigger: c, start: 'top 85%', toggleActions: 'play none none reverse' },
            opacity: 0, x: 30, duration: 0.6, delay: i * 0.1, ease: 'power3.out'
        });
    });
}

/* Tilt Effect */
function initTilt() {
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll('.related-post-card'), {
            max: 8,
            speed: 400,
            glare: true,
            'max-glare': 0.2
        });
    }
}

/* Back to Top */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
