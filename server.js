const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');
const express = require('express');

const app = express();
const port = 3000;

const firebaseConfig = {
    apiKey: "AIzaSyD0jPbcEJnq_MH0NtZn2h8EGVCEUTOStak",
    authDomain: "datenweb-df16e.firebaseapp.com",
    databaseURL: "https://datenweb-df16e-default-rtdb.firebaseio.com",
    projectId: "datenweb-df16e",
    storageBucket: "datenweb-df16e.appspot.com",
    messagingSenderId: "375576281180",
    appId: "1:375576281180:web:e0a5d4d0a3739a8b232699"
};

const dataApp = initializeApp(firebaseConfig);
const database = getDatabase(dataApp);

function writeTo(name, mail, message) {
    const reference = ref(database, "comment/");

    set(reference, {
        name: name,
        mail: mail,
        message: message
    }).then(() => {
        console.log('Data written to the database successfully.');
    }).catch((error) => {
        console.error('Error writing to the database:', error);
    });
}

app.get('/submitcomment/:name/:mail/:message', (req, res) => {
    const name = req.params.name;
    const mail = req.params.mail;
    const message = req.params.message;

    writeTo(name, mail, message);
    res.send('Comment submitted successfully.');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
