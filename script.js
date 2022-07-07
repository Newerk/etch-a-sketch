defaultBoard();
var isDrawing = false;

//default values
var penColor = 'black';//black

//Colors used to fill color picker grid, and will be used to assign pixel color when selected by the user
var colors =
    ["#F18F99", "#FABFA5", "#FFEC7A", "#6BFEB0", "#6CB5FF", "#B59EF6", "#D375F9",
        "#ED707C", "#F9AD89", "#FFE756", "#23FF88", "#40A2FF", "#9E83F4", "#C451F4",
        "#E64A57", "#F79466", "#FEDF27", "#01EC6C", "#118AFF", "#845BF0", "#B224F1",
        "#E01D2E", "#F4793D", "#F2D200", "#00B453", "#0071DD", "#6334EC", "#980DD4",
        "#B01424", "#F3570E", "#BBA000", "#027B3A", "#0052A3", "#4713D8", "#720A9E",
        "#7F0F1C", "#BD4409", "#857200", "#004C24", "#01376D", "#3610A5", "#4E066A",
        "#520912", "#893107", "#534700", "#002812", "#00213F", "#240974", "#2D0340"];


const num = document.getElementById('num');

//counter used to track if site is using light or dark theme. Theme depends if its even or odd
var counter = 0;
num.innerHTML = counter;

const gridSize = document.querySelector('#grid-size');
const gridSizeSpan = gridSize.querySelector('span');



/*--------------------------------------------------------------------------------------------------------------------------*/
var slider = document.getElementById("myRange");
var output1 = document.getElementById("num1"),
    output2 = document.getElementById("num2");

output1.innerHTML = slider.value; // Display the default slider value
output2.innerHTML = slider.value; // Display the default slider value


// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    output1.innerHTML = this.value;
    output2.innerHTML = this.value;

}



var input = document.querySelectorAll("input");
for (const element of input) {
    element.addEventListener("input", function () {
        var red = document.getElementById("red").value,
            green = document.getElementById("green").value,
            blue = document.getElementById("blue").value;
        var display = document.getElementById("color-preview");
        display.style.background = `rgb(${red},${green},${blue})`;
    });
}


/*--------------------------------------------------------------------------------------------------------------------------*/



//eventListeners for Buttons
let eraseBtn = document.querySelector('.erase');
eraseBtn.addEventListener('click', () => {
    eraseButton();
});


// let customBtn = document.querySelector('.custom');
// customBtn.addEventListener('click', () => {
//     //insert code here that will open up the color picker menu
// });


//color picker grid for the left menu

buildColorPicker()//run function when site loads, but will later have this open when "custom" button is clicked
function buildColorPicker() {
    let grid = document.querySelector('.color-picker-grid');
    grid.setAttribute('style', 'grid-template-columns: repeat(7, 1fr); grid-template-rows: repeat(7, 1fr)');

    for (let i = 0; i < Math.pow(7, 2); i++) {
        let cPixel = document.createElement('div');
        cPixel.className = 'cPixel';
        cPixel.setAttribute('style', `background-color: ${colors[i]}`);
        grid.append(cPixel);

    }
}


//user can enter a custom pixel density for the board
function createBoard(size) {
    let board = document.querySelector('.board');
    board.setAttribute('style', `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr)`);
    gridSizeSpan.textContent = `${size} x ${size}`;
    board.addEventListener('mousedown', () => {
        isDrawing = true;
    })
    board.addEventListener('mouseup', () => {
        isDrawing = false;
    })

    if (size > 0 && size <= 100) {
        for (let i = 0; i < Math.pow(size, 2); i++) {
            let pixel = document.createElement('div');
            pixel.className = 'pixel';
            buildPixel(pixel, size);
            board.append(pixel);
            draw(pixel);

        }
        return board;
    } else {
        return;
    }
}

// createBoard(40);



//Upon loading of webpage, the default board size will be 16x16
function defaultBoard() {
    let board = document.querySelector('.board');
    board.setAttribute('style', `grid-template-columns: repeat(16, 1fr); grid-template-rows: repeat(16, 1fr)`);
    board.addEventListener('mousedown', () => {
        isDrawing = true;
    })
    board.addEventListener('mouseup', () => {
        isDrawing = false;
    })

    for (let i = 0; i < Math.pow(16, 2); i++) {
        let pixel = document.createElement('div');
        pixel.className = 'pixel';
        buildPixel(pixel, 16);
        board.append(pixel);
        draw(pixel);
    }
    return board;
}


