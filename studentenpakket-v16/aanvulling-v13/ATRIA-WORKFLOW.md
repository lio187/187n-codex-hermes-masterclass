# Atria: van concurrenten naar eigen advertentie

Verbind via https://api.tryatria.com/mcp met OAuth / StreamableHTTP. Houd credentials buiten de opname. Documentatie: https://docs.tryatria.com/docs/mcp-quickstart

Op 21 september 2026 was deze account-run geblokkeerd: eenmalige allowance uitgeput. Er zijn voor dit pakket geen concurrentadvertenties opgehaald.

Input: concurrenten.csv en productbrief.md. Vul echte domeinen en productfeiten in. Output: ads/competitor-research/.

1. Lees concurrenten.csv en bevestig per domein met resolve_advertiser de juiste prefixed advertiser_id en pagina. Vraag bij twijfel om een keuze.
2. Gebruik search_library_ads per advertiser, scope advertiser, collapse_variants true, page_size 5 en order newest. Maak een recente set met launched_after/ launched_before voor de expliciet gekozen 30 dagen; maak apart een set status active, min_days_running 30 zonder launchfilter. Ontdubbel op ad_id. Pagineer alleen binnen het afgesproken maximum.
3. Lees get_library_ad voor de geselecteerde ID’s. Lees bestaande tekst via get_library_ad_transcript; geen betaalde transcribe_library_ad zonder budgetautorisatie. get_library_ad_creative_tags ondersteunt maximaal 20 ID’s; tags zijn geen bewijs van visuele inspectie.
4. Bewaar ads.csv met bronlinks, datums, set en ontbrekende velden. Maak gallery.html van werkelijk beschikbare creatives, anders een bronlink met status. Schrijf patterns.md met waarneming versus hypothese; looptijd en impression rank bewijzen geen ROAS.
5. Maak angles.md met drie eigen angles gekoppeld aan bron-ID’s en eigen productfeiten. Kies één productiebrief met hook, shots, copy en controlepunten. Geen boards, follows of gedeelde notities aanpassen.
6. Bij planlimiet: stop de API-run en noteer BLOCKED. Gebruik uitsluitend een duidelijk gelabelde bestaande export of oefenset; presenteer geen verzonnen ads als opgehaald.

Controle: open drie bronlinks, controleer advertiser-match, controleer dat beide sets correct gelabeld zijn en dat iedere angle naar echte input verwijst. Oefening: laat één transcript ontbreken en controleer dat de workflow dit zichtbaar meldt.
