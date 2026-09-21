# Shopify · van merkbriefing tot gecontroleerde winkel

Demo-platform voor de volledige cursus: Shopify. Broncontrole: 20 september 2026. De stappen hieronder zijn opdrachten; een gelezen handleiding bewijst geen geslaagde accounttest. Leg waarnemingen vast in `ecom/bewijs.json`.

## 1. Je oefenwinkel klaarzetten

Open je eigen Shopify admin via https://admin.shopify.com/. Controleer winkelnaam, domein, valuta, tijdzone, plan en rechten. Gebruik een aparte oefenwinkel voor betaal- en fouttests. Bekijk de actuele kosten via https://www.shopify.com/pricing en de app-pagina’s; leg plan, apps, betaalverwerking en eventuele gebruikskosten apart vast. Een Shopify-account geeft de cursusagent niet vanzelf toegang.

Werk in Shopify admin. Sidekick helpt met voorstellen en ondersteunde acties; Codex en Hermes bereiden de briefing en controles voor. Controleer de voorgestelde wijzigingen voordat je ze toepast. Ontbreekt een actie in Sidekick, voer de afgesproken stap in de admin uit. Verzin geen werkende connector. Voor een API-integratie zijn afzonderlijk geverifieerde toegang en rechten nodig.

## 2. Producten en theme

Lees `context/merkdossier.md`, `context/DESIGN.md`, `context/merkstem.md` en `case/producten.csv`. Ontbrekende productdata blijft open. Gebruik voor een technische demo uitsluitend expliciet gelabelde fictieve data.

Maak een ongepubliceerde theme-kopie voor de paginaopbouw en houd oefenproducten in concept zolang ze niet voor de afgeschermde checkoutproef nodig zijn. Een theme-preview schermt wijzigingen aan gedeelde productdata niet af. Controleer daarom iedere productwijziging ook in de admin.

Geef Sidekick één afgebakende opdracht: maak op basis van de opgegeven velden een producttekst en toon de voorgestelde wijziging. Vergelijk SKU, prijs, valuta, voorraad, afbeeldingen en leveringsinformatie met de bron. Verwijder verzonnen claims en reviews. Controleer de pagina op desktop en mobiel en bewaar de eerste en gecorrigeerde preview.

## 3. Eerste levering en refills

Gebruik Shopify Subscriptions voor de abonnementsdemo. Controleer app-toegang, theme en betaalprovider vóór de opname. Richt de eenvoudige oefenroute in met een los eenmalig accessoireproduct en een apart refillproduct met abonnementsoptie. De eerste winkelmand bevat beide regels; het abonnement bevat uitsluitend de refill. Dit is een expliciete demo-inrichting, geen automatische wissel van starter-SKU naar refill-SKU.

Maak het plan voor de refill in Shopify Subscriptions en controleer bedrag en interval. Voeg de subscription-widget toe aan het geschikte producttemplate. Open de productpagina, winkelmand en checkout en lees telkens de eenmalige en terugkerende bedragen terug. Gebruik geen draft order of Shopify Bundles-product voor deze abonnementsroute: de Shopify Subscriptions-app ondersteunt die combinaties niet.

Als je merk één starterproduct met andere inhoud in vervolgcycli nodig heeft, werk je die configuratie eerst uit met een daarvoor passende, beoordeelde app. De basisdemo bewijst die uitgebreidere route niet.

## 4. Testbetaling en ordercontrole

Gebruik voor abonnementsorders Shopify Payments in testmodus in de oefenwinkel. De algemene Shopify Test payment gateway ondersteunt geen abonnementen. Controleer de actuele testgegevens in de officiële betaalhandleiding; gebruik geen echte kaartgegevens voor de proef. Is Shopify Payments niet beschikbaar in jouw regio of account, leg die blokkade vast en controleer een ondersteunde testaanpak voordat je doorgaat.

Controleer succes en afwijzing. Vergelijk het checkouttotaal met de opgeslagen testorder en het subscriptioncontract. Bewaar order-ID, contract-ID, volgende datum en bedrag zonder persoonsgegevens. Controleer een vervolgbestelling afzonderlijk: accessoires horen niet opnieuw mee te komen. Bij een onbekende betaaluitkomst lees je eerst de status terug voordat je opnieuw probeert.

Een wijziging in betaalinstellingen heeft effect op de winkel. Zet een productiewinkel niet voor de cursus in testmodus. Houd order, betaling, fulfillment, verzending en refund apart in je controle.

## 5. Abonnement beheren

Open het testcontract en controleer pauzeren, hervatten, overslaan en opzeggen in de beschikbare beheerroute. Noteer de toestand en volgende datum vóór en na iedere handeling. Controleer de klantaccountpagina en de beheerlink met een eigen testklant. Een refund en het beëindigen van een abonnement zijn afzonderlijke controles.

Bekijk de ingestelde afhandeling van mislukte betalingen. Laat geen agent een tweede retryproces starten naast de app. Probeer maandgrens, gewijzigde prijs en voorraadtekort als afzonderlijke scenario’s. Ongeteste handelingen blijven `NIET_UITGEVOERD`.

