game();

function game() {
    let isPause = false;
    let animationId = null;

    const speed = 3;

    const car = document.querySelector('.car');
    const trees = document.querySelectorAll('.tree');

    const tree1 = trees[0]; // достал дерево

    animationId = requestAnimationFrame(startGame); //анимация

    function startGame() { // запуск игры

        treesAnimation(); //анимация деревьев

        animationId = requestAnimationFrame(startGame);
    };

    function treesAnimation() { //анимация деревьев
        const coords = getCords(tree1); //достаю координаты первого дерева
        const newCoordY = coords.y + speed; //смена координат, каждый раз плюс скорость
        tree1.style.transform = `translate(${coords.x}px, ${newCoordY}px)`; // ставлю новое значение координат
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
            gameButton.children[0].style.display = 'initial';
            gameButton.children[1].style.display = 'none';
        }
    });

};