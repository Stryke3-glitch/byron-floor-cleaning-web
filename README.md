# Handoff: Byron Floor Cleaning — Marketing Website

## Overview
A three-page marketing website for Byron Floor Cleaning, a residential & commercial floor cleaning company serving New Jersey. The site's job is to convert visitors into estimate requests for strip-and-wax, tile-and-grout, vinyl floor care, and recurring maintenance services.

The three pages are:
1. **Home** — hero, services overview, before/after gallery, social proof, FAQ, CTA
2. **Services** — detailed service grid with timelines, "how it works" steps, gallery, FAQ
3. **Estimate** — request form (the primary conversion goal) with trust panel & FAQ

## About the Design Files
The files in `design_files/` are **design references created in HTML** — high-fidelity prototypes built with React + Babel inline that show the intended look, layout, copy, and behavior. **They are NOT production code to copy directly.**

Your task is to **recreate these designs in the target codebase's environment** (Next.js, Astro, plain React, WordPress, etc.) using its established patterns, component library, and routing. If no codebase exists yet, **Next.js (App Router) with Tailwind CSS** is the recommended stack — it matches the SEO/marketing-site needs and the design uses no exotic features.

The HTML mocks ship with three visual variants toggled via a Tweaks panel (Modern Premium, Dark Luxury, Clean Light). **Modern Premium is the chosen direction** — implement that one. The other two are preserved in the source for reference but should not ship.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, component states, and copy are final and approved. Recreate pixel-perfectly using the codebase's existing libraries.

## Files in this bundle

```
design_handoff_byron_floor_cleaning/
├── README.md                          ← you are here
├── design_files/
│   ├── prototype.html                 ← entry point, loads React/Babel + JSX files
│   ├── prototype-app.jsx              ← all three pages, components, content (~1030 lines)
│   ├── tweaks-panel.jsx               ← in-design tweak controls (NOT for production)
│   └── strategy.html                  ← strategy doc: sitemap, conversion goals, copy, SEO
└── reference_materials/
    ├── flyer_1.jpeg, flyer_2.jpeg     ← original print flyers from the client
    ├── flyer_3.jpg, flyer_4.png       ← (use for brand voice / service list reference)
```

To view the prototype: open `prototype.html` in a browser. To toggle the Tweaks panel, you'll need to run it inside the original design environment — but you can read all variant tokens directly from `prototype-app.jsx`.

---

## Brand & Voice

- **Brand name:** Byron Floor Cleaning (configurable in the prototype but ship as "Byron Floor Cleaning")
- **Slogan / tagline:** *"Floors that look new. Year after year."*
- **Service area:** All of New Jersey
- **Tone:** Direct, confident, practical, a little blue-collar. No corporate jargon, no fake urgency, no exclamation points. Talks like a craftsman who knows their trade.
- **What they do:** Strip & wax, tile & grout, vinyl floor care, recurring maintenance, one-time deep cleans. Both residential and commercial.

---

## Design Tokens (Modern Premium variant — ship this)

### Colors
| Token | Hex | Usage |
|---|---|---|
| `bg` | `#FAF8F3` | Page background — warm off-white / paper |
| `surface` | `#FFFFFF` | Card surfaces, form inputs |
| `ink` | `#0F1115` | Primary text, headlines, dark CTA backgrounds |
| `ink2` | `#272A31` | Secondary text |
| `muted` | `#5A6068` | Tertiary text, captions, helper copy |
| `line` | `#E7E4DC` | Borders, dividers (default) |
| `lineStrong` | `#D6D2C8` | Borders that need more weight |
| `heroBg` | `#0F1115` | Hero section background (inverted) |
| `heroInk` | `#FAF8F3` | Hero text on dark bg |
| `heroSub` | `#C8C2B4` | Hero subtitle / muted text on dark |
| `accentText` | `#8A6420` | Warm gold accent — eyebrow labels, link underlines, decorative rules |
| **Feature card bg** | `#1a1d24` | Soft charcoal for the "Most requested" service card (NOT pure ink — softer) |
| **Feature card gold** | `#E5B970` | Brighter warm gold for eyebrow labels & glow on dark feature card |

