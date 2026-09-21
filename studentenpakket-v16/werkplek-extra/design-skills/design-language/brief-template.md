# Builder brief — {{BRAND}}

> **Generated from:** {{SOURCE_URL}}
> **Date:** {{DATE}}
>
> This brief carries the design language of the source site, translated for you to apply to **{{BRAND}}** — *{{ONE_LINE_DESCRIPTION}}*.
>
> The source is the inspiration. The brand below is yours. Nothing about your product or copy is copied from the source — only the typographic system, spacing rhythm, motion curves, and layout patterns.

---

## What makes the source feel the way it does

{{FEEL_PARAGRAPH}}

Read this section before you touch any of the values below. If you change a token without understanding *why* it's set the way it is, the page will lose its tone of voice.

---

## Tokens — extracted verbatim from the source

All values below were read directly from the source's production CSS. Use them in your `:root` exactly as written. Do not invent new tokens or "round" the numbers.

{{TOKEN_TABLE}}

---

## The three artistic decisions to preserve

These are the choices that decide whether the rebuild feels right. They are invisible from a screenshot — only the source CSS reveals them.

1. **Optical-size axis (`opsz`).** Variable fonts have an axis that draws the font differently at different sizes — sharper at large, friendlier at small. Set `font-variation-settings: "wdth" 100, "opsz" <N>` on every headline, where `<N>` equals the px font-size. Without this, headlines look like body type blown up.

2. **Non-standard font-weight.** The source uses a weight between the named steps (often `450`). Variable-font luxury. Pick it because the source picked it — it's what gives headlines presence without going heavy.

3. **Pixel line-heights, not ratios.** `line-height: 25.38px` not `line-height: 1.45`. Survives runtime weight changes and locks vertical rhythm.

If your stack doesn't support variable fonts, the next-best move is `font-weight: 500` on headlines and accept a small loss in fidelity.

---

## The page — 7 sections, in this order

The source's structure is the spine. Don't add new sections. Don't reorder. If something doesn't fit one of the seven, your copy probably needs editing, not the structure.

### 01 · Nav (sticky, source's nav-height)
- Blurred backdrop
- Bottom border, alpha outline
- **Left:** small multi-color radial-gradient mark + brand wordmark
- **Center:** 4–5 nav links with subtle pill hover
- **Right:** one dark pill CTA (e.g. Download / Get started)

### 02 · Hero (full viewport, center-aligned)
- A 96px multi-color radial-gradient orb (animated slow hue rotation)
- Massive headline using the source's `landing-main` size, with typed-letter animation + blinking accent-color cursor
- Lede paragraph max 38ch, source's `xl` type size
- Two pill CTAs centered: dark primary + ghost secondary
- A small "Play intro" arrow with circular ▶ glyph below

