# design-language

A skill for reading the design language out of any production website — and translating it into a kit a non-designer can ship from.

## Why this exists

A great-looking site looks great for reasons that are usually invisible. The typographic optical-size axis. A font-weight between the named steps. Line-heights locked in pixels. A specific spacing rhythm. You can stare at a screenshot for an hour and still not see them.

This skill reads those choices directly out of the production CSS and explains them in plain English. The output is a four-file kit: a brief, a token JSON, a working HTML scaffold with empty slots, and a screenshot to A/B against. Drop the brief into any builder (v0, Lovable, Bolt, Claude) and you get a site in the same key, with your own brand and copy.

## Prerequisites

You need **one** JS-rendering scrape tool installed as an MCP. The skill walks the chain in this order:

1. **Firecrawl MCP** (recommended) — fastest, returns rendered HTML + branding JSON + screenshot in one call. Install: <https://docs.firecrawl.dev/mcp>
2. **Apify MCP** — renders JS, returns markdown + HTML. Install: <https://apify.com/mcp>
3. **Claude in Chrome extension** — real browser, slower but works for sites that block scrapers. Install: <https://claude.ai/chrome>

If none are available, the skill stops on launch and shows you the install links. It will **not** silently produce a broken kit.

## How to install

Copy this folder into your Claude Code skills directory:

```bash
cp -r ~/Desktop/design-language ~/.claude/skills/
```

Then in any Claude Code conversation:

> "Give me the design language of https://linear.app — my product is Glaido, a design feedback tool."

The skill triggers, runs the 7-step process, and saves a kit to `~/Desktop/linear-kit/`.

## How to run it without the skill

If you just want to do it by hand once, follow `process.md`. It's the same workflow, written as an operator manual.

## What you get

```
<target>-kit/
├── builder-brief.md   ← paste into v0/Claude/Lovable; produces a working site
├── tokens.json        ← drop into Tailwind config or :root
├── scaffold.html      ← working HTML with {{slots}} for your copy
└── preview.png        ← source screenshot for visual A/B
```

## What it doesn't do

- Doesn't copy the source's text, photography, or brand marks
- Doesn't capture Three.js or WebGL scenes (uses CSS gradients instead)
- Doesn't target sites that gate their CSS behind auth
- Doesn't produce a 1:1 clone — produces a kit you fill with your own product

## Files

| File | Purpose |
|---|---|
| `SKILL.md` | Agent-facing instructions and trigger phrases |
| `README.md` | This file — human overview |
| `process.md` | The 7-step technical process, runnable manually |
| `brief-template.md` | The template that gets filled with extracted tokens |
