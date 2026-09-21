# Van storefront naar Shopify-theme

Gebruik de goedgekeurde eigen storefront en bevestigde productgegevens. Werk in een ontwikkelwinkel of ongepubliceerd theme. Dit werkboek levert een bouwopdracht, geen reeds opgeleverde live winkel.

1. Inventariseer componenten, assets, content en interacties. Leg per onderdeel de Liquid-bestemming vast.
2. Maak layout/theme.liquid, sections voor hero/productverhaal/FAQ en snippets voor herhaalde UI. Breng CSS/JS en eigen beelden onder in assets.
3. Maak templates/index.json en templates/product.json met de gekozen sections. Geef aanpasbare copy en media section schema-instellingen; gebruik blocks voor herhaling.
4. Vervang hardcoded producttitel, prijs, media en variantkeuze door de passende Shopify-objecten. Render bestaande relevante metafields; beschrijf eerst welke je nodig hebt.
5. Verbind productform en winkelmand. Een selling plan wordt alleen meegestuurd bij een daadwerkelijk geconfigureerd abonnement; test losse koop apart.
6. Gebruik de geïnstalleerde en beoordeelde Shopify CLI-route voor theme check en een development-preview. Gebruik geen live theme als proefomgeving. Nieuwe dependencies volgen de reviewregels.
7. Vergelijk desktop/mobiel met de ontwerpversie. Test theme-editorwijzigingen en twee verschillende producten. Geen algemene loginoplossing in de checkout bouwen: de checkout is Shopify-functionaliteit.
8. Doe de ondersteunde ordertest uit ecom/SHOPIFY-WERKBOEK.md. Voor abonnementen controleer je ook het contract. Bereid daarna de publicatie en herstelroute voor; publiceer alleen op concrete opdracht.

## Opnamevolgorde

Toon eerst het ontworpen storefront, dan de componentmapping, daarna de Shopify-preview. Pas live een headline en beeld aan in de theme editor. Wissel van product. Sluit af met een proef van de aankooproute in de oefenwinkel.

Bronnen: [Architectuur](https://shopify.dev/docs/storefronts/themes/architecture), [JSON templates](https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates), [CLI](https://shopify.dev/docs/storefronts/themes/tools/cli).
