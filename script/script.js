const backgrounds = [
  "url('images/book_1.jpg')",
  "url('images/book_2.jpg')",
  "url('images/book_3.jpg')",
  "url('images/book_4.jpg')",
  "url('images/book_5.jpg')",
  "url('images/book_6.jpg')",
  "url('images/book_7.jpg')",
  "url('images/book_8.jpg')",
];

let current = 0;
const phoneShape = document.querySelector(".phone-shape");

function setBackground(idx) {
  if (!phoneShape) return;
  phoneShape.style.background = `${backgrounds[idx]} no-repeat center center`;
  phoneShape.style.backgroundSize = "100% 100%";
}

if (phoneShape) {
  setBackground(current);

  const leftBtn = document.querySelector(".left");
  const rightBtn = document.querySelector(".right");

  if (leftBtn) {
    leftBtn.onclick = function () {
      current = (current - 1 + backgrounds.length) % backgrounds.length;
      setBackground(current);
    };
  }

  if (rightBtn) {
    rightBtn.onclick = function () {
      current = (current + 1) % backgrounds.length;
      setBackground(current);
    };
  }
}