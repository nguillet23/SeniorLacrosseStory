/* ============================================
   XR Lacrosse Goalie Training Website
   JavaScript - Interactive Features
   ============================================ */

// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Active Nav Link Highlighting =====
const sections = document.querySelectorAll('section');
const navMenuLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    updateActiveNavLink();
});

function updateActiveNavLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navMenuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// ===== Smooth Scroll Behavior =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Reveal Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements that should be revealed on scroll
document.querySelectorAll('.section-header, .feature-card, .metric-card, .content-grid, .two-column, .three-column, .achievements-list li').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// ===== Navbar Scroll Effect =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.background = 'rgba(26, 40, 69, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(26, 40, 69, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===== Add CSS for Active Nav Link =====
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--light-blue) !important;
    }

    .nav-link.active::after {
        width: 100% !important;
    }

    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(26, 40, 69, 0.99);
        backdrop-filter: blur(10px);
        padding: var(--spacing-lg);
        gap: var(--spacing-md);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(8px, 8px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }

    @media (max-width: 768px) {
        .nav-menu {
            display: none;
            flex-direction: column;
        }
    }
`;
document.head.appendChild(style);

// ===== Parallax Scrolling Effect (subtle) =====
window.addEventListener('scroll', () => {
    const heroMedia = document.querySelector('.hero-media');
    if (heroMedia) {
        const scrollPosition = window.pageYOffset;
        heroMedia.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ===== Counter Animation for Metrics =====
function animateCounter(element, target, duration = 2000) {
    const isPercentage = element.textContent.includes('%');
    const isMiliseconds = element.textContent.includes('ms');
    const numberString = element.textContent.replace(/[^0-9]/g, '');
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(counter);
        }
        let displayValue = Math.floor(current);
        if (isPercentage) {
            element.textContent = displayValue + '%';
        } else if (isMiliseconds) {
            element.textContent = displayValue + ' ms';
        } else {
            element.textContent = displayValue;
        }
    }, 16);
}

// Trigger counter animation when metrics come into view
const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const metricNumber = entry.target.querySelector('.metric-number');
            if (metricNumber && !metricNumber.hasAttribute('data-animated')) {
                const numberText = metricNumber.textContent.replace(/[^0-9]/g, '');
                const target = parseInt(numberText);
                if (target) {
                    animateCounter(metricNumber, target);
                    metricNumber.setAttribute('data-animated', 'true');
                }
            }
            metricsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.metric-card').forEach(card => {
    metricsObserver.observe(card);
});

// ===== CTA Button Ripple Effect =====
const ctaButtons = document.querySelectorAll('.cta-button');

ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Add ripple styles if not already added
        if (!document.querySelector('style[data-ripple]')) {
            const rippleStyle = document.createElement('style');
            rippleStyle.setAttribute('data-ripple', 'true');
            rippleStyle.textContent = `
                .cta-button {
                    position: relative;
                    overflow: hidden;
                }
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                }
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(rippleStyle);
        }

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== Lazy Load Images (when implemented) =====
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

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== Scroll to Top Button (optional) =====
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--light-blue);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        font-size: 24px;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
};

createScrollToTopButton();

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    updateActiveNavLink();

    // Log initialization
    console.log('XR Lacrosse Goalie Training - Website Initialized ✓');
});

// ===== Accessibility: Focus Visible =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

const a11yStyle = document.createElement('style');
a11yStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid var(--light-blue);
        outline-offset: 4px;
    }
`;
document.head.appendChild(a11yStyle);

// ===== Print Optimization =====
window.addEventListener('beforeprint', () => {
    document.body.style.background = 'white';
});

// ===== Performance: Throttle Scroll Events =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events if needed
const throttledScroll = throttle(() => {
    updateActiveNavLink();
}, 100);

// Optional: Use throttled version if experiencing performance issues
// window.addEventListener('scroll', throttledScroll);