//write a function that calculates and sets the size of each pixel. will set the style in this function
function buildPixel(pixel, size) {
    let pixelLength = (696 / size) - 2;

    return pixel.setAttribute('style', `width: ${pixelLength}px; height: ${pixelLength}px;`);
}


function toggleTheme() {
    num.innerHTML = counter++;

    if (num.innerHTML % 2 === 0) {
        darkMode();

    } else {
        lightMode();

    }
}

/*as of now, the default color is black and has one parameter. later on this will also take a color parameter so that the user can
choose the color of the ink OR it only has 1 parameter, but the attribute uses a global color variable  to set the color*/
function draw(pixel) {
    pixel.addEventListener('mousedown', () => pixel.setAttribute('style', 'background-color: black'));
    pixel.addEventListener('mouseover', () => {
        if (isDrawing) {
            pixel.setAttribute('style', 'background-color: black');
        }
        if (!isDrawing) {
            return;
        }
    });

}

function eraseButton() {
    let pixel = document.querySelectorAll('.pixel');
    pixel.forEach(el => el.setAttribute('style', 'background-color: white'));
}

function darkMode() {
    document.body.setAttribute('style', 'background-color: #38404A;color: white');
    document.querySelector('.header').setAttribute('style', 'background-color: #181921');
    document.querySelector('#custom').setAttribute('style', 'background-color: #181921; color: white;');
    document.querySelector('#grid-size').setAttribute('style', 'background-color: #181921; color: white;');
    document.querySelector('#black').setAttribute('style', 'background-color: #181921; color: white;');
    document.querySelector('#rgb').setAttribute('style', 'background-color: #181921; color: white;');
    document.querySelector('.erase').setAttribute('style', 'background-color: #181921; color: white;');
    document.querySelector('.slider').setAttribute('style', 'background-color: #38404A');

    //hover effects for buttons
    document.querySelector('.slider').addEventListener('mouseenter', () => {
        document.querySelector('.slider').setAttribute('style', 'background-color: #E90100')
    });
    document.querySelector('.slider').addEventListener('mouseleave', () => {
        document.querySelector('.slider').setAttribute('style', 'background-color: #38404A')
    });

    //menus
    document.querySelector('.right-menu').setAttribute('style', 'background-color: #181921');
    document.querySelector('.left-menu').setAttribute('style', 'background-color: #181921');
    document.querySelector('#four').setAttribute('style', 'background-color: #38404A; color: white');
    document.querySelector('#eight').setAttribute('style', 'background-color: #38404A; color: white');
    document.querySelector('#sixteen').setAttribute('style', 'background-color: #38404A; color: white');
    document.querySelector('#thirtytwo').setAttribute('style', 'background-color: #38404A; color: white');
    document.querySelector('#sixtyfour').setAttribute('style', 'background-color: #38404A; color: white');
    document.querySelector('#apply-button').setAttribute('style', 'background-color: #38404A; color: white');




}

function lightMode() {
    document.body.setAttribute('style', 'background-color: #white ;color: black');
    document.querySelector('.header').setAttribute('style', 'background-color: #D9D9D9');
    document.querySelector('#custom').setAttribute('style', 'background-color: white; color: black;');
    document.querySelector('#grid-size').setAttribute('style', 'background-color: white; color: black;');
    document.querySelector('#black').setAttribute('style', 'background-color: white; color: black;');
    document.querySelector('#rgb').setAttribute('style', 'background-color: white; color: black;');
    document.querySelector('.erase').setAttribute('style', 'background-color: white; color: black;');
    document.querySelector('.slider').setAttribute('style', 'background-color: white;');

    //hover effects for buttons
    document.querySelector('.slider').addEventListener('mouseenter', () => {
        document.querySelector('.slider').setAttribute('style', 'background-color: #E90100')
    });
    document.querySelector('.slider').addEventListener('mouseleave', () => {
        document.querySelector('.slider').setAttribute('style', 'background-color: white')
    });

    //menus
    document.querySelector('.right-menu').setAttribute('style', 'background-color: #D9D9D9');
    document.querySelector('.left-menu').setAttribute('style', 'background-color: #D9D9D9');
    document.querySelector('#four').setAttribute('style', 'background-color: white; color: black');
    document.querySelector('#eight').setAttribute('style', 'background-color: white; color: black');
    document.querySelector('#sixteen').setAttribute('style', 'background-color: white; color: black');
    document.querySelector('#thirtytwo').setAttribute('style', 'background-color: white; color: black');
    document.querySelector('#sixtyfour').setAttribute('style', 'background-color: white; color: black');
    document.querySelector('#apply-button').setAttribute('style', 'background-color: white; color: black');



}