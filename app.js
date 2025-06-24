// Declare variables globally so they are accessible to functions
let prev;
let next;
let image;
let items; // Refers to the .images .item elements
let contents; // Refers to the .content .item elements

let rotate = 0;
let active = 0;
let countItem;
let rotateAdd;
let autoNext; // Declare autoNext globally to clear it later if needed

// --- Function Definitions ---
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

    // Update active class for content items (right side description)
    contents.forEach((content, key) => {
        if(key == active){
            content.classList.add('active');
        }else{
            content.classList.remove('active');
        }
    });

    // Update active class for image items (left side photos with buttons)
    items.forEach((item, key) => {
        if(key == active){
            item.classList.add('active');
        }else{
            item.classList.remove('active');
        }
    });
}

// --- DOMContentLoaded Listener ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM-dependent variables only after the DOM is fully loaded
    prev = document.getElementById('prev');
    next = document.getElementById('next');
    image = document.querySelector('.images');
    items = document.querySelectorAll('.images .item');
    contents = document.querySelectorAll('.content .item');

    countItem = items.length;
    rotateAdd = 360 / countItem;

    // Connect event listeners to buttons
    next.onclick = nextSlider;
    prev.onclick = prevSlider;
    autoNext = setInterval(nextSlider, 3000); // Start auto-sliding

    // --- Device detection logic ---
    const arButtons = document.querySelectorAll('.ar-button');

    // Basic detection for common mobile/tablet user agents.
    // This aims to hide the AR button only on non-mobile/tablet devices (desktops).
    const isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!isMobileOrTablet) {
        // If it's likely a desktop device, hide all AR buttons
        arButtons.forEach(button => {
            button.style.display = 'none';
        });
    }

    // --- Initial setup ---
    // Call show() once the DOM is fully loaded and variables are initialized
    show();
});