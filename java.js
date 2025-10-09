document.addEventListener("DOMContentLoaded", () => {
  
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track?.children || []);
  const prevButton = document.querySelector(".carousel-btn.prev");
  const nextButton = document.querySelector(".carousel-btn.next");
  const trackContainer = document.querySelector(".carousel");

  if (track && slides.length > 0) {
    let currentIndex = 0;

    function getSlideWidth() {
      return slides[0].getBoundingClientRect().width + 10; // margem entre slides
    }

    function visibleCount() {
      const containerWidth = trackContainer.offsetWidth;
      return Math.max(1, Math.floor(containerWidth / getSlideWidth()));
    }

    function moveToSlide(index) {
      const visible = visibleCount();
      if (index > slides.length - visible) index = 0;
      if (index < 0) index = slides.length - visible;
      currentIndex = index;
      track.style.transform = `translateX(-${getSlideWidth() * currentIndex}px)`;
    }

    
    prevButton.addEventListener("click", () => moveToSlide(currentIndex - 1));
    nextButton.addEventListener("click", () => moveToSlide(currentIndex + 1));

    
    window.addEventListener("resize", () => moveToSlide(currentIndex));

    
    let startX = 0;
    let isDragging = false;

    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      track.style.transition = "none";
    });

    track.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const diff = e.touches[0].clientX - startX;
      track.style.transform = `translateX(${-getSlideWidth() * currentIndex + diff}px)`;
    });

    track.addEventListener("touchend", (e) => {
      isDragging = false;
      track.style.transition = "transform 0.4s ease-in-out";
      const movedBy = e.changedTouches[0].clientX - startX;
      if (movedBy < -50) moveToSlide(currentIndex + 1);
      else if (movedBy > 50) moveToSlide(currentIndex - 1);
      else moveToSlide(currentIndex);
    });

    moveToSlide(currentIndex);
  }

  // --- Menu mobile ---
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }
});
