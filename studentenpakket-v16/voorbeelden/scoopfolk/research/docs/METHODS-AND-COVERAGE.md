# Methods and coverage

Research captured September 20, 2026. Scope approved by the user: US subscription supplement opportunities, broad category search, lean one-product launch, three recommended concepts. “MMR” was clarified to recurring revenue / MRR.

## Actual coverage

| Workstream | Completed | Limit |
|---|---:|---|
| Brand landscape | 30 brands | DTC-capable, not necessarily DTC-only; not a census |
| Deeper offer comparisons | 12 in report | Dynamic selectors and renewal ambiguities explicitly retained |
| Ad archive | 200 records, 20 each from 10 brands | Secondary Motion archive, not live Meta extraction |
| Visual review | 10 static creatives, one per archive brand | Other records text-reviewed; videos not watched |
| Reddit discovery | 355 unique candidate thread URLs | Candidates include irrelevant results; not 355 reviewed discussions |
| Selected discussion review | 60 indexed contexts across 26 communities | Not complete comment trees, verified customers, or US-only respondents |
| Additional forums | HardwareZone, Mumsnet and Slowtwitch discovery | Contextual search results only; excluded from the 60 and demand counts |
| Verified live Meta records | 0 | No live status, US delivery, start dates or Meta IDs established |

## Access and provenance

Direct Meta access failed. The local browser runtime reported no available browser. Cloud-browser searches for Hilma's advertiser and an LMNT keyword returned error/blank results. A public advertiser match for Hilma was visible, but no individual ads were captured. The cloud result is saved in `sources/meta-access-attempt.json`.

Public Motion brand HTML was retrieved with a local standard-library script. It produced 20 archive records per selected brand and retained the original page, retrieval timestamp and media URL. Archive record keys are locally generated identifiers, **not Meta ad IDs**. The secondary archive's “active” label remains in the CSV as reported, with a separate false verification field. Archive age and country were not independently established.

Archive text includes automated summaries and errors. One Seed record literally contains an unusable summary; a BelliWelli summary misnames the brand. Beam's sample focuses mostly on Glow/Biotic rather than Dream. Huel's sample largely concerns non-US meal replacements. AG1's visually inspected record explicitly addresses Australia. Historical promotions and product variants can differ from today's official pages. These records are preserved for audit, with flags, rather than silently repaired into primary evidence.

Ten static images were downloaded and inspected: BelliWelli position 3, LMNT 9, Create 4, Gruns 8, Beam 4, Momentous 3, Seed 1, Ritual 2, AG1 1 and Huel 1. Images are in `sources/ad-spots/`. No claim is made to have watched the 200 creatives or verified their performance. Assets remain their owners' property; links are provided for research, not reuse rights.

## Customer evidence selection

Queries combined brand names and categories with cost, taste, tolerance, subscription, cancellation, effectiveness and routine questions. Selected contexts deliberately include positive and negative accounts and span fiber, creatine, hydration, sleep, greens, longevity and protein. Sampling is uneven: fiber, creatine and hydration received more attention because they emerged as stronger lean-launch candidates. This limits comparisons with less-sampled categories.

The selected set contains 16 fiber, 10 creatine, 12 hydration, 8 sleep, 9 greens, 4 longevity and 1 protein discussion. It includes educational discussions, not only personal reviews. Indexed context may start with a comment rather than the original post. `first_visible_date` is therefore not represented as a verified publication date. Historical discussions support persistence of a problem, not current brand behavior.

Repeated promotional-looking Beam cross-posts were not treated as independent testimonials. Bot reminders, referral replies and unsupported medical advice were excluded from factual conclusions. This filtering cannot establish that all remaining posts are organic. No demographic, identity, purchase or location verification was performed. Usernames and personal contact details are not exported.

Negative reports are allegations or experiences, not verified causal findings or incident rates. Counterexamples are retained where available. Medical-community discussions inform objections and vocabulary; they are not evidence of efficacy or a license to advertise disease treatment.

## Source hierarchy

1. Official product and terms pages for displayed offers, formulations and brand claims. These establish what a brand says, not independent efficacy or certification verification.
2. Clinical papers and regulator guidance for narrow evidence and claim constraints. Some full-text pages blocked access; conclusions rely on accessible abstracts or indexed primary-source content, not an asserted full systematic review.
3. Secondary ad archive for creative discovery; ten image spot-checks provide direct visual evidence only for those assets.
4. Reddit and forum contexts for qualitative language and objections, not market sizing or prevalence.

Prices were not checkout-tested. Promotional, one-time and recurring prices are distinguished; unknowns stay unknown. No revenue estimates, private MRR, subscriber counts, spend, CAC, ROAS or churn figures were verified. No claim of exhaustive coverage of all forums or all ads is made.

## Reproducibility and deliverables

`work/collect_archives.py` contains the initial eight-brand scraper; AG1 and Huel were subsequently collected with the same function and added to the manifest. Re-running the script's original entry point would replace the combined manifest with eight brands, so preserve the current source snapshot. `work/review_threads.py` records selection. `work/build_exports.py` generates the compact research tables from saved sources and editorial notes.

Raw snapshots are retained locally in `sources/` and selected indexed material in `work/`. The review package exports short original findings and links rather than reproducing entire third-party descriptions. The report and briefs contain recommendations; the CSV and JSON files separate factual source fields from interpretation and modeled economics.

No GitHub repository, package or skill was installed. No accounts were connected, private ad accounts accessed, purchases made, suppliers contacted, ads launched or messages sent. The dashboard is a local standalone file with no external scripts, analytics or fonts; external evidence opens only when a user selects a link.
