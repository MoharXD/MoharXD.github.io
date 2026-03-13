/**
 * Portfolio Initialization & Interaction Logic
 * Handles Scroll Reveals, 3D Hover Effects, Typing Animation, and Custom Cursor Tails.
 */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. Scroll Reveal Intersection Observer
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


    // ==========================================
    // 2. 3D Tilt Effect (Hardware Accelerated)
    // ==========================================
    const tiltElements = document.querySelectorAll('.tilt-element');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768) {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate rotation degree based on cursor position relative to element center
                const xRotation = -((y - rect.height / 2) / rect.height) * 10;
                const yRotation = ((x - rect.width / 2) / rect.width) * 10;

                element.style.transform = `perspective(1000px) scale(1.02) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
            }
        });

        element.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                element.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                element.style.transform = 'perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)';
            }
        });

        element.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                element.style.transition = 'none';
            }
        });
    });


    // ==========================================
    // 3. Hero Section Typing Animation
    // ==========================================
    const typingTextElement = document.querySelector('.typing-text');

    if (typingTextElement) {
        const textToType = "Mohar Gorai";
        let index = 0;

        const typewriter = () => {
            if (index < textToType.length) {
                typingTextElement.textContent += textToType.charAt(index);
                index++;
                setTimeout(typewriter, 120);
            }
        };

        // Delay init to sync with CSS fade-up animation
        setTimeout(typewriter, 800);
    }


    // ==========================================
    // 4. Ghost Tail Cursor Animation
    // ==========================================
    if (window.innerWidth > 768) {
        let lastX = 0;
        let lastY = 0;
        const MIN_DISTANCE_PX = 12; // Throttle rendering based on mouse movement distance

        /**
         * Spawns a tail node at the given coordinates and triggers its fade animation.
         */
        const createTrailPart = (x, y) => {
            const part = document.createElement('div');
            part.className = 'cursor-trail-part';
            part.style.left = `${x}px`;
            part.style.top = `${y}px`;

            document.body.appendChild(part);

            // Force browser repaint to ensure CSS transition applies correctly
            window.requestAnimationFrame(() => {
                part.classList.add('fade');
            });

            // GC cleanup: Destroy node after transition completes
            setTimeout(() => {
                part.remove();
            }, 400);
        };

        window.addEventListener('mousemove', (e) => {
            const deltaX = Math.abs(e.clientX - lastX);
            const deltaY = Math.abs(e.clientY - lastY);
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance > MIN_DISTANCE_PX) {
                createTrailPart(e.clientX, e.clientY);
                lastX = e.clientX;
                lastY = e.clientY;
            }
        });
    }
});