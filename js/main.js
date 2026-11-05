(() => {
  "use strict";
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Sticky header + side rail ---------- */
  const siteHeader = $(".site-header");
  const header2 = $(".header-2");
  const sideRail = $(".side-rail");
  const primaryNav = $("#primary-nav");
  const wideRail = () => window.matchMedia("(min-width: 1440px)").matches;
  const setStack = () => {
    if (siteHeader) document.documentElement.style.setProperty("--stack", siteHeader.offsetHeight + "px");
  };
  const onScroll = () => {
    const y = window.scrollY || 0;
    const compact = y > 72;
    const useRail = compact && wideRail();
    header2?.classList.toggle("is-scrolled", y > 8);
    siteHeader?.classList.toggle("is-compact", compact);
    sideRail?.classList.toggle("is-visible", useRail);
    if (primaryNav) {
      primaryNav.setAttribute("aria-hidden", useRail ? "true" : "false");
      if (useRail) primaryNav.setAttribute("inert", "");
      else primaryNav.removeAttribute("inert");
    }
    if (sideRail) sideRail.setAttribute("aria-hidden", useRail ? "false" : "true");
    setStack();
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  window.addEventListener("resize", () => { setStack(); onScroll(); }, { passive: true });
  window.addEventListener("load", () => { setStack(); onScroll(); });

  /* ---------- Mobile nav ---------- */
  const navToggle = $(".nav-toggle");
  const mobileNav = $(".mobile-nav");
  if (navToggle && mobileNav) {
    const closeNav = ({ focusToggle = false } = {}) => {
      mobileNav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      if (focusToggle) navToggle.focus();
    };
    navToggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        const first = mobileNav.querySelector("a");
        if (first) first.focus();
      }
    });
    $$("a", mobileNav).forEach((a) =>
      a.addEventListener("click", () => closeNav())
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("is-open")) closeNav({ focusToggle: true });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = $$(".reveal");
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

  /* ---------- Coverflow carousel (toned-down 3D) ---------- */
  const stage = $(".coverflow__stage");
  if (stage) {
    const cards = $$(".cf-card", stage);
    const dotsWrap = $("[data-cf-dots]");
    const n = cards.length;
    let current = 0;
    let timer;

    const dots = cards.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Show slide ${i + 1}`);
      b.addEventListener("click", () => { go(i); restart(); });
      dotsWrap?.appendChild(b);
      return b;
    });

    const layout = () => {
      cards.forEach((card, i) => {
        let offset = i - current;
        if (offset > n / 2) offset -= n;
        if (offset < -n / 2) offset += n;
        const abs = Math.abs(offset);
        // Gentle depth: small rotation + modest push-back
        const translateX = offset * 50;
        const rotateY = offset * -16;
        const translateZ = -abs * 70;
        const scale = offset === 0 ? 1 : 0.88;
        const opacity = abs > 2 ? 0 : offset === 0 ? 1 : 0.6;
        card.style.transform = `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(50 - abs);
        card.style.pointerEvents = offset === 0 ? "auto" : "none";
        card.setAttribute("aria-hidden", offset === 0 ? "false" : "true");
      });
      dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
    };
    const go = (i) => { current = (i + n) % n; layout(); };
    const next = () => go(current + 1);
    const prev = () => go(current - 1);

    $("[data-cf-next]")?.addEventListener("click", () => { next(); restart(); });
    $("[data-cf-prev]")?.addEventListener("click", () => { prev(); restart(); });
    cards.forEach((card, i) => card.addEventListener("click", () => { if (i !== current) { go(i); restart(); } }));

    const start = () => { if (!prefersReduced && n > 1) timer = window.setInterval(next, 5500); };
    const restart = () => { window.clearInterval(timer); start(); };
    const cf = $(".coverflow");
    cf?.addEventListener("mouseenter", () => window.clearInterval(timer));
    cf?.addEventListener("mouseleave", start);

    let startX = null;
    stage.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
    stage.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
      startX = null; restart();
    });
    layout(); start();
  }

  /* ---------- Testimonials carousel ---------- */
  const quotesRoot = $("[data-quotes]");
  if (quotesRoot) {
    const slides = $$(".quotes__slide", quotesRoot);
    let qi = 0;
    const show = (i) => {
      qi = (i + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle("is-active", n === qi));
    };
    $("[data-quotes-prev]", quotesRoot)?.addEventListener("click", () => show(qi - 1));
    $("[data-quotes-next]", quotesRoot)?.addEventListener("click", () => show(qi + 1));
    let qStart = null;
    quotesRoot.addEventListener("touchstart", (e) => (qStart = e.touches[0].clientX), { passive: true });
    quotesRoot.addEventListener("touchend", (e) => {
      if (qStart === null) return;
      const dx = e.changedTouches[0].clientX - qStart;
      if (Math.abs(dx) > 40) show(qi + (dx < 0 ? 1 : -1));
      qStart = null;
    });
  }

  /* ---------- Count-up stats ---------- */
  const counters = $$("[data-count]");
  if (counters.length) {
    const run = (el) => {
      const target = parseFloat(el.getAttribute("data-count"));
      if (prefersReduced) { el.textContent = String(target); return; }
      const dur = 1400, t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { run(e.target); cio.unobserve(e.target); } });
      }, { threshold: 0.5 });
      counters.forEach((c) => cio.observe(c));
    } else counters.forEach(run);
  }

  /* ---------- Certificate lightbox ---------- */
  const lightbox = $(".lightbox");
  const lightboxBody = $("[data-lightbox-body]");
  const lightboxClose = $("[data-lightbox-close]");
  let lastFocused = null;
  $$("[data-cert]").forEach((el) => {
    el.addEventListener("click", () => {
      if (!lightbox || !lightboxBody) return;
      lastFocused = el;
      const title = el.getAttribute("data-cert") || "Certificate";
      const detail = el.getAttribute("data-cert-detail") || "";
      const img = el.getAttribute("data-cert-img");
      lightboxBody.innerHTML =
        `<p class="eyebrow">Accreditation</p><h3>${title}</h3>` +
        (img ? `<img src="${img}" alt="${title}" style="max-width:220px;margin:0 auto 1rem" />` : "") +
        `<p>${detail}</p>`;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      lightboxClose?.focus();
    });
  });
  const closeLightbox = () => {
    lightbox?.classList.remove("is-open");
    lightbox?.setAttribute("aria-hidden", "true");
    lastFocused?.focus();
  };
  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  /* ---------- Gallery filters ---------- */
  const filterBtns = $$("[data-filter]");
  const items = $$("[data-gallery-item]");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.getAttribute("data-filter");
      items.forEach((item) => item.classList.toggle("is-hidden", f !== "all" && item.getAttribute("data-category") !== f));
    });
  });

  /* ---------- Forms: validation + honest status (no fake success) ---------- */
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telRe = /^[+\d][\d\s\-()]{6,}$/;
  (async () => {
    let turnstileSiteKey = "";
    try {
      const cfgRes = await fetch("/api/form-config", { headers: { Accept: "application/json" } });
      if (cfgRes.ok) {
        const cfg = await cfgRes.json();
        turnstileSiteKey = cfg.turnstileSiteKey || "";
      }
    } catch { /* local file or API unavailable */ }
    if (turnstileSiteKey) {
      await new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        s.async = true;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      }).catch(() => {});
    }
    const widgetIds = new WeakMap();
    $$("form[data-query-form]").forEach((form) => {
      const slot = $("[data-turnstile]", form);
      if (slot && turnstileSiteKey && window.turnstile) {
        widgetIds.set(form, window.turnstile.render(slot, { sitekey: turnstileSiteKey, theme: "light" }));
      }
    const started = Date.now();
    const status = $("[data-form-status]", form);
    const setStatus = (msg, kind) => {
      if (!status) return;
      status.textContent = msg;
      status.className = "form-status is-show is-" + kind;
    };
    const fieldError = (input, msg) => {
      const holder = input.closest(".field");
      let err = holder?.querySelector(".field-error");
      if (holder && !err) { err = document.createElement("div"); err.className = "field-error"; holder.appendChild(err); }
      if (err) err.textContent = msg || "";
      input.setAttribute("aria-invalid", msg ? "true" : "false");
    };
    const validate = () => {
      let ok = true, firstBad = null;
      $$("input, textarea, select", form).forEach((input) => {
        if (input.type === "hidden" || input.closest(".hp")) return;
        let msg = "";
        const v = (input.value || "").trim();
        if (input.required && !v) msg = "This field is required.";
        else if (v && input.type === "email" && !emailRe.test(v)) msg = "Enter a valid email address.";
        else if (v && input.type === "tel" && !telRe.test(v)) msg = "Enter a valid phone number.";
        fieldError(input, msg);
        if (msg) { ok = false; firstBad = firstBad || input; }
      });
      if (firstBad) firstBad.focus();
      return ok;
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const hp = $(".hp input", form);
      if (hp && hp.value) return; // bot
      if (Date.now() - started < 1200) { setStatus("Please take a moment to complete the form, then submit again.", "err"); return; }
      if (!validate()) { setStatus("Please correct the highlighted fields and submit again.", "err"); return; }

      const endpoint = form.getAttribute("data-endpoint");
      const submitBtn = $("button[type=submit]", form);
      const fallback = 'We couldn\'t submit your enquiry online right now. Please email info@robustsolutions.in or call +91 99687 17582 and our team will respond during working hours (Mon–Sat, 9:30 AM–6:30 PM IST).';
      if (!endpoint) { setStatus(fallback, "info"); return; }
      try {
        submitBtn && (submitBtn.disabled = true);
        setStatus("Sending your enquiry…", "info");
        const data = Object.fromEntries(new FormData(form).entries());
        const widgetId = widgetIds.get(form);
        if (turnstileSiteKey) {
          const token = window.turnstile && widgetId != null ? window.turnstile.getResponse(widgetId) : "";
          if (!token) {
            setStatus("Please complete the verification and submit again.", "err");
            return;
          }
          data.turnstileToken = token;
        }
        const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (res.ok) {
          setStatus("Thank you — your enquiry has been received. Our team will respond during working hours (Mon–Sat, 9:30 AM–6:30 PM IST).", "ok");
          form.reset();
        } else if (res.status === 429) {
          setStatus("You've sent several enquiries in a short time. Please wait a minute and try again, or email info@robustsolutions.in.", "err");
        } else if (res.status === 403) {
          setStatus("Verification failed. Please try again.", "err");
        } else {
          // 404/501/503 (online submission unavailable) or any other non-OK: honest contact fallback, never a success.
          setStatus(fallback, "info");
        }
      } catch {
        setStatus(fallback, "err");
      } finally {
        submitBtn && (submitBtn.disabled = false);
        const widgetId = widgetIds.get(form);
        if (widgetId != null && window.turnstile) window.turnstile.reset(widgetId);
      }
    });
  });
  })();

  /* ---------- Year ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
