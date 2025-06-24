let prev, next, image, items, contents;
let rotate = 0;
let active = 0;
let countItem;
let rotateAdd;
let autoNextInterval;

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

  contents.forEach((content, i) => {
    content.classList.toggle("active", i === active);
  });

  items.forEach((item, i) => {
    item.classList.toggle("active", i === active);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  prev = document.getElementById("prev");
  next = document.getElementById("next");
  image = document.querySelector(".images");
  items = document.querySelectorAll(".images .item");
  contents = document.querySelectorAll(".content .item");

  if (!prev || !next || !image || items.length === 0 || contents.length === 0) {
    console.error("Missing critical elements. Check HTML structure.");
    return;
  }

  countItem = items.length;
  rotateAdd = 360 / countItem;

  prev.onclick = prevSlider;
  next.onclick = nextSlider;

  autoNextInterval = setInterval(nextSlider, 5000);

  // Handle AR buttons
  const arButtons = document.querySelectorAll(".ar-button");
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isAndroid = /Android/i.test(navigator.userAgent);

  arButtons.forEach((btn) => {
    const gltf = btn.dataset.gltf;
    const usdz = btn.getAttribute("href");

    if (isIOS) {
      btn.setAttribute("href", usdz);
      btn.setAttribute("rel", "ar");
    } else if (isAndroid) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const sceneViewerUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(gltf)}&mode=ar_preferred#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=https://yourdomain.com;end;`;
        window.location.href = sceneViewerUrl;
      });
    } else {
      // Hide AR buttons on desktop
      btn.style.display = "none";
    }
  });

  show();
});
