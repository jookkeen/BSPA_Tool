# BSPA Elektro Planungs-Tool - Projekt State

## Aktuelle Version: 2.2.0

### Neueste Features & Fixes:
1.  **Dynamische Pausenregelung**: Benutzer können pro Wochentag wählen, ob die Pause nach der 2. oder 3. Stunde stattfindet. Die Start- und Endzeiten im Plan passen sich automatisch an.
2.  **Word-Export Bulletproof**: 
    *   Die Word-Vorlage (`StundenplanLeer.docx`) ist nun als Base64 in `template_data.js` eingebettet. Das verhindert "Failed to fetch" Fehler in lokalen Umgebungen.
    *   Ein Bug beim Word-Farben-Export wurde behoben (Theme-Farben wurden früher nicht korrekt überschrieben).
    *   Die Bibliotheken werden jetzt über den JSDelivr CDN geladen für maximale Kompatibilität.
3.  **UI/UX Optimierungen**:
    *   Stundenboxen überlappen nicht mehr mit den Zeitanzeigen.
    *   Zeiten sind nun in jeder Zelle oben links sichtbar.
    *   Farben und Layout wurden modernisiert und an mobile Bedürfnisse angepasst.

### Verzeichnisstruktur für Git:
Die folgenden Dateien sollten in das Git-Repository hochgeladen werden:
- `index.html`: Die Hauptseite der App.
- `script.js`: Die gesamte Logik und State-Management.
- `style.css`: Das Designsystem.
- `template_data.js`: Enthält die eingebettete Word-Vorlage.
- `plaene/`: Der Ordner mit den Originalvorlagen (z.B. `StundenplanLeer.docx`).
- `gen_template.ps1`: Hilfsskript zum Updaten der eingebetteten Vorlage.

**Hinweis**: Temporäre Ordner wie `tmp_xml` oder `tmp_docx` wurden gelöscht und sollten nicht in das Repository.

## Status: Einsatzbereit
Alle angeforderten Funktionen (Stundenplan, Drag & Drop, Word-Export, flexible Pausen) sind vollständig implementiert und getestet.
