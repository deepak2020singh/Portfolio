document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  initTheme();
  initNav();
  initScrollProgress();
  initHeroAnimations();
  initParallax();
  initSectionReveals();
  initCounters();
  initSkillBars();
  initTestimonials();
  initTypingEffect();
  initBackToTop();
  initSmoothAnchors();
  initForms();
});

/* Theme */
function initTheme() {
  const themeSwitch = document.getElementById('theme-switch');
  if (!themeSwitch) return;
  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  if (saved === 'light' || (!saved && prefersLight === false ? false : saved === 'light')) {
    // default stays dark unless explicitly saved as light
  }
  if (saved === 'light') {
    document.body.classList.add('light-mode');
    themeSwitch.checked = true;
  }
  themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('light-mode', themeSwitch.checked);
    localStorage.setItem('theme', themeSwitch.checked ? 'light' : 'dark');
  });
}

/* Nav */
function initNav() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  if (navToggle && navMenu && navOverlay) {
    const closeMenu = () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      navOverlay.classList.remove('active');
    };
    navToggle.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      navToggle.classList.toggle('active', isActive);
      navOverlay.classList.toggle('active', isActive);
    });
    navOverlay.addEventListener('click', closeMenu);
    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeMenu));
  }
}

/* Scroll progress bar */
function initScrollProgress() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = scrolled + '%';
  });
}

/* Hero entrance timeline */
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.log-tag', { y: -20, opacity: 0, duration: 0.6 })
    .from('.hero-title', { y: 40, opacity: 0, duration: 0.9 }, '-=0.3')
    .from('.hero-role', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
    .from('.hero-description', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
    .from('.hero-buttons .btn', { y: 20, opacity: 0, duration: 0.6, stagger: 0.12 }, '-=0.4')
    .from('.hero-stat', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.3')
    .from('.social-links a', { y: 15, opacity: 0, duration: 0.4, stagger: 0.08 }, '-=0.3')
    .from('.phone-frame', { scale: 0.85, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.6)' }, '-=0.9')
    .from('.float-chip', { scale: 0, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'back.out(2)' }, '-=0.5');

  // ambient float loop for chips
  gsap.utils.toArray('.float-chip').forEach((chip, i) => {
    gsap.to(chip, {
      y: i % 2 === 0 ? -12 : 12,
      duration: 2.4 + i * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
}

/* Parallax on hero background + phone */
function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.to('.hero-glow', {
    y: 120,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.grid-lines', {
    y: 60,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.phone-frame', {
    y: -50,
    rotateZ: 1.5,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  // subtle mouse-tilt on the phone
  const visual = document.getElementById('hero-visual');
  const phone = document.getElementById('phone-frame');
  if (visual && phone && window.matchMedia('(pointer: fine)').matches) {
    visual.addEventListener('mousemove', (e) => {
      const rect = visual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(phone, { rotateY: x * 14, rotateX: -y * 14, duration: 0.6, ease: 'power2.out', transformPerspective: 800 });
    });
    visual.addEventListener('mouseleave', () => {
      gsap.to(phone, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' });
    });
  }
}

/* Generic scroll reveals for repeated card patterns */
function initSectionReveals() {
  const groups = [
    { sel: '.highlight-item', y: 24, stagger: 0.1 },
    { sel: '.skill-category', y: 40, stagger: 0.12 },
    { sel: '.project-card', y: 50, stagger: 0.14 },
    { sel: '.timeline-item', x: 40, stagger: 0.15, alternateX: true },
    { sel: '.education-card', y: 40, stagger: 0.12 },
    { sel: '.certification-card', y: 40, stagger: 0.12 },
    { sel: '.achievement-card', y: 50, stagger: 0.12, rotate: true },
    { sel: '.service-card', y: 40, stagger: 0.14 },
    { sel: '.blog-card', y: 40, stagger: 0.14 },
  ];

  groups.forEach(g => {
    const items = gsap.utils.toArray(g.sel);
    items.forEach((el, i) => {
      const vars = {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        opacity: 0,
        duration: 0.8,
        delay: (i % 6) * (g.stagger || 0),
        ease: g.rotate ? 'back.out(1.6)' : 'power3.out'
      };
      if (g.alternateX) {
        vars.x = i % 2 === 0 ? -40 : 40;
      } else if (g.x) {
        vars.x = g.x;
      } else {
        vars.y = g.y || 30;
      }
      if (g.rotate) vars.rotate = i % 2 === 0 ? -6 : 6;
      gsap.from(el, vars);
    });
  });

  // Section titles + eyebrows
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
      scrollTrigger: { trigger: title, start: 'top 88%', toggleActions: 'play none none reverse' },
      y: 24, opacity: 0, duration: 0.8, ease: 'power3.out'
    });
  });
  gsap.utils.toArray('.log-tag').forEach(tag => {
    if (tag.closest('.hero')) return;
    gsap.from(tag, {
      scrollTrigger: { trigger: tag, start: 'top 90%', toggleActions: 'play none none reverse' },
      x: -20, opacity: 0, duration: 0.6, ease: 'power2.out'
    });
  });

  // About / contact block fades
  gsap.from('.about-text', {
    scrollTrigger: { trigger: '.about-content', start: 'top 80%', toggleActions: 'play none none reverse' },
    x: -40, opacity: 0, duration: 0.9, ease: 'power3.out'
  });
  gsap.from('.about-skills', {
    scrollTrigger: { trigger: '.about-content', start: 'top 80%', toggleActions: 'play none none reverse' },
    x: 40, opacity: 0, duration: 0.9, ease: 'power3.out'
  });
  gsap.from('.contact-info', {
    scrollTrigger: { trigger: '.contact-content', start: 'top 82%', toggleActions: 'play none none reverse' },
    y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
  });
  gsap.from('.contact-form', {
    scrollTrigger: { trigger: '.contact-content', start: 'top 82%', toggleActions: 'play none none reverse' },
    y: 40, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power3.out'
  });
  gsap.from('.testimonials-slider', {
    scrollTrigger: { trigger: '.testimonials', start: 'top 80%', toggleActions: 'play none none reverse' },
    y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
  });
}

/* Animated stat counters */
function initCounters() {
  gsap.utils.toArray('.stat-num').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const counter = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(counter.val); }
        });
      }
    });
  });
}

