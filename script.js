var isDrawing = false;
var useRGB = false;
var penColor = 'black';//black
var size = 16;
createBoard();

var colors =
    ["#F18F99", "#FABFA5", "#FFEC7A", "#6BFEB0", "#6CB5FF", "#B59EF6", "#D375F9",
        "#ED707C", "#F9AD89", "#FFE756", "#23FF88", "#40A2FF", "#9E83F4", "#C451F4",
        "#E64A57", "#F79466", "#FEDF27", "#01EC6C", "#118AFF", "#845BF0", "#B224F1",
        "#E01D2E", "#F4793D", "#F2D200", "#00B453", "#0071DD", "#6334EC", "#980DD4",
        "#B01424", "#F3570E", "#BBA000", "#027B3A", "#0052A3", "#4713D8", "#720A9E",
        "#7F0F1C", "#BD4409", "#857200", "#004C24", "#01376D", "#3610A5", "#4E066A",
        "#520912", "#893107", "#534700", "#002812", "#00213F", "#240974", "#2D0340"];


//counter used to track if site is using light or dark theme. Theme depends if its even or odd
const num = document.getElementById('num');
var counter = 0;
num.innerHTML = counter;



var gridSlider = document.getElementById("myRange");
var output1 = document.getElementById("num1"),
    output2 = document.getElementById("num2");

output1.innerHTML = gridSlider.value; // Display the default slider value
output2.innerHTML = gridSlider.value; // Display the default slider value


// Update the current slider value (each time you drag the slider handle)
gridSlider.oninput = function () {
    output1.innerHTML = this.value;
    output2.innerHTML = this.value;
    clearBoard();
    size = this.value;
    createBoard();
}


//retrieve values from rgb sliders and use them to create pen color and change preview box color
var input = document.querySelectorAll("input");
for (const element of input) {
    element.addEventListener("input", function () {
        let red = document.getElementById("red").value,
            green = document.getElementById("green").value,
            blue = document.getElementById("blue").value;
        let display = document.getElementById("color-preview");
        display.style.background = `rgb(${red},${green},${blue})`;

        let applyBtn = document.querySelector('#apply-button');
        applyBtn.addEventListener('click', () => {
            eraserBtn.classList.remove('using-eraser');
            rgbBtn.classList.remove('rgb-animation');
            penColor = `rgb(${red},${green},${blue})`
            useRGB = false;
        });
    });
}


//randomly choose a color to be used when the RGB button is active
const rgbList = ["#ff2400", "#e81d1d", "#e8b71d", "#e3e81d",
                 "#1de840", "#1ddde8", "#2b1de8", "#dd00f3"];
let randomColor = () => rgbList[Math.floor(Math.random() * 8)];


//eventListeners for Buttons
let eraserBtn = document.querySelector('#eraser');
eraserBtn.addEventListener('click', () => {
    penColor = 'white';
    eraserBtn.classList.add('using-eraser');
    rgbBtn.classList.remove('rgb-animation');
    useRGB = false;

});

let resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', () => {
    resetButton();
    eraserBtn.classList.remove('using-eraser');
    useRGB = false;


});

let blackBtn = document.querySelector('#black');
blackBtn.addEventListener('click', () => {
    penColor = 'black';
    rgbBtn.classList.remove('rgb-animation');
    eraserBtn.classList.remove('using-eraser');
    useRGB = false;
});


let rgbBtn = document.querySelector('#rgb');
rgbBtn.addEventListener('click', () => {
    rgbBtn.classList.add('rgb-animation');
    eraserBtn.classList.remove('using-eraser');
    useRGB = true;

});

let fourBtn = document.querySelector('#four');
fourBtn.addEventListener('click', () => {
    clearBoard();
    size = 4;
    createBoard();
    updateGridSlider()

})

let eightBtn = document.querySelector('#eight');
eightBtn.addEventListener('click', () => {
    clearBoard();
    size = 8;
    createBoard();
    updateGridSlider()
})

let sixteenBtn = document.querySelector('#sixteen');
sixteenBtn.addEventListener('click', () => {
    clearBoard();
    size = 16;
    createBoard();
    updateGridSlider()
})

