# Robust Testing Solutions — Website Redesign Brief

**Client:** Robust Testing Solutions  
**Domain:** [https://robustsolutions.in/](https://robustsolutions.in/)  
**Brief date:** 5 Nov 2026  
**Sources:** MOM 3 Nov 2026 (`Robust_MOM.xlsx`), live site, prior site analysis, reference labs [rtrclab.com](https://rtrclab.com/) and [gtllab.org](https://gtllab.org/)  
**Brand constraint:** White + blue + gold only — matched to the Robust logo (no purple themes, no unrelated palettes)

---

## 0. Non-negotiable prerequisite — clean rebuild

Prior analysis found the current WordPress site is **compromised**: `/gallery/`, `/client2`, and `/anabolicos-legal-13` serve gambling SEO spam; public `sitemap.xml` points crawlers at those URLs; nearly all interior pages (`/about-us/`, `/services/`, `/book-a-test/`, `/contact-us/`, six Testing Facilities deep links) return **404**. Homepage still carries IT-recruitment leftovers and Lorem testimonials.

**This redesign assumes a clean rebuild on a fresh stack / clean hosting — not patching the spam-infected WP theme.**

Before or in parallel with design/build:

1. Take compromised routes offline; scrub malware, rogue users/plugins/themes; rotate credentials; audit hosting access.
2. Replace `sitemap.xml` with legitimate URLs only; request re-crawl in Search Console / Bing.
3. Do not migrate spam pages, IT-template residue, or placeholder testimonials into the new site.
4. Prefer new CMS/static setup with hardened forms (CAPTCHA/OTP as requested) rather than restoring the hijacked theme.

Full findings: `docs/robustsolutions-site-analysis.md`

---

## 1. MOM requirements checklist (client asked for)

Extracted from Minutes of Meeting — 3 Nov 2026, 8:30 pm IST. Owner notes: **Our team** = delivery team; **Robust team** = client assets/content.

### Header & chrome
- [ ] **Freeze Header 1 (contact strip)** on every page, always visible while scrolling: phones, email, office address, social icons.
- [ ] Social icons show WhatsApp, Instagram, LinkedIn, Facebook — **activate only WhatsApp + LinkedIn** (FB/IG not active yet; show muted or hide links until live).
- [ ] **Header 2 nav:** Home · About · Services · Contact · Witness Facility · Gallery · Career.
- [ ] On scroll: Header-2 items also persist on the **left side** for the full page height (side rail / sticky side nav — clarify UX in wireframes so it stays professional on desktop and collapses cleanly on mobile).

### Homepage order (mandatory)
1. Carousel images (3–4 owner-provided)
2. Who are we? (About the company)
3. Our Certificates
4. What do we do? (Services)
5. Our Clients
6. Client Testimonials (What our clients say)

Footer: keep/update in the spirit of the current site (company blurb, quick links, get in touch).

### Content & modules
- [ ] **About:** company profile + certificates (client supplies copy/assets).
- [ ] **Certificates:** 5 certificates on homepage; normal size; **click → full-size view** (lightbox). Pattern reference: gtllab.org certificate block.
- [ ] **Our Clients:** logos/details after certificates (client supplies).
- [ ] **Services:** all levels & types of testing they perform (start from current site taxonomy; expand with client list).
- [ ] **Contact:** GTL-style layout — company details left (address, phone, email, working hours) + map + **Submit your Query** form right.
- [ ] **Query form fields:** Name · Mobile · Email · Company name · Testing requirements (comments) · **Send Query** button. Add **Company name** vs GTL baseline. Anti-spam: CAPTCHA and/or OTP (client gets spam today).
- [ ] **Working hours everywhere:** Mon–Sat **9:30 AM – 6:30 PM**; **Sunday OFF**.
- [ ] **Witness Facility:** dedicated nav item/page; pattern from rtrclab.com header + Witness Facility content (online + physical witnessing, trust framing).
- [ ] **Gallery:** photos from Robust team.
- [ ] **Careers → Jobs:** use client-supplied recruiting copy; resumes to `info@robustsolutions.in`.
- [ ] **Careers → Training:** “we make individuals industry ready” + classroom/training photos from Robust team.

### Visual / tone
- [ ] Theme must match logo: **blue, golden, white**.
- [ ] Look **utmost professional** — not funky or trendy.

### Asset dependencies (blockers from client)
| Asset | Owner |
|-------|--------|
| 3–4 carousel images | Robust team |
| Company profile / About copy | Robust team |
| 5 certificates | Robust team |
| Client list / logos | Robust team |
| Full services / test-type inventory | Robust team (seed from current site) |
| Witness Facility specifics for Robust | Robust team |
| Gallery photos | Robust team |
| Training photos + Jobs/Training content polish | Robust team |
| Confirmed WhatsApp + LinkedIn URLs; final phone/email/address | Robust team (align with published contacts) |

---

## 2. What to borrow from reference labs — and what NOT to copy

### From [rtrclab.com](https://rtrclab.com/) — borrow

| Pattern | Why it fits Robust |
|---------|-------------------|
| **Witness Facility** as a first-class nav item + dedicated page | Explicit MOM ask; builds QA/procurement trust |
| Online + physical witnessing messaging | Transparency for type tests / critical runs |
| Accreditation strip with certificate + **scope** downloads | NABL/BIS buyers expect proof, not logos only |
| Service taxonomy by standards families / product lines | Maps to Robust’s IS / IEC / BSI / Solar DC / Fire Survival / EV split |
| Named client testimonials (role + company) | Replace current Lorem / wrong-industry quotes |
| Professional B2B lab tone (capability + integrity) | Matches “not funky” brief |

### From [gtllab.org](https://gtllab.org/) — borrow

| Pattern | Why it fits Robust |
|---------|-------------------|
| Homepage **certificate thumbnails → full-size click** | Explicit MOM reference |
| Contact layout: details + hours left, form + map pattern | Explicit MOM reference |
| Clear “Get in touch” / Submit Query framing | Conversion clarity |
| Services as scannable category grid | Easy IA for multi-test lab |
| Persistent top contact block (phone/email/address) | Aligns with frozen Header 1 |

### Do NOT copy

- Competitor branding, logos, certificate numbers, client lists, or claim language (“Top #3”, “1500+ in 20 countries”) unless Robust can substantiate its own numbers.
- Multi-vertical mega-menus (food, pharma, leather, etc.) — Robust is **electro-technical: wires, cables, conductors, conduits**.
- Stock “funky” UI, heavy purple/neon, or agency-recruitment CTAs.
- Broken social destinations or fake testimonials.
- Spam-prone open forms without CAPTCHA/OTP.
- Crowded first viewport with stats strips, hiring banners, and competing CTAs (GTL homepage density is a caution, not a model).

---

## 3. Proposed site map / pages

```
Home
About Us
Services
  ├─ Testing as per Indian Standards (cables & conductors)
  ├─ Testing as per IEC Standards
  ├─ Testing as per BSI Standards
  ├─ Solar DC Cables
  ├─ Fire Survival Cables
  └─ EV Charging Cables
  └─ (+ additional types once Robust supplies full list)
Witness Facility
Gallery
Careers
  ├─ Jobs
  └─ Training
Contact / Submit a Query
Book a Test / Request a Quote   ← primary conversion alias (see §6)
Legal
  ├─ Privacy Policy
  └─ Terms (sample & data handling)
```

**Nav (Header 2) per MOM:** Home · About · Services · Contact · Witness Facility · Gallery · Career  
Keep **Book a Test / Request a Quote** as a persistent CTA button (Header 1 or beside logo) even if not a separate MOM nav label — it was on the live site and is the commercial path.

---

## 4. Visual direction — white / blue / gold

### Color tokens (sampled from live Robust logo `…/themes/robusttestingsolutions/images/logo.png`)

| Token | Hex | Use |
|-------|-----|-----|
| `--white` | `#FFFFFF` | Page canvas, card surfaces |
| `--blue-primary` | `#103C8C` | Logo match; primary buttons, Header 1 bar, key links |
| `--blue-deep` | `#0B2F6E` | Hover / footer / emphasis |
| `--blue-soft` | `#E8F0FA` | Subtle section washes, form backgrounds |
| `--gold-primary` | `#C9A264` | Accents, section eyebrows, icon strokes, underlines |
| `--gold-bright` | `#DFB66F` | Highlights, hover gold, checkmark energy |
| `--gold-deep` | `#B0905C` | Gold text on white (AA contrast check) |
| `--ink` | `#1A1F2C` | Body text |
| `--muted` | `#5B6472` | Secondary text |

**Rules:** White dominates. Blue carries authority and CTAs. Gold is the **prestige accent** (eyebrows, dividers, certificate frames, active nav underline) — never a purple substitute and never a full-bleed gold background. No orange CTAs from the old template; map secondary CTAs to blue-soft border / blue outline.

### Typography
- **Display / H1–H2:** strong geometric sans (e.g. **Manrope** or **DM Sans**) — professional, not decorative serif newspaper, not Inter-default blandness.
- **Body:** readable humanist sans (e.g. **Source Sans 3** or **IBM Plex Sans**).
- Avoid playful script, condensed “tech startup” fonts, and emoji in UI.
- One clear H1 per page; hero should lead with **Robust Testing Solutions** as brand signal, then category line.

### Logo usage
- Primary: full color logo on white.
- Header height: keep logo dominant vs. nav text (brand-first).
- Do not recolor the gold checkmark “o” to blue.
- BIS / NABL marks are **accreditation badges**, separate from the brand logo — never use BIS artwork as the site logo.
- Provide SVG master if client can supply; until then use cleaned PNG with transparent background.

### Section treatment
- Full-bleed white sections alternating with `--blue-soft` bands (not gray waffle cards everywhere).
- Thin gold rule under section titles (echo GTL/RTRC trust sections without copying layout chrome).
- Certificates: white tile, subtle blue border, gold focus ring on hover; lightbox on click.
- Photography: real lab / facility / training — not abstract purple gradients.
- Motion (2–3 intentional): soft carousel fade, certificate lightbox, sticky header transition — no bounce or glitter.

---

## 5. Homepage & key page content outline

### Homepage (MOM order)

1. **Header 1** — frozen contact + WhatsApp / LinkedIn  
2. **Header 2** — primary nav (+ left sticky rail on scroll, desktop)  
3. **Carousel (3–4)** — facility / lab / testing imagery; overlay: brand + “Wires · Cables · Conductors · Conduits” + NABL / ISO 9001 / BIS + CTAs: **Book a Test** · **Contact**  
4. **Who are we?** — independent third-party electro-technical lab, Bhiwadi; integrity / standards line (BS, IEC, IS, UL, ASTM, etc.)  
5. **Our Certificates** — 5 thumbs → lightbox (GTL pattern)  
6. **What do we do?** — six (or more) service cards linking to real pages  
7. **Our Clients** — real logos only (or omit until provided)  
8. **Testimonials** — named lab/QA personas only; no designers/CEO Lorem  
9. **Footer** — blurb, links, contact, hours, map shortlink  

### About
- Company profile, facility location (H1-958, RIICO Chopanki, Bhiwadi), independence & impartiality language, accreditations with downloadable PDFs when available.

### Services (hub + children)
- Hub grid of all test families.
- Child pages: scope summary, standards covered, sample types, typical turnaround (when client provides), CTA to Book / Witness / Contact.

### Witness Facility (RTRC-inspired, Robust-owned content)
- What witnessing is; online vs on-site; how to schedule; what the client observes; confidentiality note; CTA to request a witness slot.

### Gallery
- Filterable or simple grid: lab, equipment, training, facility exterior — client photos only.

### Careers
- **Jobs:** provided recruiting copy + email resume to `info@robustsolutions.in`.  
- **Training:** “industry ready” positioning + training photo gallery.

### Contact
- Left: address, phones, emails, hours (Mon–Sat 9:30–6:30; Sun off), map embed.  
- Right: Submit your Query (fields per MOM) + CAPTCHA/OTP.  
- Optional WhatsApp deep link matching the activated Header 1 number.

---

## 6. Conversion paths

| Path | Entry points | Destination | Success |
|------|--------------|-------------|---------|
| **Book a Test** | Hero CTA, service pages, sticky CTA | `/book-a-test/` form (Name, Mobile, Email, Company, Testing requirements, preferred dates) | Email + optional WhatsApp confirm; spam-protected |
| **Request a Quote** | Header 1 button (replace broken modal) | Same form with `intent=quote` or Contact form prefilled | Sales follow-up |
| **Contact / Send Query** | Nav Contact, footer, mid-page | `/contact-us/` GTL-style page | Ticket/email to `info@robustsolutions.in` |
| **Witness request** | Witness Facility page CTA | Form variant or Book a Test with “Witness required” checkbox | Scheduling workflow |
| **WhatsApp** | Header icon + float (one number only) | `wa.me/<confirmed>` | Chat; align number with published phones |
| **Careers** | Careers → Jobs | Mailto resume | HR review |

**Form hardening (MOM #15):** honeypot + reCAPTCHA v3 or hCaptcha minimum; evaluate OTP on mobile for high-spam periods. Rate-limit submissions.

**CTA hierarchy:** Primary = Book a Test / Send Query (blue fill). Secondary = Contact / WhatsApp (blue outline or gold text link). Avoid three equal buttons fighting in the hero.

---

## 7. Phased delivery recommendation

### Phase 0 — Security & DNS hygiene (blocks public launch)
- Incident response on current WP; kill spam URLs; clean sitemap; Search Console cleanup.
- Decide hosting + stack for rebuild (recommended: clean CMS or static + form backend — not the infected theme).

### Phase 1 — Foundation (launchable MVP)
- Global chrome: frozen Header 1, Header 2, footer, brand tokens, logo.
- Pages: Home (MOM section order), About, Services hub + existing six facility pages, Contact (form + map + hours), Privacy.
- Working Book a Test / Quote path + CAPTCHA.
- Certificate lightbox module (even if 1–2 certs land first).
- Redirect map from old 404/spam URLs to clean equivalents or 410 for spam.

### Phase 2 — Trust & MOM completeness
- Witness Facility page.
- Gallery.
- Careers (Jobs + Training).
- Full certificate set (5), client logos, real testimonials.
- Left sticky nav behavior polished for desktop; mobile alternative (bottom bar or hamburger only).

### Phase 3 — Depth & ops
- Per-service detail enrichment, downloadable NABL scope/certificates, sample submission guide.
- WhatsApp number unification; LinkedIn live; hold FB/IG until active.
- Performance, accessibility (labels, alt text), SEO titles/meta/OG.
- Optional: training calendar, brochure PDF, bilingual later if requested.

**Content gate:** Phase 1 can launch with placeholder *structure* but should not invent certificates, clients, or testimonials. Prefer fewer real assets over fake proof.

---

## 8. Open items to confirm with Robust

1. Final Header 1 contact set (phones, emails, WhatsApp ID, LinkedIn URL, full address string).  
2. Exact 5 certificate files + any NABL cert/scope PDFs.  
3. Whether “Witness certificate” in one MOM cell means **Witness Facility** (assumed, per RTRC reference) vs. a downloadable witness certificate product.  
4. Desktop left-rail nav: always visible icons vs. text rail — sketch approval before build.  
5. Stack preference (WordPress rebuild vs. other) — either way, **not** the compromised theme.  
6. Substantiation for “1,000+ Satisfied Clients” before reusing the claim.

---

## Appendix — Quick references

| Item | Path / URL |
|------|------------|
| MOM spreadsheet | `/cursor/stores/self/internal/Robust_MOM.xlsx` |
| Prior site analysis | `/cursor/stores/self/docs/robustsolutions-site-analysis.md` |
| Raw redesign notes | `/cursor/stores/self/internal/robustsolutions-redesign-raw-notes.md` |
| Logo asset (live) | `https://robustsolutions.in/wp-content/themes/robusttestingsolutions/images/logo.png` |
| Logo copy for brief | `/cursor/stores/self/media/redesign-refs/robust-logo.png` |
| Reference: RTRC | https://rtrclab.com/ · Witness: https://rtrclab.com/witness-facility/ |
| Reference: GTL | https://gtllab.org/ · Contact: https://gtllab.org/contact-us/ |

---

*Client-ready redesign brief for Robust Testing Solutions. Palette locked to logo white / blue / gold. Rebuild assumes clean hosting after spam remediation.*
