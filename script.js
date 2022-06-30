const gridSize = document.querySelector('#grid-size');
const gridSizeSpan = gridSize.querySelector('span');

console.log(gridSizeSpan);

function createBoard(size) {
    let board = document.querySelector('.board');

    for (let i = 0; i < Math.pow(size, 2); i++) {
        let pixel = document.createElement('div');
        pixel.className = 'pixel';
        board.appendChild(pixel);
    }    
    return board;
}

 console.log(createBoard(8));
