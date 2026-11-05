(() => {
  const header2 = document.querySelector(".header-2");
  const sideRail = document.querySelector(".side-rail");
  const navToggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const lightbox = document.querySelector(".lightbox");
  const lightboxBody = document.querySelector("[data-lightbox-body]");
  const lightboxClose = document.querySelector("[data-lightbox-close]");

  const onScroll = () => {
    const y = window.scrollY || 0;
    header2?.classList.toggle("is-scrolled", y > 8);
    sideRail?.classList.toggle("is-visible", y > 260);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Carousel
  const slides = [...document.querySelectorAll(".hero__slide")];
  const dots = [...document.querySelectorAll("[data-hero-dot]")];
  let idx = 0;
  let timer;
  const show = (n) => {
    if (!slides.length) return;
    slides[idx]?.classList.remove("is-active");
    dots[idx]?.classList.remove("is-active");
    idx = (n + slides.length) % slides.length;
    slides[idx].classList.add("is-active");
    dots[idx]?.classList.add("is-active");
  };
  const start = () => {
    if (slides.length < 2) return;
    timer = setInterval(() => show(idx + 1), 5600);
  };
  dots.forEach((d, i) =>
    d.addEventListener("click", () => {
      clearInterval(timer);
      show(i);
      start();
    })
  );
  start();

  // Certificate lightbox
  document.querySelectorAll("[data-cert]").forEach((el) => {
    el.addEventListener("click", () => {
      if (!lightbox || !lightboxBody) return;
      const title = el.getAttribute("data-cert") || "Certificate";
      const detail = el.getAttribute("data-cert-detail") || "";
      lightboxBody.innerHTML = `<p class="eyebrow">Accreditation document</p><h3>${title}</h3><p>${detail || "Full-resolution certificate file pending from Robust team. Lightbox structure is ready for PDF/image assets."}</p><p class="note"><span class="client-needed">Client asset needed</span></p>`;
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

  // Gallery filters
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

  // Forms: honeypot + timing + front-end status (backend/CAPTCHA to wire)
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
      if (status) {
        status.textContent =
          "Received locally. Production will send this to info@robustsolutions.in after CAPTCHA/OTP is configured.";
      }
      form.reset();
    });
  });
})();
