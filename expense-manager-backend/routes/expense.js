const express = require("express");
const router = express.Router();
var firebase = require("firebase/app");
const app = require('../firebase')
const db = firebase.firestore(app);

router.post("/add", async (req, res) => {
    try {
        const { dateAndTime, amount, currency, category, description } = req.body;
        if (dateAndTime === "" || amount === "" || currency === "" || category === "") {
            return res.send({ error: "Please Fill All The Mandatory Fields" })
        }
        if(amount <=0){
            return res.send({error:"Amount Must be greater than zero."})
        }
        let user = await firebase.auth().currentUser;
        await db.collection("users").doc(user.uid).collection("expense").add({
            dateAndTime,
            amount,
            currency,
            category,
            description
        })
        res.send({ success: true })
    } catch (error) {
        console.log(error.message);
        res.send({ error: error.message })
    }
})

router.get("/show-expense/:category", async (req, res) => {
    try {
        let data = [];
        let user = await firebase.auth().currentUser;
        const { category } = req.params;
        let docRef;
        if (category === "All") {
            docRef = await db.collection("users").doc(user.uid).collection("expense").orderBy("dateAndTime", "desc").get();
        } else {
            docRef = await db.collection("users").doc(user.uid).collection("expense").where("category", "==", category).orderBy("dateAndTime", "desc").get();
        }
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
        res.send({ expenses: data })
    } catch (error) {
        console.log(error.message);
        res.send({})
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        let user = await firebase.auth().currentUser;
        let { id } = req.params;
        await db.collection("users").doc(user.uid).collection("expense").doc(id).delete();
        console.log("Expense Deleted Succesfully")
        return res.send({ success: true })
    } catch (error) {
        console.log(error.message);
        return res.send({ error: error.message })
    }
})

router.put("/edit",async(req,res)=>{
    try {
        let user = await firebase.auth().currentUser;
        const { dateAndTime,id, amount, currency, category, description } = req.body;
        if (dateAndTime === "" || amount === "" || currency === "" || category === "") {
            return res.send({ error: "Please Fill All The Mandatory Fields" })
        }
        if(amount <=0){
            return res.send({error:"Amount Must be greater than zero."})
        }
        await db.collection("users").doc(user.uid).collection("expense").doc(id).update({
            dateAndTime,
            amount,
            currency,
            category,
            description
        })
        return res.send({success:true})
    } catch (error) {
        console.log(error.message);
        return res.send({error:error.message})
    }
})

module.exports = router;