# Installeren, laden en activeren

## Download eerst
Download de vastgezette cursusrelease als ZIP naar een nieuwe map. Pak uit in een eigen projectmap, bijvoorbeeld Documenten/AI-team-v8. Open nog geen installer. Controleer release-URL, volledige commit-SHA en SHA-256 uit het releaseoverzicht. Een branchnaam zoals main is geen vaste versie. De lokale auteursexport heeft nog geen publieke release-URL; publiceer pas na de releasecontrole.

## Scan en bronreview
Vraag je agent: 'Controleer deze download met NVIDIA SkillSpector en bronreview. Installeer of voer nog niets uit. Leg versie, scanrapport en conclusie vast buiten de download.'
Op Leons Mac is de gecontroleerde wrapper beschikbaar als `github-security-scan`; dit is geen standaardcommando op een nieuwe computer. De docent moet vóór les 0.3 een gecontroleerde scannerroute voor de opnamemachine klaarzetten en de bijbehorende Windows-route verifiëren. Zonder werkende volledige scan stop je vóór installatie. Alleen handmatig lezen vervangt die scan niet.

De wrapper-opdracht gebruikt een absoluut doelpad en een rapportpad buiten de repo:
`github-security-scan /absoluut/pad/naar/download --output /absoluut/pad/naar/rapport.json`
Op Windows gebruik je voor dezelfde POSIX-scanner de gecontroleerde WSL-omgeving. Vertaal je eigen pad met de WSL-bestandsstructuur; kopieer nooit het gebruikerspad van de docent.

Lees daarnaast alle installatiehooks, netwerkbestemmingen, credential-toegang en dependency-locks. HIGH/CRITICAL of een incomplete scan: exacte locaties onderzoeken; niet installeren zolang relevante bevindingen onverklaard zijn. Bewaar scan en motivatie bij elke CAUTION. Scan dezelfde bytes opnieuw na wijzigingen. Geen meegeleverde baseline gebruiken om risico te verbergen.

## Codex
Installeer de desktopapp van de officiële downloadpagina. Meld je zelf aan. Open de uitgepakte projectmap in Codex. Laat AGENTS.md lezen. Na goedgekeurde scan kopieer je alleen de gekozen skillmap naar de projectgebonden skillmap die jouw Codex-versie ondersteunt; controleer de documentatie en of de skill werkelijk zichtbaar is. Start een nieuwe chat en laat de geladen skill bij naam en bestand bevestigen. De aanwezigheid van een bestand alleen bewijst niet dat hij geladen is.

## Hermes
Download een vastgezette release van https://github.com/NousResearch/hermes-agent zonder installer uit te voeren. Leg volledige SHA vast, scan en review. Lees de installatie-instructie bij die exacte versie. Gebruik een eigen omgeving met lockbestand; voer geen curl-pipe-shell uit. Controleer installatie, modelverbinding, profiel, tools en skill afzonderlijk. Zie hermes/START.md.

Windows: desktop waar ondersteund, anders de in de officiële Hermes-documentatie beschreven WSL2-route voor de benodigde CLI/TUI. Bewaar Linux-projectbestanden in je Linux-home. Mac-sneltoets Cmd wordt op Windows doorgaans Ctrl; controleer menu en scherm. Record & Replay ontbreekt? Beschrijf stappen, voeg screenshots toe en geef feedback aan dezelfde skill.

## Activeren
Verbind ieder account afzonderlijk. Begin met één read-only test. Publicatie, mailverzending, winkelcheckout en routines staan niet automatisch aan. Leg per geplande taak tijdzone, eigenaar, budget, outputmap en stopknop vast. Verwijder testjobs na de demonstratie.
