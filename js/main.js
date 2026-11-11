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

  /* ---------- Hero fade carousel ---------- */
  const hero = $(".hero--fade");
  if (hero) {
    const slides = $$(".hero-slide", hero);
    const dotsWrap = $("[data-hero-dots]", hero);
    const n = slides.length;
    let current = 0;
    let timer;
    const dots = slides.map((slide, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Show slide ${i + 1}`);
      b.addEventListener("click", () => { go(i); restart(); });
      dotsWrap?.appendChild(b);
      if (i !== 0) slide.setAttribute("aria-hidden", "true");
      return b;
    });
    const go = (i) => {
      current = (i + n) % n;
      slides.forEach((s, idx) => {
        s.classList.toggle("is-active", idx === current);
        s.setAttribute("aria-hidden", idx === current ? "false" : "true");
      });
      dots.forEach((d, idx) => d.classList.toggle("is-active", idx === current));
    };
    const next = () => go(current + 1);
    const prev = () => go(current - 1);
    $("[data-hero-next]", hero)?.addEventListener("click", () => { next(); restart(); });
    $("[data-hero-prev]", hero)?.addEventListener("click", () => { prev(); restart(); });
    const start = () => { if (!prefersReduced && n > 1) timer = window.setInterval(next, 5500); };
    const restart = () => { window.clearInterval(timer); start(); };
    hero.addEventListener("mouseenter", () => window.clearInterval(timer));
    hero.addEventListener("mouseleave", start);
    let startX = null;
    hero.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
    hero.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { (dx < 0 ? next : prev)(); restart(); }
      startX = null;
    });
    if (dots[0]) dots[0].classList.add("is-active");
    start();
  }

  /* ---------- Client logo strip ---------- */
  const logosRoot = $("[data-logos]");
  if (logosRoot) {
    const track = $("[data-logos-track]", logosRoot);
    const slots = $$(".logo-slot", logosRoot);
    const n = slots.length;
    let index = 0;
    const gap = () => {
      const s = window.getComputedStyle(track);
      return parseFloat(s.columnGap || s.gap) || 26;
    };
    const perView = () => {
      const slotW = slots[0] ? slots[0].getBoundingClientRect().width : 168;
      const viewW = logosRoot.querySelector(".logo-strip__viewport")?.clientWidth || logosRoot.clientWidth;
      return Math.max(1, Math.floor((viewW + gap()) / (slotW + gap())));
    };
    const maxIndex = () => Math.max(0, n - perView());
    const layout = () => {
      const pv = perView();
      if (n <= pv) {
        track.style.justifyContent = "center";
        track.style.transform = "translateX(0)";
        index = 0;
        return;
      }
      track.style.justifyContent = "flex-start";
      index = Math.min(index, maxIndex());
      const slotW = slots[0] ? slots[0].getBoundingClientRect().width : 168;
      track.style.transform = `translateX(${-(index * (slotW + gap()))}px)`;
    };
    $("[data-logos-prev]", logosRoot)?.addEventListener("click", () => {
      index = index <= 0 ? maxIndex() : index - 1;
      layout();
    });
    $("[data-logos-next]", logosRoot)?.addEventListener("click", () => {
      index = index >= maxIndex() ? 0 : index + 1;
      layout();
    });
    window.addEventListener("resize", layout);
    layout();
  }

  /* ---------- Certificates carousel (GTL-style document row) ---------- */
  const certsRoot = $("[data-certs]");
  if (certsRoot) {
    const viewport = $("[data-certs-viewport]", certsRoot);
    const track = $("[data-certs-track]", certsRoot);
    const cards = $$(".certs-card", certsRoot);
    const dotsWrap = $("[data-certs-dots]");
    const n = cards.length;
    let index = 0;
    const gap = () => {
      const s = window.getComputedStyle(track);
      return parseFloat(s.columnGap || s.gap) || 22;
    };
    const perView = () => {
      const cardW = cards[0] ? cards[0].getBoundingClientRect().width : 220;
      const g = gap();
      return Math.max(1, Math.min(n, Math.floor((viewport.clientWidth + g) / (cardW + g))));
    };
    const maxIndex = () => Math.max(0, n - perView());
    const dots = cards.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Show certificate ${i + 1}`);
      b.addEventListener("click", () => go(i));
      dotsWrap?.appendChild(b);
      return b;
    });
    const prevBtn = $("[data-certs-prev]", certsRoot);
    const nextBtn = $("[data-certs-next]", certsRoot);
    const go = (i) => { index = Math.max(0, Math.min(i, maxIndex())); layout(); };
    const layout = () => {
      index = Math.min(index, maxIndex());
      const cardW = cards[0] ? cards[0].getBoundingClientRect().width : 0;
      const g = gap();
      const used = n * cardW + Math.max(0, n - 1) * g;
      const origin = Math.max(0, (viewport.clientWidth - used) / 2);
      track.style.transform = `translateX(${origin - index * (cardW + g)}px)`;
      dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
      const sliding = maxIndex() > 0;
      if (prevBtn) prevBtn.hidden = !sliding;
      if (nextBtn) nextBtn.hidden = !sliding;
      if (dotsWrap) dotsWrap.hidden = !sliding;
    };
    nextBtn?.addEventListener("click", () => go(index >= maxIndex() ? 0 : index + 1));
    prevBtn?.addEventListener("click", () => go(index <= 0 ? maxIndex() : index - 1));
    let startX = null;
    viewport.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
    viewport.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      startX = null;
    });
    window.addEventListener("resize", layout, { passive: true });
    layout();
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
      const isDoc = el.hasAttribute("data-cert-doc");
      const panel = lightbox.querySelector(".lightbox__panel");
      panel?.classList.toggle("lightbox__panel--doc", Boolean(img && isDoc));
      lightboxBody.innerHTML =
        `<p class="eyebrow">Accreditation</p><h3>${title}</h3>` +
        (img ? `<img src="${img}" alt="${title}" class="lightbox__img${isDoc ? " lightbox__img--doc" : ""}" />` : "") +
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
