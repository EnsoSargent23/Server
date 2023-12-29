const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = 3000;

// Import the functions you need from the SDKs you need
const dataApp = require('firebase/app');
const db = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyD0jPbcEJnq_MH0NtZn2h8EGVCEUTOStak",
  authDomain: "datenweb-df16e.firebaseapp.com",
  databaseURL: "https://datenweb-df16e-default-rtdb.firebaseio.com",
  projectId: "datenweb-df16e",
  storageBucket: "datenweb-df16e.appspot.com",
  messagingSenderId: "375576281180",
  appId: "1:375576281180:web:e0a5d4d0a3739a8b232699"
};

// Initialize Firebase
const dataAp = dataApp.initializeApp(firebaseConfig);

function writeTo(name,mail,message){
    const daten = db.getDatabase();
    const reference = db.ref("/comment");

    daten.set(reference, 
    {
        name: name,
        mail: mail,
        message:message
    });
}


    app.get('/submitcomment/:name/:mail/:message', (req, res) => {
        const name = req.params.name;
        const mail = req.params.mail;
        const message = req.params.message;

        writeTo(name,mail,message);

    });

app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});