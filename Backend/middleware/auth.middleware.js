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
        req.user= await User.findById(decoded.id)
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}

module.exports.isAdmin=(req,res,next)=>{
    const allowedRoles=["Admin","Professor"]
    if(!allowedRoles.includes(req.user.role)){
        return res.status(403).json({
            message:"Access denied . Admin only"
        })
    }
    next()
}