// ################## Counter  inklusive Animation Pixelfeuerwerk ################# //

function animateCounter(id, target, duration) {
  const element = document.getElementById(id);
  let start = 0;
  const increment = target / (duration / 30);

  const interval = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(interval);
      celebrate(element); // Puls + Partikel beim Abschluss
    }
    element.textContent = Math.floor(start);
  }, 30);
}

function celebrate(element) {
  // Puls hinzufügen
  element.classList.add("pulse");
  setTimeout(() => element.classList.remove("pulse"), 600);

  // Partikel erzeugen
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Zufällige Richtung & Entfernung
    const angle = Math.random() * 2 * Math.PI;
    const distance = 40 + Math.random() * 30;
    const x = Math.cos(angle) * distance + "px";
    const y = Math.sin(angle) * distance + "px";
    particle.style.setProperty("--x", x);
    particle.style.setProperty("--y", y);

    // Zufällige Farbe
    const colors = ["#ff4b5c", "#ffcc00", "#00c2ff", "#6eff7a", "#ff6ef0"];
    particle.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    // Partikel um das Element positionieren
    element.parentElement.appendChild(particle);

    // Nach der Animation löschen
    particle.addEventListener("animationend", () => {
      particle.remove();
    });
  }
}

// Counters beim Laden animieren
window.addEventListener("DOMContentLoaded", () => {
  const counterSection = document.querySelector(
    ".grid.grid-cols-1.sm\\:grid-cols-3"
  ); // Elterncontainer der Counters

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Alle Counters gleichzeitig starten
          animateCounter("counter1", 8000, 1500);
          animateCounter("counter2", 6000, 1500);
          animateCounter("counter3", 2000, 1500);

          observer.unobserve(entry.target); // nur einmal starten
        }
      });
    },
    { threshold: 0.5 }
  ); // 50% Sichtbarkeit

  if (counterSection) {
    observer.observe(counterSection);
  }
});

// Yeah Canvas!

document.addEventListener("DOMContentLoaded", () => {
  const emojis = ["🏡", "🏗️", "🔨", "🏠"]; // Reihenfolge der Animation
  let index = 0;

  setInterval(() => {
    // Canvas erzeugen
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    // Hintergrund durchsichtig lassen
    ctx.clearRect(0, 0, 64, 64);

    // Emoji ins Canvas zeichnen
    ctx.font = "48px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emojis[index], 32, 32);

    // Neues Favicon setzen
    const link =
      document.querySelector("link[rel='icon']") ||
      document.createElement("link");
    link.rel = "icon";
    link.href = canvas.toDataURL("image/png");
    document.head.appendChild(link);

    // Index wechseln
    index = (index + 1) % emojis.length;
  }, 800); // alle 0,8 Sekunden wechseln
});

// Chat Bubble ein und ausblenden.

document.addEventListener("DOMContentLoaded", function () {
  const agent = document.getElementById("chat-agent");
  const bubble = document.getElementById("chat-bubble");

  // 1. Nach 5 Sekunden einblenden
  setTimeout(() => {
    agent.classList.remove("opacity-0");
  }, 5000);

  // 2. Sprechblase nach 5 weiteren Sekunden ausblenden
  setTimeout(() => {
    if (bubble) bubble.classList.add("hidden");
  }, 10000); // 5s + 5s = 10s insgesamt
});

// PopUp Chatfenster mit Loading

document.addEventListener("DOMContentLoaded", function () {
  const agent = document.getElementById("chat-agent");
  const bubble = document.getElementById("chat-bubble");
  const popup = document.getElementById("chat-popup");
  const closeBtn = document.getElementById("close-popup");
  const loadingBar = document.getElementById("loading-bar");

  // Avatar + Sprechblase nach 5 Sekunden einblenden
  setTimeout(() => agent.classList.remove("opacity-0"), 5000);

  // Sprechblase nach weiteren 5 Sekunden ausblenden
  // setTimeout(() => bubble.classList.add("hidden"), 10000);

  // Beim Anklicken der Sprechblase oder Avatar Pop-Up öffnen
  bubble.addEventListener("click", openPopup);
  agent.querySelector("img").addEventListener("click", openPopup);

  function openPopup() {
    popup.classList.remove("hidden");
    loadingBar.style.width = "0"; // Reset

    // Ladebalken animieren
    setTimeout(() => {
      loadingBar.style.width = "100%";
    }, 100); // kleine Verzögerung für Transition
  }
  // Schließen Button
  closeBtn.addEventListener("click", () => popup.classList.add("hidden"));
});

// Angebots Stern über Card 2

document.addEventListener("DOMContentLoaded", function () {
  const star = document.getElementById("top-star");
  const card2 = document.getElementById("card-middle");
  const innerStar = star.querySelector("div");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            star.classList.remove("hidden");

            // Nach Intro-Animation die Pulsation starten
            innerStar.addEventListener(
              "animationend",
              () => {
                innerStar.classList.remove("intro-zoom");
                innerStar.classList.add("pulse-slow");
              },
              { once: true }
            );
          }, 1000); // 1 Sekunde Verzögerung nach Scroll
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(card2);
});
