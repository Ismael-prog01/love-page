const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const stars = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.5,
  s: Math.random() * 0.5 + 0.2
}));

const planets = [
  { x: 100, y: 120, r: 30, vx: 0.05, vy: 0.03, c: "#ff7ad9" },
  { x: 300, y: 400, r: 45, vx: -0.04, vy: 0.02, c: "#8f7bff" },
  { x: 700, y: 200, r: 25, vx: 0.03, vy: -0.04, c: "#6bdcff" }
];

function drawSpace() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.s;
    if (star.y > canvas.height) star.y = 0;
  });

  planets.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.c;
    ctx.fill();
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });

  requestAnimationFrame(drawSpace);
}

drawSpace();

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const question = document.getElementById("question");

const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
let yesClicks = 0;

function randomPosition(btn) {
  const padding = 20;
  const maxX = window.innerWidth - btn.offsetWidth - padding;
  const maxY = window.innerHeight - btn.offsetHeight - padding;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  btn.style.left = x + "px";
  btn.style.top = y + "px";
}

if (!isMobile) {
  noBtn.addEventListener("mouseenter", () => {
    randomPosition(yesBtn);
  });
}

yesBtn.addEventListener("click", () => {
  if (!isMobile) return;

  yesClicks++;

  if (yesClicks === 1) {
    question.textContent = "¿Estás segura que sí?";
  } else if (yesClicks === 2) {
    question.textContent = "¿Completamente segura de que sí?";
  } else if (yesClicks === 3) {
    question.textContent = "¿Cómo puedo hacerte cambiar a un no?";
    yesBtn.remove();

    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");

    btn1.textContent = "No";
    btn2.textContent = "No";
    btn1.className = "btn no";
    btn2.className = "btn no";
    btn1.style.left = "0";
    btn2.style.right = "0";

    btn1.onclick = showNoMessage;
    btn2.onclick = showNoMessage;

    document.querySelector(".buttons").appendChild(btn1);
    document.querySelector(".buttons").appendChild(btn2);
  }
});

function showNoMessage() {
  message.textContent = "Ese no se ve muy convencido… prueba con el sí 💖";
  message.classList.remove("hidden");
}

noBtn.addEventListener("click", showNoMessage);
