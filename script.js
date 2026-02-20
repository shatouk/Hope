const paper = document.getElementById("paper");
const trash = document.getElementById("trash");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

function startDrag(x, y) {
  isDragging = true;
  offsetX = x - paper.offsetLeft;
  offsetY = y - paper.offsetTop;
}

function moveDrag(x, y) {
  if (!isDragging) return;
  paper.style.left = x - offsetX + "px";
  paper.style.top = y - offsetY + "px";
}

function endDrag() {
  if (!isDragging) return;
  isDragging = false;

  const paperRect = paper.getBoundingClientRect();
  const trashRect = trash.getBoundingClientRect();

  if (
    paperRect.left < trashRect.right &&
    paperRect.right > trashRect.left &&
    paperRect.top < trashRect.bottom &&
    paperRect.bottom > trashRect.top
  ) {
    paper.style.transition = "all 0.3s ease";
    paper.style.transform = "scale(0)";

    setTimeout(() => {
      paper.style.transition = "none";
      paper.style.transform = "scale(1)";
      paper.style.left = "100px";
      paper.style.top = "120px";
    }, 300);
  }
}

/* Mouse */
paper.addEventListener("mousedown", (e) => {
  startDrag(e.clientX, e.clientY);
});

document.addEventListener("mousemove", (e) => {
  moveDrag(e.clientX, e.clientY);
});

document.addEventListener("mouseup", endDrag);

/* Touch (Android fix) */
paper.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  startDrag(touch.clientX, touch.clientY);
}, { passive: false });

document.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  moveDrag(touch.clientX, touch.clientY);
}, { passive: false });

document.addEventListener("touchend", endDrag);
