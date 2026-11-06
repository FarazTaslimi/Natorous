# Natorous — Explore Beyond the Map

A modern, fully responsive, **data-driven** travel landing page.
Built with **Vite + vanilla JavaScript + Sass** (BEM naming, 7-1 architecture) — no framework, no lock-in.

![Stack](https://img.shields.io/badge/vite-8-purple) ![Style](https://img.shields.io/badge/sass-BEM-pink) ![Deps](https://img.shields.io/badge/runtime%20dependencies-0-brightgreen)

---

## ✨ The "company-ready" part

A travel company can rebrand this entire site **without touching a single line of code and without rebuilding**:

| What | Where |
|---|---|
| **All content** (brand name, nav, hero copy, stats, tours, destinations, reviews, CTA, footer, socials, contact info) | `public/site.config.json` |
| **All images** | `public/img/` — just replace files or drop new ones and reference the filename in the config |
| **Fonts / logo / favicon** | `public/fonts/`, `public/favicon.svg` |

**Workflow:** edit `public/site.config.json` → deploy.
That's it. The page loads the JSON at runtime, so there is no build step between an edit and a deploy (this also means a prebuilt `dist/` folder can be edited and re-deployed directly).

### Newsletter form
By default the form shows a success state locally. To collect real subscriptions, set `footer.newsletter.action` to any form endpoint (Formspree, Mailchimp, Basin, your own API) and the form will POST there natively.

### Book buttons
All "Book" CTAs point to `site.bookingUrl` — link them to your booking engine, WhatsApp, or Calendly.

---

## 🚀 Quick start

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview the production build
```

**Deploying:** upload the contents of `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3, plain nginx). No server-side code is needed.

---

## 🗂 Project structure

```
├── index.html                  # shell + SEO/OG meta
├── public/
│   ├── site.config.json        # ← THE editable data file
│   ├── img/                    # ← all images (referenced by filename)
│   ├── fonts/                  # self-hosted variable fonts (Bricolage Grotesque + Manrope)
│   ├── favicon.svg
│   └── og-cover.png
└── src/
    ├── main.js                 # renders from config + all interactivity
    ├── js/
    │   ├── layout/             # header, hero, tours, destinations, reviews, cta, footer
    │   ├── components/         # tourCard, statBox, reviewCard, sectionHeading
    │   └── utils/              # asset resolver + inline SVG icon set
    └── sass/
        ├── abstracts/          # tokens (_variables) + mixins
        ├── base/               # fonts, reset, base, animations
        ├── layout/             # section styles
        └── components/         # button, chip, card, stat-box, review-card…
```

Components are pure functions that return HTML template strings (same lightweight pattern as the original Natorous), data flows in from the JSON config.

---

## 🧩 What's inside

- **Hero** — full-viewport image, gradient headline, animated scroll hint, live stat counters (count-up on scroll)
- **Expeditions** — filterable card grid (tags are generated from the config automatically)
- **Destinations** — responsive photo card grid
- **Stories** — review cards with auto-generated initials avatars (add a `photo` field per review if you want images)
- **CTA panel** — starry-sky background with rounded corners
- **Footer** — 4 columns, socials, contact info, working newsletter UX, auto-updating © year

### Details handled for you
- Fully responsive (desktop / tablet / phone, burger menu with focus + Escape handling)
- Sticky glass header with scroll-spy nav highlighting
- Reveal-on-scroll animations that respect `prefers-reduced-motion`
- No-JS fallback (content never stays hidden)
- Semantic HTML, ARIA labels, keyboard focus states, skip-to-content link
- Self-hosted fonts (no third-party requests except your images)

---

## 🎨 Design tokens

All colors, radii, spacing and type scales live in `src/sass/abstracts/_variables.scss` — change `$accent` and `$gradient` and the whole site re-themes on the next build.

---

*Built as a concept template — demo content (tours, reviews, contact details) is fictional and meant to be replaced.*