### 03 · Use-cases (horizontal scroll-snap carousel)
- Eyebrow + h2 (source's `heading-2` or equivalent) on the left
- Two circular nav buttons (48px) on the right
- 5 cards minimum, each 380px wide, scroll-snap-align: start
- Per card: gradient header image (16:10), pill badge, role headline, body copy, "View case" arrow link

### 04 · Two-column showpiece
- Two equal cards, gap 16px
- Animated morphing radial-gradient orbs in the background of each card
- Per card: pill status badge, 56px headline, lede (max 26ch), two CTAs

### 05 · Blog/changelog slider
- Same carousel pattern as use-cases
- Each card 320px wide: gradient cover, meta line, h6 title, "Read" arrow link

### 06 · Dark CTA band (full-width inverse)
- Dark background (source's `dark-surface`), white text
- Typed headline with multi-color blinking cursor
- One light pill CTA below
- Same orb canvas at 0.4 opacity in background

### 07 · Footer
- Top: 4-column grid — tagline + 3 link columns
- Middle: a giant brand wordmark, line-height 0.85, weight matching headlines
- Bottom: small brand mark + small legal links

---

## House rules

- No drop shadows. Surfaces lift via alpha borders.
- No stock photos. No people. UI screenshots and gradient orbs only.
- One accent color per screen — used like ink.
- Headlines ≥54px must use the `opsz` axis matched to their size.
- Body line length caps at 60ch — never run full container.
- Sections ≥120px vertical padding on desktop.
- No scroll-jacking. Native scroll only.
- CTAs ≤4 words.
- Banned words: revolutionary, seamless, unleash, empower, transform, game-changing, supercharge, world-class.
- Don't invent sections — exactly the 7 above.
- **The brief is the spec, not the product.** The tokens, type scale, spacing, and component recipes below describe HOW to build the page. They are NOT content to display ON the page. Do NOT render:
  - A "Design Sandbox" / "Theme Picker" / "Aesthetic Presets" panel
  - Typography axis sliders (wght / wdth / opsz toggles)
  - Token-value readouts ("CANVAS BG: #FFFFFF", "LINE WEIGHT: 1px", "GRID SYSTEM: 8-column")
  - Layout-grid overlays as a user-toggleable feature
  - Any control that lets the visitor change the design system at runtime
  These belong in a designer's tool, not the marketing site. The site is the FINISHED application of the system — silent, not self-referential.

- **Every section is one viewport tall.** Each top-level `<section>`, the `<header class="hero">`, and the dark CTA band get `min-height: 100vh` with content vertically centered (`display: flex; flex-direction: column; justify-content: center;`). The page reads as a sequence of discrete screens — one section, one scroll, one point. Padding becomes the floor, not the layout driver. Mobile drops to `min-height: auto` so short sections don't waste viewport. Footer is the only block exempt — it sizes to its content.

---

## Copy to write for {{BRAND}}

Fill these slots before pasting the scaffold to your builder.

```
NAV
  Brand wordmark:       {{BRAND}}
  Links:                {{NAV_1}}, {{NAV_2}}, {{NAV_3}}, {{NAV_4}}, {{NAV_5}}
  CTA:                  {{NAV_CTA}}  (≤2 words)

HERO
  Headline:             {{HERO_HEADLINE}}  (≤6 words, declarative)
  Lede:                 {{HERO_LEDE}}  (1 sentence, ≤60ch)
  Primary CTA:          {{HERO_CTA_PRIMARY}}  (≤4 words)
  Secondary CTA:        {{HERO_CTA_SECONDARY}}  (≤4 words)

USE CASES (5 cards)
  Section eyebrow:      {{USE_EYEBROW}}
  Section headline:     {{USE_HEADLINE}}  (≤8 words)
  Each card:
    Badge:              {{CARD_BADGE}}  (1 word, uppercase)
    Role headline:      {{CARD_ROLE}}  (≤8 words)
    Body:               {{CARD_BODY}}  (≤2 sentences)

TWO-COLUMN
  Card 1 badge / headline / lede / CTAs
  Card 2 badge / headline / lede / CTAs

BLOG (6 cards)
  Section headline:     {{BLOG_HEADLINE}}
  Each card: date, category, title (≤8 words)

DARK CTA
  Headline:             {{DL_HEADLINE}}  (5–7 words)
  CTA:                  {{DL_CTA}}  (≤4 words)

FOOTER
  Tagline:              {{FOOTER_TAGLINE}}  (3–4 words)
  Wordmark:             {{BRAND_UPPERCASE}}
```

---

## Acceptance criteria — how to know it landed

A. Every value from the token table appears verbatim in `:root` (no rounding).
B. Hero headline uses `font-variation-settings: "wdth" 100, "opsz" <hero-size>`.
C. Words never break mid-character (test at 1024 + 1440 + 1920 widths).
D. The 7 sections appear in the prescribed order. No extras.
E. At least one orb animation visible in the two-column section.
F. Typed-letter animation works in hero + dark CTA.
G. Mobile: hero headline scales to ~56px, columns stack, carousels remain swipeable.

Return one self-contained HTML file (or a Next.js page + global CSS) ready to deploy.

---

## Appendix A — HTML scaffold (paste-and-fill)

Save as `index.html`. Replace `{{slots}}` with copy from above. No build step needed.

{{SCAFFOLD_HTML}}

---

*Brief generated by the `design-language` skill. The source provided the design language; the brand, the copy, and the imagery are yours.*
