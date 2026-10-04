// ===== LOADER =====
const loader = document.getElementById('loader');
const loaderPercent = document.getElementById('loaderPercent');
const loaderFill = document.getElementById('loaderFill');
let progress = 0;
const interval = setInterval(() => {
  progress += Math.random() * 4 + 1;
  if (progress >= 100) {
    progress = 100;
    clearInterval(interval);
    setTimeout(() => loader.classList.add('hide'), 500);
  }
  loaderPercent.textContent = Math.floor(progress);
  loaderFill.style.width = progress + '%';
}, 60);

// ===== HERO TEXT ZOOM =====
const heroText = document.getElementById('heroText');
const heroOverlay = document.getElementById('heroOverlay');
const heroSection = document.getElementById('hero');

function updateHero() {
  const rect = heroSection.getBoundingClientRect();
  const totalScroll = heroSection.offsetHeight - window.innerHeight;
  const scrolled = -rect.top;
  let p = Math.min(Math.max(scrolled / totalScroll, 0), 1);

  // Text scales from 1x to 25x over scroll
  const scale = 1 + p * 24;
  heroText.style.transform = `scale(${scale})`;
  heroText.style.opacity = p > 0.85 ? Math.max(0, 1 - (p - 0.85) * 6.6) : 1;
  heroOverlay.style.opacity = Math.max(0, 1 - p * 3);
}

// ===== CARDS SCATTER =====
const cardsWrap = document.getElementById('cardsWrap');
const cards = cardsWrap.querySelectorAll('.card');
const careerSection = document.getElementById('career');

// Final positions (in % of viewport)
const positions = [
  { x: -38, y: -34, r: -8 },
  { x:  38, y: -34, r:  8 },
  { x: -38, y:   0, r: -6 },
  { x:   0, y:   0, r:  2 },
  { x:  38, y:   0, r:  6 },
  { x: -38, y:  34, r:  8 },
  { x:   0, y:  34, r: -3 },
  { x:  38, y:  34, r:  7 },
];

function updateCards() {
  const rect = careerSection.getBoundingClientRect();
  const totalScroll = careerSection.offsetHeight - window.innerHeight;
  const scrolled = -rect.top;
  let p = Math.min(Math.max(scrolled / totalScroll, 0), 1);
  // Hold at start, then spread
  p = Math.min(Math.max((p - 0.15) / 0.7, 0), 1);
  // Ease in-out
  const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

  cards.forEach((card, i) => {
    const pos = positions[i];
    const startScale = 0.82;
    const endScale = 1;
    const scale = startScale + (endScale - startScale) * eased;

    const x = pos.x * eased;
    const y = pos.y * eased;
    const r = pos.r * eased;

    // Hover parallax effect (simple)
    card.style.transform = `translate(calc(-50% + ${x}vw), calc(-50% + ${y}vh)) rotate(${r}deg) scale(${scale})`;
    card.style.zIndex = 10 + i;
  });
}

// ===== SCROLL LISTENER (requestAnimationFrame) =====
let ticking = false;
function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateHero();
      updateCards();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', () => {
  updateHero();
  updateCards();
});

// Initial call after loader
setTimeout(() => {
  updateHero();
  updateCards();
}, 2000);