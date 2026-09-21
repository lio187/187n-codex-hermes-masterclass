# Je eigen merkdata
De lege CSV’s en ticketlijst zijn invoercontracten. Vul ze samen met de betreffende agent vanuit eigen geautoriseerde bronnen. Leeg betekent ontbrekende input, niet nul omzet of geen supportvragen.

orders.csv: één rij per unieke order, bedrag en productkosten in EUR; status betaald, terugbetaald of open. Deze eenvoudige lesvorm ondersteunt volledige refunds. Voor gedeeltelijke refunds, belastingen, fees, andere valuta of meerdere regels per order maak je eerst een expliciete mapping.
abonnementen.csv: één rij per periode met start, nieuw, opgezegd, eindstand en uniforme maandprijs. Andere intervallen, pauzes, cohortleden of meerdere prijzen vereisen een uitgebreidere bronexport en berekening.

Technische testdata staat uitsluitend onder tests/fixtures/. Gebruik die nooit als merkdata, echte omzet, live order of opnamebewijs. De 187N-portal- en leadvoorbeelden zijn afzonderlijk gelabelde oefeningen.
