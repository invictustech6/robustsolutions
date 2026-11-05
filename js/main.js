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
    if (header2) header2.classList.toggle("is-scrolled", y > 8);
    if (sideRail) sideRail.classList.toggle("is-visible", y > 280);
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

  // Hero carousel
  const slides = Array.from(document.querySelectorAll(".hero__slide"));
  if (slides.length > 1) {
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove("is-active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("is-active");
    }, 5500);
  }

  // Certificate lightbox placeholders
  document.querySelectorAll("[data-cert]").forEach((el) => {
    el.addEventListener("click", () => {
      if (!lightbox || !lightboxBody) return;
      const title = el.getAttribute("data-cert") || "Certificate";
      lightboxBody.innerHTML = `<h3>${title}</h3><p class="note">Full-size certificate asset pending from Robust team. Structure matches GTL-style lightbox.</p>`;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  };

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // Basic form guard (honeypot)
  document.querySelectorAll("form[data-query-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const hp = form.querySelector(".hp input");
      if (hp && hp.value) return;
      const status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent =
          "Thanks — this demo form is front-end only. Wire CAPTCHA/OTP + email delivery before production.";
      }
      form.reset();
    });
  });
})();
