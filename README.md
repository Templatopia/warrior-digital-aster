# Warrior Digital — Real Estate Website Template (Maison Aster demo)

A reusable, bilingual (EN/FR) rental-building website template built with **Astro 7** and **Tailwind CSS 4**, deployed on **Netlify**.
The demo property, *Maison Aster*, is fictional: every address, phone number, place and floorplan is placeholder content.

- **Design:** [Figma: Real Estate Template: Maison Aster](https://www.figma.com/design/gaayEnwFUHYfDhsIAezfpA) (pages “v2 — Home”, “v2 — Inner pages”)
- **Process doc:** Warrior Digital “Real Estate Website Template — Build Process”

## Quick start

```bash
nvm use            # Node 22 (see .nvmrc)
npm install
npm run dev        # http://localhost:4321  →  redirects to /en/
npm run build      # static site in dist/
npm run check      # type-check + content validation
```

## What’s in the box

| Page | EN | FR |
| --- | --- | --- |
| Home | `/en/` | `/fr/` |
| Suites (filterable floorplans) | `/en/suites/` | `/fr/suites/` |
| Amenities | `/en/amenities/` | `/fr/amenities/` |
| Neighbourhood | `/en/neighbourhood/` | `/fr/neighbourhood/` |
| Lifestyle | `/en/lifestyle/` | `/fr/lifestyle/` |
| Gallery (filter + lightbox) | `/en/gallery/` | `/fr/gallery/` |
| Contact (tour request form) | `/en/contact/` | `/fr/contact/` |
| Legal: privacy / accessibility / terms | `/en/privacy/` … | `/fr/privacy/` … |
| Form thank-you | `/en/thanks/` | `/fr/thanks/` |

Every page ends with the call-to-action band and a full-width link to the next page:
Home → Suites → Amenities → Neighbourhood → Lifestyle → Gallery → Contact → Home (`pageOrder` in `src/lib/i18n.ts`).

## Project structure

```
src/
  config/site.json          ← building details: name, address, phone, hours, promo, tour URL, social, landlord, stats
  styles/theme.css          ← THE RE-SKIN FILE: brand colours (mirrors Figma “Color” collection)
  styles/global.css         ← Tailwind setup, fonts, editorial type scale (text-mega, text-statement, text-quote…)
  data/photos.ts            ← photo registry (key → image + EN/FR alt text)
  content/
    data/*.json             ← suites, amenities, places, faqs, events, gallery (validated by content.config.ts)
    pages/{en,fr}/*.json    ← all page copy + SEO title/description, one file per page per language
  content.config.ts         ← Zod schemas: typos or missing fields fail the build
  i18n/ui.ts                ← interface strings (nav, buttons, form labels) in EN + FR
  lib/                      ← i18n helpers, content helpers, JSON-LD schema builders
  components/
    ui/                     ← Button, Icon, Logo, Photo
    layout/                 ← Header (overlay/solid, mobile menu), Footer
    sections/               ← one component per Figma section (HeroEditorial, Philosophy, FeatureRow, GallerySlider, …)
  layouts/BaseLayout.astro  ← <head>: SEO, hreflang, Open Graph, JSON-LD, skip link
  pages/[lang]/*.astro      ← routes, generated once per language
  pages/llms.txt.ts         ← plain-language summary for AI assistants, generated from content
  pages/robots.txt.ts
netlify.toml                ← build, Node 22, root → /en/ (or /fr/ for French browsers), cache headers
```

## Launching a new client site

1. **Clone** this repo into a new repo for the client.
2. **Building details:** edit `src/config/site.json` (name, `url`, address + lat/lng, phone, email, hours, promo, `tourUrl`, `residentPortalUrl`, social, landlord, stats).
3. **Brand:** edit the colour values in `src/styles/theme.css`. To change fonts, swap the Fontsource imports and `--font-*` values in `src/styles/global.css`. Replace `Logo.astro` and `public/favicon.svg`.
4. **Photography:** add images to `src/assets/photos/` and point each entry in `src/data/photos.ts` at the imported file (`import lobby from '../assets/photos/lobby.jpg'`). Astro then optimises them to AVIF/WebP automatically.
5. **Content:** update `src/content/data/*.json` (suites, amenities, places, FAQs, events, gallery) and the page copy in `src/content/pages/en/` and `fr/`. `npm run check` flags anything missing or malformed, including SEO titles over 70 characters and descriptions over 170.
6. **Languages:** remove `fr` from `locales` in `site.json` for an English-only site, or add a locale with a new `pages/<lang>/` folder and a block in `i18n/ui.ts`.
7. **Forms:** Netlify Forms works with no setup. There are two forms: `tour-request` (Contact page) and `suite-inquiry` (the “Inquire” button on each floorplan, which sends the suite name, type, price, size and availability automatically and sets the email subject to the suite). After the first deploy, set up notification emails in Netlify → Forms and turn on reCAPTCHA if the client wants it (the inquiry form already has the placeholder). For HubSpot or a CRM, change `forms.provider` in `site.json` and the `action` in `LeadForm.astro`.
8. **Analytics:** add the GTM ID to `site.json → analytics.gtmId`. It loads only when the client’s consent banner calls `window.loadAnalytics()`.
9. **QA:** run `npm run check && npm run build`, then run Lighthouse on the Netlify preview (target 95+ in every category on mobile). Validate JSON-LD with Google’s Rich Results Test.
10. **Launch:** connect the domain in Netlify, add redirects from the old site to `netlify.toml`, and submit `sitemap-index.xml` in Google Search Console.

## Floorplans and Yardi

Each floorplan in `src/content/data/suites.json` has `availability` (`"now"`, `"waitlist"` or an ISO date), an optional `floorplanImage` (the drawing appears when it’s set; otherwise a placeholder is drawn) and a reserved `yardiId`. When the Yardi / RentCafe feed is available, a build-time loader can map it into the same schema, so the components won’t need to change.

## SEO / AEO features (automatic)

- One `<h1>` per page, semantic sections and answer-first summaries on each page
- JSON-LD: `ApartmentComplex` (address, geo, amenities, unit count, pets), `RealEstateAgent` (leasing office + opening hours), `FloorPlan` list with offers, `FAQPage`, `BreadcrumbList`
- `hreflang` alternates (en-CA / fr-CA / x-default), canonical URLs, Open Graph / Twitter tags
- Sitemap with language alternates, `robots.txt`, and `/llms.txt` (a plain-text summary for AI assistants)
- Self-hosted fonts, near-zero JavaScript (small inline scripts for the menu, slider, filters and lightbox), lazy-loaded responsive images, `prefers-reduced-motion` respected

## Demo photography

Demo images are from [Unsplash](https://unsplash.com) (free to use under the Unsplash License) and are served from the Unsplash CDN. Replace them with the client’s photography before launch (see step 4).

## Status

- ✅ v2 editorial design built for all pages (desktop + mobile, EN + FR)
- ⏳ French copy needs a review by a native speaker before any client launch
- ⏳ Legal pages contain placeholder text
- ⏳ Yardi availability feed (waiting on API access)
