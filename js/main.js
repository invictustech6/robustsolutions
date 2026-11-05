(() => {
  "use strict";
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky header + side rail ---------- */
  const header2 = document.querySelector(".header-2");
  const sideRail = document.querySelector(".side-rail");
  const onScroll = () => {
    const y = window.scrollY || 0;
    header2?.classList.toggle("is-scrolled", y > 8);
    sideRail?.classList.toggle("is-visible", y > 300);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileNav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = [...document.querySelectorAll(".reveal")];
  if (prefersReduced || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- 3D coverflow carousel ---------- */
  const stage = document.querySelector(".coverflow__stage");
  if (stage) {
    const cards = [...stage.querySelectorAll(".cf-card")];
    const dotsWrap = document.querySelector("[data-cf-dots]");
    const n = cards.length;
    let current = 0;
    let timer;

    const dots = cards.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Show slide ${i + 1}`);
      b.addEventListener("click", () => {
        go(i);
        restart();
      });
      dotsWrap?.appendChild(b);
      return b;
    });

    const layout = () => {
      cards.forEach((card, i) => {
        let offset = i - current;
        if (offset > n / 2) offset -= n;
        if (offset < -n / 2) offset += n;
        const abs = Math.abs(offset);
        const translateX = offset * 54;
        const rotateY = offset * -32;
        const translateZ = -abs * 140;
        const scale = offset === 0 ? 1 : 0.82;
        const opacity = abs > 2 ? 0 : offset === 0 ? 1 : 0.55;
        card.style.transform = `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(50 - abs);
        card.style.pointerEvents = offset === 0 ? "auto" : "none";
        card.setAttribute("aria-hidden", offset === 0 ? "false" : "true");
      });
      dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
    };

    const go = (i) => {
      current = (i + n) % n;
      layout();
    };
    const next = () => go(current + 1);
    const prev = () => go(current - 1);

    document.querySelector("[data-cf-next]")?.addEventListener("click", () => {
      next();
      restart();
    });
    document.querySelector("[data-cf-prev]")?.addEventListener("click", () => {
      prev();
      restart();
    });

    // click a side card to bring it forward
    cards.forEach((card, i) =>
      card.addEventListener("click", () => {
        if (i !== current) {
          go(i);
          restart();
        }
      })
    );

    const start = () => {
      if (prefersReduced || n < 2) return;
      timer = window.setInterval(next, 5200);
    };
    const restart = () => {
      window.clearInterval(timer);
      start();
    };

    // pause on hover
    const cf = document.querySelector(".coverflow");
    cf?.addEventListener("mouseenter", () => window.clearInterval(timer));
    cf?.addEventListener("mouseleave", start);

    // swipe
    let startX = null;
    stage.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
    stage.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
      startX = null;
      restart();
    });

    layout();
    start();
  }

  /* ---------- Tilt on hover (pointer) ---------- */
  if (!prefersReduced && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll("[data-tilt]").forEach((el) => {
      const strength = 6;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg) translateY(-5px)`;
      });
      el.addEventListener("pointerleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------- Count-up stats ---------- */
  const counters = [...document.querySelectorAll("[data-count]")];
  if (counters.length) {
    const run = (el) => {
      const target = parseFloat(el.getAttribute("data-count"));
      if (prefersReduced) {
        el.textContent = String(target);
        return;
      }
      const dur = 1400;
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              run(e.target);
              cio.unobserve(e.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((c) => cio.observe(c));
    } else {
      counters.forEach(run);
    }
  }

  /* ---------- Certificate lightbox ---------- */
  const lightbox = document.querySelector(".lightbox");
  const lightboxBody = document.querySelector("[data-lightbox-body]");
  const lightboxClose = document.querySelector("[data-lightbox-close]");
  document.querySelectorAll("[data-cert]").forEach((el) => {
    el.addEventListener("click", () => {
      if (!lightbox || !lightboxBody) return;
      const title = el.getAttribute("data-cert") || "Certificate";
      const detail = el.getAttribute("data-cert-detail") || "";
      const img = el.getAttribute("data-cert-img");
      lightboxBody.innerHTML =
        `<p class="eyebrow">Accreditation</p><h3>${title}</h3>` +
        (img ? `<img src="${img}" alt="${title}" style="max-width:220px;margin:0 auto 1rem" />` : "") +
        `<p>${detail || "Full-resolution certificate file pending from Robust."}</p>` +
        (img ? "" : `<p><span class="client-needed">Client asset needed</span></p>`);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      lightboxClose?.focus();
    });
  });
  const closeLightbox = () => {
    lightbox?.classList.remove("is-open");
    lightbox?.setAttribute("aria-hidden", "true");
  };
  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  /* ---------- Gallery filters ---------- */
  const filterBtns = [...document.querySelectorAll("[data-filter]")];
  const items = [...document.querySelectorAll("[data-gallery-item]")];
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.getAttribute("data-filter");
      items.forEach((item) => {
        const cat = item.getAttribute("data-category");
        item.classList.toggle("is-hidden", f !== "all" && cat !== f);
      });
    });
  });

  /* ---------- Forms: honeypot + timing ---------- */
  document.querySelectorAll("form[data-query-form]").forEach((form) => {
    const started = Date.now();
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const hp = form.querySelector(".hp input");
      const status = form.querySelector("[data-form-status]");
      if (hp && hp.value) return;
      if (Date.now() - started < 1200) {
        if (status) status.textContent = "Please take a moment to complete the form, then try again.";
        return;
      }
      if (status) status.textContent = "Received locally. Production will deliver this to info@robustsolutions.in after CAPTCHA/OTP is configured.";
      form.reset();
    });
  });

  /* ---------- Year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
