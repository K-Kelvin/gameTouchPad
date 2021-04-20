const upButton = document.querySelector("button.control.up");
const rightButton = document.querySelector("button.control.right");
const downButton = document.querySelector("button.control.down");
const leftButton = document.querySelector("button.control.left");

const example = document.querySelector("div.example");

let counter = 0;
let pressHoldDuration = 1;
let timerID;
const moveFrame = 2; // pixels to move element per click

const pressHoldEvent = new Event("pressHold");
function addListener(element, callback) {
  function pressingDown(e) {
    requestAnimationFrame(timer);
    e.preventDefault();
    element.classList.add("active");
  }
  function notPressingDown(e) {
    cancelAnimationFrame(timerID);
    element.classList.remove("active");
  }
  function timer() {
    timerID = requestAnimationFrame(timer);
    element.dispatchEvent(pressHoldEvent);
  }
  element.addEventListener("touchstart", pressingDown, false);
  element.addEventListener("touchend", notPressingDown, false);
  element.addEventListener("pressHold", callback, false);
}

function moveUp() {
  const pos = example.getBoundingClientRect();
  if (pos.top > 0) example.style.transform += `translateY(-${moveFrame}px)`;
}
function moveDown() {
  const pos = example.getBoundingClientRect();
  if (pos.bottom < screen.height)
    example.style.transform += `translateY(${moveFrame}px)`;
}
function moveRight() {
  const pos = example.getBoundingClientRect();
  if (pos.right < screen.width)
    example.style.transform += `translateX(${moveFrame}px)`;
}
function moveLeft() {
  const pos = example.getBoundingClientRect();
  if (pos.left > 0) example.style.transform += `translateX(-${moveFrame}px)`;
}

addListener(upButton, moveUp);
addListener(rightButton, moveRight);
addListener(downButton, moveDown);
addListener(leftButton, moveLeft);
