# The process — 7 steps to read a design language

The locked workflow. Follow it manually with any URL or wrap it in a script for repeated use. The output is always a 4-file kit ready for a builder.

---

## Inputs

```
1. Target URL                 e.g. https://linear.app
2. Your product name          e.g. Glaido
3. Your one-line description  e.g. A design feedback tool for product teams
4. (Optional) accent override e.g. #FF6B35 — defaults to source palette
```

## Output

```
<target-name>-kit/
├── builder-brief.md     ← master prompt with extracted tokens + scaffold filled in
├── tokens.json          ← design tokens as data (Tailwind / CSS-vars ready)
├── scaffold.html        ← working HTML with {{slots}} for your copy
└── preview.png          ← screenshot of the source for visual A/B
```

---

## Step 1 · Capture the rendered page

Marketing sites are SPAs. The raw HTML source is an empty shell. Render-aware tools surface the real DOM.

```js
firecrawl_scrape({
  url: "<TARGET_URL>",
  formats: ["html", "rawHtml", "screenshot", "branding"],
  waitFor: 10000,
  screenshotOptions: { fullPage: true, viewport: { width: 1440, height: 900 } }
})
```

Output: rendered HTML, full-page screenshot, branding JSON (auto-extracted colors / fonts / sizes).

## Step 2 · Find and grab the CSS bundle

Search the rendered HTML for `<link rel="stylesheet" href="...">`. Modern sites usually ship one big bundle with a hash in the filename (e.g. `styles-7KLEMMT6.css`). Always pass `--compressed` — most servers gzip CSS.

```bash
curl -sL --compressed "<TARGET_URL>/styles-<HASH>.css" -o ./out/site.css
wc -c ./out/site.css           # sanity check — should be 5KB–500KB
head -c 800 ./out/site.css     # confirm it's real CSS, not gzip noise
```

## Step 3 · Extract every `:root` variable

One regex sweep pulls the whole design system into a JSON file.

```python
import re, json
css = open("./out/site.css").read()
tokens = dict(re.findall(r"(--[a-z0-9-]+)\s*:\s*([^;}]+)", css))
open("./out/tokens.json", "w").write(json.dumps(tokens, indent=2))
```

Categorize after extraction (the builder reads it more easily):

- `palette` — color hexes
- `spacing` — `--space-*`, `--gap-*`
- `type` — `*-size`, `*-line-height`, `*-letter-spacing`
- `radius` — `--shape-corner-*`, `*-radius`
- `easing` — anything with `cubic-bezier`
- `layout` — `nav-height`, `page-margin`, `grid-gutter`, `container-max`

## Step 4 · Extract load-bearing class rules

Tokens alone aren't enough. The rules that *use* them reveal the production-critical decisions — especially `font-variation-settings` with the optical-size axis.

```python
import re
css = open("./out/site.css").read()
patterns = [
    r"\.container\s*\{[^}]+\}",
    r"\.heading-[0-9]+\s*\{[^}]+\}",
    r"\.body\s*\{[^}]+\}",
    r"\.btn[^{,]*\{[^}]+\}",
    r"\.arrow-link[^{,]*\{[^}]+\}",
    r"\.call-to-action[^{,]*\{[^}]+\}",
    r"\.landing-main\s*\{[^}]+\}",
]
with open("./out/structure.css", "w") as f:
    for pat in patterns:
        for m in re.findall(pat, css):
            f.write(re.sub(r"\s+", " ", m).strip() + "\n\n")
```

## Step 5 · Verify the three artistic decisions

These are the choices most people miss from a screenshot alone. Tick all three before proceeding.

- [ ] **Optical-size axis (`opsz`).** `font-variation-settings: "wdth" 100, "opsz" <N>` on every headline class, where `<N>` matches the px font-size. If present, this is the single biggest reason the source feels "designed."
- [ ] **Non-standard font-weight.** Headlines often sit at `450` or `500` — sometimes `350` for editorial display. Only possible with variable fonts.
- [ ] **Pixel line-heights.** `line-height: 25.38px` instead of `line-height: 1.45`. Locks vertical rhythm against runtime weight changes.

