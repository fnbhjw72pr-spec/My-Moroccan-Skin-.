/**
 * MY MOROCCAN SKIN - E-Commerce Script Functionality
 * Implements interactive modules: Sticky Header, Accordion logic, Contact validations & Mobile menus
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Sticky Header Transformation --- */
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* --- 2. Mobile Responsive Menu Toggle --- */
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMobileMenu() {
        mobileToggle.classList.toggle('open');
        mobileOverlay.classList.toggle('open');
        document.body.style.overflow = mobileOverlay.classList.contains('open') ? 'hidden' : '';
    }

    mobileToggle.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileOverlay.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });

    /* --- 3. Accordion Interactive Engine (FAQ) --- */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const content = this.nextElementSibling;
            
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    /* --- 4. Micro Shopping Cart Simulator --- */
    let cartItemCount = 0;
    const cartCountSpan = document.getElementById('cart-count');
    const quickAddButtons = document.querySelectorAll('.quick-add-btn');

    quickAddButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartItemCount++;
            cartCountSpan.textContent = cartItemCount;
            
            const originalText = this.textContent;
            this.textContent = 'Added to Bag';
            this.style.backgroundColor = '#4A5D4E'; // Muted green confirmation state
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 1200);
        });
    });

    /* --- 5. Contact Concierge Form Validation & Response --- */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Transmitting...';
            submitBtn.disabled = true;

            setTimeout(() => {
                formStatus.textContent = "Thank you. Your inquiry has been logged with our London concierge. A representative will contact you shortly.";
                formStatus.className = "form-status success";
                
                contactForm.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    formStatus.textContent = "";
                    formStatus.className = "form-status";
                }, 7000);

            }, 1500);
        });
    }

    /* --- 6. Smooth Native In-Page Section Anchor Tracking --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 70;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
