gsap.registerPlugin(ScrollTrigger);

// ===== LOADER =====
const loaderNum = document.getElementById('loaderNum');
const loaderFill = document.getElementById('loaderFill');
const loader = document.getElementById('loader');

let progress = { value: 0 };
gsap.to(progress, {
  value: 100,
  duration: 2.2,
  ease: "power2.inOut",
  onUpdate: () => {
    loaderNum.textContent = Math.floor(progress.value);
    loaderFill.style.width = progress.value + '%';
  },
  onComplete: () => {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        loader.style.display = 'none';
        animateHero();
      }
    });
  }
});

// ===== HERO ANIMATION =====
function animateHero() {
  const heroText = document.getElementById('heroText');
  const heroOverlay = document.getElementById('heroOverlay');
  const heroSection = document.getElementById('hero');

  // Text zoom + fade on scroll
  gsap.to(heroText, {
    scale: 18,
    opacity: 0,
    ease: "power1.in",
    scrollTrigger: {
      trigger: heroSection,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    }
  });

  // Overlay fade out
  gsap.to(heroOverlay, {
    opacity: 0,
    ease: "power1.in",
    scrollTrigger: {
      trigger: heroSection,
      start: "top top",
      end: "50% top",
      scrub: 1,
    }
  });
}

// ===== CAREER CARDS SCATTER =====
window.addEventListener('load', () => {
  const careerSection = document.getElementById('career');
  const cards = document.querySelectorAll('.card');
  const headline = document.getElementById('careerHeadline');
  const hint = document.getElementById('scrollHint');

  // Final scatter positions (in vw/vh)
  const positions = [
    { x: -38, y: -32, r: -8 },
    { x:  38, y: -32, r:  8 },
    { x: -38, y:   0, r: -5 },
    { x:   0, y:   0, r:  0 },
    { x:  38, y:   0, r:  5 },
    { x: -38, y:  32, r:  8 },
    { x:   0, y:  32, r: -3 },
    { x:  38, y:  32, r:  7 },
  ];

  cards.forEach((card, i) => {
    const pos = positions[i];

    gsap.to(card, {
      x: `${pos.x}vw`,
      y: `${pos.y}vh`,
      rotate: pos.r,
      scale: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: careerSection,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      }
    });
  });

  // Headline fade out
  gsap.to(headline, {
    opacity: 0,
    scale: 0.9,
    ease: "power1.in",
    scrollTrigger: {
      trigger: careerSection,
      start: "30% top",
      end: "60% top",
      scrub: 1,
    }
  });

  // Scroll hint fade
  gsap.to(hint, {
    opacity: 0,
    ease: "power1.in",
    scrollTrigger: {
      trigger: careerSection,
      start: "top top",
      end: "20% top",
      scrub: 1,
    }
  });
});

// ===== SECTION REVEALS =====
window.addEventListener('load', () => {
  gsap.utils.toArray('.section').forEach((section) => {
    const items = section.querySelectorAll('.t-item, .skills-grid > div, .contact-grid a, .vision-text');
    
    gsap.from(items, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });
  });
});