const User =require("../models/user")
const jwt=require("jsonwebtoken")

module.exports.resetpassword=async()=>{
    const {email}=req.body;
    try {
        const oldUser=await User.findOne({email})
        if(!oldUser){
            return res.status(400).json({
                message:"User Does't Exist"
            })
        }
        const secret=process.env.JWT_SECRET + oldUser.password;
        const token=jwt.sign({
            email:oldUser.email,
            id:oldUser._id
        },secret,{
            expiresIn:"5m"
        })
        const link=`http://localhost:3001/resetpassword/${oldUser._id}/${token}`

    } catch (error) {
        
    }
}