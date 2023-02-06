const express=require("express");
const { connect } = require("./config/db");
const { authenticate } = require("./middlewares/authenticate");
const { authorize } = require("./middlewares/authorize.middleware");
const { userRouter } = require("./routes/user.route");

const app=express();
app.use(express.json());

app.use('/user',userRouter);

app.get('/goldrate',authenticate, authorize("user"),(ask,give)=>{
    give.send("your goldrate...")
})

app.get('/userstats',authenticate,authorize("manager"),(ask,give)=>{
    give.send("The User stats...")
})

app.listen(3000,()=>{
    try {
        connect
        console.log("Connected to the DB and server is running at 3000");
    } catch (error) {
        console.log(error);
    }
})