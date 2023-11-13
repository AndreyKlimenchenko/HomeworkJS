const btn = document.querySelector('.btn');
const box = document.querySelector('.label');
let diameter = 0;

function getValue(e) { 
  const parent = e.target.closest('label');
  const input = parent.querySelector('input');
  const inputValue = Number(input.value);

  if (inputValue >= 200 && inputValue <= 800) {
    diameter = inputValue;
    const clockFace = document.querySelector('.clock');
    if (clockFace) {
      document.body.removeChild(clockFace);
    }
    SVG.setAttributeNS(null, "width", diameter);
    SVG.setAttributeNS(null, "height", diameter);
    createClock(diameter);
    box.style.display = 'none';
  } else {
    btn.setAttribute('disabled', true);
  }
}

btn.addEventListener('click', getValue);

const XMLNS = "http://www.w3.org/2000/svg";
const SVG = document.createElementNS(XMLNS, "svg");
document.getElementById("container").append(SVG);
SVG.setAttribute("style", "position: absolute; left: 550px; font-weight: normal");

let baseClock;

function createClock(diameter) {
    let deflectionAngle = 0;
    baseClock = createClockBackground(diameter);
    createNumCircles(baseClock, deflectionAngle, diameter);
    createClockArrows(baseClock, diameter);
    updateTime();
}

function updateTime() {
    let currTime = new Date();
    let timeNow = str0l(currTime.getHours(), 2) + ":" + str0l(currTime.getMinutes(), 2) + ":" + str0l(currTime.getSeconds(), 2);
    document.getElementById("timeArea").innerHTML = timeNow;
    arrowHourMovement(currTime.getHours(), currTime.getMinutes());
    arrowMinuteMovement(currTime.getMinutes(), currTime.getSeconds());
    arrowSecondMovement(currTime.getSeconds());
    setTimeout(updateTime, 1000);
    console.log(timeNow);
}

function str0l(val,len) {
    let strVal=val.toString();
    while ( strVal.length < len )
        strVal='0'+strVal;
    return strVal;
}

function createClockBackground(clockDiameter) {
    let clockArea = document.createElementNS(XMLNS, "circle");
    clockArea.setAttribute("fill", "#8fce00");
    clockArea.setAttribute("r", clockDiameter / 2);
    clockArea.setAttribute("cx", clockDiameter / 2);
    clockArea.setAttribute("cy", clockDiameter / 2);
    SVG.append(clockArea);
    let timeArea = document.createElementNS(XMLNS, "text");
    timeArea.style.fill = "#2B2A29";
    timeArea.setAttribute("font-size", clockDiameter / 15);
    timeArea.setAttribute("x", (clockDiameter / 2) - clockDiameter / 9);
    timeArea.setAttribute("y", (clockDiameter / 2) - clockDiameter / 5);
    timeArea.id = "timeArea";
    SVG.append(timeArea);
    return clockArea;
}

function createNumCircles(_baseClock, deflectionAngle, clockDiameter) {
    for (let i = 0; i < 13; i++) {
        let numberArea = document.createElementNS(XMLNS, "circle");
        numberArea.id = i;
        numberArea.setAttribute("fill", "#48B382");
        numberArea.setAttribute("r", clockDiameter / 16);
        let angle = deflectionAngle / 180 * Math.PI;
        let numberAreaCenterX = (clockDiameter / 2) + (clockDiameter / 2) / 1.2 * Math.sin(angle);
        let numberAreaCenterY = (clockDiameter / 2) - (clockDiameter / 2) / 1.2 * Math.cos(angle);
        numberArea.setAttribute("cx", numberAreaCenterX);
        numberArea.setAttribute("cy", numberAreaCenterY);
        SVG.append(numberArea);
        deflectionAngle += 30;
        let number = document.createElementNS(XMLNS, "text");
        number.textContent = i;
        number.style.fill = "#B54A4E";
        number.setAttribute("font-size", clockDiameter / 15);
        let numberAlignIndex = 4;
        if (i > 9)
        numberAlignIndex = 2;
        let numberX = Math.round(numberAreaCenterX - parseFloat(numberArea.getAttribute("r")/numberAlignIndex)) + "px";
        let numberY = Math.round(numberAreaCenterY + parseFloat(numberArea.getAttribute("r")/3)) + "px" ;
        number.setAttribute("x", numberX);
        number.setAttribute("y", numberY);
        SVG.append(number);
    }
}

