defaultBoard();


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
function defaultBoard(){
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
    let pixelLength = (696/size)-2;

    return pixel.setAttribute('style', `width: ${pixelLength}px; height: ${pixelLength}px;`);
}

// createBoard(2);
