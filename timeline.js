// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLB = document.getElementById("close-lightbox");

document.querySelectorAll(".timeline-img").forEach(img=>{
  img.addEventListener("click", e=>{
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

closeLB.addEventListener("click", ()=> lightbox.style.display="none");
lightbox.addEventListener("click", e=>{ if(e.target===lightbox) lightbox.style.display="none"; });

const timelineItems = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
},{
  threshold:0.3
});

timelineItems.forEach(item=>{
  observer.observe(item);
});