const mongoose = require("mongoose");

const UserModel=mongoose.model('user',mongoose.Schema({
    email:String,
    name:String,
    password:String,
    role:String
}))

module.exports={
    UserModel
}