const express = require("express");
const router = express.Router();
var firebase = require("firebase/app");
const app = require('../firebase')
const db = firebase.firestore(app);

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if(email!=="admin@gmail.com"){
        return res.send({err:"This Page is for admin login. But You Are Not An Admin."})
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

router.get("/dashboard",async(req,res)=>{
    try {
        const user = await firebase.auth().currentUser;
        if(!user || user.email!=="admin@gmail.com"){
            return res.send({error:"You Are Not An Admin"})
        }
        let docRef = await db.collection("users").get();
        let users = [];
        docRef.forEach((doc)=>{
            users.push({
                id:doc.id,
                name:doc.data().name,
                email:doc.data().email
            })
        })
        res.send({users})
    } catch (error) {
        console.log(error.message);
        res.send({error:error.message})
    }
})

router.get("/list/:id",async(req,res)=>{
    try {
        const user = await firebase.auth().currentUser;
        const {id} = req.params
        if(!user || user.email!=="admin@gmail.com"){
            return res.send({error:"You Are Not An Admin"})
        }
        let data = [];
        let docRef = await db.collection("users").doc(id).collection("expense").orderBy("dateAndTime", "desc").get();
        docRef.forEach((doc) => {
            data.push({
                id: doc.id,
                dateAndTime: doc.data().dateAndTime,
                amount: doc.data().amount,
                currency: doc.data().currency,
                category: doc.data().category,
                description: doc.data().description
            })
        })
        return res.send({ expenses: data })
    } catch (error) {
        console.log(error.message);
        res.send({error:error.message})
    }
})

router.delete("/delete/:userId/:expenseId",async(req,res)=>{
    try {
        const user = await firebase.auth().currentUser;
        const {userId,expenseId} = req.params
        if(!user || user.email!=="admin@gmail.com"){
            return res.send({error:"You Are Not An Admin"})
        }
        await db.collection("users").doc(userId).collection("expense").doc(expenseId).delete();
        console.log("Expense Deleted Succesfully")
        return res.send({ success: true })
    } catch (error) {
        console.log(error.message);
        res.send({error:error.message})
    }
})

router.put("/expense/edit",async(req,res)=>{
    try {
        const user = await firebase.auth().currentUser;
        const { userId,dateAndTime,id, amount, currency, category, description } = req.body;
        if(!user || user.email!=="admin@gmail.com"){
            return res.send({error:"You Are Not An Admin"})
        }
        if (dateAndTime === "" || amount === "" || currency === "" || category === "") {
            return res.send({ error: "Please Fill All The Mandatory Fields" })
        }
        if(amount <=0){
            return res.send({error:"Amount Must be greater than zero."})
        }
        await db.collection("users").doc(userId).collection("expense").doc(id).update({
            dateAndTime,
            amount,
            currency,
            category,
            description
        })
        return res.send({success:true})
    } catch (error) {
        console.log(error.message);
        res.send({error:error.message})
    }
})

module.exports = router;