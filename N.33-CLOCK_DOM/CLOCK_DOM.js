const btn = document.querySelector('.btn');
const box = document.querySelector('.label');
let clockSize = 0;

function getValue(e) { //Узнаю размер часов
  const parent = e.target.closest('label');
  const input = parent.querySelector('input');
  const inputValue = Number(input.value);

  if (inputValue >= 200 && inputValue <= 800) {
    clockSize = inputValue;
    const clockFace = document.querySelector('.clock');
    if (clockFace) {
      document.body.removeChild(clockFace);
    }
    createClock(clockSize);
    box.style.display = 'none';
  } else {
    btn.setAttribute('disabled', true);
  }
}

btn.addEventListener('click', getValue);

function createClock(size) {
  const clockFace = document.createElement('div');
  clockFace.style.width = size +'px'; //Устанавливаю размер циферблата
  clockFace.style.height = size +'px'; //Устанавливаю размер циферблата
  clockFace.className = "clock";
  document.body.appendChild(clockFace);
  
  createClockNum();
  createClockCenter();
  createHandHour();
  createHandMin();
  createHandSec();
  createDate();

  pos();
}

function createClockNum() {
  const clockFace = document.querySelector('.clock');

  for(let i = 1; i <= 12; i++) {
    const clockNum = document.createElement('div');
    clockNum.style.width = clockFace.offsetWidth/9 + 'px'; //Зависят от размера циферблата
    clockNum.style.height = clockFace.offsetHeight/9 + 'px'; //Зависят от размера циферблата

    const clockNumText = document.createTextNode(i); 
    clockNum.appendChild(clockNumText);
    clockNum.className = 'clock-num';   

    clockFace.appendChild(clockNum);

    clockNum.style.fontSize = clockNum.offsetWidth/1.5 + 'px'; //Размер шрифта для цифр на циферблате
  }
}

function createClockCenter () {
  const clockFace = document.querySelector('.clock');

  const clockCenter = document.createElement('div');
  clockCenter.style.width = 3 + 'px'; 
  clockCenter.style.height = 3 + 'px'; 
  clockCenter.className = 'clock-center';

  clockFace.appendChild(clockCenter);
}

function createHandHour () {
  const clockFace = document.querySelector('.clock');

  const handHour = document.createElement('div');
  handHour.style.width = 7 + 'px';
  handHour.style.height = clockFace.offsetWidth/3 + 'px';
  handHour.className = 'hand-hour';
  clockFace.appendChild(handHour);
}

function createHandMin () {
  const clockFace = document.querySelector('.clock');

  const handMin = document.createElement('div');
  handMin.style.width = 5 + 'px';
  handMin.style.height = clockFace.offsetWidth/2.5 + 'px';
  handMin.className = 'hand-min';
  clockFace.appendChild(handMin);
}

function createHandSec () {
  const clockFace = document.querySelector('.clock');

  const handSec = document.createElement('div');
  handSec.style.width = 3 + 'px';
  handSec.style.height = clockFace.offsetHeight/2.1 + 'px';
  handSec.className = 'hand-sec';
  clockFace.appendChild(handSec);
}

function createDate () {
  const clockFace = document.querySelector('.clock');

  const date = document.createElement('div');
  date.style.width = 100 + '%';
  date.style.height = date.offsetHeight + 'px';
  date.className = 'clock-date';
  clockFace.appendChild(date);

  date.style.fontSize = clockFace.offsetHeight/10 + 'px';
}

function pos() {
  const clockFace=document.querySelector('.clock');
  const clockNum=document.querySelectorAll('.clock-num');
  const clockDate=document.querySelector('.clock-date');  
  const clockCenter=document.querySelector('.clock-center');
  const handHour=document.querySelector('.hand-hour');
  const handMin=document.querySelector('.hand-min');
  const handSec=document.querySelector('.hand-sec');

  // Центр часов
  const clockFaceCenterX = clockFace.offsetWidth/2;
  const clockFaceCenterY = clockFace.offsetHeight/2;

  // Позиционирую время
  clockDate.style.left = clockFaceCenterX-clockDate.offsetWidth/2 + 'px';
  clockDate.style.top = clockFaceCenterY-clockFaceCenterY/2 + 'px';

  // Позиционирую центр
  clockCenter.style.left = clockFaceCenterX-clockCenter.offsetWidth/2 + 'px';
  clockCenter.style.top = clockFaceCenterY-clockCenter.offsetHeight/2 + 'px';

  // Позиционирую часовую стрелку
  handHour.style.left = clockFaceCenterX-handHour.offsetWidth/2 + 'px';
  handHour.style.top = clockFaceCenterY-(handHour.offsetHeight*0.9) + 'px';
 
  handHour.style.transformOrigin = 'center 90%';

  // Позиционирую минутную стрелку 
  handMin.style.left = clockFaceCenterX-handMin.offsetWidth/2 + 'px';
  handMin.style.top = clockFaceCenterY-(handMin.offsetHeight*0.9) + 'px';
  
  handMin.style.transformOrigin = 'center 90%';

  // Позиционирую секундную стрелку
  handSec.style.left = clockFaceCenterX-handSec.offsetWidth/2 + 'px';
  handSec.style.top = clockFaceCenterY-(handSec.offsetHeight*0.9) + 'px';
  
  handSec.style.transformOrigin ='center 90%';

  // Позиционирую часы циферблата
  for(let i = 0; i < clockNum.length; i++){

    const angle = parseFloat(i*30+30)/180*Math.PI;
    const radius = parseFloat(clockFace.offsetWidth/2.5);

    const clockNumCenterX = clockFaceCenterX+radius*Math.sin(angle);
    const clockNumCenterY = clockFaceCenterY-radius*Math.cos(angle);

    clockNum[i].style.left = Math.round(clockNumCenterX-clockNum[i].offsetWidth/2) + 'px';
    clockNum[i].style.top = Math.round(clockNumCenterY-clockNum[i].offsetHeight/2) + 'px';
  }

  setHands(); //Позиционирую стрелки
}

function setHands() {
  const dateTime = new Date();

  const hour = dateTime.getHours();
  const min = dateTime.getMinutes();
  const sec = dateTime.getSeconds();
  
  const angleHour = (hour%12)/12*360+min/60*30;
  const angleMin = min/60*360;
  const angleSec = sec/60*360;  

  document.querySelector('.clock-date').innerHTML = dateTime.toLocaleTimeString();
  console.log(dateTime.toLocaleTimeString());
  document.querySelector('.hand-hour').style.transform = 'rotate(' + angleHour +'deg)';
  document.querySelector('.hand-min').style.transform = 'rotate(' + angleMin +'deg)';
  document.querySelector('.hand-sec').style.transform = 'rotate(' + angleSec +'deg)';
}

setInterval(function(){
  if (clockSize) {
    setHands();
  }
},1000);



  