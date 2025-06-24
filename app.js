let prev = document.getElementById('prev');
let next = document.getElementById('next');
let image = document.querySelector('.images');
let items = document.querySelectorAll('.images .item');
let contents = document.querySelectorAll('.content .item');
let arButton = document.getElementById('arButton'); // NEW: Get reference to the single AR button

let rotate = 0;
let active = 0;
let countItem = items.length;
let rotateAdd = 360 / countItem;

// Since all your products use the same AR model, we can define it once
const commonArModel = {
    usdz: 'ar_models/Sushi.usdz',
    glb: 'ar_models/Sushi.glb'
};

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

    // NEW: Update the single AR button's links for the active slide
    arButton.href = commonArModel.usdz;
    arButton.dataset.gltf = commonArModel.glb;

    contents.forEach((content, key) => {
        if(key == active){
            content.classList.add('active');
        }else{
            content.classList.remove('active');
        }
    });
}

next.onclick = nextSlider;
prev.onclick = prevSlider;
const autoNext = setInterval(nextSlider, 3000);