# Van lokaal prototype naar betaalde tool

Lokaal aanwezig: briefingformulier, vaste veldcontrole, gerichte vragen en JSON-export.

Vóór een betaalde liveversie testen:
- Eigen hosting en domein, foutmonitoring en terugzetten van een versie.
- Login, uitloggen en herstel op twee testaccounts.
- Servertoegang: account A kan met gewijzigde request-ID nooit gegevens van B lezen of schrijven.
- Alleen noodzakelijke opslag; export en verwijderen volgens de afgesproken productwerking.
- Betaling in officiële testmodus; serververificatie van betaalstatus; geen toegang op basis van alleen browservelden.
- Dubbele en vertraagde betaal-events; mislukte betaling; opzegging; einde toegang volgens getoonde voorwaarden.
- Gebruikslimiet, supportcontact en bekende maandkosten.

Gebruik de actuele officiële documentatie van de gekozen providers uit de toolstack. Geen betaalprovider of login zit verstopt in deze lokale demo. Accounttests blijven open totdat echte testbewijzen beschikbaar zijn.
