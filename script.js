// Floating hearts canvas animation
function initHearts() {
    const canvas = document.getElementById('heartsCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = [];
    for (let i = 0; i < 20; i++) {
        hearts.push({
            x: Math.random() * canvas.width,
            y: canvas.height + 100,
            size: Math.random() * 20 + 10,
            speed: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.7 + 0.3
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(heart => {
            heart.y -= heart.speed;
            heart.opacity -= 0.005;
            
            ctx.save();
            ctx.globalAlpha = heart.opacity;
            ctx.font = `${heart.size}px Arial`;
            ctx.fillText('💖', heart.x, heart.y);
            ctx.restore();
            
            if (heart.y < 0 || heart.opacity <= 0) {
                heart.y = canvas.height + 100;
                heart.opacity = Math.random() * 0.7 + 0.3;
            }
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// No button dodge effect
const noBtn = document.getElementById('noBtn');
if (noBtn) {
    noBtn.addEventListener('mouseover', () => {
        const maxX = window.innerWidth - noBtn.offsetWidth;
        const maxY = window.innerHeight - noBtn.offsetHeight;
        noBtn.style.left = Math.random() * maxX + 'px';
        noBtn.style.top = Math.random() * maxY + 'px';
    });
    
    document.getElementById('yesBtn').onclick = () => {
        window.location.href = 'yes.html';
    };
}

// Slideshow functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (nextBtn) nextBtn.onclick = nextSlide;
    if (prevBtn) prevBtn.onclick = prevSlide;

    // Auto slideshow
    setInterval(nextSlide, 4000);
}

// Confetti effect on yes page
function initConfetti() {
    if (document.querySelector('.confetti')) {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${['#ff6b6b', '#feca57', '#ff9ff3', '#54a0ff'][Math.floor(Math.random()*4)]};
                top: -10px;
                left: ${Math.random() * 100}vw;
                animation: fall linear infinite;
                z-index: 1000;
            `;
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            document.querySelector('.confetti').appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initHearts();
    if (document.querySelector('.slideshow-container')) {
        initSlideshow();
        initConfetti();
    }
});

// Responsive canvas resize
window.addEventListener('resize', () => {
    const canvas = document.getElementById('heartsCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
