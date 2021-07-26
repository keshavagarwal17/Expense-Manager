const express = require("express");
const router = express.Router();
var firebase = require("firebase/app");
const app = require('../firebase')
const db = firebase.firestore(app);

router.post("/register", (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
        return res.send({ err: "Both Password is Different" })
    }
    if(email==="admin@gmail.com"){
        return res.send({err:"This Email Have Special Access. Please use Admin Login Page for login."})
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            db.collection("users")
                .doc(user.uid)
                .set({
                    name,
                    email
                })
                .then(() => {
                    console.log("User Data successfully written!");
                    return res.status(200).send({success:true});
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                    return res.send({ err: error.message });
                });
        })
        .catch((error) => {
            var errorMessage = error.message;
            return res.send({ err: errorMessage })
        });

})

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if(email==="admin@gmail.com"){
        return res.send({err:"This Email Have Special Access. Please use Admin Login Page for login."})
    }
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            return res.send({ success: true });
        })
        .catch((error) => {
            var errorMessage = error.message;
            return res.send({ err: errorMessage })
        });
})

router.get("/logout", (req, res) => {
    firebase.auth().signOut().then(() => {
        return res.send({ success: true });
    }).catch((error) => {
        return res.send({ err: error.message })
    });
})

router.get("/getUser", async (req, res) => {
    const user = await firebase.auth().currentUser;
    if (user == null) return res.send({ user: null });
    console.log(user.email);
    console.log(user.email==="admin@gmail.com")
    return res.send({ user: user.uid,admin:(user.email==="admin@gmail.com") });
})

module.exports = router;