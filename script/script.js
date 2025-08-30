// Animierter Zähler für Sektion 2 - Fakten

function animateCounter(id, target, duration) {
  const element = document.getElementById(id);
  let start = 0;
  const increment = target / (duration / 50);

  const interval = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(interval);
    }
    element.textContent = Math.floor(start);
  }, 50);
}

// Counter animieren beim Laden
window.addEventListener("DOMContentLoaded", () => {
  animateCounter("counter1", 8, 1500);
  animateCounter("counter2", 6, 1500);
  animateCounter("counter3", 2, 1500);
});
