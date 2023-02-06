const mongoose=require("mongoose");

const connect=mongoose.connect("mongodb+srv://krishna:krishna@cluster0.lma8zp0.mongodb.net/eval2?retryWrites=true&w=majority")

module.exports={
    connect
}