If any are missing, the source isn't using a variable font — drop the `opsz` references from the brief for this run.

## Step 6 · Fill the brief template

Open `brief-template.md` (sibling file). Substitute:

```
{{SOURCE_URL}}              → target URL
{{BRAND}}                   → user's product name
{{ONE_LINE_DESCRIPTION}}    → user's one-liner
{{TOKEN_TABLE}}             → markdown table generated from tokens.json
{{SCAFFOLD_HTML}}           → contents of scaffold.html (Appendix A)
{{FEEL_PARAGRAPH}}          → 2–3 sentences explaining the three artistic decisions
                              found in step 5, written for a non-designer
```

The HTML scaffold's `{{SLOTS}}` are NOT filled at this stage — those are for the user's own copy.

## Step 7 · Package and deliver

```bash
mkdir -p ~/Desktop/<target-name>-kit
cp ./out/tokens.json     ~/Desktop/<target-name>-kit/
cp ./out/scaffold.html   ~/Desktop/<target-name>-kit/
cp ./out/screenshot.png  ~/Desktop/<target-name>-kit/preview.png
cp ./out/builder-brief.md ~/Desktop/<target-name>-kit/
open ~/Desktop/<target-name>-kit
```

Then explain to the user, in plain English:

1. What makes the source feel the way it does (the three artistic decisions from step 5)
2. Which file does what (one line each)
3. How to use the brief — fill the slots at the bottom, paste into v0 / Lovable / Claude

---

## Quality checks (before delivery)

| Check | How |
|---|---|
| Tokens look sane | `tokens.json` has 40–100 entries, no obvious nulls |
| Headline opsz captured | `structure.css` has `opsz <N>` on the hero class matching the px size |
| Container max captured | `.container` rule includes a `max-width` |
| Easing curves extracted | At least 4 `cubic-bezier` entries in tokens.json |
| Screenshot loaded fully | `preview.png` is sharp, no broken layout, no cookie wall |

---

## Common failure modes

| Symptom | Cause | Fix |
|---|---|---|
| `tokens.json` has 5 entries | Site uses CSS-in-JS (no `:root` vars) | Fall back to the branding JSON from Firecrawl + manual inspection of the rendered DOM |
| CSS bundle is base64 garbage | Forgot `--compressed` flag on curl | Add it |
| Headlines feel "off" in the rebuild | Missed the `opsz` axis in step 5 | Add `font-variation-settings: "wdth" 100, "opsz" <size>` to each headline class |
| Hero text breaks mid-word | Typed-text JS not wrapping words | Use the word-wrapping variant in the scaffold |
| Animated orbs feel "stuck" | CSS-only orbs are limited | Optional v2 — upgrade to Three.js morphing particles |

---

## What the process does NOT do (deliberate gaps)

- **Three.js / WebGL scenes** — substituted with CSS gradients
- **Custom scroll JS / GSAP timelines** — uses native CSS scroll only
- **Per-route layouts** — single-page only; multi-page sites need n × this process
- **Dark theme variants** — operator decides which theme to extract
- **Video assets** — hero videos need to be re-shot by the user

---

## Verification — what success looks like

A successful run scores ≥90% on these:

1. **Token fidelity** — every value in `tokens.json` matches a verbatim value in the source CSS
2. **Type fidelity** — headline opsz, weight, and line-height in the rebuild match the source
3. **Layout fidelity** — section padding, container max, nav height match within 4px
4. **Visual fidelity** — top-viewport screenshot diff vs source ≤ 8% pixel difference
5. **Copy independence** — zero verbatim copy from source; every slot is a placeholder

If all five tick, the user is in the same key as the source, with their own brand on top.
