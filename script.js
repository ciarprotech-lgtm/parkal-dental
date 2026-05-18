/* ============================================================
   PARKAL DENTAL CENTRE — script.js
   Clean, modern interactions matching the reference design
   ============================================================ */

"use strict";

/* ── Loader ── */
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("gone");
    document.body.style.overflow = "";
  }, 2100);
});
document.body.style.overflow = "hidden";

/* ── GSAP ── */
gsap.registerPlugin(ScrollTrigger);

/* ── Custom Cursor ── */
const dot = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + "px";
  dot.style.top = my + "px";
});

(function trackRing() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(trackRing);
})();

document
  .querySelectorAll("a, button, .svc-card, .why-card, .testi-card, .cinfo-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("big"));
    el.addEventListener("mouseleave", () => ring.classList.remove("big"));
  });

/* ── Scroll Progress ── */
const scrollBar = document.getElementById("scrollBar");
window.addEventListener("scroll", () => {
  const pct =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  scrollBar.style.width = pct + "%";
});

/* ── Navbar ── */
const navbar = document.getElementById("navbar");
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);

  // Active link
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navItems.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
  syncDrawerActive(current);

  // Back to top
  document
    .getElementById("topBtn")
    .classList.toggle("show", window.scrollY > 400);
});

/* ── Mobile Menu (Drawer) ── */
const burger = document.getElementById("burger");
const navMenu = document.getElementById("navMenu");
const mobDrawer = document.getElementById("mobDrawer");
const mobOverlay = document.getElementById("mobOverlay");
const mobClose = document.getElementById("mobClose");

function openDrawer() {
  mobDrawer.classList.add("open");
  mobOverlay.classList.add("show");
  burger.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeDrawer() {
  mobDrawer.classList.remove("open");
  mobOverlay.classList.remove("show");
  burger.classList.remove("open");
  document.body.style.overflow = "";
}

burger.addEventListener("click", () => {
  mobDrawer.classList.contains("open") ? closeDrawer() : openDrawer();
});
mobClose.addEventListener("click", closeDrawer);
mobOverlay.addEventListener("click", closeDrawer);

// Close on nav link click + sync active state
document.querySelectorAll(".mob-nav-item").forEach((a) => {
  a.addEventListener("click", closeDrawer);
});

// Keep old nav-menu links working on desktop
navMenu.querySelectorAll(".nav-item").forEach((a) => {
  a.addEventListener("click", () => {
    burger.classList.remove("open");
    navMenu.classList.remove("open");
  });
});

// Sync active state to drawer links on scroll
function syncDrawerActive(currentId) {
  document.querySelectorAll(".mob-nav-item").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + currentId);
  });
}

/* ── Smooth Scroll ── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - navbar.offsetHeight - 16,
        behavior: "smooth",
      });
    }
  });
});

/* ── Back to Top ── */
document.getElementById("topBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ── Dark Mode ── */
const themeBtn = document.getElementById("themeBtn");
const body = document.body;
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}
themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeBtn.innerHTML = isDark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

/* ── Scroll Reveal (IntersectionObserver) ── */
function addRevealClasses() {
  // Hero
  document.querySelector(".hero-left")?.classList.add("fade-left");
  document.querySelector(".hero-right")?.classList.add("fade-right");

  // About
  document.querySelector(".about-left")?.classList.add("fade-left");
  document.querySelector(".about-right")?.classList.add("fade-right");

  // Section headers
  document
    .querySelectorAll(".sec-header")
    .forEach((el) => el.classList.add("fade-up"));

  // Service cards — stagger
  document.querySelectorAll(".svc-card").forEach((el, i) => {
    el.classList.add("fade-up", `d${Math.min(i + 1, 12)}`);
  });

  // Why cards
  document.querySelectorAll(".why-card").forEach((el, i) => {
    el.classList.add("fade-up", `d${Math.min(i + 1, 6)}`);
  });

  // Testimonial cards
  document.querySelectorAll(".testi-card").forEach((el, i) => {
    el.classList.add("fade-up", `d${i + 1}`);
  });

  // Contact info cards
  document.querySelectorAll(".cinfo-card").forEach((el, i) => {
    el.classList.add("fade-up", `d${i + 1}`);
  });

  // Why CTA banner
  document.querySelector(".why-cta-banner")?.classList.add("fade-up");

  // Booking card
  document.querySelector(".booking-card")?.classList.add("fade-right");
  document.querySelector(".contact-left")?.classList.add("fade-left");

  // Social proof
  document.querySelector(".testi-social-proof")?.classList.add("fade-up");

  // SVC CTA
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
  duration: 1,
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

/* ── Why card hover ── */
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

/* ── Set today as min date for booking ── */
// (booking form removed — appointments via phone/WhatsApp)

console.log(
  "%c🦷 Parkal Dental Centre",
  "color:#0ea5e9;font-size:18px;font-weight:800;",
);
