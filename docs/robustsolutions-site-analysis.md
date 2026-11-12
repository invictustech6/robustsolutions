---
cursor:
  subagentId: "bc-71646340-d48a-527d-ba4e-209bd7a0b645"
---

# Robust Solutions website analysis

**Site:** [https://robustsolutions.in/](https://robustsolutions.in/)  
**Analyzed:** 5 Nov 2026  
**Methods:** Live HTML fetch, HTTP status checks, public `robots.txt` / `sitemap.xml`, desktop + mobile browser screenshots  
**Screenshots:** `/cursor/stores/bc-42c75f44-e792-48f8-bb31-a370c2e32c4b/media/`  
**Raw notes:** `/cursor/stores/bc-42c75f44-e792-48f8-bb31-a370c2e32c4b/internal/robustsolutions-raw-findings.md`

---

## Executive verdict

Robust Testing Solutions positions itself as a **third-party electro-technical testing lab** (wires, cables, conductors, conduits) in Bhiwadi, Rajasthan, with NABL / ISO 17025, ISO 9001, and BIS recognition. The **homepage alone** carries that story; almost every other advertised page is broken or compromised.

**Must-fix first:** the site is actively abused for SEO spam / gambling redirects. `/gallery/`, `/client2`, and `/anabolicos-legal-13` serve TIMNAS4D gambling content. Public `sitemap.xml` points search engines at those URLs. Interior nav pages (`/about-us/`, `/services/`, `/book-a-test/`, `/contact-us/`, and all six “Testing Facilities” deep links) return **404**. Until security cleanup and page restoration, the site is a brand and SEO liability.

---

## 1. Purpose / what the company and site are about

**Company (from homepage copy):**

> “Robust Testing Solutions is an independent and third party electrical testing laboratory. We are ISO 9001:2015 Certified and ISO 17025:2017 accredited and also recognized by the Bureau of Indian Standards (BIS).”

**Scope claimed:** testing & reporting for electrical **conductors, wires, cables, and conduits** against national/international standards (BS, IEC, IS, UL, ASTM, etc.).

**Hero framing (quoted):**

- Eyebrow: “Welcome To Robust Testing Solutions”
- Product line: “Wires | Cables | Conductors | Conduits”
- Trust lines: “IS/1SO/IEC 17025:2017 … Accredited”, “ISO 9001:2015 Certified Testing Laboratory”, “Recognized by: Bureau of Indian Standards (BIS)”
- About eyebrow: “Electro Technical Testing Laboratory”
- H1: “For Wires, Cables, Conductors & Electrical Conduits”

**Stack signals:** WordPress (generator reports `WordPress 7.0.8`), custom theme `robusttestingsolutions`, Contact Form 7, Click to Chat for WhatsApp, reCAPTCHA, Apache.

**Contact (public):**

| Channel | Value |
|--------|--------|
| Address | H1-958, RIICO Industrial Area Chopanki, Bhiwadi, Rajasthan - 301019 India |
| Email | `info@robustsolutions.in`, `robusttestlab@gmail.com` |
| Phone | +91 9968717582, +91 9958653555 |
| WhatsApp widget | `918800629906` (different from header/footer phones) |
| Maps | [Google Maps shortlink](https://maps.app.goo.gl/hhbpgtttsqgo2Mbs5) |

---

## 2. Site structure and main pages / sections

### Intended IA (nav + footer)

| Label | URL | Live status (5 Nov 2026) |
|-------|-----|---------------------------|
| Home | `/` | **200** (~2.5s, ~75 KB HTML) |
| About Us | `/about-us/` | **404** |
| Services | `/services/` | **404** |
| Gallery | `/gallery/` | **200 — compromised** (TIMNAS4D gambling) |
| Book A Test | `/book-a-test/` | **404** |
| Contact | `/contact-us/` | **404** |

### Service deep links (homepage “Testing Facilities”) — all 404

1. `/testing-facilities-as-per-indian-standards-for-cables-and-conductors/`
2. `/testing-facilities-as-per-iec-standards-for-cables-and-conductors/`
3. `/testing-facilities-as-per-bsi-standards-for-cables-and-conductors/`
4. `/testing-facilities-for-solar-d-c-cables/`
5. `/testing-facilities-for-fire-survival-cables/`
6. `/testing-facilities-for-electric-vehicle-charging-cables/`

### Spam / hijacked URLs (listed in public sitemap)

| URL | Status | Title served |
|-----|--------|--------------|
| `/gallery` | 200 | TIMNAS4D toto/togel registration |
| `/client2` | 200 | TIMNAS4D slot / LinkAja promo |
| `/anabolicos-legal-13` | 200 | TIMNAS4D “legal toto” promo |

### Homepage sections (top → bottom)

1. Top bar: email, phone, location, **“Request A Quote”**
2. Logo + primary nav + BIS mark (sticky logo asset)
3. Hero carousel (2 near-duplicate slides)
4. Accreditation strip
5. About split: facility photo + “1,000 + Satisfied Clients” + company blurb + “Read More”
6. **Testing Facilities** (6 cards → dead links)
7. Mid-page CTA: leftover IT-recruitment line + “Contact Us”
8. Contact form (“For Quick Solutions!”) + “24/7 hours customer support” / “100% Affordable Pricing”
9. Testimonials carousel (placeholder Lorem / wrong personas)
10. Footer: about blurb, quick links, Get in Touch, social icons, copyright
11. Floating WhatsApp + scroll-to-top

**Hidden / unused in HTML (`display:none` or commented):** IT-recruitment “short-service” cards; “Working Process” with “Neque porro” / Lorem; “Our Clients” logo strip; Request-a-Quote modal markup is **commented out** while the top-bar button JS still targets it.

**Missing entirely:** blog, careers, case studies, pricing, accreditation PDF downloads, sample reports, real client logos (visible), privacy/terms.

---

## 3. Messaging, positioning, and audience

**Intended audience:** B2B buyers of cable/wire/conductor/conduit testing — manufacturers, exporters, procurement / QA needing BIS / NABL-aligned third-party reports.

**Positioning that works (when visible):** independent lab + named standards families + BIS / NABL / ISO credentials + specialized niches (Solar DC, Fire Survival, EV charging cables).

**Positioning that fails:**

- Large blocks of **IT staffing / recruitment** template copy still in the page (some hidden, some visible mid-page: “Get handpicked brilliant IT employees for your company”).
- Testimonials for “Web Designer”, “Graphic Designer”, “CEO” with Lorem Ipsum — wrong industry, destroys trust.
- Hero CTAs are generic (“Read More”, “Contact Us”) and both target **404 pages**.
- Claim consistency: HTML uses typo **“IS/1SO/IEC”** (letter O) vs expected **ISO**; one slide omits “NABL”, the next includes it.
- Social icons go to bare `facebook.com` / `twitter.com` / `linkedin.com` / `instagram.com` roots — not company profiles (older Growth Tip IT links remain only in HTML comments).

**Tone:** corporate B2B lab, but diluted by leftover agency-template language (“100% Affordable Pricing”, IT hiring) that undercuts a regulated-testing brand.

---

## 4. Visual design and UX

**Look (desktop screenshot `01-homepage-desktop-above-fold.webp`):** corporate blue + orange accents; facility exterior as hero; logo with gauge-style “o”; BIS mark in header. Reads as a typical WordPress industrial template — competent but dated.

**Clarity:** Above the fold, the category line and accreditations are clear. Below the fold, mixed CTAs, broken links, and placeholder testimonials confuse the journey.

**CTAs:**

| CTA | Behavior |
|-----|----------|
| Request A Quote (top) | Opens modal — **modal HTML commented out** → effectively broken |
| Read More / Contact Us (hero) | → `/about-us/`, `/contact-us/` → **404** |
| Testing Facilities cards | → six facility URLs → **404** |
| Mid-page Contact Us | → `/contact-us/` → **404** |
| Homepage form Submit | Contact Form 7 + reCAPTCHA (only working on-page lead path) |
| WhatsApp float | Opens chat to `918800629906` |

**Mobile (`04-homepage-mobile-375px.webp`, `05-mobile-menu-open.webp`):** hamburger works; layout stacks; BIS mark remains; WhatsApp present. Top bar contact text is cramped; same dead destinations. No major horizontal-scroll issue observed in screenshots. Responsive CSS file `gt-Responsive.css` is loaded.

**Performance feel:** homepage ~2–2.5s TTFB+download in curl; gallery spam page ~0.8–1.5s but **~577 KB**. Feels sluggish for a marketing site; dual jQuery loads (WP + Google CDN 3.6.3) add weight.

---

## 5. Content quality and completeness

### Strengths of the real lab story

- Clear product categories and standards families named.
- Concrete facility address and multiple contact channels.
- Service taxonomy (IS / IEC / BSI / Solar DC / Fire Survival / EV) is a solid outline for a real service IA — if pages existed.

### Gaps and weak spots

| Issue | Evidence |
|-------|----------|
| Interior site hollow | All primary interior URLs 404 |
| Security / spam takeover | Gallery + sitemap spam URLs serve TIMNAS4D |
| Template leftovers | IT recruitment, “Neque porro”, Lorem testimonials |
| Fake social proof | Designer/CEO personas; client logo strip hidden |
| Incomplete conversion | Book A Test 404; quote modal dead |
| Copy errors | “IS/1SO”, “We Recieve the Best Client’s Review” |
| Agency residue | Commented `growthtip.com` / Growth Tip social URLs |
| No proof assets | No visible certificates, scope PDFs, methods, turnaround, or case studies on live pages |
| Form UX | Placeholder-only fields (no visible `<label>` text); email field present but `hidden` class |

---

## 6. Technical / SEO signals (public site)

### Meta & document head (homepage)

- `<title>Home</title>` — non-descriptive; no brand or keywords.
- **No** `meta name="description"`.
- **No** Open Graph / Twitter card tags on homepage.
- `canonical` → `https://robustsolutions.in/` (correct for home).
- `viewport` present.
- `robots`: only `max-image-preview:large` (no index/follow policy nuance).
- `generator`: WordPress version exposed.
- Favicon under `/wp-content/uploads/2025/04/favicon.jpg`.

### Crawl / index hygiene

**`robots.txt`:**

```
User-agent: *
Allow: /

Sitemap: https://robustsolutions.in/sitemap.xml
```

**`sitemap.xml` (critical):** only three URLs, lastmod `2026-06-03`, all spam-adjacent (`anabolicos-legal-13`, `client2`, `gallery`). Homepage and legitimate service URLs are **absent**. This actively feeds search engines the compromised pages.

### Accessibility (observed)

- **59** images with `alt=""` on homepage (logo, hero, icons, clients).
- Form fields rely on placeholders, not persistent labels.
- Nested interactive markup in service cards (`<a>` wrapping blocks that contain another `<a>`).
- Focus / keyboard paths not fully audited; contrast on orange-on-photo hero text may be marginal depending on crop.

### Security / platform

- Compromised WordPress content clearly injected/replaced on multiple routes.
- `xmlrpc.php` pingback header still advertised.
- Public WP JSON page list endpoint returned 404 in this check (may be restricted or broken).
- Social / brand reputation risk while gambling pages share the corporate domain and canonical URLs.

### Performance / stack notes

- Theme assets + Font Awesome CDN + CF7 + WhatsApp plugin + reCAPTCHA + owl/carousel patterns.
- Homepage HTML ~75 KB; compromised gallery ~577 KB.
- Dual jQuery inclusion risk.

---

## 7. Strengths and prioritized recommendations

### Strengths

1. Clear niche: wires / cables / conductors / conduits testing.
2. Strong credential names (NABL / ISO 17025, ISO 9001, BIS) when stated correctly.
3. Useful service taxonomy already sketched on the homepage.
4. Visible phone, email, address, maps, WhatsApp, and an on-page form.
5. Mobile nav/basic responsive layout works on the homepage shell.

### Recommendations (priority order)

**P0 — Emergency (do before any marketing spend)**

1. **Incident response:** take compromised routes offline; scrub malware / rogue pages / plugins / themes / `wp-admin` users; rotate all credentials; audit file integrity; review hosting access.
2. **Kill spam SEO:** replace `sitemap.xml` with only legitimate URLs; remove `/anabolicos-legal-13`, `/client2`, and hijacked gallery content; submit cleanup in Google Search Console / Bing.
3. **Stop linking into 404s:** until pages are restored, point nav/CTAs to homepage anchors or a single working contact path — do not keep shipping users to dead URLs.

**P1 — Restore core conversion paths**

4. Rebuild **About**, **Services** (or individual facility pages), **Book a Test**, **Contact** with real lab content.
5. Fix **Request A Quote** (restore modal or route to contact form).
6. Align WhatsApp number with published phones; wire social icons to real profiles or remove them.
7. Replace testimonials and kill all IT-recruitment / Lorem / “Neque porro” residue.

**P2 — Credibility & SEO foundation**

8. Title/meta/OG per page (e.g. “Cable & Conductor Testing Lab | NABL & BIS | Robust Testing Solutions”).
9. Publish accreditation scope, turnaround, sample submission instructions, and downloadable certificates.
10. Fix copy typos (`ISO`, “Receive”); make H1 strategy coherent (one clear H1; hero shouldn’t bury brand under a pipe-separated product list only).
11. Add alt text; proper form labels; fix nested links.
12. Show real client logos or remove the claim surface entirely; substantiate “1,000 + Satisfied Clients”.

**P3 — Experience polish**

13. Performance pass (single jQuery, image compression, fewer plugins).
14. Consider a modern rebuild rather than endless patching of the agency template — after security is clean.
15. Add privacy policy / terms appropriate for a lab collecting sample and contact data.

---

## Appendix A — Quote bank (homepage)

- “Welcome To Robust Testing Solutions”
- “Wires | Cables | Conductors | Conduits”
- “Electro Technical Testing Laboratory”
- “For Wires, Cables, Conductors & Electrical Conduits”
- “Testing Facilities”
- “Get handpicked brilliant IT employees for your company” *(template leftover)*
- “For Quick Solutions!”
- “24/7 hours customer support” / “100% Affordable Pricing”
- “We Recieve the Best Client’s Review”
- “Asif Khan / Web Designer”, “Meera Nair / Graphic Designer”, “Rahul Negi / CEO” *(placeholders)*
- Footer: “© Copyright Robust Testing Solutions All Rights Reserved”

## Appendix B — Screenshot index

| File | What it shows |
|------|----------------|
| `media/01-homepage-desktop-above-fold.webp` | Desktop hero, nav, credentials, CTAs |
| `media/02-homepage-footer.webp` | Form / footer contact block |
| `media/03-gallery-hacked-gambling-site.webp` | `/gallery/` TIMNAS4D overlay |
| `media/04-homepage-mobile-375px.webp` | Mobile homepage |
| `media/05-mobile-menu-open.webp` | Mobile hamburger open |

---

*Analysis for the Robust Testing Project. Findings verified against live HTTP responses and page HTML on 5 Nov 2026.*
