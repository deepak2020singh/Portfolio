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
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
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
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
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

// Intersection Observer for scroll animations
const sections = document.querySelectorAll('.section');

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Animate skills on hover
const skills = document.querySelectorAll('.skill');

skills.forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.classList.add('pulse');
    });
    
    skill.addEventListener('mouseleave', () => {
        skill.classList.remove('pulse');
    });
});

// Typing animation for hero text
function typeWriter() {
    const heroTitle = document.querySelector('.hero h1');
    const originalHTML = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    // Create a cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    heroTitle.appendChild(cursor);
    
    // Extract text nodes while preserving HTML structure
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;
    const textNodes = [];
    
    function extractTextNodes(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            textNodes.push(node);
        } else {
            for (let child of node.childNodes) {
                extractTextNodes(child);
            }
        }
    }
    
    extractTextNodes(tempDiv);
    
    let currentTextNodeIndex = 0;
    let currentText = '';
    let currentWordIndex = 0;
    let words = [];
    
    function processNextTextNode() {
        if (currentTextNodeIndex < textNodes.length) {
            const textNode = textNodes[currentTextNodeIndex];
            words = textNode.textContent.split(/(\s+)/).filter(word => word.trim().length > 0 || word === ' ');
            currentWordIndex = 0;
            typeNextWord();
        } else {
            // Animation complete - remove cursor
            cursor.style.display = 'none';
        }
    }
    
    function typeNextWord() {
        if (currentWordIndex < words.length) {
            currentText += words[currentWordIndex];
            
            // Reconstruct the HTML with the new text
            let reconstructedHTML = '';
            let nodeIndex = 0;
            
            function reconstructHTML(node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    if (nodeIndex === currentTextNodeIndex) {
                        reconstructedHTML += currentText;
                    } else if (nodeIndex < currentTextNodeIndex) {
                        reconstructedHTML += node.textContent;
                    }
                    nodeIndex++;
                } else {
                    reconstructedHTML += `<${node.nodeName.toLowerCase()}`;
                    
                    // Copy attributes
                    if (node.attributes) {
                        for (let attr of node.attributes) {
                            reconstructedHTML += ` ${attr.name}="${attr.value}"`;
                        }
                    }
                    
                    reconstructedHTML += '>';
                    
                    // Process child nodes
                    for (let child of node.childNodes) {
                        reconstructHTML(child);
                    }
                    
                    reconstructedHTML += `</${node.nodeName.toLowerCase()}>`;
                }
            }
            
            reconstructHTML(tempDiv);
            
            heroTitle.innerHTML = reconstructedHTML;
            heroTitle.appendChild(cursor);
            
            currentWordIndex++;
            
            // Adjust delay based on word length (longer words get slightly more time)
            const word = words[currentWordIndex - 1];
            const delay = word.length > 5 ? 200 : word === ' ' ? 100 : 150;
            
            setTimeout(typeNextWord, delay);
        } else {
            currentTextNodeIndex++;
            currentText = '';
            processNextTextNode();
        }
    }
    
    // Start the typing effect after a small delay
    setTimeout(processNextTextNode, 500);
}

// Start the typing animation when the page loads
window.addEventListener('DOMContentLoaded', typeWriter);
