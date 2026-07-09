/* ========================================
   CREAMY PUFF'S PERSONAL WEBSITE - JAVASCRIPT
   Interactive features and animations
   ======================================== */

// SMOOTH SCROLLING FOR NAVIGATION LINKS
// This makes the page scroll smoothly when you click a nav link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// SPARKLE ANIMATION ON MOUSE MOVE
// Creates sparkles that follow your mouse cursor
document.addEventListener('mousemove', function(event) {
    // Randomly create sparkles at the cursor position
    if (Math.random() < 0.05) { // 5% chance to create a sparkle
        createSparkle(event.clientX, event.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'mouse-sparkle';
    sparkle.textContent = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '1.5rem';
    sparkle.style.zIndex = '9999';
    
    document.body.appendChild(sparkle);
    
    // Animate the sparkle
    let opacity = 1;
    let size = 1.5;
    const interval = setInterval(() => {
        opacity -= 0.05;
        size -= 0.05;
        sparkle.style.opacity = opacity;
        sparkle.style.fontSize = (size * 1.5) + 'rem';
        
        if (opacity <= 0) {
            clearInterval(interval);
            sparkle.remove();
        }
    }, 30);
}

// FADE IN ANIMATIONS WHEN SECTIONS COME INTO VIEW
// This makes sections appear with a nice animation as you scroll down
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in to all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// CLICK EFFECT - Add a fun effect when you click anywhere
// Creates a small explosion of sparkles!
document.addEventListener('click', function(event) {
    // Don't create sparkles when clicking links
    if (event.target.tagName === 'A') {
        return;
    }
    
    createClickExplosion(event.clientX, event.clientY);
});

function createClickExplosion(x, y) {
    const sparkles = ['✨', '💫', '⭐', '🌟'];
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'fixed';
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.fontSize = '1.5rem';
            sparkle.style.zIndex = '9999';
            
            document.body.appendChild(sparkle);
            
            // Animate explosion outward
            let opacity = 1;
            let distance = 0;
            const angle = (Math.PI * 2 * i) / 3;
            
            const interval = setInterval(() => {
                opacity -= 0.08;
                distance += 3;
                
                const newX = Math.cos(angle) * distance;
                const newY = Math.sin(angle) * distance;
                
                sparkle.style.transform = `translate(${newX}px, ${newY}px)`;
                sparkle.style.opacity = opacity;
                
                if (opacity <= 0) {
                    clearInterval(interval);
                    sparkle.remove();
                }
            }, 20);
        }, i * 50);
    }
}

// WELCOME MESSAGE IN CONSOLE (for debugging and fun!)
console.log('%c✨ Welcome to Creamy Puff\'s Personal Website! ✨', 
    'color: #FF1493; font-size: 16px; font-weight: bold;');
console.log('%cThanks for visiting! Have fun exploring!', 
    'color: #6B4C9A; font-size: 14px;');
