const express=require("express");
const bcrypt=require("bcrypt");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");
const userRouter=express.Router();

userRouter.post('/signup',async(ask,give)=>{
    let {email,name,password,role}=ask.body;
    let hashed=await bcrypt.hash(password,2);
    let user= new UserModel({email,name,"password":hashed,role});
    try {
        user.save();
        give.send("User Registered")
    } catch (error) {
        console.log(error);
        give.send("Error in registering")
    }
})

userRouter.post('/login',async(ask,give)=>{
    let {email,password}=ask.body;
    let user=await UserModel.findOne({email});
    let hashed=user.password;
    bcrypt.compare(password,hashed,async (err,result)=>{
        if(result){
            const payload={_id:user._id,role:user.role};
            let token=jwt.sign({data: payload}, 'SECRET', { expiresIn: 60  }); 
            let refreshtoken= jwt.sign({data: `${{_id:user._id,role:user.role}}`}, 'REFRESHSECRET', { expiresIn: 300  });
            give.send({msg:"login succesfull", token,refreshtoken});
        }else{
            give.send("Wrong Credentials");
        }
    })
   
})

userRouter.post('/logout',async(ask,give)=>{
    let token=ask.headers.authorization;
    if(token){
        let blacklist= new BlacklistModel({token});
    try {
        blacklist.save();
        give.send("You have been logged out")
    } catch (error) {
        give.send("error in logging out.")
    }
    }else{
        give.send("You have not logged in.")
    }
    
})

module.exports={
    userRouter
}