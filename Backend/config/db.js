const mongoose=require("mongoose");

const connectdb=async()=>{
    try {
        const connect=await mongoose.connect(`${process.env.MONGODB_URl}`)
        console.log("connected with database ");
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports=connectdb;