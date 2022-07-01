defaultBoard();
const num = document.getElementById('num');

var counter = 0;
num.innerHTML = counter;



function toggleFunction() {
   num.innerHTML = counter++;

   if (num.innerHTML % 2 === 0) {
    darkMode();

   } else{
    lightMode();

   }

}


//eventlisteners for clickable buttons on page
// let topButtons = document.querySelector('.top');
// topButtons.addEventListener('click', function(e) {

//     if (e.target.id === 'custom') {
//         document.body.setAttribute('style', 'background-color: yellow');
//     }   
// });
function darkMode() {
    document.body.setAttribute('style', 'background-color: #38404A;color: white');
    document.querySelector('.header').setAttribute('style', 'background-color: #181921');
    document.querySelector('#custom').setAttribute('style', 'background-color: #181921; color: white;');
    document.querySelector('#grid-size').setAttribute('style', 'background-color: #181921; color: white;');
    document.querySelector('#black').setAttribute('style', 'background-color: #181921; color: white;');
    document.querySelector('#rgb').setAttribute('style', 'background-color: #181921; color: white;');
    document.querySelector('.erase').setAttribute('style', 'background-color: #181921; color: white;');
}

function lightMode() {
    document.body.setAttribute('style', 'background-color: #white ;color: blacks');

    document.querySelector('.header').setAttribute('style', 'background-color: #D9D9D9');
    document.querySelector('#custom').setAttribute('style', 'background-color: white; color: black;');
    document.querySelector('#grid-size').setAttribute('style', 'background-color: white; color: black;');
    document.querySelector('#black').setAttribute('style', 'background-color: white; color: black;');
    document.querySelector('#rgb').setAttribute('style', 'background-color: white; color: black;');
    document.querySelector('.erase').setAttribute('style', 'background-color: white; color: black;');

}







const gridSize = document.querySelector('#grid-size');
const gridSizeSpan = gridSize.querySelector('span');

//user can enter a custom pixel density for the board
function createBoard(size) {
    let board = document.querySelector('.board');
    gridSizeSpan.textContent = `${size} x ${size}`;

    if (size > 0 && size <= 100) {
        for (let i = 0; i < Math.pow(size, 2); i++) {
            let pixel = document.createElement('div');
            pixel.className = 'pixel';
            buildPixel(pixel, size);
            board.append(pixel);
        }
        return board;
    } else {
        return;
    }
}


//Upon loading of webpage, the default board size will be 16x16
function defaultBoard() {
    let board = document.querySelector('.board');

    for (let i = 0; i < Math.pow(16, 2); i++) {
        let pixel = document.createElement('div');
        pixel.className = 'pixel';
        buildPixel(pixel, 16);
        board.append(pixel);
    }

    return board;
}


//write a function that calculates and sets the size of each pixel. will set the style in this function
function buildPixel(pixel, size) {
    let pixelLength = (696 / size) - 2;

    return pixel.setAttribute('style', `width: ${pixelLength}px; height: ${pixelLength}px;`);
}

// createBoard(2);
