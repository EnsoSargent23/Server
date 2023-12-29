const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Kommentarliste
let commentsList = [];

// Lese vorhandene Kommentare aus der JSON-Datei (falls vorhanden)
try {
    const data = fs.readFileSync('data.json', 'utf8');
    commentsList = JSON.parse(data);
} catch (error) {
    console.error('Fehler beim Lesen der Daten aus data.json:', error);
}

// Endpoint zum Entgegennehmen von Kommentaren
app.get('/submit-comment', (req, res) => {
    // Entschlüsselung der Query-Parameter
    const name = decodeURIComponent(req.query.name);
    const mail = decodeURIComponent(req.query.mail);
    const message = decodeURIComponent(req.query.message);

    // Erstellen eines Kommentarobjekts
    const newComment = {
        name: name,
        mail: mail,
        message: message
    };

    // Hinzufügen des Kommentars zur Liste
    commentsList.push(newComment);

    // Speichern der aktualisierten Kommentarliste in der JSON-Datei
    fs.writeFile('data.json', JSON.stringify(commentsList, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Fehler beim Speichern der Daten in data.json:', err);
            res.status(500).json({ success: false, message: 'Fehler beim Speichern der Daten' });
        } else {
            // Rückgabe der aktuellen Kommentarliste als JSON
            res.json({ success: true, message: 'Kommentar erfolgreich hinzugefügt', comments: commentsList });
        }
    });
});

// Starten des Servers
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
