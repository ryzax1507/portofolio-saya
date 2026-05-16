// Efek Parallax/Floating untuk sticker pada mouse move
const stickers = document.querySelectorAll('.floating-sticker');

document.addEventListener('mousemove', (e) => {
    // Kalkulasi pergerakan ringan
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;

    stickers.forEach((sticker) => {
        // Ambil rotasi aslinya dari css variable --rot (di-set di inline style HTML)
        const rot = sticker.style.getPropertyValue('--rot') || '-10deg';
        sticker.style.transform = `translate(${x}px, ${y}px) rotate(${rot})`;
    });
});

// Smooth Scrolling 
document.querySelectorAll('.nav-links a, .btn-black[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if(!targetId || !targetId.startsWith('#')) return;
        
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Offset untuk floating navbar berbentuk pill
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Modal Logic
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable background scrolling
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Autoplay Background Music fix for modern browsers
document.addEventListener('click', function() {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(error => {
            console.log("Audio play failed:", error);
        });
    }
}, { once: true });
