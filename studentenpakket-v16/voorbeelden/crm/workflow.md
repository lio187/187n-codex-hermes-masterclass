# Intake naar CRM · voorbeeldmapping

Event: demo-001. event_id → unieke uitvoeringssleutel; bedrijf → accountnaam; vraag → aanvraagtekst; eigenaar → intake; status → nieuw. Ontbrekende vraag geeft aanvullen. Dezelfde event_id maakt geen tweede record.

Lokaal: open builds/studio/index.html#crm. Verwerk demo-001 twee keer; er blijft één record. Verwerk demo-002; status aanvullen. Stop invoer; nieuwe verwerking geeft GESTOPT. Exporteer oefendata, wis alleen demo-opslag en herstel de eigen export.

Live: wijs de velden aan in het geautoriseerde CRM-testaccount. Gebruik dezelfde events en controleer ook serverfouten, dubbele afleveringen en rechten. Bewaar log, eigenaar, retry-grens en handmatige herstelroute. Opvolgberichten blijven concept totdat de afgesproken verzending expliciet is geautoriseerd.
