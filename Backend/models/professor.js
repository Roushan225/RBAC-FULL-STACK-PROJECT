const mongoose=require("mongoose")
const { timeStamp } = require("node:console")
const { type } = require("node:os")

const professorSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    department:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },

    
},{timeseries:true})

const User=mongoose.model("professor",professorSchema)

module.exports=User;