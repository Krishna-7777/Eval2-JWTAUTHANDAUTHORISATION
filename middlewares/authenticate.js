const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");

let authenticate=async(ask,give,next)=>{
    let token=ask.headers.authorization;
    let blacklist=await BlacklistModel.find({token});
    if(blacklist.length){
        give.send("please login again")
    }else{
       try {
        let decoded=jwt.verify(token,"SECRET");
        ask.role=decoded.data.role;
        next()
    } catch (error) {
        give.send("please login First");
        console.log(error);
    } 
    }
    
}

module.exports={
    authenticate
}