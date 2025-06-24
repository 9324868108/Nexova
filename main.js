// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Loading Screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    
    gsap.to('.loader-progress', {
        width: '100%',
        duration: 2,
        ease: 'power2.out'
    });
    
    gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        delay: 2.2,
        onComplete: () => {
            loader.style.display = 'none';
            initAnimations();
        }
    });
});

// Initialize Scroll Animations
function initAnimations() {
    // Hero animations
    gsap.from('.hero-badge', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
    });
    
    gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.4
    });
    
    gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6
    });
    
    gsap.from('.hero-stats', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.8
    });
    
    gsap.from('.hero-buttons', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 1
    });
    
    // Floating cards animation
    gsap.from('.float-card', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: 1.2,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });
    
    // Section animations on scroll
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%'
            }
        });
    });
    
    gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
        gsap.from(item, {
            x: 100,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%'
            }
        });
    });
    
    gsap.utils.toArray('.process-step').forEach((step, i) => {
        gsap.from(step, {
            x: i % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: step,
                start: 'top 80%'
            }
        });
    });
    
    gsap.utils.toArray('.pricing-card').forEach((card, i) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2,
            scrollTrigger: {
                trigger: card,
                start: 'top 80%'
            }
        });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 70
                },
                ease: 'power2.out'
            });
        }
    });
});

// Portfolio Horizontal Scroll
let currentSlide = 0;
const portfolioTrack = document.querySelector('.portfolio-track');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const totalItems = portfolioItems.length;
const itemWidth = 370; // 350px + 20px gap

function updatePortfolioSlide() {
    const translateX = -currentSlide * itemWidth;
    gsap.to(portfolioTrack, {
        x: translateX,
        duration: 0.5,
        ease: 'power2.out'
    });
}

document.querySelector('.portfolio-next').addEventListener('click', () => {
    if (currentSlide < totalItems - 3) {
        currentSlide++;
        updatePortfolioSlide();
    }
});

document.querySelector('.portfolio-prev').addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updatePortfolioSlide();
    }
});

// Auto-scroll portfolio
setInterval(() => {
    if (currentSlide < totalItems - 3) {
        currentSlide++;
    } else {
        currentSlide = 0;
    }
    updatePortfolioSlide();
}, 4000);

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Contact Form Submission
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show success message
    const button = e.target.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    button.style.background = 'var(--accent-color)';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
        e.target.reset();
    }, 3000);
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section-header, .service-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
});

// Performance optimization - Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add scroll indicator functionality
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    gsap.to(window, {
        duration: 1,
        scrollTo: {
            y: '#services',
            offsetY: 70
        },
        ease: 'power2.out'
    });
});

// Typing effect for hero title
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

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    updateCounter();
}

// Initialize counters when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
});
