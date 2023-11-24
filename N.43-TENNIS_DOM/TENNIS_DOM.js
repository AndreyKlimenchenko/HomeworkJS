const W = 500;
const H = 300;
const W_BALL = 15;
const H_BALL = 15;
const W_BRACKET = 10;
const H_BRACKET = 60;

const IDField = document.createElement("div");
IDField.id = "field";
document.body.appendChild(IDField);

let field = {
  width: W,
  height: H,

  update: function () {
    const field = document.getElementById("field");
    field.style.width = Math.round(this.width) + "px";
    field.style.height = Math.round(this.height) + "px";
  },
};

const IDBall = document.createElement("div");
IDBall.id = "ball";
IDField.appendChild(IDBall);

let ball = {
  width: W_BALL,
  height: H_BALL,
  posX: W / 2 - W_BALL / 2,
  posY: H / 2 - H_BALL / 2,
  speedX: 0,
  speedY: 0,

  update: function () {
    const ball = document.getElementById("ball");
    ball.style.left = Math.round(this.posX) + "px";
    ball.style.top = Math.round(this.posY) + "px";
    ball.style.width = Math.round(this.width) + "px";
    ball.style.height = Math.round(this.height) + "px";
  },

  run: function () {
    this.posX = W / 2 - W_BALL / 2;
    this.posY = H / 2 - H_BALL / 2;
    this.speedX = 5;
    this.speedY = 5;
  },
};

const IDPlayer1 = document.createElement("div");
IDPlayer1.id = "player1";
IDField.appendChild(IDPlayer1);

let player1 = {
  width: W_BRACKET,
  height: H_BRACKET,
  posX: 0,
  posY: H / 2 - H_BRACKET / 2,
  speed: 0,
  score: 0,

  update: function () {
    const player1 = document.getElementById("player1");

    player1.style.left = Math.round(this.posX) + "px";
    player1.style.top = Math.round(this.posY) + "px";
    player1.style.width = Math.round(this.width) + "px";
    player1.style.height = Math.round(this.height) + "px";
  },

  updateScore: function () {
    const counter = document.getElementById("pl1");
    counter.innerHTML = this.score;
  },
};

const IDPlayer2 = document.createElement("div");
IDPlayer2.id = "player2";
IDField.appendChild(IDPlayer2);

let player2 = {
  width: W_BRACKET,
  height: H_BRACKET,
  posX: W - W_BRACKET,
  posY: H / 2 - H_BRACKET / 2,
  speed: 0,
  score: 0,

  update: function () {
    const player2 = document.getElementById("player2");
    player2.style.left = Math.round(this.posX) + "px";
    player2.style.top = Math.round(this.posY) + "px";
    player2.style.width = Math.round(this.width) + "px";
    player2.style.height = Math.round(this.height) + "px";
  },

  updateScore: function () {
    const counter = document.getElementById("pl2");
    counter.innerHTML = this.score;
  },
};

function start() {
  ball.run();
}

function tick() {
  ball.posX += ball.speedX;
  ball.posY += ball.speedY;

  player1.posY += player1.speed;
  player2.posY += player2.speed;

  document.onkeydown = function (e) {
    if (e.keyCode === 16) {
      player1.speed = -10;
    }

    if (e.keyCode === 17) {
      player1.speed = 10;
    }

    if (e.keyCode === 38) {
      player2.speed = -10;
    }

    if (e.keyCode === 40) {
      player2.speed = 10;
    }
  };

  document.onkeyup = function (e) {
    if (e.keyCode === 16) {
      player1.speed = 0;
    }

    if (e.keyCode === 17) {
      player1.speed = 0;
    }

    if (e.keyCode === 38) {
      player2.speed = 0;
    }

    if (e.keyCode === 40) {
      player2.speed = 0;
    }
  };

  if (player1.posY <= 0) {
    player1.posY = 0;
  }
  if (player2.posY <= 0) {
    player2.posY = 0;
  }

  if (player1.posY + player1.height > field.height) {
    player1.posY = field.height - player1.height;
  }
  if (player2.posY + player2.height > field.height) {
    player2.posY = field.height - player2.height;
  }

  if (ball.posX + ball.width > field.width) {
    ball.speedX = 0;
    ball.speedY = 0;
    ball.posX = field.width - ball.width;
    player1.score++;
    player1.updateScore();
  }

  if (
    ball.posX + ball.width >= player2.posX &&
    ball.posX <= player2.posX + player2.width
  ) {
    if (
      ball.posY >= player2.posY &&
      ball.posY <= player2.posY + player2.height
    ) {
      ball.speedX = -ball.speedX;
    }
  }

  if (ball.posX < 0) {
    ball.speedX = 0;
    ball.speedY = 0;
    ball.posX = 0;
    player2.score++;
    player2.updateScore();
  }

  if (ball.posX <= player1.posX + player1.width) {
    if (
      ball.posY + ball.height >= player1.posY &&
      ball.posY <= player1.posY + player1.height
    ) {
      ball.speedX = -ball.speedX;
    }
  }

  if (ball.posY + ball.height > field.height) {
    ball.speedY = -ball.speedY;
    ball.posY = field.height - ball.height;
  }

  if (ball.posY < 0) {
    ball.speedY = -ball.speedY;
    ball.posY = 0;
  }

  ball.update();
  player1.update();
  player2.update();
}

const game = setInterval(tick, 40);

field.update();
ball.update();
player1.update();
player2.update();
