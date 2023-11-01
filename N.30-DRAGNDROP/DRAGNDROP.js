window.onload = function () {
  findElements();
};

function findElements() {
  const array = document.getElementsByClassName("picture");
  for (let i = array.length - 1; i >= 0; i--) {
    array[i].style.position = "absolute";
    array[i].style.zIndex = 1;
    let coords = array[i].getBoundingClientRect();
    array[i].style.left = coords.left + "px";
    array[i].style.top = coords.top + "px";

    dragItem(array[i]);
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
