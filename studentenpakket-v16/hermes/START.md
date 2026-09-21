> Shopify-update 8.2.0: dit zijn gewijzigde bronprofielen. Een eerdere installatie of scan van 8.1.0 geldt niet voor deze bytes. Scan en review vóór laden; de nieuwe versie is hier niet geïnstalleerd.

# Stel het hele team vroeg in

Volg de kijkvolgorde in lessen/VOLGORDE.md. Na het openen van je Codex-project volgen Hermes-installatie, profielen, eerste taak en skills. De specialistische lessen komen daarna.

1. Installeer de gecontroleerde officiële Hermes Desktop-release uit start/INSTALLATIE.md. Geef in de app één opdracht en controleer de modelverbinding. De cursus kiest GPT-6 Astra; een andere modelnaam geldt als afwijking, niet als identieke test.
2. Laat Codex hermes/team.json en hermes/TEAM.md lezen. Het pakket bevat vijftien complete bronprofielen. Laat de exacte pakketversie scannen met NVIDIA SkillSpector en doe bronreview; bewaar rapport buiten de bronmap. Ontbrekende/incomplete scan of onverklaarde HIGH/CRITICAL blokkeert laden.
3. Open in Hermes Desktop Bots → New Agent. Maak een Fresh profile met de exacte cursusnaam, titel en description uit team.json. Gebruik Custom SOUL.md uit de corresponderende profielmap. Selecteer alleen de genoemde skills/toolsets/MCP’s. Gebruik geen clone van een persoonlijk profiel.
4. Herhaal voor alle vijftien profielen. Codex kan dit voorbereiden. Voor een gecontroleerde lokale CLI-installatie ondersteunt de geverifieerde Hermes-versie: `hermes profile install <absoluut-lokaal-profielpad> --name cursus-<rol>`. Controleer eerst `hermes profile install --help`; installeer uitsluitend de al gescande lokale bestanden. Gebruik nooit --force op een bestaand profiel. Maak de profielen daarna zichtbaar in Bots en open hun canonical Bot Chat.
5. Verbind je eigen modelaccount via de officiële Hermes-accountvoorziening. Kopieer geen auth.json, .env of refresh tokens. De nieuwe profielen moeten hun verbinding werkelijk kunnen gebruiken; geen automatische betaalde providerfallback instellen.
6. Geef iedere Bot de absolute cursusprojectmap als werkmap en laat AGENTS.md, context/bedrijf.md en context/merkdossier.md lezen. Controleer één bronverwijzing en één eigen rolantwoord per profiel. Lege productvelden moeten als ontbrekend worden benoemd.
7. Zet het team in een herkenbare sectie. Laat Orchestrator vanuit zijn Bot Chat één opdracht naar Researcher sturen met message_agent. Open het antwoord in de ontvangende Bot Chat en het gemaakte bestand. De ontvangstmelding alleen telt niet als gelukt.
8. Controleer vóór de eerste vakles de benodigde verbinding: browser voor Shopify; Higgsfield voor visuals; gekozen editor voor video. Doe een kleine passende proef in je eigen account. Installeer nieuwe plugins/dependencies pas na scan en bronreview.

## Veilige updates en herstel
Wijzig de bronversie van één profiel/skill, bewaar de oude versie, scan en review, laad alleen die wijziging en voer dezelfde taak plus een controletaak uit. Behoud eigen memories, chats, keys en ongerelateerde profielen. Zet bij regressie alleen de aangepaste cursusbestanden terug. Activeer routines pas na hun handmatige test.

## Officiële bronnen
- https://hermes-agent.nousresearch.com/docs/user-guide/profiles/
- https://hermes-agent.nousresearch.com/docs/user-guide/profile-distributions/
- https://hermes-agent.nousresearch.com/docs/user-guide/bot-mode/

Exacte UI en modeltoegang worden in de opnameomgeving getest. Een bronprofiel is nog geen draaiende agent.
