const express = require('express');
const fs = require('fs').promises; // Verwende fs.promises für asynchrone Dateioperationen
const app = express();
const port = 3000;

// Initialisiere die Kommentarliste als leeres Array
let commentsList = [];

// Lese vorhandene Kommentare aus der JSON-Datei (falls vorhanden)
async function readCommentsFromFile() {
    try {
        const data = await fs.readFile('data.json', 'utf8');
        commentsList = JSON.parse(data);
        console.log("erfolgreich");
    } catch (error) {
        console.error('Fehler beim Lesen der Daten aus data.json:', error);
    }
}

// Warte, bis die Kommentare aus der Datei gelesen wurden, bevor der Server startet
readCommentsFromFile().then(() => {
    // Endpoint zum Entgegennehmen von Kommentaren
    app.get('/submit-comment/:name/:mail/:message', (req, res) => {
        // Entschlüsselung der Query-Parameter
        const name = req.params.name;
        const mail = req.params.mail;
        const message = req.params.message;

        // Erstellen eines Kommentarobjekts
        const newComment = {
            name: name,
            mail: mail,
            message: message
        };

        // Hinzufügen des Kommentars zur Liste
        commentsList.push(newComment);
         console.log(commentsListd);
        // Speichern der aktualisierten Kommentarliste in der JSON-Datei
        fs.writeFile('data.json', JSON.stringify(commentsList, null, 2), 'utf8')
            .then(() => {
                // Rückgabe der aktuellen Kommentarliste als JSON
                res.json({ success: true, message: 'Kommentar erfolgreich hinzugefügt', comments: commentsList });
            })
            .catch((err) => {
                console.error('Fehler beim Speichern der Daten in data.json:', err);
                res.status(500).json({ success: false, message: 'Fehler beim Speichern der Daten' });
            });
    });

    // Starten des Servers
    app.listen(port, () => {
        console.log(`Server läuft auf Port ${port}`);
    });
});
