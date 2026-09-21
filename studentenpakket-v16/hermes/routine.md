# Dagelijkse merkbrief

Eigenaar: cursus-orchestrator. Stel de routine pas in na een geslaagde handmatige opdracht.
Open Routines bij de Bot in Hermes Desktop. Kies dagelijks 08:00 in je eigen bevestigde tijdzone. Taak: lees de nieuwste gecontroleerde Operations- en Analyse-output uit het expliciet gekozen cursusproject en maak een dagbrief met bronperiode, voorraad/leveringsafwijkingen, metrics en drie concrete vervolgtaken. Ontbrekende of oudere brondata markeren als ontbrekend/verouderd. Niet zelfstandig publiceren, bestellen of berichten verzenden.

Geef de exacte projectmap en bronpaden mee. Bewaar outputs/routines/<datum>/<run-id>/dagbrief.md. De routine haalt niet automatisch winkeldata op: bronverversing is een afzonderlijke geteste opdracht. Controleer volgende uitvoering en tijdzone; houd de uitvoerende machine beschikbaar.

Test eerst via de native Run-actie, daarna met een werkelijk ingeplande eenmalige proef. Controleer log en bestand. Herstart de eigen cursusomgeving en controleer dat de routine nog correct is ingesteld. Stop/pauzeer via Routines en controleer dat geen nieuwe run start. Bij storing geen tweede uitvoering starten zolang de eerste uitkomst onbekend is.

Bewaar tijdstip, runtime-job-ID, inputversie en outputpad. Een configuratie is geen uitgevoerde run.
