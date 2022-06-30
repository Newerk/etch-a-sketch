function createBoard(size) {
    // let arr = [];
    let items = document.querySelector('.board');

    for (let i = 0; i < Math.pow(size, 2); i++) {
        items.appendChild(document.createElement('div'));
    }    
    return items;
}

 console.log(createBoard(2));
