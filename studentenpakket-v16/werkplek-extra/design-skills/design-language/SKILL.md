---
name: design-language
description: "Extract a production website's typography, color, spacing, layout, and motion into a reusable design-language reference. Use when the user asks to decode a site's visual identity or build something with a similar feel."
---

# design-language

A site's design language is the set of choices — type scale, color palette, spacing rhythm, motion curves — that make it *feel* the way it does. This skill reads those choices out of the production source, explains the load-bearing ones to a non-designer, and packages them as a fill-in-the-blanks kit so the user can ship their own product in the same key.

The output is a **translation**, not a copy. Source typography choices and structure are recorded; source headlines, body copy, photography, and brand marks are never reproduced.

## Prerequisites — check first, fall back gracefully

Before step 1, verify the user has a JS-rendering scrape tool available. The skill **prefers** Firecrawl but has three fallbacks. Walk down the chain:

1. **Firecrawl MCP** (`firecrawl_scrape`) — **best.** JS rendering + auto-branding extraction + screenshot in one call. If present, use it and skip the rest.
2. **Apify MCP** (`mcp__apify__rag-web-browser`) — second-best. Renders JS, returns markdown + HTML. No branding JSON.
3. **Claude in Chrome MCP** (`mcp__claude-in-chrome__navigate` + `read_page`) — third-best. Real browser, manual screenshot. User must approve each step.
4. **Plain `curl`** — last resort. Only works for sites that ship rendered HTML (rare for modern marketing). For SPAs, it returns an empty Angular/React shell and the skill cannot proceed.

If none are available, **stop and tell the user:**
> *"This skill needs a JS-rendering scrape tool to read the live site. Install one of these to continue:*
> - *Firecrawl MCP — fastest, best results — `https://docs.firecrawl.dev/mcp`*
> - *Apify MCP — `https://apify.com/mcp`*
> - *Claude in Chrome extension — `https://claude.ai/chrome`"*

Do not attempt the workflow without a rendering tool — the output will be a kit full of nulls and the user will think the skill is broken.

## Inputs

Ask for these only if the user hasn't supplied them:

- **target URL** — the site whose design language to read
- **product name** — the user's own brand, so the output reads as theirs
- **one-line description** — what the user's product does

## What to do (7 steps)

1. **Capture the rendered page.** Call `firecrawl_scrape` with `formats: ["html", "screenshot", "branding"]` and `waitFor: 10000`. Marketing sites are SPAs; raw source is an empty shell.

2. **Find and fetch the CSS bundle.** Look for `<link rel="stylesheet" href="...hash.css">` in the rendered HTML. `curl -sL --compressed` it to `/tmp/site.css`. Always pass `--compressed` — modern sites ship gzipped.

3. **Extract every `:root` variable.** Regex sweep over the CSS for `(--[a-z0-9-]+)\s*:\s*([^;}]+)`. Categorize palette / spacing / type / easing / breakpoints / layout. Save to `tokens.json`.

4. **Extract load-bearing class rules.** Grep for `.container`, `.heading-*`, `.body`, `.btn`, `.arrow-link`, plus any class names you spotted in the rendered DOM. These rules reveal the production moves — especially `font-variation-settings`. Save to `structure.css`.

5. **Identify the three artistic decisions that decide the feel.** Inspect `structure.css` and report:
   - **Optical-size axis.** Variable fonts have an `opsz` axis. If headlines set `"opsz" <N>` matched to their px size, the font draws differently at each size. This is invisible from a screenshot — only the source tells you. Mention it in the explanation.
   - **Non-standard font-weight.** Production sites often use weights between the named steps (e.g. `450` instead of 400 or 500). Variable-font luxury. Call it out.
   - **Pixel line-heights, not ratios.** Locks vertical rhythm against runtime weight changes. Worth explaining to the user.

6. **Fill the brief template.** Open `brief-template.md` (in this skill's folder). Substitute the extracted token values into the token table. Keep the HTML scaffold's `{{SLOTS}}` empty — those are for the user's own copy. Write a "what makes this site feel right" paragraph that explains the three artistic decisions above in plain English.

7. **Package the kit.** Save four files to `~/Desktop/<safe-target-name>-kit/`:
   - `builder-brief.md` — the filled template, paste-ready for v0 / Lovable / Claude
   - `tokens.json` — the design tokens as data
   - `scaffold.html` — the working HTML scaffold with slots
   - `preview.png` — the source screenshot for visual A/B

   Open the kit folder and show the user a one-line summary of each file.

## Framing — talk to the user like a designer would

When presenting results, lead with *why*, not *what*:

- ✓ "This site feels weighty because every headline is at `font-weight: 450` — between regular and medium. That's only possible with a variable font."
- ✗ "Extracted 47 tokens. Saved to tokens.json."

The user is not a designer. The kit is only useful if they understand the choices well enough to keep them when they edit. Spend two sentences on the production-critical moves before pointing at the files.

## What this skill does NOT do

- Does not reproduce source copy, headlines, photography, or brand marks
- Does not capture Three.js / WebGL scene code (substitutes CSS gradients)
- Does not target sites with login walls or `robots.txt` disallow on `/styles/`
- Does not produce a 1:1 clone — produces a *kit* the user fills with their own brand

## Files in this skill

- `SKILL.md` — this file (trigger + instructions)
- `README.md` — human-readable overview
- `process.md` — the long-form 7-step process with code snippets and quality checks
- `brief-template.md` — the master brief template that gets filled per-site
