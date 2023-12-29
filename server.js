const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');
const admin = require('firebase-admin'); 
const express = require('express');
const app = express();
const port = 3000;
rerquire('dotenv').config();



    admin.initializeApp({
        credential: admin.credential.cert({
                "type": process.env.TYPE_CRD,
                "project_id": process.env.PROJECT_ID_CRD,
                "private_key_id": process.env.PRIVATE_KEY_ID_CRD,
                "private_key": process.env.PRIVATE_KEY_CRD.replace(/\\n/g, '\n') ,
                "client_email": process.env.CLIENT_EMAIL_CRD,
                "client_id": process.env.CLIENT_ID_CRD,
                "auth_uri": process.env.AUTH_URI_CRD,
                "token_uri": process.env.TOKEN_URI_CRD,
                "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL_CRD,
                "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL_CRD,
                "universe_domain": process.env.UNIVERSE_DOMAIN_CRD
              })
        
    });

    
    const uid = 'kaze'; // Eindeutige Benutzer-ID für den Admin

    const additionalClaims = {admin:true};
    
    admin.auth().createCustomToken(uid, additionalClaims)
      .then((customToken) => {
       
          console.log('Custom token for admin user:', customToken);
      })
      .catch((error) => {
        console.error('Error creating custom token:', error);
      });
    
      const firebaseConfig = {
        apiKey: "AIzaSyD0jPbcEJnq_MH0NtZn2h8EGVCEUTOStak",
        authDomain: "datenweb-df16e.firebaseapp.com",
        databaseURL: "https://datenweb-df16e-default-rtdb.firebaseio.com",
        projectId: "datenweb-df16e",
        storageBucket: "datenweb-df16e.appspot.com",
        messagingSenderId: "375576281180",
        appId: "1:375576281180:web:b63ea5b9d1a63e2f232699"
      };
      
    
      const dataApp = initializeApp(firebaseConfig);
      const database = getDatabase(dataApp);



function writeTo(name, mail, message) {

    const reference = ref(database,"/admin");

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
