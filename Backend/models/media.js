const mongoose =require("mongoose")
const { timeStamp } = require("node:console")

const pdfSchema= new mongoose.Schema({
    filename:String,
    filepath:String,
    pdfname:String,
    uploadedby:String,
    role:String,
},{timeStamp:true})

module.exports=mongoose.model("PDF",pdfSchema);

