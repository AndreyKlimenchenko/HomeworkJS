game();

function game() {
  let isPause = false;
  let animationId = null;

  let speed = 3;
  let score = 0;

  const car = document.querySelector(".car");
  const carInfo = {
    ...createElementInfo(car),
    move: {
      top: null,
      bottom: null,
      left: null,
      right: null,
    },
  };

  // кнопки навигации для мобильных устройств
  const upButton = document.querySelector(".up-button");
  const leftButton = document.querySelector(".left-button");
  const rightButton = document.querySelector(".right-button");
  const downButton = document.querySelector(".down-button");
  const navBtnsContainer = document.querySelector(".nav-btns-container"); // контейнер нужен чтобы показывать или нет

  const coin = document.querySelector(".coin");
  const coinInfo = createElementInfo(coin);

  const danger = document.querySelector(".danger");
  const dangerInfo = createElementInfo(danger);

  const road = document.querySelector(".road");
  const roadHeight = road.clientHeight;
  const roadWidth = road.clientWidth / 2; // деление для расчета влево/вправо от середины, чтобы не заезжать за край

  const gameButton = document.querySelector(".game-button");
  const gameScore = document.querySelector(".game-score");
  const pauseButton = document.querySelector(".pause");

  const name = document.querySelector(".name");
  const nameButton = document.querySelector(".name-button");
  const currentUser = document.querySelector(".user"); // текущий юзер
  let userName = "";

  const drop = document.querySelector(".drop");
  const restartButton = document.querySelector(".restart-button");

  const trees = document.querySelectorAll(".tree");
  const treesCoords = [];
  for (let i = 0; i < trees.length; i++) { //располагаем деревья
    const tree = trees[i];
    const coordsTree = getCoords(tree);
    treesCoords.push(coordsTree); // добавляю координаты в массив
  }
// тач ивенты для мобильной навигации
  upButton.addEventListener("touchstart", (event) => { // нажатие
    if (isPause) { // в паузе действие заблокировано
      return;
    }
    carInfo.move.top = requestAnimationFrame(carMoveToTop);
  });

  upButton.addEventListener("touchend", (event) => { // окончание нажатия
    cancelAnimationFrame(carInfo.move.top);
  });

  leftButton.addEventListener("touchstart", (event) => { // нажатие
    if (isPause) { // в паузе действие заблокировано
      return;
    }
    carInfo.move.left = requestAnimationFrame(carMoveToLeft);
  });

  leftButton.addEventListener("touchend", (event) => { // окончание нажатия
    cancelAnimationFrame(carInfo.move.left);
  });

  rightButton.addEventListener("touchstart", (event) => { // нажатие
    if (isPause) { // в паузе действие заблокировано
      return;
    }
    carInfo.move.right = requestAnimationFrame(carMoveToRight);
  });

  rightButton.addEventListener("touchend", (event) => { // окончание нажатия
    cancelAnimationFrame(carInfo.move.right);
  });

  downButton.addEventListener("touchstart", (event) => { // нажатие
    if (isPause) { // в паузе действие заблокировано
      return;
    }
    carInfo.move.bottom = requestAnimationFrame(carMoveToBottom);
  });

  downButton.addEventListener("touchend", (event) => { // окончание нажатия
    cancelAnimationFrame(carInfo.move.bottom);
  });
//эвенты клавиатуры
  document.addEventListener("keydown", (event) => {
    if (isPause) { // если пауза, выход из функции, чтобы не двигалась машина
      return;
    }
    const code = event.code;

    if (code === "ArrowUp" && carInfo.move.top === null) {
      if (carInfo.move.bottom) {
        // чтобы не стояла на месте при нажатии двух клавиш
        return;
      }

      carInfo.move.top = requestAnimationFrame(carMoveToTop);
    } else if (code === "ArrowDown" && carInfo.move.bottom === null) {
      if (carInfo.move.top) {
        // чтобы не стояла на месте при нажатии двух клавиш
        return;
      }

      carInfo.move.bottom = requestAnimationFrame(carMoveToBottom);
    } else if (code === "ArrowLeft" && carInfo.move.left === null) {
      if (carInfo.move.right) {
        // чтобы не стояла на месте при нажатии двух клавиш
        return;
      }

      carInfo.move.left = requestAnimationFrame(carMoveToLeft);
    } else if (code === "ArrowRight" && carInfo.move.right === null) {
      if (carInfo.move.left) {
        // чтобы не стояла на месте при нажатии двух клавиш
        return;
      }

      carInfo.move.right = requestAnimationFrame(carMoveToRight);
    }
  });

  //окончание клавиатурного эвента
  document.addEventListener("keyup", (event) => {
    const code = event.code;

    if (code === "ArrowUp") {
      cancelAnimationFrame(carInfo.move.top);
      carInfo.move.top = null;
    } else if (code === "ArrowDown") {
      cancelAnimationFrame(carInfo.move.bottom);
      carInfo.move.bottom = null;
    } else if (code === "ArrowLeft") {
      cancelAnimationFrame(carInfo.move.left);
      carInfo.move.left = null;
    } else if (code === "ArrowRight") {
      cancelAnimationFrame(carInfo.move.right);
      carInfo.move.right = null;
    }
  });
//данные элементов
  function createElementInfo(element) {
    return {
      coords: getCoords(element),
      height: element.clientHeight,
      width: element.clientWidth / 2,
      visible: true,
    };
  }

  function carMoveToTop() {
    // расчет координат машины
    const newY = carInfo.coords.y - 5;

    if (newY < 0) {
      // ограничение проезда машины вверх по размеру дороги
      return;
    }

    carInfo.coords.y = newY;
    carMove(carInfo.coords.x, newY);
    carInfo.move.top = requestAnimationFrame(carMoveToTop);
  }

  function carMoveToBottom() {
    // расчет координат машины
    const newY = carInfo.coords.y + 5;

    if (newY + carInfo.height > roadHeight) {
      // ограничение проезда машины вниз по размеру дороги
      return;
    }

    carInfo.coords.y = newY;
    carMove(carInfo.coords.x, newY);
    carInfo.move.bottom = requestAnimationFrame(carMoveToBottom);
  }

  function carMoveToLeft() {
    // расчет координат машины
    const newX = carInfo.coords.x - 5;

    if (newX < -roadWidth + carInfo.width) {
      // ограничение движения по ширине дороги
      return;
    }

    carInfo.coords.x = newX;
    carMove(newX, carInfo.coords.y);
    carInfo.move.left = requestAnimationFrame(carMoveToLeft);
  }

  function carMoveToRight() {
    // расчет координат машины
    const newX = carInfo.coords.x + 5;

    if (newX > roadWidth - carInfo.width) {
      // ограничение движения по ширине дороги
      return;
    }

    carInfo.coords.x = newX;
    carMove(newX, carInfo.coords.y);
    carInfo.move.right = requestAnimationFrame(carMoveToRight);
  }

  function carMove(x, y) {
    car.style.transform = `translate(${x}px, ${y}px)`; // ставлю новое значение координат
  }

  function startGame() {
    // запуск игры
    elementAnimation(danger, dangerInfo, -250);

    if (hasCollision(carInfo, dangerInfo)) {
      //если наехал на препятствие, игра заканчивается
      return finishGame();
    }

    treesAnimation(); //анимация деревьев
    elementAnimation(coin, coinInfo, -100);

    if (coinInfo.visible && hasCollision(carInfo, coinInfo)) {
      score++;
      const audio = new Audio("./sound/coin.mp3");
      audio.play();
      window.navigator.vibrate(600);
      gameScore.innerText = score;
      // если элемент виден и произошла коллизия, эелемент скрывается
      coin.style.display = "none";
      coinInfo.visible = false;

      if (score % 2 === 0) {
        // каждые 2 монетки скорость прибавляется
        speed++;
      }
    }
    animationId = requestAnimationFrame(startGame);
  }

  function treesAnimation() {
    //анимация деревьев
    for (let i = 0; i < trees.length; i++) {
      const tree = trees[i];
      const coords = treesCoords[i];
      let newYCoord = coords.y + speed; //смена координат, каждый раз плюс скорость

      if (newYCoord > window.innerHeight) {
        newYCoord = -370; // высота самого большого дерева
      }

      treesCoords[i].y = newYCoord; //меняю только у координату
      tree.style.transform = `translate(${coords.x}px, ${newYCoord}px)`; // ставлю новое значение координат
    }
  }

  function elementAnimation(element, elementInfo, elementInitialCoord) {
    let newYCoord = elementInfo.coords.y + speed; // текущая координата + скорость
    let newXCoord = elementInfo.coords.x;

    if (newYCoord > window.innerHeight) {
      newYCoord = elementInitialCoord; // высота появления эелемента

      const direction = parseInt(Math.random() * 2); // рандом 1 или 2
      const maxXCoord = roadWidth + 1 - elementInfo.width; // рандомные координаты в пределах дороги
      const randomXCoord = parseInt(Math.random() * maxXCoord);

      element.style.display = "initial";
      elementInfo.visible = true;

      if (direction === 0) {
        //двигаю монету влево
        newXCoord = -randomXCoord;
      } else if (direction === 1) {
        //двигаю монету вправо
        newXCoord = randomXCoord;
      }
    }
    elementInfo.coords.y = newYCoord;
    elementInfo.coords.x = newXCoord;
    element.style.transform = `translate(${newXCoord}px, ${newYCoord}px)`; // ставлю новое значение координат
  }

  function getCoords(element) {
    //достаю координаты элемента
    const matrix = window.getComputedStyle(element).transform; // достаю стиль
    const array = matrix.split(","); //по запятым
    const y = array[array.length - 1]; //последний элемент
    const x = array[array.length - 2]; //предпоследний элемент
    const numericY = parseFloat(y); //преобразование строки к числу
    const numericX = parseFloat(x); //преобразование к числу
    return { x: numericX, y: numericY };
  }

  function hasCollision(elem1Info, elem2Info) {
    const carYTop = elem1Info.coords.y;
    const carYBottom = elem1Info.coords.y + elem1Info.height;

    const carXleft = elem1Info.coords.x - elem1Info.width; // минус и плюс половина, потому что координаты середины
    const carXRight = elem1Info.coords.x + elem1Info.width; // минус и плюс половина, потому что координаты середины

    const coinYTop = elem2Info.coords.y;
    const coinYBottom = elem2Info.coords.y + elem2Info.height;

    const coinXleft = elem2Info.coords.x - elem2Info.width; // минус и плюс половина, потому что координаты середины
    const coinXRight = elem2Info.coords.x + elem2Info.width; // минус и плюс половина, потому что координаты середины

    if (carYTop > coinYBottom || carYBottom < coinYTop) {
      // столкновение по координате у
      return false;
    }

    if (carXleft > coinXRight || carXRight < coinXleft) {
      // столкновение по координате х
      return false;
    }
    return true;
  }

  function cancelAnimations() {
    cancelAnimationFrame(animationId); // если на паузе, останавливаю работу анимации (стоп функции startGame)
    cancelAnimationFrame(carInfo.move.top); // если на паузе, останавливаю движение авто
    cancelAnimationFrame(carInfo.move.bottom); // если на паузе, останавливаю движение авто
    cancelAnimationFrame(carInfo.move.left); // если на паузе, останавливаю движение авто
    cancelAnimationFrame(carInfo.move.right); // если на паузе, останавливаю движение авто
  }

  function finishGame() { //конец игры
    cancelAnimations();
    gameScore.style.display = "none";
    gameButton.style.display = "none";
    drop.style.display = "flex";
    drop.classList.add("drop-animation");
    const scoreText = drop.querySelector(".restart-text-score");
    scoreText.innerText = score;
    const audio = new Audio("./sound/crush.mp3");
    audio.play();
    window.navigator.vibrate(600);
    localStorage.setItem(userName, score); // сохраняем успех юзера
    navBtnsContainer.style.display = "none";
  }

  gameButton.addEventListener("click", () => { //кнопки паузы и запуска игры
    isPause = !isPause;

    if (isPause) {
      cancelAnimations();
      gameButton.children[0].style.display = "none";
      gameButton.children[1].style.display = "initial";
      navBtnsContainer.classList.add("nav-button-disabled");
    } else {
      animationId = requestAnimationFrame(startGame); // запуск после паузы
      gameButton.children[0].style.display = "initial";
      gameButton.children[1].style.display = "none";
      navBtnsContainer.classList.remove("nav-button-disabled");
    }
  });

  restartButton.addEventListener("click", () => {
    window.location.reload(); // при нажатии перезапускает страницу
  });

  nameButton.addEventListener("click", () => {
    const nameInput = document.querySelector(".name-input");
    userName = nameInput.value; // сохраняем в переменную
    if (!nameInput.value) {
      return;
    }
    name.style.display = "none";
    animationId = requestAnimationFrame(startGame); //анимация и вся игра запускается
    gameScore.style.display = "flex";
    pauseButton.style.display = "block";
    currentUser.style.display = "block";
    if (window.innerWidth <= 800) { // показ кнопок навигации только на мобилке
      navBtnsContainer.style.display = "block";
    }
    currentUser.innerText = `Cейчас играет 👇 ${userName}`;
    const savedUserScore = localStorage.getItem(userName); //проверяем начичие предыдущих очков юзера
    score = Number(savedUserScore) || 0; //если очки есть, то записываем в начальный успех новой игры
    gameScore.innerText = score;
  });
}
