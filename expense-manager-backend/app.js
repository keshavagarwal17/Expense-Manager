const express = require('express');
const cors = require("cors");
const authRouter = require('./routes/auth')
const indexRouter = require('./routes/index')
const expenseRouter = require('./routes/expense')
const reportRouter = require('./routes/report')
const adminRouter = require("./routes/admin")
const app = express();
const port = process.env.PORT || 5000;


app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/",(req,res)=>{
    res.send("ok")
})

app.use("/",indexRouter)
app.use("/auth",authRouter)
app.use("/report",reportRouter)
app.use("/expense",expenseRouter)
app.use("/admin",adminRouter);

app.listen(port,()=>{
    console.log("Server is listening on port ",port);
})