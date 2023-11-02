window.onload = function () {
  findElements();
};

function findElements() {
  const img1 = document.createElement("img");
  const img2 = document.createElement("img");
  const img3 = document.createElement("img");
  const img4 = document.createElement("img");

  img1.src = "./img/musical.png";
  img2.src = "./img/japan.png";
  img3.src = "./img/humans.png";
  img4.src = "./img/smoke.png";

  const box = document.createElement("div");
  box.style.position = "relative";
  box.style.height = "250px";

  document.body.appendChild(box);

  const array = [img1, img2, img3, img4];

  for (let i = array.length - 1; i >= 0; i--) {
    const element = array[i];
    element.style.zIndex = 1;
    element.style.width = "150px";
    element.style.position = "absolute";
    const coords = element.getBoundingClientRect();
    element.style.left = coords.left + i * 150 + "px";
    element.style.bottom = "0px";
    box.appendChild(element);
    dragItem(element);
  }
}

function dragItem(e) {
  e.onmousedown = function (event) {
    let shiftX = event.clientX - e.getBoundingClientRect().left;
    let shiftY = event.clientY - e.getBoundingClientRect().top;

    e.classList.add("totake");

    e.style.position = "absolute";
    document.body.append(e);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      e.style.left = pageX - shiftX + "px";
      e.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    e.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      e.classList.remove("totake");
      e.onmouseup = null;
    };
  };

  e.ondragstart = function () {
    return false;
  };
}
