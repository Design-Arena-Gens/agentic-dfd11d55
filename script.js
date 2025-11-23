// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    }

    lastScroll = currentScroll;
});

// CTA form submission
const ctaForm = document.querySelector('.cta-form');
const emailInput = document.querySelector('.email-input');
const ctaButton = document.querySelector('.btn-cta');

if (ctaForm) {
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value;

        if (email && validateEmail(email)) {
            // Simulate form submission
            ctaButton.textContent = 'Sending...';
            ctaButton.disabled = true;

            setTimeout(() => {
                ctaButton.textContent = '✓ Request Sent!';
                ctaButton.style.background = '#22c55e';
                emailInput.value = '';

                setTimeout(() => {
                    ctaButton.textContent = 'Get Free Quote';
                    ctaButton.style.background = 'white';
                    ctaButton.disabled = false;
                }, 3000);
            }, 1500);
        } else {
            emailInput.style.border = '2px solid #ef4444';
            setTimeout(() => {
                emailInput.style.border = 'none';
            }, 2000);
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Product card interactions
document.querySelectorAll('.btn-product').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        alert(`Thanks for your interest in ${productName}! A sales representative will contact you soon.`);
    });
});

// Get Quote button in navbar
document.querySelectorAll('.cta-btn').forEach(button => {
    button.addEventListener('click', function() {
        const ctaSection = document.querySelector('#contact');
        if (ctaSection) {
            ctaSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                emailInput.focus();
            }, 800);
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to feature cards, product cards, and testimonials
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .testimonial-card');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Performance chart simulation (simple visual representation)
const canvas = document.getElementById('performanceChart');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw a simple performance curve
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();

    const points = [
        {x: 0, y: 80},
        {x: 20, y: 70},
        {x: 40, y: 50},
        {x: 60, y: 35},
        {x: 80, y: 30},
        {x: 100, y: 28}
    ];

    points.forEach((point, index) => {
        const x = (point.x / 100) * canvas.width;
        const y = (point.y / 100) * canvas.height;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Add labels
    ctx.fillStyle = '#64748b';
    ctx.font = '14px sans-serif';
    ctx.fillText('Flow Rate →', canvas.width - 100, canvas.height - 10);
    ctx.save();
    ctx.translate(10, 100);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Efficiency →', 0, 0);
    ctx.restore();
}

// Mobile menu toggle (for future enhancement)
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar .container');
    const navMenu = document.querySelector('.nav-menu');

    if (window.innerWidth <= 768) {
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-btn';
        menuButton.innerHTML = '☰';
        menuButton.style.cssText = `
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--primary);
        `;

        menuButton.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();
