game();

function game() {
    let isPause = false;
    let animationId = null;

    const speed = 10;

    const car = document.querySelector('.car');
    const trees = document.querySelectorAll('.tree');

    const treesCoords = [];

    for(let i = 0; i < trees.length; i++) {
        const tree = trees[i];
        const coordsTree = getCords(tree);

        treesCoords.push(coordsTree); // добавляю координаты в массив
    }

    animationId = requestAnimationFrame(startGame); //анимация

    function startGame() { // запуск игры
        treesAnimation(); //анимация деревьев

        animationId = requestAnimationFrame(startGame);
    };

    function treesAnimation() { //анимация деревьев

        for(let i = 0; i < trees.length; i++) {
            const tree = trees[i];
            const coords = treesCoords[i];

            let newYCoord = coords.y + speed; //смена координат, каждый раз плюс скорость
        
            if (newYCoord > window.innerHeight) {
                newYCoord = -370; // высота самого большого дерева
            }
            
            treesCoords[i].y = newYCoord;//меняю только у координату

            tree.style.transform = `translate(${coords.x}px, ${newYCoord}px)`; // ставлю новое значение координат
        }

       
    }

    function getCords(element) { //достаю координаты элемента
        const matrix = window.getComputedStyle(element).transform; // достаю стиль
        const array = matrix.split(','); //по запятым
        const y = array[array.length - 1]; //последний элемент
        const x = array[array.length - 2]; //последний элемент
        const numericY = parseFloat(y); //преобразование строки к числу
        const numericX = parseFloat(x); //преобразование к числу
        
        return { x: numericX, y: numericY };
    };

    const gameButton = document.querySelector('.game-button');
    gameButton.addEventListener('click', () => {
        isPause = !isPause;
        if (isPause) {
            cancelAnimationFrame(animationId); // если на паузе, останавливаю работу анимации (стоп функции startGame)
            gameButton.children[0].style.display = 'none';
            gameButton.children[1].style.display = 'initial';
        }
        else {
            animationId = requestAnimationFrame(startGame); // запуск после паузы
            gameButton.children[0].style.display = 'initial';
            gameButton.children[1].style.display = 'none';
        }
    });

};