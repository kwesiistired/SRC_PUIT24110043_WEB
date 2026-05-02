// ===== Initialize on Document Ready =====
document.addEventListener('DOMContentLoaded', function() {
    initHamburgerMenu();
    initVisitorCounter();
    initSearch();
    initFormHandling();
    initCaptcha();
    initAccessibility();
});

// ===== Hamburger Menu =====
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (!hamburger) return;

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
    });

    // Close menu when link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

// ===== Visitor Counter =====
function initVisitorCounter() {
    const visitorCountElement = document.getElementById('visitorCount');
    if (!visitorCountElement) return;

    let visitCount = localStorage.getItem('srcAcademyVisitors');
    if (!visitCount) {
        visitCount = 0;
    }
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('srcAcademyVisitors', visitCount);
    visitorCountElement.textContent = visitCount;
}

// ===== Search Functionality (jQuery-based) =====
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const sportsGrid = document.getElementById('sportsGrid');

    if (!searchInput || !sportsGrid) return;

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        const cards = sportsGrid.querySelectorAll('.sport-card');

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            const dataAttrs = card.getAttribute('data-sport') || '';

            if (query === '' || text.includes(query) || dataAttrs.includes(query)) {
                card.style.display = '';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ===== Form Handling with Validation =====
function initFormHandling() {
    const forms = document.querySelectorAll('form[class*="form"]');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validateForm(this)) {
                showFormMessage(this, 'Form submitted successfully! A confirmation will be sent.', 'success');
                // Reset form after 2 seconds
                setTimeout(() => {
                    this.reset();
                    removeFormMessage(this);
                }, 2000);
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

    inputs.forEach(input => {
        if (input.type === 'email') {
            if (!isValidEmail(input.value)) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        } else if (input.value.trim() === '') {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showFormMessage(form, message, type) {
    let messageDiv = form.querySelector('.form-message');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        form.insertBefore(messageDiv, form.firstChild);
    }
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
}

function removeFormMessage(form) {
    const messageDiv = form.querySelector('.form-message');
    if (messageDiv) {
        messageDiv.style.display = 'none';
    }
}

// ===== CAPTCHA Implementation =====
function initCaptcha() {
    const captchaContainers = document.querySelectorAll('.captcha-container');

    captchaContainers.forEach(container => {
        generateCaptcha(container);
    });
}

function generateCaptcha(container) {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const correctAnswer = num1 + num2;

    // Store answer in data attribute
    container.setAttribute('data-captcha-answer', correctAnswer);

    // Update display
    const questionSpan = container.querySelector('.captcha-question');
    if (questionSpan) {
        questionSpan.textContent = `${num1} + ${num2}`;
    }
}

function verifyCaptcha(answer, expectedAnswer) {
    return parseInt(answer) === parseInt(expectedAnswer);
}

// ===== Accessibility Enhancements =====
function initAccessibility() {
    // Add keyboard navigation for cards
    const cards = document.querySelectorAll('.sport-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const link = this.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
    });

    // Add focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('navMenu');
            if (hamburger && navMenu.classList.contains('active')) {
                hamburger.click();
            }
        }
    });

    // Improve focus visibility
    addFocusStyles();
}

function addFocusStyles() {
    const style = document.createElement('style');
    style.textContent = `
        button:focus,
        a:focus,
        input:focus,
        textarea:focus,
        select:focus {
            outline: 3px solid #f2b441;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

// ===== Search Content Function (for inline calls) =====
function searchContent() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.dispatchEvent(new Event('input'));
    }
}

// ===== Form Submission Handler (for inline onclick) =====
function submitBookingForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.dispatchEvent(new Event('submit'));
    }
}

// ===== Smooth Scroll Support =====
if (!('scrollBehavior' in document.documentElement.style)) {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
}

// ===== Page Load Analytics (Optional) =====
function trackPageLoad() {
    const pageName = document.body.getAttribute('data-page') || 'Unknown Page';
    console.log(`Page loaded: ${pageName}`);
}

trackPageLoad();

// ===== Utility: Format Phone Number =====
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 0) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
    input.value = value;
}

// ===== Export Functions for Global Use =====
window.searchContent = searchContent;
window.submitBookingForm = submitBookingForm;
window.formatPhoneNumber = formatPhoneNumber;
