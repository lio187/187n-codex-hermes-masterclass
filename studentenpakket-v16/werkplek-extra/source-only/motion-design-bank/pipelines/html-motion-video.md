# Pipeline: HTML → Video (render-from-code)

Proven production pipeline for turning a motion design into deliverable video files.
First shipped: 187N "Company Signal" (2026-08-24), master in
`~/Ai Workspace/187n/company-signal-motion/` — use that project as the reference implementation.

**Rule (Leon):** motion graphics render FROM CODE (HTML/CSS/JS + headless Chrome + ffmpeg).
Never AI-generated video for UI/data/brand-system motion.

## Architecture: deterministic timeline

Everything derives from ONE pure function `render(t)` — no CSS transitions/animations for
choreographed elements, no `Date.now()`. Live playback = rAF loop calling `render(elapsed)`.
Capture = seek `render(frameTime)` per frame. This guarantees the MP4 is pixel-identical to the preview.

Required page contract (used by `capture.mjs` in this folder):

```js
window.DUR   = 15200;                 // total ms
window.SEEK  = ms => { playing=false; render(ms); return true; };
window.READY = document.fonts.ready.then(()=>true);
window.REMAPS = {                     // optional: named short cuts (see Time-remap)
  short3s: [[0,60],[500,1900],[640,2600],[780,3450],[1950,10600],[2330,11900],[2440,12610],[2470,12700],[3000,14300]],
};
const CAPTURE = new URLSearchParams(location.search).has('capture'); // disables autoplay
const ALPHA   = new URLSearchParams(location.search).has('alpha');   // transparent mode
if (ALPHA) document.documentElement.classList.add('alpha');
```

Layout: fixed design stage (e.g. 1080×1080) scaled to fit the window with `transform:scale()`.
Review niceties: click = pause, arrow keys = scrub ±400ms, space = play/pause,
`prefers-reduced-motion` → static final frame.

**Deterministic "random"** (glitch/scramble/flicker): hash the quantized frame, never Math.random:
```js
const rnd=(seed,t)=>{const f=Math.floor(t/100);const x=Math.sin(seed*127.1+f*311.7)*43758.5453;return x-Math.floor(x)};
```
Quantize to ≥33ms so a 30fps capture sees the same glitches as live playback.

## Alpha / overlay mode (`?alpha`)

For "plak over een video heen" deliverables:
- `html.alpha, html.alpha body { background: transparent }` and stage background transparent in render().
- Elements KEEP their fills (white card fills stay white) — only the empty canvas goes transparent.
- A full-screen dark end scene must become a centered strip/bar in alpha mode, or it covers the video:
  `html.alpha #endcard{background:transparent}` + `html.alpha #endStrip{background:#000;padding:42px 58px}`.
- Logos/images need a REAL alpha channel: crop from the RGBA source with PIL, never flatten
  (`.convert("RGB")` turns transparency into black boxes). A true-alpha PNG also works on the
  opaque version, so use one asset for both.

## Capture + encode

`capture.mjs` (this folder) drives system Chrome via **puppeteer-core**
(`npm i puppeteer-core` — a few MB, no Chromium download; executablePath
`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`). Alpha frames use
`page.screenshot({omitBackground:true})`. ~450 frames ≈ 1 min.

```bash
node capture.mjs <file.html> qa      qa-frames            # 10 spread stills for visual QA
node capture.mjs <file.html> full    frames   [--alpha]   # every frame at --fps (default 30)
node capture.mjs <file.html> short3s sframes  [--alpha]   # named remap from window.REMAPS
```

Encodes:
```bash
# social MP4 (opaque)
ffmpeg -y -framerate 30 -i frames/f%04d.png -c:v libx264 -pix_fmt yuv420p -crf 17 -preset slow -movflags +faststart out.mp4
# overlay with alpha — ProRes 4444 (Premiere/FCP/DaVinci/CapCut desktop)
ffmpeg -y -framerate 30 -i aframes/f%04d.png -c:v prores_ks -profile:v 4444 -pix_fmt yuva444p10le -vendor apl0 out-alpha.mov
```
Verify alpha survived: `ffprobe … pix_fmt` should say `yuva…`; extract a frame and check
`alpha min/max = 0/255` with PIL. ProRes is big (~10MB/s) — that's normal.
QuickTime shows transparency as black; judge alpha only composited in an editor (or PIL over gray).

## Time-remap for short cuts (3s / 6s versions)

Never just speed up the video — re-time per phase with piecewise-linear anchors
`[[outMs, masterMs], …]` (monotone). Give readable beats (title, payoff) ~3× speed and
the mechanical middle (grid fills, counters) 5–7×; hard cuts = two anchors 1ms apart in master time.
Micro-animations (pops ~150ms) survive down to ~1 frame and still read as terminal snaps.
The 90-frame render takes seconds, so iterate on anchors freely.

## Workflow (in order)

1. Sample exact colors from the source frames with PIL (`getpixel`) — never eyeball hex values.
2. Crop logos/assets from source frames with PIL (bbox on non-bg pixels, keep RGBA).
3. Build a `*.template.html` with `__ASSET__` placeholders; a tiny Python step base64-injects
   data URIs and writes the final HTML. **Always `open(..., encoding="utf-8")` both ways and put
   `<meta charset="utf-8">` on line 1** — otherwise `·`/`€` become mojibake (`Â·`) that pixel fonts
   render as garbage.
4. QA loop: `qa` stills → Read the PNGs → fix → repeat. Check overflow (end-card strip wider than
   the stage), baked backgrounds, glyph coverage. Only then run `full`.
5. Publish the final HTML as an Artifact = shareable live preview (client can click-pause/scrub).
6. Render MP4 + alpha MOV; for alpha QA, composite a frame over mid-gray with PIL.

## Style notes that made "Company Signal" hit

- Personality: **machine precision** — stepped snaps, `cubic-bezier(0.2,0,0,1)`-style hard ease
  (`1-Math.pow(1-p,3.2)`), 1-frame blackout before a tile fills, scramble digits that resolve
  as progress completes ("0---" → "1--K" → "€500K"), hard offset box-shadows that pop in 60ms late.
- Accelerating cadence for repeated fills: `t_i = start + span * Math.sqrt(i/N)` — first items land
  one by one, then rapid fire. Momentum > uniform stagger.
- Fonts: Google Fonts only (artifact CSP): `Space Mono` for labels, `Silkscreen` for pixel counters
  (fallback chain — Silkscreen misses some glyphs; use `-` not `·` for unresolved digits).
- Payoff = swap the working color for the accent (blue → orange) on the LAST unit + micro-shake
  (±4px sine, 240ms) + slam-in status bar with fast type-on.
