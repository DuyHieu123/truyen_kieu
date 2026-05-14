document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scroll cho nút CTA
    document.querySelector('.cta-button').addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });

    // 2. Reveal boxes and footer on scroll
    // Thêm .site-footer vào danh sách các phần tử cần theo dõi
    const elementsToReveal = document.querySelectorAll('.info-box, .site-footer');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        elementsToReveal.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if(elTop < triggerBottom) {
                el.classList.add('show');
                // Nếu dùng class show thì trong CSS cần đổi opacity/transform vào class đó
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});