### Typography
- **Display / headlines:** `'Fraunces', Georgia, serif` — italic optical-size variable serif. Weights 400, 500, 600. Used for H1/H2/H3, hero, section titles. Loaded from Google Fonts.
- **Body / UI:** `'Inter', system-ui, sans-serif` — weights 400, 500, 600, 700. All paragraph text, labels, buttons, form fields.
- **Eyebrow labels:** Inter, 13px, weight 700, letter-spacing 0.14em, uppercase, color `accentText` (`#8A6420`) or `#E5B970` on dark backgrounds. Always prefixed with an 18×2px solid bar in the same color (decorative rule). See "Most requested" / "Save year over year" labels.
- **Hero H1:** Fraunces, ~72–88px depending on viewport, weight 500, line-height 1.05, letter-spacing -0.02em.
- **Section H2:** Fraunces, ~48px, weight 500, line-height 1.1, letter-spacing -0.015em.
- **Card H3:** Fraunces, 19–32px (32 for feature card, 19 for standard), weight 600, line-height 1.15, letter-spacing -0.01em.
- **Body:** Inter, 15–17px, weight 400, line-height 1.55–1.65.
- **Small / meta:** Inter, 12–13px, weight 400 or 600.

### Spacing & Layout
- **Section vertical padding:** 96px desktop, 64px tablet, 48px mobile
- **Container max width:** 1200px, 32px gutter desktop / 24px tablet / 20px mobile
- **Grid gap:** 24px between cards (most grids), 16px between dense items
- **Card padding:** 22px standard, 32px feature card
- **Border radius:** **4px** everywhere. This is intentional — the brand reads as solid/practical, not soft/playful. Do not use rounded-xl or pill shapes except for the round drag-handle on the before/after slider (44px circle).
- **Border weight:** 1px solid `line` for all dividers and card borders.

### Buttons
- **Primary:** background `ink` (`#0F1115`), text `#FFFFFF`, padding 14px 28px, font Inter 15px weight 600, border-radius 4px, no shadow. Hover: slight bg lift to `#1f2229`.
- **Secondary (outline):** transparent bg, text `ink`, 1px border `ink`, same padding/typography. Hover: bg `ink`, text `#FFFFFF`.
- **Tertiary / link:** Inter 14px weight 600, color `ink`, with a 1px `accentText` underline-offset 4px on hover.
- All buttons: cursor pointer, transition 150ms ease.

### No shadows, gradients, or rounded blobs
The aesthetic is intentionally restrained: square corners, hairline borders, generous whitespace, two type families, one warm-gold accent. Resist adding decorative gradients, drop shadows, or rounded-corner softness.

---

## Sitemap & Routing

| Route | Page name | Purpose |
|---|---|---|
| `/` | Home | Brand intro, drive to estimate form |
| `/services` | Services | Detailed service info, drive to estimate form |
| `/estimate` | Estimate | Conversion form (primary KPI) |

Each page shares the same **Header** (logo + nav + phone CTA) and **Footer**. Header is sticky on scroll with a subtle background fade-in.

---

## Screens

### Header (shared)
- Sticky top, full width, 72px tall.
- Left: brand mark (the word "Byron" in Fraunces italic 24px weight 500 + a tiny gold dot, then "Floor Cleaning" in Inter 13px weight 600 letter-spacing 0.12em uppercase below or beside).
- Center/right: nav links (Home, Services, Estimate) — Inter 14px weight 500, current page underlined with 2px `accentText` rule.
- Far right: phone number with phone icon (Inter 14px weight 600), and a primary "Get an estimate" button.
- Mobile: hamburger menu opens a full-height slide-down panel with the same links + phone + CTA.

### Footer (shared)
- Background `ink` (`#0F1115`), text `heroInk` / `heroSub`.
- Three columns: brand + tagline + service area, nav links, contact (phone, email, hours).
- Bottom row: copyright, "Licensed & insured · Serving all of NJ", small print links.
- 80px top/bottom padding.

### 1. Home page