## 6. E-mail en automations

Gebruik Shopify Messaging voor marketingautomations, Shopify Flow voor een beschikbare maatwerkworkflow, Shopify-meldingen voor orderberichten en Shopify Subscriptions voor abonnementsmeldingen. Open `ecom/FLOW-MATRIX.csv` voordat je een flow toevoegt. Controleer bestaande actieve berichten om dubbele verzending te voorkomen.

De vier lesflows zijn marketingwelkom, verlaten checkout, refill en win-back. Een marketinginschrijving, accountaanmaak en aankoop zijn verschillende gebeurtenissen. Controleer de werkelijke trigger, toestemming, wachttijd, uitsluitingen en stopconditie. Een refillbericht gebruikt een bevestigde volgende abonnementsdatum. Ontbreekt de benodigde gebeurtenis, lever dan een voorbereid flowplan op.

Bekijk in Shopify Messaging de beschikbare templates. Test inhoud op je eigen adres. Test in Shopify Flow de condities met passende events; een workflowtest voert geen echte mailactie uit. Controleer een ontvangen mail afzonderlijk. Test ook een aankoop tijdens de wachttijd, afmelding en een herhaald event. Laat verzending uit totdat de concrete test of activatie is opgedragen.

## 7. Support en voorraad

Gebruik `case/support-tickets.json`. Laat de Customer Service-agent een antwoordconcept maken op basis van de juiste Shopify-testorder. Shopify Inbox kan een gesprek ondersteunen als die app beschikbaar en ingericht is; deze cursus claimt geen automatisch aangesloten autonome supportbot.

Controleer klantidentiteit, orderstatus en tracking. Ontbrekende tracking levert een vervolgstap op, geen verzonnen bezorgdatum. Een vraag over medicatie gaat naar een bevoegde persoon. Controleer voorraad per variant en locatie. Een waarschuwing is geen inkoopopdracht. Test met twee eigen accounts dat ordergegevens afgeschermd blijven.

## 8. Analytics en A/B-tests

Vergelijk Shopify Analytics met de orderbron en `ecom/METRICS.md`. Houd testorders en echte omzet gescheiden. Bereken MRR uit abonnementen volgens een vastgelegde definitie. Onbekende kosten blijven onbekend.

Voor de testles gebruiken we Shopify Rollouts via Markets > Rollouts. Rollouts vraagt Basic of hoger; experimenten vragen Grow of hoger. Controleer rechten en theme-compatibiliteit. De beschreven route ondersteunt geen vintage themes of headless checkout; Liquid-templatewijzigingen vallen buiten Rollouts.

Kies één tekstvariant, een controleversie en een beschikbare meetwaarde. Leg markt, bereik, verdeling en looptijd vooraf vast. Het totale bereik en de verdeling binnen dat bereik zijn twee instellingen. Bewaar een draft en controleer de eindactie. Voor de oefening kies je terugdraaien; direct publiceren of permanent toepassen heeft andere herstelgevolgen. Start alleen een opgedragen experiment in de juiste winkel.

Bekijk daarna de meetwaarden die Shopify voor dat experiment biedt. Een preview of simulatie is geen conversietest. Zonder voldoende echte gegevens rapporteer je geen winnaar. Bevestig apart dat de pagina na afloop weer de bedoelde versie toont; een theme-herstel draait orders of productwijzigingen niet terug.

## 9. Controle voor oplevering

Loop `ecom/TESTMATRIX.csv` door. Vul per controle de werkelijke status en het bewijs in. Het Scoopfolk-concept is geen vrijgegeven supplement: samenstelling, claims en verkoopvoorwaarden vragen hun eigen review vóór echte verkoop. Bewaar brondata en testresultaten bij de juiste opdracht.

## Primaire bronnen

- [Sidekick](https://help.shopify.com/en/manual/ai-powered-tools/sidekick)
- [Shopify Subscriptions inrichten](https://help.shopify.com/en/manual/products/purchase-options/subscriptions/shopify-subscriptions/setup)
- [Subscription-beperkingen](https://help.shopify.com/en/manual/products/purchase-options/subscriptions/shopify-subscriptions/considerations)
- [Betaalprovider in testmodus](https://help.shopify.com/en/manual/checkout-settings/test-orders/payments-test-mode)
- [Marketingautomations](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/shopify-messaging/marketing-automations/create)
- [Shopify Flow testen](https://help.shopify.com/en/manual/shopify-flow/manage/test-workflow)
- [Rollouts](https://help.shopify.com/en/manual/markets/rollouts)
- [Rollouts-vereisten](https://help.shopify.com/en/manual/markets/rollouts/requirements-and-considerations)
- [Rollout maken](https://help.shopify.com/en/manual/markets/rollouts/create-a-rollout)
- [Rollout-analytics](https://help.shopify.com/en/manual/markets/rollouts/analytics)
