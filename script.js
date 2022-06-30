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
            board.appendChild(pixel);
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
            board.appendChild(pixel);
        }
        return board;

}
