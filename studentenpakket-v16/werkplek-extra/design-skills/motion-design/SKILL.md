---
name: motion-design
description: Motion design creation skill for Higgsfield. Trigger this skill whenever the user asks to create motion design, animate a logo, make a video from an image, create an animated ad, turn a product into motion, or says anything like "make a motion", "motion design", "animate this", "make a video from my logo", "animated brand", "motion graphics", "brand motion", "kinetic graphics", "promo video", "ad video". Always use this skill — don't try to handle motion design requests without it.
metadata:
---

# Motion Design Skill

Guide the user through producing an on-brand, VO-synced vertical motion reel: Higgsfield for stills + clips, local **ffmpeg** for the edit. This is the refined 187N workflow (built across multiple real reels). Be concise, act, and keep the user in the loop at the cheap gates (stills review, cost). Speak the user's language.

---

## ⛔ STEP 0 — ALWAYS ASK FIRST: STYLE + BRAND (every single run, no exceptions)

**Before anything else, every time this skill runs, ask the user two things** (one `AskUserQuestion` with both, or a direct question). **Never assume them from a previous run or from memory — ask again every time.**

1. **Which brand?** → so the palette, fonts and logo are pulled from a real source.
   - **187N** = coral `#FF6301` · cream `#F6F6F5` · kraft tan `#E0BE94` · near-black `#1C1C1C` + **one cobalt-blue accent** (≤4 colors on screen). Logo = the glossy 3D infinity `∞` mark + "187N". Canonical brand book: `~/Documents/187N/`. Logo assets: `~/Documents/187N/EXTRA RESEARCH/assets/logo.png`.
   - Any other brand → locate/confirm its palette + logo from a **live/canonical source** (brand book, live site CSS), never a stale mockup.
2. **Which style?** → e.g. **paper-cut découpage collage** (the proven 187N look: torn-edge cardstock, real drop shadows, halftone cutouts, Terry Gilliam × Saul Bass × Bauhaus, ≤4 colors/scene), or another aesthetic. Ask for a reference screenshot if they have one (treat it as style-only unless they say otherwise).

Lock the answers, then proceed.

---

## STEP 1 — Script + VO-first

**If the user has a voice-over, get the VO file FIRST — it drives the entire edit.**
- Duration + sentence pauses: `ffmpeg -i "<VO>" -af silencedetect=noise=-30dB:d=0.30 -f null -`.
- Break the script into **~14–16 short, fast-paced scenes** (~3–6s each), each landing on a sentence/pause. Fast paced beats few long scenes.
- If no VO: ask for the script/message; break into scenes; target ~60s.
- Map each scene → a visual concept (in the chosen style + brand palette) + a **short burned-in caption** (2–4 words).
- Present the scene breakdown for a quick OK before generating.

## STEP 2 — Stills (these ARE the storyboard)

- One still per scene with **`gpt_image_2`** (the real model id — `gpt-image-2-pro` does NOT exist; `models_explore` to confirm), **9:16, resolution `2k`, quality `high`**.
- Prompt = style block + brand palette + "Big bold crisp cut-out caption: <CAPTION>". For the logo-lock scene, pass the brand logo as a reference (`media_upload` → `curl -X PUT` the bytes → `media_confirm`).
- **Image jobs cap at 8 concurrent** → fire in batches of 8.
- Download to `~/Ai Workspace/<brand-dir>/<reel-name>/01-stills/`, build a contact sheet (ffmpeg tile/hstack/vstack), Read it, show the user. Regenerate any dud before animating.

## STEP 3 — Clips

- Animate each still with **`seedance_2_0`**, **`mode:"fast"`, `resolution:"720p"`, `generate_audio:true`** (native SFX baked in), `aspect_ratio:"9:16"`, ~6s.
  - Billing is ~per-second: fast/720p ≈ 4.5 cr/s is the cheap path; std/1080p ≈ 9 cr/s.
- **Video jobs cap at 4 concurrent** → render in waves of 4 (poll `job_status` sync → download → next wave).
- Per-clip prompt: the motion + "the art style, palette and the <CAPTION> caption stay perfectly static and crisp frame to frame, paper never melts or warps."
- **Gotchas (handle inline, don't stall):**
  - **Preset-matcher**: a prompt may return a `preset_recommendation` instead of generating → retry with `declined_preset_id`, or reword plainly (avoid "dream", "dark", evocative bait).
  - **NSFW false-positives** on innocuous scenes (a pile of paper, a tired figure) → reword neutrally + regenerate.
  - **Higgsfield web "unlimited" does NOT apply through the MCP** — every MCP generation charges workspace credits regardless; reconnecting doesn't fix it. If out of credits: top up (4000-pack), or generate on higgsfield.ai itself. Fast/720p is the cheapest MCP path.
- Download clips to `02-clips/` named `clip-NN-<scene>.mp4`.

## STEP 4 — Stitch locally (ffmpeg)

- Per scene: cut to its VO slot — **trim** if slot ≤ clip length, **slow-stretch** (video `setpts`, audio `atempo`) if longer. Normalize each to 1080×1920 / 30fps.
- **Hard cuts** for tight VO-sync (snappy, fast-paced). Concat the normalized segments.
- Audio mix: user's **VO = main track** (full); the clips' **native audio = low SFX bed (~-15 dB)**; **fade the body audio out ~0.5s into the outro** so nothing hard-cuts (this matters — a hard audio cut at the outro is jarring).
- **Outro:** append the brand logo-lock clip (~4.5s, extend to fit any brand-voice) with the **brand outro-voice** over it (faded in). 187N assets to reuse: logo-lock clip `~/Ai Workspace/187n/agentic-loop-reel/02-clips/clip-8-187n-lock.mp4`; 187N brand-voice `~/ElevenLabs_2026-06-06T19_00_42_187N Voice_*.mp3`.
- A python stitch script (`stitch_vo.py`) is the reusable engine — adapt the `scenes` list `(clip_file, VO-slot seconds)` per reel; ⚠️ verify exact input filenames (VO names vary, e.g. spXXX) before running.

## STEP 5 — Deliver + iterate

- Verify before showing: ffprobe duration; a frame-grid of every scene (Read it); audio `volumedetect`. (Note: I can't hear audio — the user judges the mix.)
- `open` the master + `open` the project folder.
- Deliver **silent of music** (VO + SFX only) so the user lays their own music.
- Offer iterations: VO/SFX balance, outro fade length, transitions, re-roll a scene, longer outro.
- On request: write a social **caption with a keyword CTA** (e.g. "Comment **OPERATOR** and I'll DM you the playbook") + hashtags, and put it on the clipboard with `pbcopy`.
- Lock the final as `<reel-name>-FINAL.mp4`.

---

## Notes & conventions
- Workspace: `~/Ai Workspace/<brand-dir>/<reel-name>/` → `01-stills/ · 02-clips/ · 03-master/`.
- Use background `sleep` + poll loops to wait on renders without spamming status.
- 187N builds = max effort: spend freely, max quality (screen-recorded for the course).
- This refined workflow supersedes the original generic Higgsfield storyboard-sheet flow.
