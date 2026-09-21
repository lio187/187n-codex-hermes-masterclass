# Technische rekenproef
Geen merk- of klantdata. Vanuit de pakketroot:

`python3 -m unittest discover -s tests -v`

`python3 tools/metrics.py --orders tests/fixtures/orders.csv --subscriptions tests/fixtures/subscriptions.csv --data-kind test`

Verwacht: bruto 30, refunds 10, netto 20, bekende productkosten 6 en productbijdrage 14 vóór overige kosten. 12 actieve abonnementen, MRR 60, churn 0.1. Nul beginstand geeft geen percentage. Lege input, ontbrekende kosten, inconsistenties en duplicaten worden geweigerd. Deze proef valideert lokale rekenlogica, geen Shopify-account of draaiende Hermes-agent.
