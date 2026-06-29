const cookieParser= require("cookie-parser")
const jwt = require("jsonwebtoken");
const User = require("../models/user");


module.exports.authMiddleware =async (req,res,next)=>{
    try {
        const token= req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"Unauthorised"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user= await User.findById(decoded.id)
        if(!user){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        req.user = user
        req.userRole = decoded.role || user.role
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}

module.exports.isAdmin=(req,res,next)=>{
    const role = (req.user?.role || req.userRole || "").toString().toLowerCase()
    if(!["admin","professor"].includes(role)){
        return res.status(403).json({
            message:"Access denied . Admin only"
        })
    }
    next()
}

module.exports.Adminonly=(req,res,next)=>{
    const role = (req.user?.role || req.userRole || "").toString().toLowerCase()
    if(role !== "admin"){
        return res.status(403).json({
            message:"Access denied . Admin only"
        })
    }
    next()
}