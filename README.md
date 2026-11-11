# Robust Testing Solutions — Website

Original static rebuild for [robustsolutions.in](https://robustsolutions.in/) using white / blue (#103C8C) / gold (#C9A264).

## What was recovered from the live site

- Company about copy (cleaned; ISO typo fixed)
- Facility exterior photo and laboratory bench photo
- Logo, favicon, BIS mark, NABL mark **TC-16290**, FDAS certificate **TL-117**
- Contact phones, emails, address, WhatsApp
- Service pathway titles (six testing facilities)

Intentionally **not** copied: IT-recruitment blocks, Lorem testimonials, template “client” logos, compromised `/gallery` gambling pages, spam sitemap URLs.

## Preview

```bash
npx --yes serve .
```

## Deploy notes (Vercel)

`vercel.json` maps old 404 paths to the new IA and sends known spam URLs to `410.html`.

## Still needs from Robust

- Full certificate PDFs (ISO 9001, NABL scope, BIS letter)
- Authorized client logos and QA testimonials
- Extra gallery / training photos
- CAPTCHA site keys + form mail backend
- Confirmed LinkedIn company URL
