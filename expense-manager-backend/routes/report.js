const express = require("express")
const router = express.Router();
var firebase = require("firebase/app");
const app = require('../firebase')
const db = firebase.firestore(app);

const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getDays = () => {
    var d = new Date();
    var month = d.getMonth();
    var year = d.getFullYear();
    let day31 = [0, 2, 4, 6, 7, 9, 11];
    for (let m of day31) {
        if (m === month) return 31;
    }
    if (month === 1) {
        if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) return 29;
        return 28;
    }
    return 30;
}

const startDateFormat = (date) => {
    var d = new Date();
    var month = d.getMonth()+1;
    var year = d.getFullYear();
    let new_month = `${month}`;
    if (month < 10) {
        new_month = `0${month}`
    }
    return `${year}-${new_month}-${date}T00:00`;
}

const endDateFormat = (date) => {
    var d = new Date();
    var month = d.getMonth()+1;
    var year = d.getFullYear();
    let new_month = `${month}`;
    if (month < 10) {
        new_month = `0${month}`
    }
    return `${year}-${new_month}-${date}T23:59`;
}

router.get("/", async (req, res) => {
    try {
        var d = new Date();
        var month = d.getMonth();
        var year = d.getFullYear();
        let user = await firebase.auth().currentUser;
        let tem_month = month + 1;
        let new_month = `${tem_month}`;
        if (tem_month < 10) {
            new_month = `0${tem_month}`
        }
        let firstDate = `${year}-${new_month}-01T00:00`;
        let docRef = await db.collection("users").doc(user.uid).collection("expense").where("dateAndTime",">=",firstDate);
        let array = [
            { startDate: "01", endDate: "07" },
            { startDate: "08", endDate: "14" },
            { startDate: "15", endDate: "21" },
            { startDate: "22", endDate: "28" },
        ]
        let days = getDays();
        if (days > 28) {
            array.push({ startDate: 29, endDate: days });
        }
        let weeklyExpenseReport = [];
        for (let date of array) {
            let startDate = startDateFormat(date.startDate);
            let endDate = endDateFormat(date.endDate);
            let docs = await docRef.where("dateAndTime", ">=", startDate).where("dateAndTime", "<=", endDate).get();
            let link = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
            let currency = [];
            let amount = 0;
            docs.forEach((doc) => {
                currency.push({
                    cur: doc.data().currency.toLowerCase(),
                    amount: parseInt(doc.data().amount)
                })
            })
            for (let i = 0; i < currency.length; i++) {
                if (currency[i].cur === "inr") {
                    amount += currency[i].amount;
                } else {
                    let newLink = link + currency[i].cur + "/inr.json";
                    let res1 = await fetch(newLink)
                    let json = await res1.json();
                    amount += (json.inr) * currency[i].amount;
                }
            }
            weeklyExpenseReport.push({amount,startDate:`${date.startDate} ${monthName[month]} ${year}`,endDate:`${date.endDate} ${monthName[month]} ${year}`})
        }
        let categoryExpenseReport = [];
        let categories = ["Home","Food","Fuel","Shopping","Others"]
        for(let category of categories){
            let docs = await docRef.where("category","==",category).get();
            let link = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
            let currency = [];
            let amount = 0;
            docs.forEach((doc) => {
                currency.push({
                    cur: doc.data().currency.toLowerCase(),
                    amount: parseInt(doc.data().amount)
                })
            })
            for (let i = 0; i < currency.length; i++) {
                if (currency[i].cur === "inr") {
                    amount += currency[i].amount;
                } else {
                    let newLink = link + currency[i].cur + "/inr.json";
                    let res1 = await fetch(newLink)
                    let json = await res1.json();
                    amount += (json.inr) * currency[i].amount;
                }
            }
            categoryExpenseReport.push({category,amount});
        }
        res.send({weeklyExpenseReport,categoryExpenseReport})
    } catch (error) {
        console.log(error.message);
        res.send({ error: error.message })
    }
})

module.exports = router;