**Hero**
- Full-bleed dark section (`heroBg` `#0F1115`), 720px tall on desktop.
- Eyebrow: gold rule + "RESIDENTIAL & COMMERCIAL · ALL OF NJ" (13px, weight 700, letter-spacing 0.14em).
- H1: *"Floors that look new. Year after year."* (Fraunces 72–88px, color `heroInk`, italics on "look new" — use Fraunces variable italic axis).
- Subtitle: 1–2 sentences in `heroSub` color, max-width 540px, Inter 17px line-height 1.55.
- Two CTAs: primary "Get a free estimate" → `/estimate`, secondary "See our work" → `#gallery`.
- Right side / behind: a large floor-swatch placeholder image (the SVG `FloorSwatch` component in the prototype) showing a glossy waxed VCT tile pattern. **In production, swap for real client photography.**

**"What we do" — services teaser grid (5 cards in a 2-col layout)**
The most-fiddled-with section. Layout: 6-column CSS grid.
- **Card 1 — feature** (`Strip & Wax`): spans 3 cols × 2 rows on the left. Background `#1a1d24` (soft charcoal, NOT pure black), text `#FAF8F3`, padding 32px, min-height 280px.
  - Subtle radial gold glow in bottom-right: `radial-gradient(ellipse at 75% 110%, #E5B970 0%, transparent 55%)` at opacity 0.35.
  - Eyebrow: 18×2px gold bar (`#E5B970`) + "MOST REQUESTED" (13px weight 700 letter-spacing 0.14em uppercase, color `#E5B970`).
  - H3: "Strip & Wax" (Fraunces 32px, color `#FAF8F3`).
  - Body: 15px, color `#D8D2C2`, max-width 380px.
  - Bottom: "Includes strip, seal, and multi-coat wax →" in gold `#E5B970`, weight 600.
- **Cards 2–5** (Tile & Grout, Vinyl Floor Care, Recurring Maintenance, One-Time Deep Clean): each spans 3 cols × 1 row, arranged 2×2 on the right.
  - Background `bg`, 1px `line` border, padding 22px, min-height 130px.
  - **Only one card has an eyebrow label**: card 4 = "Recurring Maintenance" gets "SAVE YEAR OVER YEAR" with gold rule. Cards 2, 3, 5 show only H3 + short subtitle (no eyebrow).
  - H3: Fraunces 19px weight 600.
  - Subtitle: Inter 13px color `muted`.

> **Critical:** the "SAVE YEAR OVER YEAR" eyebrow goes on **Recurring Maintenance** (the card whose body says "Most clients save money in year two"), not on Tile & Grout, Vinyl, or Deep Clean. This was a real bug in iteration — verify it.

**Before / After gallery** (`#gallery`)
- Section H2: "See the difference."
- Three before/after pairs, each is a draggable horizontal slider showing two floor swatches separated by a divider with a 44px round drag handle.
- Each pair has caption (Inter 14px weight 600) + detail line (Inter 13px color `muted`) below.
- In production, replace `FloorSwatch` SVG component with real client photos. Keep the slider interaction.

**How it works** (3 steps)
- Three cards in a row.
- Each: number ("01", "02", "03") in Fraunces 48px color `accentText`, then H3 step title, then a short body paragraph.
- Step copy:
  1. "You request an estimate. Tell us about the floors. We'll set up a site visit within 24 hours."
  2. "We come look in person. We measure the floor, look at the condition, and write you a fixed quote — no surprises."
  3. "Once you approve the quote and pay the deposit, we work on your schedule — overnights, weekends, whenever fits your business."

**Why Byron** (4 trust points in a 2×2 grid)
- Each: small icon (24px, stroked 1.5px, color `accentText`), then H3, then 2–3 sentence body.
- The four points (in order):
  1. **Residential and commercial.** *Homes, offices, schools, retail, medical. Same standard of work.*
  2. **Free estimates in our standard service area.** *We'll come measure, look at condition, and give you a fixed quote. If you're outside our normal route there's a small travel fee, which we credit back to your invoice when you book.*
  3. **Licensed and insured.** *Full liability coverage. We can produce a COI for any property manager who asks.*
  4. **One crew, one standard.** *Byron is on every job. The work that wins us referrals is the work you get.*

