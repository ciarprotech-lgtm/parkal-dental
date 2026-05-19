/* ============================================================
   ANIMATIONS — Scroll Reveal, Counters, GSAP Hero & Parallax,
                Card Hover Effects
   ============================================================ */

"use strict";

/* ── GSAP Plugin ── */
gsap.registerPlugin(ScrollTrigger);

/* ── Scroll Reveal (IntersectionObserver) ── */
function addRevealClasses() {
  document.querySelector(".hero-left")?.classList.add("fade-left");
  document.querySelector(".hero-right")?.classList.add("fade-right");
  document.querySelector(".about-left")?.classList.add("fade-left");
  document.querySelector(".about-right")?.classList.add("fade-right");

  document
    .querySelectorAll(".sec-header")
    .forEach((el) => el.classList.add("fade-up"));

  document.querySelectorAll(".svc-card").forEach((el, i) => {
    el.classList.add("fade-up", `d${Math.min(i + 1, 12)}`);
  });
  document.querySelectorAll(".why-card").forEach((el, i) => {
    el.classList.add("fade-up", `d${Math.min(i + 1, 6)}`);
  });
  document.querySelectorAll(".marquee-track").forEach((el, i) => {
    el.classList.add("fade-up", `d${i + 1}`);
  });
  document.querySelectorAll(".cinfo-card").forEach((el, i) => {
    el.classList.add("fade-up", `d${i + 1}`);
  });

  document.querySelector(".why-cta-banner")?.classList.add("fade-up");
  document.querySelector(".booking-card")?.classList.add("fade-right");
  document.querySelector(".contact-left")?.classList.add("fade-left");
  document.querySelector(".testi-social-proof")?.classList.add("fade-up");
  document.querySelector(".svc-cta")?.classList.add("fade-up");
}

addRevealClasses();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".fade-up, .fade-left, .fade-right").forEach((el) => {
  revealObserver.observe(el);
});

/* ── Animated Counters ── */
function runCounter(el) {
  const raw = el.getAttribute("data-count");
  if (!raw) return;
  const target = parseInt(raw);
  const dur = 1800;
  const start = performance.now();
  const update = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target);
    if (p < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        runCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll("[data-count]")
  .forEach((el) => counterObs.observe(el));

/* ── GSAP Hero Entrance ── */
gsap.from(".hero-h1", {
  y: 40,
  opacity: 0,
  duration: 0.9,
  ease: "power3.out",
  delay: 2.3,
});
gsap.from(".hero-p", {
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
  delay: 2.5,
});
gsap.from(".hero-btns", {
  y: 20,
  opacity: 0,
  duration: 0.7,
  ease: "power3.out",
  delay: 2.7,
});
gsap.from(".hero-trust-badges", {
  y: 16,
  opacity: 0,
  duration: 0.6,
  ease: "power3.out",
  delay: 2.9,
});
gsap.from(".hero-img-card", {
  x: 40,
  opacity: 0,
  duration: 1.0,
  ease: "power3.out",
  delay: 2.4,
});
gsap.from(".hero-badge-tl", {
  scale: 0,
  opacity: 0,
  duration: 0.5,
  ease: "back.out(1.7)",
  delay: 3.1,
});
gsap.from(".hero-badge-bl", {
  scale: 0,
  opacity: 0,
  duration: 0.5,
  ease: "back.out(1.7)",
  delay: 3.3,
});

/* ── GSAP Section Parallax ── */
gsap.utils.toArray(".about-img").forEach((img) => {
  gsap.to(img, {
    yPercent: -8,
    ease: "none",
    scrollTrigger: {
      trigger: img,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});

/* ── Service card subtle hover glow ── */
document.querySelectorAll(".svc-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(14,165,233,0.04), var(--bg-white) 60%)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.background = "";
  });
});

/* ── Why card icon hover ── */
document.querySelectorAll(".why-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card.querySelector(".why-icon"), {
      scale: 1.1,
      duration: 0.25,
      ease: "power2.out",
    });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card.querySelector(".why-icon"), {
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  });
});

console.log(
  "%c🦷 Parkal Dental Centre",
  "color:#0ea5e9;font-size:18px;font-weight:800;",
);
