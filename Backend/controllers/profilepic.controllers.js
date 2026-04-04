
const profilepic =require("../models/profilepic")
const uploadprofilepic = async(req,res)=>{
    try {
        const {uploadedby}=req.body
        const newprofilepic=new profilepic({
            filename:req.file.filename,
            filepath:req.file.path,
            uploadedby:uploadedby
        })
        console.log(req.file);
        await newprofilepic.save();

        res.json({
            message:"Profile Pic uploaded",
            data:newprofilepic,
            success:"true"
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const getallpic=async(req,res)=>{
    const pics=await profilepic.find()
    res.json(pics)
    
    
}

module.exports={uploadprofilepic, getallpic};