game();

function game() {
    let isPause = false;
    let animationId = null;

    const speed = 3;

    const car = document.querySelector('.car');
    const carWidth = car.clientWidth;
    const carHeight = car.clientHeight;

    const road = document.querySelector('.road');
    const roadHeight = road.clientHeight;

    const trees = document.querySelectorAll('.tree');

    const carCoords = getCoords(car);
    const carMoveInfo = {
        top: null,
        bottom: null,
        left: null,
        right: null,
    };

    const treesCoords = [];


    for(let i = 0; i < trees.length; i++) {
        const tree = trees[i];
        const coordsTree = getCoords(tree);

        treesCoords.push(coordsTree); // добавляю координаты в массив
    }

    document.addEventListener('keydown', (event) => {
        if (isPause) { // если пауза, выход из функции
            return;
        }

        const code = event.code;

        if (code === 'ArrowUp' && carMoveInfo.top === null) {
            carMoveInfo.top = requestAnimationFrame(carMoveToTop); 
        }
        else if (code === 'ArrowDown' && carMoveInfo.bottom === null) {
            carMoveInfo.bottom = requestAnimationFrame(carMoveToBottom); 
        }
        else if (code === 'ArrowLeft' && carMoveInfo.left === null) {
            carMoveInfo.left = requestAnimationFrame(carMoveToLeft); 
        }
        else if (code === 'ArrowRight' && carMoveInfo.right === null) {
            carMoveInfo.right = requestAnimationFrame(carMoveToRight); 
        }
    });

    document.addEventListener('keyup', (event) => {
        const code = event.code;

        if (code === 'ArrowUp') {
            cancelAnimationFrame(carMoveInfo.top);
            carMoveInfo.top = null;
        }
        else if (code === 'ArrowDown') {
            cancelAnimationFrame(carMoveInfo.bottom);
            carMoveInfo.bottom = null;
        }
        else if (code === 'ArrowLeft') {
            cancelAnimationFrame(carMoveInfo.left);
            carMoveInfo.left = null;
        }
        else if (code === 'ArrowRight') {
            cancelAnimationFrame(carMoveInfo.right);
            carMoveInfo.right = null;
        }
    });


    function carMoveToTop() { // расчет координат машины
        const newY = carCoords.y - 5;

        if (newY < 0) { // ограничение проезда машины вверх по размеру дороги
            return;
        }
        
        carCoords.y = newY;
        carMove(carCoords.x, newY);
        carMoveInfo.top = requestAnimationFrame(carMoveToTop); 
    }

    function carMoveToBottom() { // расчет координат машины
        const newY = carCoords.y + 5;

        if ((newY + carHeight) > roadHeight) { // ограничение проезда машины вниз по размеру дороги
            return;
        }

        carCoords.y = newY;
        carMove(carCoords.x, newY);
        carMoveInfo.bottom = requestAnimationFrame(carMoveToBottom);
    }

    function carMoveToLeft() { // расчет координат машины
        const newX = carCoords.x - 5;
        carCoords.x = newX;
        carMove(newX, carCoords.y);
        carMoveInfo.left = requestAnimationFrame(carMoveToLeft); 
    }

    function carMoveToRight() { // расчет координат машины
        const newX = carCoords.x + 5;
        carCoords.x = newX;
        carMove(newX, carCoords.y);
        carMoveInfo.right = requestAnimationFrame(carMoveToRight); 
    }

    function carMove(x, y) {
        car.style.transform = `translate(${x}px, ${y}px)`; // ставлю новое значение координат
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

    function getCoords(element) { //достаю координаты элемента
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
            cancelAnimationFrame(carMoveInfo.top); // если на паузе, останавливаю движение авто
            cancelAnimationFrame(carMoveInfo.bottom); // если на паузе, останавливаю движение авто
            cancelAnimationFrame(carMoveInfo.left); // если на паузе, останавливаю движение авто
            cancelAnimationFrame(carMoveInfo.right); // если на паузе, останавливаю движение авто
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