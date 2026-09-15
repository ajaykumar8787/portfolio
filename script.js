document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       Mobile Navigation Toggle
       ========================================================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* ==========================================================================
       Navbar Scroll Effect
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       Typing Animation Effect
       ========================================================================== */
    const typedTextSpan = document.querySelector('.typed-text');
    
    const textArray = [
        "Full Stack Developer", 
        "MERN Stack Developer", 
        "Problem Solver", 
        "B.Tech CSE @ IIIT Kota"
    ];
    
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start typing effect on load
    if (typedTextSpan) {
        setTimeout(type, newTextDelay + 250);
    }

    /* ==========================================================================
       Scroll Reveal Animation (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('active');
            // Optional: Stop observing once revealed
            // observer.unobserve(entry.target); 
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    /* ==========================================================================
       Active Navigation Link on Scroll (Scroll Spy)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjustment for navbar height
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       Back to Top Button
       ========================================================================== */
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    /* ==========================================================================
       Form Submission Prevention (Placeholder)
       ========================================================================== */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Just visual feedback since there's no backend specified
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Sent Successfully! <i class="fa-solid fa-check"></i>';
            btn.classList.add('btn-success'); // Assuming you might add this class in CSS later
            btn.style.backgroundColor = '#10b981';
            btn.style.borderColor = '#10b981';
            
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
            }, 3000);
        });
    }
});
