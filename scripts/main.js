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

    // --- Mobile Highlights Carousel Sync ---
    const highlightsContainer = document.getElementById('highlights-container');
    if (highlightsContainer && phones.length > 0) {
        const phoneObserverOptions = {
            root: highlightsContainer,
            threshold: 0.6,
            rootMargin: '0px'
        };

        const phoneObserver = new IntersectionObserver((entries) => {
            if (window.innerWidth > 768) return;
            
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const position = entry.target.getAttribute('data-position');
                    document.querySelectorAll('.hi-text').forEach(el => el.classList.remove('active'));
                    const activeText = document.getElementById(`hi-text-${position}`);
                    if (activeText) {
                        activeText.classList.add('active');
                    }
                }
            });
        }, phoneObserverOptions);

        phones.forEach(phone => phoneObserver.observe(phone));
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

// --- Telemetry Meal Switcher ---
window.switchMealTelemetry = function(type) {
    const btnAuthentic = document.getElementById('meal-tab-authentic');
    const btnProcessed = document.getElementById('meal-tab-processed');
    const waveformPath = document.getElementById('waveform-path');
    const waveformFill = document.getElementById('waveform-fill');
    const waveformPeakDot = document.getElementById('waveform-peak-dot');
    const waveformBadge = document.getElementById('waveform-badge');

    const valProtein = document.getElementById('val-protein');
    const barProtein = document.getElementById('bar-protein');
    const valGlycemic = document.getElementById('val-glycemic');
    const barGlycemic = document.getElementById('bar-glycemic');
    const valMicro = document.getElementById('val-micro');
    const barMicro = document.getElementById('bar-micro');
    const valCarbon = document.getElementById('val-carbon');
    const barCarbon = document.getElementById('bar-carbon');

    if (type === 'authentic') {
        btnAuthentic?.classList.add('active');
        btnProcessed?.classList.remove('active');

        if (waveformBadge) {
            waveformBadge.textContent = 'Optimal Gradual Response';
            waveformBadge.className = 'waveform-status-badge';
        }

        if (waveformPath) {
            waveformPath.setAttribute('d', 'M0,90 Q 80,85 160,55 T 320,65 T 400,85');
            waveformPath.setAttribute('stroke', 'url(#waveGradientAuthentic)');
        }
        if (waveformFill) {
            waveformFill.setAttribute('d', 'M0,90 Q 80,85 160,55 T 320,65 T 400,85 L 400,120 L 0,120 Z');
            waveformFill.setAttribute('fill', 'url(#fillGradientAuthentic)');
        }
        if (waveformPeakDot) {
            waveformPeakDot.setAttribute('cx', '160');
            waveformPeakDot.setAttribute('cy', '55');
            waveformPeakDot.setAttribute('fill', '#32D74B');
        }

        if (valProtein) valProtein.textContent = '94%';
        if (barProtein) { barProtein.style.width = '94%'; barProtein.className = 'metric-progress-bar progress-teal'; }

        if (valGlycemic) valGlycemic.textContent = 'Steady';
        if (barGlycemic) { barGlycemic.style.width = '88%'; barGlycemic.className = 'metric-progress-bar progress-green'; }

        if (valMicro) valMicro.textContent = '9.6 / 10';
        if (barMicro) { barMicro.style.width = '96%'; barMicro.className = 'metric-progress-bar progress-indigo'; }

        if (valCarbon) valCarbon.textContent = '-380g CO₂';
        if (barCarbon) { barCarbon.style.width = '92%'; barCarbon.className = 'metric-progress-bar progress-green'; }
    } else {
        btnAuthentic?.classList.remove('active');
        btnProcessed?.classList.add('active');

        if (waveformBadge) {
            waveformBadge.textContent = 'Rapid Glycemic Spike Warning';
            waveformBadge.className = 'waveform-status-badge warning';
        }

        if (waveformPath) {
            waveformPath.setAttribute('d', 'M0,95 Q 60,90 120,20 T 260,85 T 400,90');
            waveformPath.setAttribute('stroke', 'url(#waveGradientProcessed)');
        }
        if (waveformFill) {
            waveformFill.setAttribute('d', 'M0,95 Q 60,90 120,20 T 260,85 T 400,90 L 400,120 L 0,120 Z');
            waveformFill.setAttribute('fill', 'url(#fillGradientAuthentic)');
        }
        if (waveformPeakDot) {
            waveformPeakDot.setAttribute('cx', '120');
            waveformPeakDot.setAttribute('cy', '20');
            waveformPeakDot.setAttribute('fill', '#FF453A');
        }

        if (valProtein) valProtein.textContent = '38%';
        if (barProtein) { barProtein.style.width = '38%'; barProtein.className = 'metric-progress-bar progress-red'; }

        if (valGlycemic) valGlycemic.textContent = 'High Spike';
        if (barGlycemic) { barGlycemic.style.width = '25%'; barGlycemic.className = 'metric-progress-bar progress-red'; }

        if (valMicro) valMicro.textContent = '2.1 / 10';
        if (barMicro) { barMicro.style.width = '21%'; barMicro.className = 'metric-progress-bar progress-red'; }

        if (valCarbon) valCarbon.textContent = '+1,200g CO₂';
        if (barCarbon) { barCarbon.style.width = '15%'; barCarbon.className = 'metric-progress-bar progress-red'; }
    }
};