let thirtytwoBtn = document.querySelector('#thirtytwo');
thirtytwoBtn.addEventListener('click', () => {
    clearBoard();
    size = 32;
    createBoard();
    updateGridSlider()
})

let sixtyfourBtn = document.querySelector('#sixtyfour');
sixtyfourBtn.addEventListener('click', () => {
    clearBoard();
    size = 64;
    createBoard();
    updateGridSlider();
})


//create canvas to be drawn on by the user
function createBoard() {
    let board = document.querySelector('.board');
    board.setAttribute('style', `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr)`);
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
            buildPixel(pixel);
            board.append(pixel);
            draw(pixel);

        }
        return board;
    } else {
        return;
    }
}




//color picker grid for the left menu
buildColorPicker()
function buildColorPicker() {
    let grid = document.querySelector('.color-picker-grid');
    grid.setAttribute('style', 'grid-template-columns: repeat(7, 1fr); grid-template-rows: repeat(7, 1fr)');

    for (let i = 0; i < Math.pow(7, 2); i++) {
        let cPixel = document.createElement('div');
        cPixel.className = 'cPixel';
        cPixel.setAttribute('style', `background-color: ${colors[i]}`);

        cPixel.addEventListener('click', () => {
            penColor = colors[i];
            rgbBtn.classList.remove('rgb-animation');
            eraserBtn.classList.remove('using-eraser');
            useRGB = false;
        })
        grid.append(cPixel);

    }
}

//calculates and sets the size of each pixel.
function buildPixel(pixel) {
    let pixelLength = (696 / size) - 2;

    return pixel.setAttribute('style', `width: ${pixelLength}px; height: ${pixelLength}px;`);
}


//function that gives the user drawing capabilties, and will also determine which color pen should be used
function draw(pixel) {
    pixel.addEventListener('mousedown', () => {
        if (useRGB === true) {
            pixel.setAttribute('style', `background-color: ${randomColor()}`)

        } else if (useRGB === false) { pixel.setAttribute('style', `background-color: ${penColor}`); }
    });
    pixel.addEventListener('mouseover', () => {
        if (isDrawing) {
            pixel.setAttribute('style', `background-color: ${penColor}`);
            if (useRGB === true) {
                pixel.setAttribute('style', `background-color: ${randomColor()}`);
            }
        }
        if (!isDrawing) {
            return;
        }
    });


}

//clears board while retaining the grid size
function resetButton() {
    penColor = 'black';
    let pixel = document.querySelectorAll('.pixel');
    pixel.forEach(el => el.setAttribute('style', 'background-color: white'));
}

//clears the board of all pixels so that a new one can be generated when certain buttons are clicked
function clearBoard() {
    let pixel = document.querySelectorAll('.pixel');
    pixel.forEach(el => el.remove());
}

/*when the button to resize a grid is clicked by the user, the location of the grid slider will change,
and should also update the text showing the dimension of the grid*/
function updateGridSlider() {
    gridSlider.setAttribute('value', `${size}`);
    output1.innerHTML = size;
    output2.innerHTML = size;

}

//Only monsters use light theme
function toggleTheme() {
    num.innerHTML = counter++;

    if (num.innerHTML % 2 === 0) {
        darkMode();

    } else {
        lightMode();

    }
}

function darkMode() {
    document.body.setAttribute('style', 'background-color: #38404A;color: white');
    document.querySelector('.header').setAttribute('style', 'background-color: #181921');
    document.querySelector('#black').setAttribute('style', 'background-color: #181921; color: white;');
    document.querySelector('#rgb').setAttribute('style', 'background-color: #181921; color: white;');
    document.querySelector('#reset').setAttribute('style', 'background-color: #181921; color: white;');
    document.querySelector('#eraser').setAttribute('style', 'background-color: #181921; color: white;');
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
    document.querySelector('#black').setAttribute('style', 'background-color: white; color: black;');
    document.querySelector('#rgb').setAttribute('style', 'background-color: white; color: black;');
    document.querySelector('#reset').setAttribute('style', 'background-color: white; color: black;');
    document.querySelector('#eraser').setAttribute('style', 'background-color: white; color: black;');
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