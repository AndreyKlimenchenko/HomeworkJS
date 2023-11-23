const btn = document.querySelector(".btn");
const box = document.querySelector(".label");
let diameter = 0;

function getValue(e) {
  const parent = e.target.closest("label");
  const input = parent.querySelector("input");
  const inputValue = Number(input.value);

  if (inputValue >= 200 && inputValue <= 800) {
    diameter = inputValue;
    const clockFace = document.querySelector(".clock");
    if (clockFace) {
      document.body.removeChild(clockFace);
    }
    createClock(diameter);
    box.style.display = "none";
  } else {
    btn.setAttribute("disabled", true);
  }
}

btn.addEventListener("click", getValue);

let context;

function createClock(value) {
  let canvas = document.createElement("CANVAS");
  canvas.width = value;
  canvas.height = value;
  canvas.style.position = "absolute";
  canvas.style.left = "0px";
  context = canvas.getContext("2d");
  document.getElementById("container").append(canvas);
  let radius = value / 2;
  context.translate(radius, radius);
  radius = radius * 0.9;
}

function updateTime(diametrValue) {
  let radiusValue = diametrValue / 2;
  radiusValue = radiusValue * 0.9;
  createClockBackground(context);
  createNumCircles(context, radiusValue);
  const currTime = new Date();
  let time =
    str0l(currTime.getHours(), 2) +
    ":" +
    str0l(currTime.getMinutes(), 2) +
    ":" +
    str0l(currTime.getSeconds(), 2);
  createWatch(context, diametrValue, time);
  arrowHourMovement(currTime.getHours(), currTime.getMinutes());
  arrowMinuteMovement(currTime.getMinutes(), currTime.getSeconds());
  arrowSecondMovement(currTime.getSeconds());
  console.log(time);
}

function str0l(val, len) {
  let strVal = val.toString();
  while (strVal.length < len) strVal = "0" + strVal;
  return strVal;
}

function createClockBackground() {
  const clockArea = context;
  clockArea.beginPath();
  clockArea.arc(0, 0, diameter * 0.45, 0, 2 * Math.PI);
  clockArea.fillStyle = "#FCCA66";
  clockArea.fill();
  clockArea.strokeStyle = "#FCCA66";
  clockArea.lineWidth = (diameter / 2) * 0.01;
  clockArea.stroke();

  return clockArea;
}

function createNumCircles(context, radius) {
  const numberArea = context;
  const numberAreaRadius = diameter / 2 / 8;
  let ang;
  for (i = 0; i < 13; i++) {
    numberArea.beginPath();
    ang = (i * Math.PI) / 6;
    const numberAreaCenterX = 0 + diameter * 0.45 * Math.sin(ang) * 0.8;
    const numberAreaCenterY = 0 - diameter * 0.45 * Math.cos(ang) * 0.8;
    numberArea.arc(
      numberAreaCenterX,
      numberAreaCenterY,
      numberAreaRadius,
      0,
      2 * Math.PI
    );
    numberArea.rotate(ang);
    numberArea.translate(0, -diameter * 0.4);
    numberArea.rotate(-ang);
    numberArea.rotate(ang);
    numberArea.translate(0, diameter * 0.4);
    numberArea.rotate(-ang);
    numberArea.fillStyle = "#48B382";
    numberArea.stroke();
    numberArea.fill();
  }

  const number = context;
  number.font = radius * 0.15 + "px times";
  number.textBaseline = "middle";
  number.textAlign = "center";
  for (i = 1; i < 13; i++) {
    ang = (i * Math.PI) / 6;
    number.rotate(ang);
    number.translate(0, -diameter * 0.36);
    number.rotate(-ang);
    number.fillStyle = "#2B2A29";
    number.fillText(i.toString(), 0, 0);
    number.rotate(ang);
    number.translate(0, diameter * 0.36);
    number.rotate(-ang);
  }
}

function createWatch(context, diameter, time) {
  let timeAreaX = 0;
  let timeAreaY = 0 - diameter * 0.1;
  let timeArea = context;
  timeArea.fillStyle = "#FCCA66";
  timeArea.fillRect(
    timeAreaX - diameter * 0.3,
    timeAreaY * 1.2,
    diameter * 0.6,
    diameter * 0.15
  );
  timeArea.save();
  timeArea.font = diameter * 0.5 + "px";
  timeArea.textBaseline = "middle";
  timeArea.textAlign = "center";
  timeArea.fillStyle = "#2B2A29";
  timeArea.fillText(time, timeAreaX, timeAreaY);
}

function createClockHands(context, pos, length, width) {
  context.beginPath();
  context.lineWidth = width;
  context.lineCap = "round";
  context.moveTo(0, 0);
  context.rotate(pos);
  context.lineTo(0, -length);
  context.fillStyle = "#2B2A29";
  context.stroke();
  context.rotate(-pos);
}

function arrowHourMovement(nowHour, currentMinute) {
  let arrowHour = nowHour % 12;
  arrowHour = (arrowHour * Math.PI) / 6 + (currentMinute * Math.PI) / (6 * 60);
  const arrowHourLength = diameter * 0.3;
  const arrowHourWidth = diameter * 0.03;
  context.strokeStyle = "#2B2A29";
  createClockHands(context, arrowHour, arrowHourLength, arrowHourWidth);
}

function arrowMinuteMovement(nowMinute, nowSecond) {
  const arrowMinute =
    (nowMinute * Math.PI) / 30 + (nowSecond * Math.PI) / (30 * 60);
  const arrowMinuteLength = diameter * 0.4;
  const arrowMinuteWidth = diameter * 0.015;
  context.strokeStyle = "#2B2A29";
  createClockHands(context, arrowMinute, arrowMinuteLength, arrowMinuteWidth);
}

function arrowSecondMovement(nowSecond) {
  const arrowSecond = (nowSecond * Math.PI) / 30;
  const arrowSecondLength = diameter / 2.3;
  const arrowSecondWidth = diameter * 0.007;
  context.strokeStyle = "#2B2A29";
  createClockHands(context, arrowSecond, arrowSecondLength, arrowSecondWidth);
}

setInterval(function () {
  if (diameter) {
    updateTime(diameter);
  }
}, 1000);
