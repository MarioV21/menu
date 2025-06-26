document.addEventListener('DOMContentLoaded', () => {
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const image = document.querySelector('.images');
  const items = document.querySelectorAll('.images .item');
  const contents = document.querySelectorAll('.content .item');
  const arButtons = document.querySelectorAll('.ar-button');

  let active = 0;
  const count = items.length;
  const rotateAdd = 360 / count;
  let rotate = 0;

  function show() {
    image.style.setProperty('--rotate', `${rotate}deg`);
    contents.forEach((c, i) => c.classList.toggle('active', i === active));
    items.forEach((it, i) => it.classList.toggle('active', i === active));
  }

  function nextSlide() {
    active = (active + 1) % count;
    rotate += rotateAdd;
    show();
  }

  function prevSlide() {
    active = (active - 1 + count) % count;
    rotate -= rotateAdd;
    show();
  }

  prev.addEventListener('click', prevSlide);
  next.addEventListener('click', nextSlide);
  setInterval(nextSlide, 3000);
  show();

  // Direct AR activation
  arButtons.forEach(button => {
    button.addEventListener('click', () => {
      const viewer = button.closest('.item').querySelector('model-viewer');
      if (viewer && viewer.activateAR) {
        viewer.activateAR();
      }
    });
  });
});
