const firebase = require('firebase');
const dotenv = require("dotenv")
dotenv.config();

var config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env. projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};


let app;
if (!firebase.apps.length) {
    app = firebase.initializeApp(config);
}else {
    app = firebase.app(); // if already initialized, use that one
}

module.exports = app;