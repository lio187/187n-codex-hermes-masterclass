# Definities en broncontrole

Leg periode, valuta, orderstatus en meetdefinitie vast vóór berekenen.
- Bruto-orderbedrag: som van bevestigde betaalde en volledig terugbetaalde orders; open orders tellen niet mee.
- Refunds: bevestigde volledige refunds. Bij gedeeltelijke refunds is het eenvoudige lesschema onvoldoende.
- Netto na refunds: bruto minus refunds; geen claim over cash of nettowinst.
- Productbijdrage: netto na refunds minus de bekende productkosten. Benoem shipping, fees, fulfillment, retourkosten en acquisitiekosten die ontbreken.
- Eindstand abonnementen: start + nieuw - opgezegd in de eenvoudige lesvorm. Pauzes, heractivaties, migraties en gemengde prijzen vereisen extra velden.
- MRR: actieve eindstand maal uniforme maandprijs, uitsluitend voor dit schema. Geen eenmalige omzet of belasting. Normaliseer andere intervallen expliciet.
- Klantchurn: opzeggingen uit het begincohort / begincohort. Bij nul beginstand is de ratio niet beschikbaar; niet 0%.

Gebruik tools/metrics.py met gevalideerde eigen CSV’s. De tool stopt bij lege invoer, duplicaten, ontbrekende kosten, vreemde status, inconsistente eindstand of niet-ondersteunde data. Lees case/LEESMIJ.md voor het contract. Meer complexe data vraagt uitbreiding vóór een conclusie.
