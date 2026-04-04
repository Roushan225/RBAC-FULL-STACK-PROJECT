const express = require("express");
const User = require("../models/user");
const bcrypt =require("bcrypt")
const jwt=require("jsonwebtoken");


module.exports.register = async (req, res) => {
    const { role,name, email, password,branch } = req.body;
    console.log(req.body);
    
    try {
        if (!name || !email || !password ) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const Isemailexist = await User.findOne({ email });
        if (Isemailexist) {
            return res.status(400).json({
                message: "User email already Exist"
            })
        }
        const salt=await bcrypt.genSalt();
        const hashedpassword=await bcrypt.hash(password,salt)

        const user= await User.create({
            role,
            name,
            email,
            branch,
            password : hashedpassword,
        })
        const token =await jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"3d"}                        //generates token
);       res.clearCookie("token")
        res.cookie('token',token,{                                                                 //generates cookies
            httpOnly : true,
            secure: process.env.NODE_ENV === "production",
            maxAge : 30*24*60*60*1000
        })
        return res.status(200).json({
            success:true,
            message: "user registered succesfully",
            role:user.role
        })

       
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
            
        })

    }
}

module.exports.login = async(req,res)=>{
    const {email,password}= req.body;
    
    try {
        if( !email || !password ){
            res.status(400).json({
                message:"All field are required"
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"Email is not registered"
            })
        }

        const checkpassword = await bcrypt.compare(password,user.password)

        if(!checkpassword){
            return res.status(400).json({
                message: "Invalid Password"
            })
        }

        const token =await jwt.sign({id:user._id},process.env.JWT_SECRET,{                         //generates token
            expiresIn:"3d",
        })
        res.cookie('token',token,{
            httpOnly : true,
            secure: process.env.NODE_ENV === "production",
            maxAge : 30*24*60*60*1000
        })

        res.status(200).json({
            success:true,
            message: "Login succesfully",
            user,
            token
        })


    } catch (error) {
        
    }
}

module.exports.logout = async(req,res)=>{
    // res.cookie('token','',{
    //     httpOnly :true,
    //     expires : new Date(0)
    // })
    res.clearCookie("token",{
        httpOnly:true,
        sameSite:"Strict",
        secure:process.env.NODE_ENV==="production"
    })
    return res.status(200).json({
        message: "Logout Successfully"
    })
}



module.exports.profile = async (req,res)=>{
    res.status(200).json({
        user : req.user
    })
}
