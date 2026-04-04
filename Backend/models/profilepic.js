const mongoose =require("mongoose")
const profilepicSchema=new mongoose.Schema({
    filename:String,
    filepath:String,
    uploadedby:String
},{timestamps:true})

module.exports=mongoose.model("profilepic",profilepicSchema)