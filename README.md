# Byron Floor Cleaning — website

Three-page marketing site for **Byron Floor Cleaning**, a New Jersey
floor stripping, waxing, and deep-cleaning service. The site's job is
to get visitors to call, text, or submit a free-estimate request.

## Stack at a glance

- **Astro 5** (static output)
- **Tailwind CSS 3**
- **Cloudflare Pages** for hosting (free tier)
- **Google Apps Script + Google Sheet + MailApp** for the estimate form
- No database, no SaaS form provider, no recurring monthly cost

The build outputs plain HTML/CSS plus a small amount of inline JS for
the mobile menu, FAQ accordions, the before/after slider, and the
estimate form's submit handler.

## Pages

| Route | File | Purpose |
|---|---|---|
| `/` | `src/pages/index.astro` | Hero, before/after, services, why Byron, how it works, inline form, FAQ, CTA |
| `/services` | `src/pages/services.astro` | Detailed service grid with timelines, how it works, gallery, inline form, FAQ |
| `/estimate` | `src/pages/estimate.astro` | Form + trust/contact panel + FAQ |
| `/thanks` | `src/pages/thanks.astro` | No-JS submit fallback |

## Project structure

```
.
├── apps-script/              ← Google Apps Script source + deploy guide
├── docs/design-handoff/      ← original design handoff (prototype, strategy, flyers)
├── public/                   ← static assets served as-is
│   ├── favicon.svg
│   ├── images/               ← placeholder hero + before/after SVGs (swap with real photos)
│   └── robots.txt
├── src/
│   ├── components/           ← Astro components (Header, Footer, EstimateForm, etc.)
│   ├── content/              ← JSON: site, services, faq, before-after
│   ├── layouts/BaseLayout.astro
│   ├── lib/                  ← site + JSON-LD helpers
│   ├── pages/                ← /, /services, /estimate, /thanks
│   └── styles/global.css
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## Local development

Requires Node 22 (see `.nvmrc`).

```sh
npm install
npm run dev          # http://localhost:4321
npm run build        # static output in dist/
npm run preview      # serve the built dist/
```

The dev server runs without `PUBLIC_FORM_ENDPOINT` configured. The form
will surface an inline error on submit instead of POSTing — that's the
intended local behavior. Real submissions only happen once the env var
is set in Cloudflare Pages and the site is deployed.

## Editing content

Almost every word and image reference is in `src/content/`:

- `site.json` — brand, phone, hours, area, estimate policy, meta description
- `services.json` — the five services, with `feature` + `eyebrow` flags
- `faq.json` — FAQ accordion items
- `before-after.json` — paired image paths and captions

Image URLs point at files in `public/images/`. To swap the placeholders
for real photos, drop the new files into `public/images/before-after/`
(or anywhere under `public/`) and update the paths in
`before-after.json`. Same shape, no code changes needed.

The hero image is `public/images/hero-placeholder.svg` — referenced
directly by `src/components/Hero.astro`.

## The estimate form

The form is rendered statically by `src/components/EstimateForm.astro`
and progressively enhanced by an inline script that:

1. Holds the start time (loaded-at).
2. Validates required fields client-side.
3. Checks the honeypot (`website` input).
4. Rejects submissions less than 2 seconds after page load.
5. POSTs `application/x-www-form-urlencoded` to
   `import.meta.env.PUBLIC_FORM_ENDPOINT`.
6. Swaps the form for an in-place "Got it. Talk soon." success state.

If JS is disabled, the form's `action` is the same endpoint (or
`/thanks` if no endpoint is set), so it degrades to a normal POST. Real
visitors all have JS — this is just defense in depth.

## Configuration

The single piece of configuration is a build-time env var:

```
PUBLIC_FORM_ENDPOINT=https://script.google.com/macros/s/AKfy.../exec
```

Set it in:

- Cloudflare Pages **Production** environment
- Cloudflare Pages **Preview** environment
- (Optional) `.env` locally — copy `.env.example` to `.env` and paste
  the URL if you want to test real submissions on `npm run dev`

It is `PUBLIC_`-prefixed so Astro inlines it at build time. The Apps
Script Web App URL is public-by-design (it's a CORS endpoint anyone can
POST to). Spam is mitigated by the honeypot + time trap.

See [`apps-script/README.md`](./apps-script/README.md) for the full
deploy steps.

## Cloudflare Pages deployment

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create application →
   Pages → Connect to Git**.
3. Pick the repo and the production branch (`main` once the feature
   branch lands).
4. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 22
5. Environment variables → add `PUBLIC_FORM_ENDPOINT` to both
   *Production* and *Preview*. (You can leave it blank during the very
   first deploy if the Apps Script isn't ready yet — the form will just
   show a friendly error until the var is filled in.)
6. Deploy. Cloudflare gives you a `byron-floor-cleaning-web.pages.dev`
   URL (or similar).
7. **Test on the `*.pages.dev` URL first.** Click around all three
   pages, submit a real form entry, confirm a row lands in the Sheet
   and the email arrives.
8. Only then point `byronfloorcleaning.com` (and `www`) at the Pages
   project via Custom Domains. SSL is auto-provisioned.

The branch deploys (preview URLs) are useful for review.

## Branding rules baked into the site

- Brand name: **Byron Floor Cleaning** (matches the domain).
- Tagline: *Floors that look new again.*
- Service area copy is intentionally generic: "Serving New Jersey",
  "free estimates in our standard service area", "we travel for larger
  jobs", "for locations outside our normal service area, a travel fee
  may apply and can be credited toward the invoice if booked."
- "25+ years of floor care experience" — owner's experience, not the
  legal age of the business.
- Email is **not** published anywhere on the public site at launch.
  Phone, text, and the form are the only public contact methods.
  `byronfloorcleaning@gmail.com` is used internally as the MailApp
  notification recipient.
- No license/insurance numbers or "licensed & insured" claims appear
  unless and until they're confirmed.
- No testimonials in v1.
- Owner-led copy uses neutral wording ("Owner-led work. One crew, one
  standard.") rather than naming a specific person on every job.

When real photos, license info, or testimonials are confirmed, swap the
JSON / placeholder images and re-deploy.

## Design reference

The original handoff lives under `docs/design-handoff/`:

- `HANDOFF.md` — visual tokens, component spec, behavior rules
- `strategy.html` — conversion strategy, copy draft, SEO targets
- `prototype/` — the React/Babel prototype (visual reference only)
- `reference-materials/` — original print flyers

The Modern Premium variant from the handoff is the only one shipped.
