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

    // NEW: Update active class for image items (this will control button visibility)
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

// Initial call to show the first slide and its buttons
show();