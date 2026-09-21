# De echte Scoopfolk-bouwroute

Afgeleid van de bestaande Scoopfolk storefront en vastgelegde Shopify-deploymentwerkwijze. Deze export bevat geen winkelcredentials of automatische publicatie.

1. Gebruik de gekozen actuele brandkit en eigen productassets. Bewaar oudere identiteiten als historisch materiaal.
2. Bouw homepage en productpagina lokaal en beoordeel desktop en mobiel. Leg de goedgekeurde layout, spacing, typografie en interacties vast als reference.
3. Migreer naar een apart Shopify-theme: layout/theme.liquid, sections, snippets, assets en JSON templates. Homepage en verschillende producttypes behouden hun eigen templates.
4. Vervang demo-productdata en demo-cart door Shopify-producten, varianten, beschikbaarheid, selling plans en native cart/checkout. Voeg geen hardcoded winkel-ID’s uit een ander project toe.
5. Vergelijk echte Shopify-preview met het goedgekeurde ontwerp. Controleer editorinstellingen, navigatie, galerij, hoeveelheid, abonnement/losse koop en mobiele layout.
6. Maak aanbiedingregels ook in Shopify. Controleer combinaties, eerste/terugkerende bedragen, cadeaugeldigheid, dubbele cadeaus en opruimen wanneer het hoofdproduct verdwijnt.
7. Controleer alle routes samen vóór een concrete publicatieopdracht. Checkout-branding is een afzonderlijk oppervlak; een theme-ZIP bevat niet alle checkoutinstellingen.

Scoopfolk gebruikt voor nieuwe beeldgeneratie de gekozen Higgsfield-route; de daadwerkelijke accounttoegang en modelkeuze moeten bij de gebruiker zijn ingericht. Geen private API-key recovery of automatisch alternatief.