/* Skill bars fill on scroll */
function initSkillBars() {
  gsap.utils.toArray('.skill-progress').forEach(bar => {
    gsap.to(bar, {
      width: bar.dataset.width + '%',
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: { trigger: bar, start: 'top 90%', toggleActions: 'play none none reverse' }
    });
  });
}

/* Testimonials slider with dots */
function initTestimonials() {
  const cards = document.querySelectorAll('.testimonial-card');
  const dotsWrap = document.getElementById('testimonial-dots');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  if (!cards.length || !dotsWrap) return;

  let index = 0;
  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => show(i));
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('span');

  function show(i) {
    cards[index].classList.remove('active');
    dots[index].classList.remove('active');
    index = (i + cards.length) % cards.length;
    cards[index].classList.add('active');
    dots[index].classList.add('active');
    gsap.fromTo(cards[index], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
  }

  prevBtn && prevBtn.addEventListener('click', () => show(index - 1));
  nextBtn && nextBtn.addEventListener('click', () => show(index + 1));

  let auto = setInterval(() => show(index + 1), 6000);
  dotsWrap.closest('.testimonials-slider').addEventListener('mouseenter', () => clearInterval(auto));
  dotsWrap.closest('.testimonials-slider').addEventListener('mouseleave', () => {
    auto = setInterval(() => show(index + 1), 6000);
  });
}

/* Typing effect for hero role */
function initTypingEffect() {
  const el = document.getElementById('role-rotate');
  if (!el) return;
  const words = ['Kotlin', 'Jetpack Compose', 'Firebase', 'MVVM Architecture'];
  let wordIndex = 0, letterIndex = 0, deleting = false;

  function tick() {
    const word = words[wordIndex % words.length];
    el.textContent = deleting ? word.substring(0, letterIndex--) : word.substring(0, letterIndex++);

    let delay = deleting ? 55 : 110;
    if (!deleting && letterIndex > word.length) { deleting = true; delay = 1400; }
    else if (deleting && letterIndex < 0) { deleting = false; wordIndex++; delay = 350; }

    setTimeout(tick, delay);
  }
  tick();
}