**Social proof / testimonials**
- 3 quote cards in a row. Each: 5-star row in `accentText`, quote in Fraunces 19px italic, attribution line in Inter 13px.

**FAQ** (collapsed accordion of 6 questions — see `FAQ` array in `prototype-app.jsx`)
- Each row: 1px top border, 24px vertical padding, plus/minus toggle on the right (animated 90deg rotation), question in Fraunces 22px weight 500, answer in Inter 16px line-height 1.6 reveals beneath when open.
- All closed by default.

**Final CTA band**
- Dark `heroBg` background, centered headline + subhead + primary button.

### 2. Services page
- Hero: same dark band, smaller (~480px). H1: "What we work on." Subhead: one sentence about residential & commercial.
- Same 5-card services grid as home (identical layout & rules) but in **`full=true` mode**: each card shows the full body paragraph and a "Typical timeline: X" footer separated by a hairline border. Feature card omits the "Includes strip, seal..." link.
- "How it works" 3-step section (same as home).
- Before/after gallery (same 3 pairs, full size).
- FAQ.
- CTA band.

### 3. Estimate page
- Lighter hero (~360px), eyebrow + H1 "Tell us about the floors." + 1-sentence subhead.
- Two-column body: form (left, 2/3 width) + trust panel (right, 1/3 width). Stacks on mobile.
- **Form fields:**
  - Name (text, required)
  - Phone (tel, required)
  - Email (email, required)
  - Property type (radio: Residential / Commercial)
  - Floor type (checkbox group: VCT, Tile, Vinyl, Hardwood, Other)
  - Approximate square footage (text)
  - Service needed (radio: Strip & Wax / Tile & Grout / Vinyl Care / Recurring / Deep Clean / Not sure)
  - When do you need it (radio: This week / Next 2 weeks / Within a month / Flexible)
  - Address or town (text)
  - Anything else (textarea, optional)
  - Submit: primary button "Request my estimate"
- **Inputs:** 1px `line` border, 4px radius, 12px 14px padding, Inter 15px, focus state changes border to `ink`. Labels: Inter 13px weight 600 above each field.
- **Trust panel (right):** card with 1px `line` border, contains: phone number CTA, "We respond within 24 hours" line, "Licensed & insured" line, photo of Byron / placeholder.
- Below: 4 FAQ items most relevant to estimating (cost, timing, area, residential vs commercial).

---

## Components Inventory

The prototype defines these reusable components inside `prototype-app.jsx` — recreate them as proper components in the target codebase:

