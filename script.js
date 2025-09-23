/* ==========================
   Particle Effect
========================== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor(x, y, size, color, weight){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(){
        this.y += this.weight;
        this.weight += 0.01;

        if(this.y > canvas.height){
            this.y = 0 - this.size;
            this.weight = Math.random() * 2 + 1;
            this.x = Math.random() * canvas.width;
        }
    }
}

function init(){
    particlesArray = [];
    for(let i = 0; i < 100; i++){
        let size = Math.random() * 5 + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let color = 'rgba(255,182,193,0.7)'; // สีชมพู
        let weight = Math.random() * 2 + 1;
        particlesArray.push(new Particle(x, y, size, color, weight));
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();

// ปรับ canvas เมื่อขนาดหน้าต่างเปลี่ยน
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

/* ==========================
   Interactive Memory Diary
========================== */
const memoryCards = document.querySelectorAll('.memory-card');

memoryCards.forEach(card => {
    const index = card.dataset.index; // ดัชนีของกรอบ
    const textarea = card.querySelector('textarea');

    // โหลดข้อความจาก localStorage ถ้ามี
    const savedText = localStorage.getItem('memory-' + index);
    if(savedText) textarea.value = savedText;

    // บันทึกข้อความลง localStorage เมื่อพิมพ์
    textarea.addEventListener('input', () => {
        localStorage.setItem('memory-' + index, textarea.value);
    });

    // คลิกรูปขยาย Lightbox
    const img = card.querySelector('.memory-img');
    img.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.querySelector('.lightbox-img');
        lightboxImg.src = img.src; // ใส่รูปลง Lightbox
        lightbox.style.display = 'flex';
    });
});

// ปิด Lightbox ด้วยปุ่ม ×
document.getElementById('close-lightbox').addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
});

// ปิด Lightbox ด้วยปุ่ม Esc
window.addEventListener('keydown', e => {
    if(e.key === 'Escape'){
        document.getElementById('lightbox').style.display = 'none';
    }
});

const music = document.getElementById("bg-music");
const playBtn = document.getElementById("play-btn");
const seekBar = document.getElementById("seek-bar");
const volumeBar = document.getElementById("volume-bar");

let isPlaying = false;

// Play/Pause
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    playBtn.textContent = "▶️";
  } else {
    music.play();
    playBtn.textContent = "⏸️";
  }
  isPlaying = !isPlaying;
});

// Update seek bar while playing
music.addEventListener("timeupdate", () => {
  const value = (music.currentTime / music.duration) * 100;
  seekBar.value = value || 0;
});

// Seek functionality
seekBar.addEventListener("input", () => {
  music.currentTime = (seekBar.value / 100) * music.duration;
});

// Volume control
volumeBar.addEventListener("input", () => {
  music.volume = volumeBar.value;
});
