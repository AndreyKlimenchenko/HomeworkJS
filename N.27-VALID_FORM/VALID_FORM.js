const form = document.getElementById("form");

form.addEventListener(
  "submit",
  function (e) {
    if (
      !devCheck() |
      !siteCheck() |
      !urlCheck() |
      !dateCheck() |
      !userNumCheck() |
      !emailCheck() |
      !catalogCheck() |
      !radioCheck() |
      !checkCheck() |
      !descCheck()
    ) {
      focusMove();
      e.preventDefault();
    }
  },
  false
);

function focusMove() {
  if (!devCheck()) {
    developer.focus();
  } else if (!siteCheck()) {
    webSite.focus();
  } else if (!urlCheck()) {
    webUrl.focus();
  } else if (!dateCheck()) {
    siteDate.focus();
  } else if (!userNumCheck()) {
    usersNum.focus();
  } else if (!emailCheck()) {
    email.focus();
  } else if (!catalogCheck()) {
    catalog.focus();
  } else if (!descCheck()) {
    desc.focus();
  }
}

const developer = document.getElementById("dev");
const developerErr = document.getElementById("devError");

developer.onblur = devCheck;
developer.onfocus = devReset;

function devCheck() {
  if (developer.value == "") {
    developer.classList.add("invalid");
    developerErr.innerHTML = "Заполните поле";
    return false;
  }
  return true;
}

function devReset() {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
    developerErr.innerHTML = "";
  }
}

const webSite = document.getElementById("siteName");
const siteErr = document.getElementById("siteNameError");

webSite.onblur = siteCheck;
webSite.onfocus = siteReset;

function siteCheck() {
  if (webSite.value == "") {
    webSite.classList.add("invalid");
    siteErr.innerHTML = "Заполните поле";
    return false;
  }
  return true;
}

function siteReset() {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
    siteErr.innerHTML = "";
  }
}

const webUrl = document.getElementById("siteUrl");
const urlErr = document.getElementById("siteUrlError");

webUrl.onblur = urlCheck;
webUrl.onfocus = urlReset;

function urlCheck() {
  if (!webUrl.value.includes(".")) {
    webUrl.classList.add("invalid");
    urlErr.innerHTML =
      "Заполните имя сайта. Например: https://www.siteName.com";
    return false;
  }
  return true;
}

function urlReset() {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
    urlErr.innerHTML = "";
  }
}

const siteDate = document.getElementById("startDate");
const dateErr = document.getElementById("startDateError");

siteDate.onblur = dateCheck;
siteDate.onfocus = dateReset;

function dateCheck() {
  if (siteDate.value == "") {
    siteDate.classList.add("invalid");
    dateErr.innerHTML = "Выберите дату запуска";
    return false;
  }
  return true;
}

function dateReset() {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
    dateErr.innerHTML = "";
  }
}

const usersNum = document.getElementById("users");
const numErr = document.getElementById("usersError");

usersNum.onblur = userNumCheck;
usersNum.onfocus = userNumReset;

function userNumCheck() {
  if (usersNum.value == "") {
    usersNum.classList.add("invalid");
    numErr.innerHTML = "Укажите количество посетителей в сутки";
    return false;
  }
  return true;
}

function userNumReset() {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
    numErr.innerHTML = "";
  }
}

const email = document.getElementById("mail");
const emailErr = document.getElementById("mailError");

email.onblur = emailCheck;
email.onfocus = emailReset;

function emailCheck() {
  if (!email.value.includes("@")) {
    email.classList.add("invalid");
    emailErr.innerHTML = "Заполните почту. Например: user2023@mail.ru";
    return false;
  }
  return true;
}

function emailReset() {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
    emailErr.innerHTML = "";
  }
}

const catalog = document.getElementById("choise");
const catErr = document.getElementById("choiseError");

catalog.onblur = catalogCheck;
catalog.onfocus = catalogReset;

function catalogCheck() {
  if (catalog.value == "0") {
    catalog.classList.add("invalid");
    catErr.innerHTML = "Выберите из списка";
    return false;
  }
  return true;
}

function catalogReset() {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
    catErr.innerHTML = "";
  }
}

const radioBut = document.getElementsByClassName("radio");
const radioErr = document.getElementById("radioError");

radioBut[0].onchange = radioReset;
radioBut[1].onchange = radioReset;
radioBut[2].onchange = radioReset;

function radioCheck() {
  if (
    radioBut[0].checked == false &&
    radioBut[1].checked == false &&
    radioBut[2].checked == false
  ) {
    radioErr.innerHTML = "Выберите тип размещения";
    return false;
  }
  return true;
}

function radioReset() {
  for (let but of radioBut) {
    if (but.checked == true) {
      but.checked = true;
      radioErr.innerHTML = "";
    }
  }
}

const check = document.getElementById("check");
const checkErr = document.getElementById("checkError");

check.onchange = checkReset;

function checkCheck() {
  if (check.checked == false) {
    checkErr.innerHTML = "Разрешите отзывы";
    return false;
  }
  return true;
}

function checkReset() {
  if (check.checked == true) {
    checkErr.innerHTML = "";
  }
}

const desc = document.getElementById("description");
const descErr = document.getElementById("descriptionError");

desc.onblur = descCheck;
desc.onfocus = descReset;

function descCheck() {
  if (desc.value == "") {
    desc.classList.add("invalid");
    descErr.innerHTML = "Заполните описание";
    return false;
  }
  return true;
}

function descReset() {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
    descErr.innerHTML = "";
  }
}
