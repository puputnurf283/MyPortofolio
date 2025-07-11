document.addEventListener('DOMContentLoaded', function() {
    // Cursor follower
    const cursorFollower = document.querySelector('.cursor-follower');
    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.left = e.pageX + 'px';
        cursorFollower.style.top = e.pageY + 'px';
        
        // Interactive elements effect
        const interactiveElements = document.querySelectorAll('a, button, .card, .tag, .skill-icon, .social-icon');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
                cursorFollower.style.opacity = '0.7';
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.opacity = '1';
            });
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Tutup menu ketika mengklik di luar
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Tambahkan event listener untuk semua link di mobile menu
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
    }

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('hidden');
        
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.style.maxHeight = '0';
        } else {
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
        }
    }

    function closeMobileMenu() {
        mobileMenu.classList.add('hidden');
        mobileMenu.style.maxHeight = '0';
    }

    // Scroll animation
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .skill-icon, .tag');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animation
    document.querySelectorAll('.card, .skill-icon, .tag').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Form submission
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    const textElement = document.getElementById('typing-text');
    const cursorElement = document.querySelector('.typing-cursor');
        
    const texts = [
        "I'm Puput",
        "I'm a Developer"
    ];
        
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
        
    function type() {
        const currentText = texts[textIndex];
            
        if (isDeleting) {
            // Deleting text
            textElement.textContent = "Hello, " + currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing text
            textElement.textContent = "Hello, " + currentText.substring(0, charIndex + 1);
            charIndex++;
        }
            
        if (!isDeleting && charIndex === currentText.length) {
            isEnd = true;
            setTimeout(type, 2000); // Pause at end of typing
            return;
        }
            
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex++;
            if (textIndex >= texts.length) textIndex = 0;
        }
            
        if (isEnd && !isDeleting) {
            isDeleting = true;
            isEnd = false;
            setTimeout(type, 500); // Pause before deleting
            return;
        }
            
        const typingSpeed = isDeleting ? 100 : 150;
        
        setTimeout(type, typingSpeed);
        }
        
        // Start blinking cursor animation
        function blinkCursor() {
            cursorElement.style.opacity = cursorElement.style.opacity === '0' ? '1' : '0';
            setTimeout(blinkCursor, 500);
        }
        
        // Start both animations
        setTimeout(type, 1000); // Initial delay before typing starts
        blinkCursor();
});