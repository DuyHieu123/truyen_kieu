function toggleAnalysis(type) {
    const context = document.getElementById('mega-context');
    const art = document.getElementById('mega-art');
    
    if(type === 'context') {
        context.classList.toggle('active');
    } else {
        art.classList.toggle('active');
    }
}
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
function showPoem() {
    const poem = document.getElementById('poem-popup');
    poem.classList.add('show-poem');
}

// Ngăn sự kiện click vào ô thơ bị lan ra ngoài gây đóng/mở nhầm
document.getElementById('poem-popup').addEventListener('click', function(e) {
    e.stopPropagation();
});

// Đóng ô thơ khi click vào dấu X
document.querySelector('.close-btn').addEventListener('click', function(e) {
    const poem = document.getElementById('poem-popup');
    poem.classList.remove('show-poem');
    e.stopPropagation(); // Ngăn sự kiện click lọt xuống ảnh bìa bên dưới
});
const audio = document.getElementById('kiều-audio');
const btnPlay = document.getElementById('btn-play-audio');
const lines = document.querySelectorAll('.poem-line');

// Hàm bật/tắt nhạc
btnPlay.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        this.innerText = "⏸️ DỪNG NGHE";
    } else {
        audio.pause();
        this.innerText = "▶️ NGHE NGÂM THƠ";
    }
});

// Xử lý đổi màu chữ theo thời gian nhạc
audio.addEventListener('timeupdate', () => {
    let currentTime = audio.currentTime;

    lines.forEach((line, index) => {
        let startTime = parseFloat(line.getAttribute('data-time'));
        let nextLineStartTime = lines[index + 1] ? parseFloat(lines[index + 1].getAttribute('data-time')) : Infinity;

        // Nếu thời gian nhạc nằm trong khoảng của câu thơ này
        if (currentTime >= startTime && currentTime < nextLineStartTime) {
            line.classList.add('speaking');
        } else {
            line.classList.remove('speaking');
        }
    });
});

// Khi kết thúc bài nhạc
audio.addEventListener('ended', () => {
    btnPlay.innerText = "▶️ NGHE NGÂM THƠ";
    lines.forEach(l => l.classList.remove('speaking'));
});

// Đóng popup thì tắt nhạc luôn
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('poem-popup').classList.remove('show-poem');
    audio.pause();
    audio.currentTime = 0; // Quay lại từ đầu
});