/* ============================================================
   UI — Loader, Cursor, Scroll Progress, Navbar, Mobile Drawer,
        Dark Mode, Smooth Scroll, Back to Top
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

/* ── Custom Cursor (desktop only) ── */
const dot = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");

const isTouchDevice = window.matchMedia("(hover: none)").matches;

if (isTouchDevice) {
  /* Hide cursor elements entirely on touch/mobile devices */
  if (dot) dot.style.display = "none";
  if (ring) ring.style.display = "none";
} else {
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
    .querySelectorAll(
      "a, button, .svc-card, .why-card, .testi-card, .cinfo-card",
    )
    .forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("big"));
      el.addEventListener("mouseleave", () => ring.classList.remove("big"));
    });
}

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

  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navItems.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
  syncDrawerActive(current);

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

document.querySelectorAll(".mob-nav-item").forEach((a) => {
  a.addEventListener("click", closeDrawer);
});
navMenu.querySelectorAll(".nav-item").forEach((a) => {
  a.addEventListener("click", () => {
    burger.classList.remove("open");
    navMenu.classList.remove("open");
  });
});

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

/* ── Services Filter ── */
const filterBtns = document.querySelectorAll(".filter-btn");
const svcCards = document.querySelectorAll(".svc-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filterVal = btn.getAttribute("data-filter");

    svcCards.forEach((card) => {
      if (filterVal === "all" || card.classList.contains(filterVal)) {
        card.style.display = "block";
        requestAnimationFrame(() => {
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        });
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.85)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});

// Link "View All Services" button to activate the "All Treatments" filter
const viewAllBtn = document.querySelector('.svc-cta .btn-outline[href="#services"]');
if (viewAllBtn) {
  viewAllBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) {
      allBtn.click();
    }
    const target = document.querySelector("#services");
    if (target) {
      const navbarEl = document.getElementById("navbar");
      const navH = navbarEl ? navbarEl.offsetHeight : 80;
      window.scrollTo({
        top: target.offsetTop - navH - 16,
        behavior: "smooth"
      });
    }
  });
}