/* Back to top */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* Smooth in-page anchors */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* Forms + resume PDF */
function initForms() {
  const contactForm = document.querySelector('.contact-form');
  const newsletterForm = document.querySelector('.newsletter-form');
  const resumeButton = document.getElementById('resume-download');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.reset();
      alert('Thanks for your message — I will get back to you soon.');
    });
  }
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.reset();
      alert('Thanks for subscribing!');
    });
  }
  if (resumeButton) resumeButton.addEventListener('click', generateResumePDF);
}

function generateResumePDF() {
  if (!window.jspdf) { alert('PDF library failed to load. Please try again.'); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont('helvetica', 'bold'); doc.setFontSize(20); doc.setTextColor(52, 211, 153);
  doc.text('Deepak Singh', 20, 20);
  doc.setFontSize(12); doc.setTextColor(51, 51, 51);
  doc.text('Android Developer', 20, 30);
  doc.text('deepak.singh@example.com | +1 (555) 123-4567 | New Delhi, India', 20, 40);
  doc.setDrawColor(52, 211, 153); doc.line(20, 45, 190, 45);

  doc.setFont('helvetica', 'bold'); doc.setFontSize(14);
  doc.text('Professional Summary', 20, 55);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
  doc.text('Android developer with 4+ years of experience building modern, user-friendly mobile applications. Expertise in Jetpack Compose, Kotlin, and Firebase, with a focus on MVVM architecture and clean code.', 20, 65, { maxWidth: 170 });

  doc.setFont('helvetica', 'bold'); doc.setFontSize(14);
  doc.text('Work Experience', 20, 85);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
  doc.text('Senior Android Developer — Tech Solutions Inc.', 20, 95);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
  doc.text('2022 — Present', 20, 102);
  doc.text('Led a team of 5 building modern Android apps in Jetpack Compose and Kotlin. Implemented CI/CD pipelines, cutting deployment time by 40%.', 20, 108, { maxWidth: 170 });

  doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
  doc.text('Android Developer — Mobile First Co.', 20, 125);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
  doc.text('2020 — 2022', 20, 132);
  doc.text('Built and maintained 10+ apps with 100K+ downloads. Integrated Firebase analytics and crash reporting, improving stability by 30%.', 20, 138, { maxWidth: 170 });

  doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
  doc.text('Junior Android Developer — StartUp Ventures', 20, 155);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
  doc.text('2019 — 2020', 20, 162);
  doc.text('Built commercial applications in Java and XML, then transitioned to Kotlin and modern architecture.', 20, 168, { maxWidth: 170 });

  doc.setFont('helvetica', 'bold'); doc.setFontSize(14);
  doc.text('Education', 20, 185);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
  doc.text('Master of Computer Applications — Delhi Technological University', 20, 195);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
  doc.text('2017 — 2020, GPA 3.8/4.0', 20, 202);
  doc.text('Specialized in mobile application development and software engineering.', 20, 208, { maxWidth: 170 });

  doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
  doc.text('Bachelor of Computer Science — University of Delhi', 20, 225);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
  doc.text('2014 — 2017, GPA 3.6/4.0', 20, 232);
  doc.text('Focused on foundational computer science and programming.', 20, 238, { maxWidth: 170 });

  doc.setFont('helvetica', 'bold'); doc.setFontSize(14);
  doc.text('Skills', 20, 255);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
  doc.text('• Jetpack Compose, Kotlin, Java', 20, 262);
  doc.text('• MVVM Architecture, Room Database, WorkManager', 20, 268);
  doc.text('• Firebase, Supabase, RESTful APIs, Ktor Client', 20, 274);
  doc.text('• Git, Android Studio, Koin, CI/CD', 20, 280);

  doc.setFont('helvetica', 'bold'); doc.setFontSize(14);
  doc.text('Certifications', 20, 295);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
  doc.text('• Associate Android Developer, Google, 2022', 20, 302);
  doc.text('• Android Architecture Masterclass, Udacity, 2021', 20, 308);
  doc.text('• Firebase Professional, Google Cloud, 2020', 20, 314);
  doc.text('• Jetpack Compose Specialist, Android Developers, 2023', 20, 320);

  doc.save('Deepak_Singh_Resume.pdf');
}
