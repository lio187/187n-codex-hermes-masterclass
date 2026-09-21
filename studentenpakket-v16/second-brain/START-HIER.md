# Jouw Second Brain

Open eerst het uitgepakte studentenpakket in Codex. Volg les N01 na de vroege Hermes-installatie.

1. Kopieer `second-brain/vault` naar `outputs/second-brain/mijn-vault` binnen je eigen pakket. Gebruik bij herhaling een nieuwe runmap; overschrijf geen eerdere kennis.
2. Open in Obsidian de bestaande map `outputs/second-brain/mijn-vault` als vault. Markdown-bestanden blijven ook zonder Obsidian leesbaar.
3. Open `INDEX.md`. Maak met `templates/project.md` één project voor je eigen brand en verwijs naar het echte buildpad. Zet lang bronmateriaal onder bronnen; zet de actuele projectkeuzes onder projecten; zet herbruikbare kennis onder kennis.
4. Geef Hermes het pad naar deze oefenvault en het lesbestand. Gebruik de meegeleverde `profiel/SOUL.md` als reviewed roltekst bij een apart cursusprofiel. Gebruik de huidige officiële profielinrichting; overschrijf nooit je eigen standaardprofiel.
5. Lees `WORKFLOWS.md`. Laat de Librarian eerst een innamevoorstel maken en daarna de toegewezen oefenvault bijwerken. Andere cursusagents lezen de kennis en leveren voorstellen aan de Librarian.
6. Controleer de bron achter een antwoord. Begin daarna een nieuw gesprek en vraag dezelfde actuele keuze terug.

## Wat je krijgt

Een draagbare roltekst op basis van Leons bestaande kennisbeheer, zes nieuwe procedures in `skills/`, templates en duidelijk fictieve testbronnen. Er zijn geen persoonlijke herinneringen, echte klantgesprekken of accountconfiguraties meegeleverd. Lees `HERKOMST.md` en `REVIEW.md`.

## Lokaal oefenen zonder modelverbinding

Het script `tools/brain.py` biedt expliciete broninname, exact zoeken op een kennissleutel en conflictregistratie. Het is een klein deterministisch oefenhulpmiddel, geen vervanging voor de Hermes-agent.

Vanuit de pakketroot:

```sh
python3 second-brain/tools/brain.py ingest --vault outputs/second-brain/proef --input second-brain/fixtures/inname.json
python3 second-brain/tools/brain.py query --vault outputs/second-brain/proef --project demo-brand --key bundelprijs
```

De opdracht leest alleen de opgegeven JSON-bronnen en schrijft in de opgegeven vault. Iedere bron blijft als eigen record bestaan. Een herhaalde inname met dezelfde bron-ID en inhoud voegt niets dubbel toe; gewijzigd materiaal met dezelfde ID wordt geweigerd. Gebruik een nieuwe bron-ID voor een echte nieuwe bronversie.

Officiële documentatie: [Hermes Desktop](https://hermes-agent.nousresearch.com/docs/user-guide/desktop), [profielen](https://hermes-agent.nousresearch.com/docs/user-guide/profiles), [Obsidian](https://help.obsidian.md/).
