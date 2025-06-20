// ===== LOADING ANIMATION =====
window.addEventListener('load', function() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 1500);
});

// ===== FLOATING PARTICLES =====
function createFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 25 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ===== SMOOTH SCROLLING =====
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

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(247, 245, 242, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(247, 245, 242, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .hero-card, .stat-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== FORM HANDLING =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.service) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Phone validation (Australian format)
    const phoneRegex = /^(\+61|0)[2-9]\d{8}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        showNotification('Please enter a valid Australian phone number.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Reset form
        this.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Thank you! Your message has been sent successfully. We\'ll contact you soon.', 'success');
        
        // In a real application, you would send the data to your server here
        console.log('Form data:', data);
    }, 2000);
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 1rem 1.5rem;
        border-radius: 10px;
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== DYNAMIC PRICING CALCULATOR =====
function calculatePrice() {
    const service = document.getElementById('service').value;
    const pickup = document.getElementById('pickup').value;
    const delivery = document.getElementById('delivery').value;
    
    if (!service || !pickup || !delivery) return;
    
    // Base prices
    const basePrices = {
        'flower-delivery': 25,
        'cake-transport': 30,
        'document-courier': 20,
        'fragile-delivery': 35,
        'personal-shopping': 40,
        'express-emergency': 50
    };
    
    // Calculate distance (simplified - in real app, use Google Maps API)
    const distance = Math.random() * 20 + 5; // Random distance between 5-25km
    const distanceCharge = Math.max(0, (distance - 10) * 2); // $2 per km after 10km
    
    const basePrice = basePrices[service] || 25;
    const totalPrice = basePrice + distanceCharge;
    
    // Show estimated price (you could add this to the form)
    console.log(`Estimated price: $${totalPrice.toFixed(2)}`);
}

// ===== PHONE NUMBER FORMATTING =====
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Format Australian phone number
    if (value.length >= 10) {
        if (value.startsWith('04')) {
            // Mobile format: 0412 345 678
            value = value.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
        } else if (value.startsWith('0')) {
            // Landline format: (02) 1234 5678
            value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2 $3');
        }
    }
    
    e.target.value = value;
});

// ===== SERVICE SELECTION ENHANCEMENT =====
document.getElementById('service').addEventListener('change', function() {
    calculatePrice();
    
    // Add service-specific form fields or information
    const serviceInfo = {
        'flower-delivery': 'Please specify flower type and any special care instructions in the message field.',
        'cake-transport': 'Please include cake size, tiers, and any special handling requirements.',
        'document-courier': 'Please specify document type and any security requirements.',
        'fragile-delivery': 'Please describe the fragile items and any special packaging needs.',
        'personal-shopping': 'Please provide shopping list and payment method preferences.',
        'express-emergency': 'Please explain the urgency and any time constraints.'
    };
    
    // Show service-specific information
    const selectedService = this.value;
    if (selectedService && serviceInfo[selectedService]) {
        showServiceInfo(serviceInfo[selectedService]);
    } else {
        hideServiceInfo();
    }
});

function showServiceInfo(message) {
    // Remove existing service info
    const existingInfo = document.querySelector('.service-info');
    if (existingInfo) {
        existingInfo.remove();
    }
    
    // Create service info element
    const serviceInfoDiv = document.createElement('div');
    serviceInfoDiv.className = 'service-info';
    serviceInfoDiv.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
    `;
    
    // Style the service info
    serviceInfoDiv.style.cssText = `
        background: rgba(135, 169, 107, 0.1);
        border: 1px solid rgba(135, 169, 107, 0.3);
        border-radius: 8px;
        padding: 1rem;
        margin-top: 0.5rem;
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: var(--text-light);
        animation: fadeInUp 0.3s ease;
    `;
    
    // Add after service select
    const serviceGroup = document.getElementById('service').parentElement;
    serviceGroup.appendChild(serviceInfoDiv);
}

function hideServiceInfo() {
    const existingInfo = document.querySelector('.service-info');
    if (existingInfo) {
        existingInfo.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => existingInfo.remove(), 300);
    }
}

// ===== REAL-TIME FORM VALIDATION =====
const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        // Remove error styling on input
        this.classList.remove('error');
        const errorMsg = this.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validation rules
    switch (field.name) {
        case 'name':
            if (!value) {
                isValid = false;
                errorMessage = 'Name is required';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                isValid = false;
                errorMessage = 'Email is required';
            } else if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
        case 'phone':
            const phoneRegex = /^(\+61|0)[2-9]\d{8}$/;
            const cleanPhone = value.replace(/\s/g, '');
            if (!value) {
                isValid = false;
                errorMessage = 'Phone number is required';
            } else if (!phoneRegex.test(cleanPhone)) {
                isValid = false;
                errorMessage = 'Please enter a valid Australian phone number';
            }
            break;
            
        case 'service':
            if (!value) {
                isValid = false;
                errorMessage = 'Please select a service';
            }
            break;
            
        case 'pickup':
        case 'delivery':
            if (!value) {
                isValid = false;
                errorMessage = 'Address is required';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = 'Please enter a complete address';
            }
            break;
    }
    
    // Show error if invalid
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.cssText = `
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        `;
        errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${errorMessage}`;
        field.parentElement.appendChild(errorDiv);
    }
    
    return isValid;
}

