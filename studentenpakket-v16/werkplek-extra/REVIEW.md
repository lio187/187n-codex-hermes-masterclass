# SkillSpector + bronreview

De oorspronkelijke scan is uitgevoerd zonder LLM-API-sleutels en met fail-on-incomplete. Uitvoering geslaagd, analyse 96,9% compleet. Het oorspronkelijke risicoresultaat is CRITICAL / DO_NOT_INSTALL (hoogste individuele bevinding HIGH). Dat resultaat is niet verborgen of vervangen door een baseline.

Na bronreview zijn de HIGH-meldingen over “clear state”, “Output rules” en “Do not delete state” verklaarde false positives. De conversie/cleanup-opdracht in design-kit is een begrensde functie, maar krijgt CAUTION: behoud input en gebruik gecontroleerde projectpaden. CLI-publish en externe code-installatie blijven afzonderlijke handelingen.

Drie skills zijn SOURCE_ONLY: 21st-registry, design-brief en motion-design-bank. Vier bestanden vielen buiten de parsergrens of hadden niet volledig beoordeelbare lockfile-inhoud. Ze zijn volledig bewaard als bron, maar niet vrijgegeven voor installeren/laden. Er is niets geïnstalleerd of uitgevoerd.

Bronreview omvatte de aangegeven regels, CLI/netwerkbestemmingen (21st, Mobbin, Firecrawl/Apify en publieke referencebronnen), publicatiegedrag en de meegeleverde capture.mjs. Dat script opent een expliciet HTML-pad in Chrome en schrijft frames; het vereist aparte dependencyreview en uitvoering binnen een gecontroleerde media-opdracht. Geen private auth/config/sessies zijn geëxporteerd.

Lokale snapshots hebben bron- en exporthashes. Een volledige upstream commit ontbreekt voor meerdere geïmporteerde skills; die is niet verzonnen. Een toekomstige GitHub-update of installatie vereist de exacte repository en commit en een nieuwe scan. De scan is geen volledige dependency-, binary- of runtime-audit.

## Bevindingen per locatie

- design-skills/design-kit/SKILL.md:59 · TM2 (HIGH): CAUTION: documented conversion of a downloaded WebP to PNG followed by deletion of that same WebP; not an arbitrary delete. Keep original input, use project-local paths, do not run pasted shell chains.
- design-skills/motion-design-bank/SKILL.md:116 · MP3 (HIGH): False positive after source review: clear state describes visible UI transitions, or the profile explicitly forbids deleting runtime state without approval.
- design-skills/motion-design-bank/director/motion-personality.md:41 · MP3 (HIGH): False positive after source review: clear state describes visible UI transitions, or the profile explicitly forbids deleting runtime state without approval.
- design-skills/reference-design-contract/SKILL.md:82 · P6 (HIGH): False positive: Output rules is a heading for public design deliverables, not extraction of hidden prompts.
- hermes-praktijkprofielen/ops-watch/SOUL.md:22 · MP3 (HIGH): False positive after source review: clear state describes visible UI transitions, or the profile explicitly forbids deleting runtime state without approval.
- HERKOMST.json:69 · AS3 (MEDIUM): False positive: explicit export inventory with hashes, not code enumerating private skills.
- HERKOMST.json:87 · AS3 (MEDIUM): False positive: explicit export inventory with hashes, not code enumerating private skills.
- HERKOMST.json:96 · AS3 (MEDIUM): False positive: explicit export inventory with hashes, not code enumerating private skills.
- HERKOMST.json:105 · AS3 (MEDIUM): False positive: explicit export inventory with hashes, not code enumerating private skills.
- HERKOMST.json:114 · AS3 (MEDIUM): False positive: explicit export inventory with hashes, not code enumerating private skills.
- HERKOMST.json:150 · AS3 (MEDIUM): False positive: explicit export inventory with hashes, not code enumerating private skills.
- HERKOMST.json:159 · AS3 (MEDIUM): False positive: explicit export inventory with hashes, not code enumerating private skills.
- HERKOMST.json:168 · AS3 (MEDIUM): False positive: explicit export inventory with hashes, not code enumerating private skills.
- HERKOMST.json:186 · AS3 (MEDIUM): False positive: explicit export inventory with hashes, not code enumerating private skills.
- HERKOMST.json:195 · AS3 (MEDIUM): False positive: explicit export inventory with hashes, not code enumerating private skills.
- HERKOMST.json:213 · AS3 (MEDIUM): False positive: explicit export inventory with hashes, not code enumerating private skills.
- HERKOMST.json:240 · AS3 (MEDIUM): False positive: explicit export inventory with hashes, not code enumerating private skills.
- HERKOMST.json:258 · AS3 (MEDIUM): False positive: explicit export inventory with hashes, not code enumerating private skills.
- HERKOMST.json:267 · AS3 (MEDIUM): False positive: explicit export inventory with hashes, not code enumerating private skills.
- HERKOMST.json:276 · AS3 (MEDIUM): False positive: explicit export inventory with hashes, not code enumerating private skills.
- HERKOMST.json:474 · AS3 (MEDIUM): False positive: explicit export inventory with hashes, not code enumerating private skills.
- HERKOMST.json:492 · AS3 (MEDIUM): False positive: explicit export inventory with hashes, not code enumerating private skills.
- design-skills/21st-cli-use/SKILL.md:17 · RA2 (MEDIUM): CAUTION: legitimate 21st registry/CLI workflow can fetch code and publish. Each target dependency requires pinned source review; publication requires explicit scope. Do not automatically execute npx/latest examples.
- design-skills/21st-cli-use/SKILL.md:90 · RP1 (MEDIUM): CAUTION: legitimate 21st registry/CLI workflow can fetch code and publish. Each target dependency requires pinned source review; publication requires explicit scope. Do not automatically execute npx/latest examples.
- design-skills/21st-registry/SKILL.md:119 · P9 (MEDIUM): False positive: spaces align a Markdown CLI options table; no hidden instructions.
- design-skills/21st-registry/SKILL.md:122 · P9 (MEDIUM): False positive: spaces align a Markdown CLI options table; no hidden instructions.
- design-skills/21st-registry/SKILL.md:126 · P9 (MEDIUM): False positive: spaces align a Markdown CLI options table; no hidden instructions.
- design-skills/21st-registry/SKILL.md:127 · P9 (MEDIUM): False positive: spaces align a Markdown CLI options table; no hidden instructions.
- design-skills/21st-registry/SKILL.md:129 · P9 (MEDIUM): False positive: spaces align a Markdown CLI options table; no hidden instructions.
- design-skills/reference-design-contract/references/checklist.md:18 · EA2 (MEDIUM): False positive: complete design handoff avoids redundant questions; it grants no external-action authority.
- design-skills/motion-design-bank/pipelines/package.json:14 · SC1 (LOW): SOURCE_ONLY: puppeteer-core dependency range and runtime are not installed or approved here.
- hermes-praktijkprofielen/hermes-exec/SOUL.md:14 · EA3 (LOW): False positive: instruction says Do not broaden scope.

## Hercontrole van de actieve subset

De exact geëxporteerde 21 actieve designsnapshots en 50 portable profielen zijn apart opnieuw gescand: 100% deterministische dekking. De zeven meldingen vallen onder de bovenstaande locatiegebonden verklaringen (drie HIGH: begrensde beeldconversie, openbare outputregels en een verbod op state verwijderen). Eindoordeel CAUTION voor de lokale snapshots met genoemde grenzen; geen vrijgave van onbekende externe dependencies. De drie SOURCE_ONLY-skills blijven buiten deze hercontrole en blijven geblokkeerd voor laden/installeren.
