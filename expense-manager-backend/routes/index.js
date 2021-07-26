const express = require("express")
const router = express.Router();
var firebase = require("firebase/app");
const app = require('../firebase')
const db = firebase.firestore(app);
const fetch = require('node-fetch');

router.get("/getDashboardData", async (req, res) => {
    try {
        let user = await firebase.auth().currentUser;
        let docRef = await db.collection("users").doc(user.uid).collection("expense");
        let docs = await docRef.orderBy("dateAndTime", "desc").limit(5).get();
        let data = [];
        docs.forEach((doc) => {
            data.push({
                id: doc.id,
                dateAndTime: doc.data().dateAndTime,
                amount: doc.data().amount,
                currency: doc.data().currency,
                category: doc.data().category,
                description: doc.data().description
            })
        })
        let amount = 0;
        docs =  await docRef.get();
        let link = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
        let currency = [];
        docs.forEach((doc)=>{
            currency.push({
                cur:doc.data().currency.toLowerCase(),
                amount:parseInt(doc.data().amount)
            })
        })
        for(let i=0;i<currency.length;i++){
            if(currency[i].cur==="inr"){
                amount+=currency[i].amount;
            }else{
                let newLink = link + currency[i].cur + "/inr.json";
                let res1 = await fetch(newLink)
                let json =await res1.json();
                amount +=(json.inr)*currency[i].amount;
            }
        }
        return res.send({amount,expense:data})
    } catch (error) {
        console.log(error.message);
        return res.send({ error: error.message })
    }
})

module.exports = router;