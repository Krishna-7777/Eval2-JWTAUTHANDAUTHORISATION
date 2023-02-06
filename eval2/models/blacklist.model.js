const mongoose = require("mongoose");

const BlacklistModel=mongoose.model('blacklist',mongoose.Schema({
    token:String
}))

module.exports={
    BlacklistModel
}