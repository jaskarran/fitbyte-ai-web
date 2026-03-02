document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.85)';
            header.style.boxShadow = 'none';
        }
    });

    // --- Phone Mockup Shuffle ---
    const phones = document.querySelectorAll('.highlights-mockup-container .hm-phone');

    if (phones.length === 3) {
        phones.forEach(phone => {
            phone.addEventListener('click', function () {
                // Ignore clicks if it's already in the center (or if we're on mobile stacked layout)
                if (this.classList.contains('is-center') || window.innerWidth <= 768) return;

                const currentCenter = Array.from(phones).find(p => p.classList.contains('is-center'));

                // Swap the classes between the clicked phone and the center phone
                const clickedClass = this.classList.contains('is-left') ? 'is-left' : 'is-right';
                const clickedPosition = this.getAttribute('data-position');
                const centerPosition = currentCenter.getAttribute('data-position');

                this.classList.remove(clickedClass);
                this.classList.add('is-center');

                currentCenter.classList.remove('is-center');
                currentCenter.classList.add(clickedClass);

                // Update Text Descriptions
                document.querySelectorAll('.hi-text').forEach(el => el.classList.remove('active'));
                document.getElementById(`hi-text-${clickedPosition}`).classList.add('active');
            });
        });
    }

    // --- Hero Parallax Effect ---
    const hero = document.getElementById('home');
    const parallaxTarget = document.querySelector('.parallax-target');

    if (hero && parallaxTarget) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calculate offset (very subtle)
            const moveX = (clientX - innerWidth / 2) / innerWidth * 25;
            const moveY = (clientY - innerHeight / 2) / innerHeight * 25;

            parallaxTarget.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        // Reset on mouse leave
        hero.addEventListener('mouseleave', () => {
            parallaxTarget.style.transform = `translate(0, 0)`;
        });
    }

});
