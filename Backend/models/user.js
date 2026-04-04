const mongoose=require("mongoose")
const { timeStamp } = require("node:console")
const { type } = require("node:os")

const userSchema = new mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required: true,
    },
    branch:{
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
    present:{
        type:Number,
        default:0,
        
    },
    totalclasses:{
        type:Number,
        default:0,
        
    }
    
},{timeseries:true})

const User=mongoose.model("User",userSchema)

module.exports=User;