- `Icon` — line-style SVG glyphs (phone, msg, mail, check, arrow, star, shield, clock, home, building, sparkle, menu, close). 24×24, 1.5px stroke. **Replace with [Lucide](https://lucide.dev/) or Heroicons (outline) — they have all of these and match the line weight.**
- `Button` (primary / secondary / link variants)
- `Header` / `Footer`
- `Hero` (variants: dark full-height home hero, smaller dark services hero, light estimate hero)
- `ServiceCard` (with `feature` and `standard` variants, optional eyebrow label)
- `BeforeAfterSlider` — draggable comparison slider with 44px round handle
- `HowItWorksStep`
- `WhyByronCard`
- `Testimonial`
- `FAQAccordion` / `FAQItem`
- `EstimateForm`
- `TrustPanel`
- `FloorSwatch` — **prototype-only.** This is a generated SVG placeholder simulating a glossy floor. **Remove from production and replace with real photography.**

---

## Interactions & Behavior

- **Header:** sticky on scroll. Optional: subtle background fade-in after 80px scroll (keep light, don't add heavy shadows).
- **Mobile nav:** hamburger opens a full-screen overlay panel with links, phone, CTA. Body scroll locked while open. ESC and outside-click close.
- **FAQ accordion:** one or many can be open at once (current prototype allows multiple). Plus icon rotates 45°→0° on open. Content height transitions over 200ms ease-out. No bounce.
- **Before/after slider:** click + drag the divider, or click anywhere on the image to jump the divider there. Touch-supported. The divider position is local state; no need to persist.
- **Form:** all required fields validated client-side on submit. Show inline error message below each invalid field in `#B23A2B` (warm red). On valid submit: POST to whatever backend endpoint exists (Formspree, Resend, server route — out of scope), then show a success state replacing the form ("Thanks. We'll be in touch within 24 hours."). Don't redirect.
- **Buttons:** 150ms color transition on hover. No transform/scale animations.
- **No page transitions** — standard route changes are fine.
- **No fancy scroll animations** — keep it static and snappy. The brand is "we show up and do the work," not "look at our parallax."

---

## Responsive

- **Desktop:** ≥1200px — designs as shown.
- **Tablet:** 768–1199px — sections collapse from 4-col → 2-col, services grid keeps the feature card full-width on top and 4 cards in 2×2 below.
- **Mobile:** <768px — single column. Hero H1 drops to 44–52px. Section padding to 48px. Services grid becomes a stack: feature card full-width, then 4 cards stacked. Form fields full-width. Header collapses to logo + hamburger.

---

## SEO / Marketing

See `design_files/strategy.html` for the full strategy doc — it covers conversion goals, target keywords, meta titles/descriptions for each page, schema.org markup recommendations (`LocalBusiness`, `Service`), and content priorities.

Key technical SEO requirements:
- Server-render or static-generate all three pages (don't ship a SPA — this is a marketing site that lives or dies on Google).
- `<title>` and `<meta description>` per page (see strategy doc).
- `LocalBusiness` JSON-LD on all pages with phone, address (or service area), hours.
- `Service` JSON-LD on the Services page listing each offering.
- Open Graph + Twitter card meta with a hero image.
- `sitemap.xml` and `robots.txt`.
- Canonical URLs.

---

## Assets to source / produce

Things the prototype uses placeholders for that need real assets before launch:

1. **Real photos** — hero, before/after gallery (3+ pairs), Byron portrait for the trust panel, services illustrations. Replace all `FloorSwatch` instances.
2. **Logo** — the prototype uses a typeset wordmark. Confirm with client whether they want a real mark designed.
3. **Phone number, email, business address** — confirm with client and replace placeholder strings.
4. **Service area map** — optional but high-value for trust. A simple NJ outline with a service-radius shading.
5. **Insurance / license numbers** — need exact numbers for footer fine print.

Reference materials in `reference_materials/` include the original print flyers Byron has been distributing — use these for brand voice, service list confirmation, and any photography that's already been produced.

---

## What NOT to ship from the prototype

- The Tweaks panel (`tweaks-panel.jsx`) — design-tool only.
- The 3 visual variants — only ship Modern Premium. The other token sets in `variantTokens` can be deleted.
- The `FloorSwatch` SVG placeholder.
- The inline-Babel React setup. Use a real toolchain.

---

## Recommended stack (if no codebase exists)

- **Next.js 15 (App Router)** — file-based routing matches the 3-page sitemap, built-in image optimization, easy static generation, good Vercel deploy story.
- **Tailwind CSS** — for the design tokens above. Set up `tailwind.config.ts` with the color/font/spacing tokens from this README.
- **Fonts:** `next/font/google` for Fraunces (variable, italic axis enabled) and Inter.
- **Forms:** Formspree, Resend, or a Next.js Route Handler that emails to Byron's inbox.
- **Hosting:** Vercel.
- **Icons:** Lucide React.
- **Images:** Next/Image once real photography lands.

---

## Open questions for the developer to confirm with client

1. Confirm phone number, email, and any physical address before launch.
2. Confirm the exact service area boundaries (the prototype says "All of NJ" but the strategy doc and copy reference a "standard service area" with travel-fee credit — clarify what counties / radius that means).
3. Confirm insurance carrier + license numbers for the footer.
4. Decide on form backend (Formspree vs custom email vs CRM integration).
5. Get real photography for hero, gallery, and trust panel.

End of handoff.
