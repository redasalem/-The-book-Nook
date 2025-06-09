const backgrounds = [
  "url('./images/book_1.jpg')",
  "url('./images/book_2.jpg')",
  "url('./images/book_3.jpg')",
  "url('./images/book_4.jpg')",
  "url('./images/book_5.jpg')",
  "url('./images/book_6.jpg')",
  "url('./images/book_7.jpg')",
  "url('./images/book_8.jpg')",
];

let current = 0;
const phoneShape = document.querySelector(".phone-shape");

function setBackground(idx) {
  phoneShape.style.background = backgrounds[idx];
   phoneShape.style.background = `${backgrounds[idx]} no-repeat center center`;
  phoneShape.style.backgroundSize = "100% 100%"; // أو "contain" إذا أردت ظهور الصورة كاملة بدون قص
}

setBackground(current);

document.querySelector(".left").onclick = function () {
  current = (current - 1 + backgrounds.length) % backgrounds.length;
  setBackground(current);
};

document.querySelector(".right").onclick = function () {
  current = (current + 1) % backgrounds.length;
  setBackground(current);
};