const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = 3000;

let commentsList = [];

async function readCommentsFromFile() {
    try {
        const data = await fs.readFile('data.json', 'utf8');
        commentsList = JSON.parse(data);
        console.log("Datei erfolgreich gelesen");
    } catch (error) {
        console.error('Fehler beim Lesen der Daten aus data.json:', error);
    }
}

readCommentsFromFile().then(() => {
    app.get('/submit-comment/:name/:mail/:message', (req, res) => {
        const name = req.params.name;
        const mail = req.params.mail;
        const message = req.params.message;

        const newComment = {
            name: name,
            mail: mail,
            message: message
        };

        commentsList.push(newComment);

        fs.writeFile('data.json', JSON.stringify(commentsList, null, 2), 'utf8')
            .then(() => {
                res.json({ success: true, message: 'Kommentar erfolgreich hinzugefügt', comments: commentsList });
            })
            .catch((err) => {
                console.error('Fehler beim Speichern der Daten in data.json:', err);
                res.status(500).json({ success: false, message: 'Fehler beim Speichern der Daten' });
            });
    });

    app.listen(port, () => {
        console.log(`Server läuft auf Port ${port}`);
    });
}).catch((err) => {
    console.error('Fehler beim Starten des Servers:', err);
});