// ===== DELIVERY TIME ESTIMATION =====
function estimateDeliveryTime() {
    const serviceSelect = document.getElementById('service');
    const dateInput = document.getElementById('date');
    
    if (!serviceSelect.value) return;
    
    const now = new Date();
    const selectedDate = dateInput.value ? new Date(dateInput.value) : null;
    
    // Service time requirements
    const serviceTimeRequirements = {
        'flower-delivery': { min: 2, max: 4, sameDay: true },
        'cake-transport': { min: 4, max: 6, sameDay: false },
        'document-courier': { min: 1, max: 2, sameDay: true },
        'fragile-delivery': { min: 3, max: 5, sameDay: true },
        'personal-shopping': { min: 6, max: 8, sameDay: false },
        'express-emergency': { min: 0.5, max: 1, sameDay: true }
    };
    
    const serviceReq = serviceTimeRequirements[serviceSelect.value];
    
    if (serviceReq) {
        let estimatedTime;
        
        if (selectedDate && selectedDate > now) {
            // Future delivery
            estimatedTime = `Scheduled delivery: ${selectedDate.toLocaleDateString()} ${selectedDate.toLocaleTimeString()}`;
        } else {
            // Same day or ASAP delivery
            const minTime = new Date(now.getTime() + (serviceReq.min * 60 * 60 * 1000));
            const maxTime = new Date(now.getTime() + (serviceReq.max * 60 * 60 * 1000));
            
            estimatedTime = `Estimated delivery: ${minTime.toLocaleTimeString()} - ${maxTime.toLocaleTimeString()}`;
        }
        
        // Show estimation (you could add this to the form)
        console.log(estimatedTime);
    }
}



// ===== SCROLL TO TOP BUTTON =====
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px var(--green-shadow);
        transition: var(--transition-smooth);
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// ===== LAZY LOADING FOR IMAGES =====
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ===== PERFORMANCE MONITORING =====
function trackPerformance() {
    // Track page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Track Core Web Vitals if available
        if ('web-vitals' in window) {
            // This would require the web-vitals library
            // getCLS(console.log);
            // getFID(console.log);
            // getLCP(console.log);
        }
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // In production, you might want to send errors to a logging service
    // logError(e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    
    // In production, you might want to send errors to a logging service
    // logError(e.reason);
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    createFloatingParticles();
    createMobileMenu();
    createScrollToTopButton();
    setupLazyLoading();
    trackPerformance();
    
    // Add CSS animations keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #dc3545;
            box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s ease;
            margin-left: auto;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            
            .nav-menu {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: var(--warm-cream);
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .nav-menu.mobile-active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-menu .nav-link {
                padding: 0.75rem 0;
                border-bottom: 1px solid rgba(244, 194, 194, 0.2);
            }
            
            .nav-menu .nav-link:last-child {
                border-bottom: none;
            }
            
            .scroll-to-top {
                bottom: 1rem !important;
                right: 1rem !important;
                width: 45px !important;
                height: 45px !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('Poppy Run website initialized successfully! 🌸');
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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
    }
}

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        calculatePrice,
        estimateDeliveryTime,
        showNotification
    };
}