function createClockArrows(baseClock, clockDiameter) {
    let hourArrow = document.createElementNS(XMLNS, "line");
    hourArrow.setAttribute("stroke", "#2B2A29");
    hourArrow.setAttribute("stroke-linecap", "round");
    hourArrow.setAttribute("stroke-width", clockDiameter / 40);
    hourArrow.setAttribute("y2", clockDiameter / 2 - baseClock.getAttribute("cy") * 0.6);
    hourArrow.id = "hourArrow";
    SVG.append(hourArrow);
    let minuteArrow = document.createElementNS(XMLNS, "line");
    minuteArrow.setAttribute("stroke", "#2B2A29");
    minuteArrow.setAttribute("stroke-linecap", "round");
    minuteArrow.setAttribute("stroke-width", clockDiameter / 70);
    minuteArrow.setAttribute("y2", clockDiameter / 2 - baseClock.getAttribute("cy") * 0.8);
    minuteArrow.id = "minuteArrow";
    SVG.append(minuteArrow);
    let secondArrow = document.createElementNS(XMLNS, "line");
    secondArrow.setAttribute("stroke", "#2B2A29");
    secondArrow.setAttribute("stroke-linecap", "round");
    secondArrow.setAttribute("stroke-width", clockDiameter / 120);
    secondArrow.setAttribute("y2", clockDiameter / 2 - baseClock.getAttribute("cy") * 0.9);
    secondArrow.id = "secondArrow";
    SVG.append(secondArrow);
}

function clockArrowCenter(clockDiameter , arrow) {
    let clockCenterX = parseFloat(clockDiameter.getAttribute("cx"));
    let clockCenterY = parseFloat(clockDiameter.getAttribute("cy"));
    let a = arrow.setAttribute("x1", clockCenterX);
    let b = arrow.setAttribute("y1", clockCenterY / 0.9);
    let c = arrow.setAttribute("x2", clockCenterX - arrow.getAttribute("stroke-width") / 2);
}

function arrowHourMovement(nowHour, nowMinute) {
    let hourArrow = document.getElementById("hourArrow");
    let hourAngle = nowHour * 30;
    hourAngle += nowMinute * 0.5;
    clockArrowCenter(baseClock, hourArrow);
    let x = parseFloat(hourArrow.getAttribute("x1"));
    let y = hourArrow.getAttribute("y1") * 0.9;
    hourArrow.setAttribute("transform", "rotate(" + hourAngle + " " + x + " " + y + ")");
}

function arrowMinuteMovement(nowMinute, nowSecond) {
    let minuteArrow = document.getElementById("minuteArrow");
    let minuteAngle = nowMinute * 6;
    minuteAngle += nowSecond * 0.05;
    clockArrowCenter(baseClock, minuteArrow);
    let x = parseFloat(minuteArrow.getAttribute("x1"));
    let y = minuteArrow.getAttribute("y1") * 0.9;
    minuteArrow.setAttribute("transform", "rotate(" + minuteAngle + " " + x + " " + y + ")");
}

function arrowSecondMovement(nowSecond) {
    let secondArrow = document.getElementById("secondArrow");
    let secondAngle = nowSecond * 6;
    clockArrowCenter(baseClock, secondArrow);
    let x = secondArrow.getAttribute("x1");
    let y = secondArrow.getAttribute("y1") * 0.9;
    secondArrow.setAttribute("transform", "rotate(" + secondAngle + " " + x + " " + y + ")");
}