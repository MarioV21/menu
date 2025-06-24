let prev, next, image, items, contents;
let rotate = 0;
let active = 0;
let countItem, rotateAdd, autoNextInterval;

function nextSlider() {
  active = (active + 1) % countItem;
  rotate += rotateAdd;
  show();
}

function prevSlider() {
  active = (active - 1 + countItem) % countItem;
  rotate -= rotateAdd;
  show();
}

function show() {
  image.style.setProperty("--rotate", rotate + "deg");

  contents.forEach((content, key) => {
    content.classList.toggle("active", key === active);
  });

  items.forEach((item, key) => {
    item.classList.toggle("active", key === active);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  prev = document.getElementById("prev");
  next = document.getElementById("next");
  image = document.querySelector(".images");
  items = document.querySelectorAll(".images .item");
  contents = document.querySelectorAll(".content .item");

  if (!prev || !next || !image || items.length === 0 || contents.length === 0) {
    console.error("Critical DOM elements not found.");
    return;
  }

  countItem = items.length;
  rotateAdd = 360 / countItem;

  prev.onclick = prevSlider;
  next.onclick = nextSlider;

  autoNextInterval = setInterval(nextSlider, 3000);

  // AR Button Platform Handling
  const arButtons = document.querySelectorAll(".ar-button");
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  arButtons.forEach(button => {
    const glb = button.dataset.gltf;
    const usdz = button.dataset.usdz;

    if (isAndroid && glb) {
      button.href =
        `intent://arvr.google.com/scene-viewer/1.0?file=${location.origin}/${glb}` +
        `#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;end;`;
    } else if (isIOS && usdz) {
      button.href = usdz;
      button.setAttribute("rel", "ar");
    } else {
      button.style.display = "none"; // Hide on desktop or unsupported
    }
  });

  show();
});
