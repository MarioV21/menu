let prev, next, image, items, contents;
let rotate = 0;
let active = 0;
let countItem;
let rotateAdd;
let autoNextInterval;

function show() {
  // Rotate the container
  image.style.setProperty("--rotate", rotate + "deg");

  // Toggle active class for content
  contents.forEach((content, key) => {
    if (key === active) content.classList.add("active");
    else content.classList.remove("active");
  });

  // Toggle active class for images (controls button visibility too)
  items.forEach((item, key) => {
    if (key === active) item.classList.add("active");
    else item.classList.remove("active");
  });
}

function nextSlider() {
  active++;
  if (active >= countItem) active = 0;
  rotate += rotateAdd;
  show();
}

function prevSlider() {
  active--;
  if (active < 0) active = countItem - 1;
  rotate -= rotateAdd;
  show();
}

document.addEventListener("DOMContentLoaded", () => {
  prev = document.getElementById("prev");
  next = document.getElementById("next");
  image = document.querySelector(".images");
  items = document.querySelectorAll(".images .item");
  contents = document.querySelectorAll(".content .item");

  if (!prev || !next || !image || items.length === 0 || contents.length === 0) {
    console.error("Required DOM elements missing");
    return;
  }

  countItem = items.length;
  rotateAdd = 360 / countItem;

  prev.onclick = prevSlider;
  next.onclick = nextSlider;

  // Start automatic slider rotation every 3 seconds
  autoNextInterval = setInterval(nextSlider, 3000);

  // Initial display setup
  show();

  // Optional: stop auto sliding on user interaction (uncomment if you want)
  // [prev, next].forEach(btn => btn.addEventListener('click', () => clearInterval(autoNextInterval)));
});
