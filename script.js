const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Fondo espacial animado
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

// Lógica de interacción
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

// 🖥️ PC: el botón "Sí" se escapa cuando el mouse se le acerca
if (!isMobile) {
  yesBtn.addEventListener("mouseenter", () => {
    randomPosition(yesBtn);
  });
}

// 📱 Celular: flujo de preguntas
yesBtn.addEventListener("click", () => {
  if (!isMobile) return;

  yesClicks++;

  if (yesClicks === 1) {
    question.textContent = "¿Estás segura que sí?";
  } else if (yesClicks === 2) {
    question.textContent = "¿Completamente segura de que sí?";
  } else if (yesClicks === 3) {
    question.textContent = "¿Cómo puedo hacerte cambiar a un no?";
    document.querySelector(".buttons").innerHTML = "";

    const linkBtn = document.createElement("a");
    linkBtn.textContent = "Dar click aquí";
    linkBtn.href = "https://wa.me/18098624230"; // 👈 PON AQUÍ TU NÚMERO (ej: 1809XXXXXXX)
    linkBtn.target = "_blank";
    linkBtn.className = "btn yes";
    linkBtn.style.position = "relative";
    linkBtn.style.left = "0";
    linkBtn.style.top = "0";

    document.querySelector(".buttons").appendChild(linkBtn);
  }
});

// ❌ Botón "No" en PC y celular
function showNoMessage() {
  message.textContent =
    "Corazón hermoso, sé que muchas veces te haré incomodar o sentirte mal, " +
    "pero quiero que sepas que lo que menos quiero es que estés o te sientas mal. " +
    "Te adoro un gugol y más allá, más de lo que te imaginas, y nunca dejaré de hacerlo.";
  message.classList.remove("hidden");
}

noBtn.addEventListener("click", showNoMessage);
