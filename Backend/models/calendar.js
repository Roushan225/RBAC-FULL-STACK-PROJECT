const mongoose =require("mongoose")

const calendraSchema =new mongoose.Schema({
    title:String,
    description:String,
    date:Date,
    type:String,
    
},{timeseries:true})

module.exports=mongoose.model("calendar",calendraSchema)