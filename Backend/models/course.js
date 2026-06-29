const mongoose =require ("mongoose")


const courseSchema =mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timeStamp:true})

module.exports = mongoose.model("course",courseSchema);