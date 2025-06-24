let prev = document.getElementById('prev');
let next = document.getElementById('next');
let image = document.querySelector('.images');
let items = document.querySelectorAll('.images .item'); // Refers to the .images .item elements
let contents = document.querySelectorAll('.content .item'); // Refers to the .content .item elements

let rotate = 0;
let active = 0;
let countItem = items.length; // Still refers to image items for counting
let rotateAdd = 360 / countItem;

function nextSlider(){
    active = active + 1 > countItem - 1 ? 0 : active + 1;
    rotate = rotate + rotateAdd;
    show();
}

function prevSlider(){
    active = active - 1 < 0 ? countItem - 1 : active - 1;
    rotate = rotate - rotateAdd;
    show();
}

function show(){
    image.style.setProperty("--rotate", rotate + 'deg');

    // Update active class for content items
    contents.forEach((content, key) => {
        if(key == active){
            content.classList.add('active');
        }else{
            content.classList.remove('active');
        }
    });

    // Update active class for image items (this will control button visibility below the photo)
    items.forEach((item, key) => {
        if(key == active){
            item.classList.add('active');
        }else{
            item.classList.remove('active');
        }
    });
}

next.onclick = nextSlider;
prev.onclick = prevSlider;
const autoNext = setInterval(nextSlider, 3000);

// NEW: Device detection to hide AR button on desktop
document.addEventListener('DOMContentLoaded', () => {
    const arButtons = document.querySelectorAll('.ar-button');

    // Basic detection for mobile/tablet user agents.
    // This is not exhaustive but covers most common mobile devices where AR is expected.
    const isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!isMobileOrTablet) {
        // If it's likely a desktop device, hide all AR buttons
        arButtons.forEach(button => {
            button.style.display = 'none';
        });
    }
});

// Initial call to show the first slide and its buttons
show();