const Course = require("../models/course")
const User =require("../models/user")
const express =require('express')

module.exports.getAlluser = async(req,res)=>{
    try {
        const user = await User.find()
        if(!user || user.length===0){
            return res.status(404).json({
                message:"No users Found !!!"
            })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({
            message:"server error"
        })
        
    }
}

module.exports.deleteUser=async (req,res)=>{
    try {
        const id=req.params.id;
        await User.deleteOne({
            _id:id
        })
        res.status(200).json({
            message:"User Deleted Succesfully"
        })
    } catch (error) {
        console.log(error);
        
    }
}

module.exports.course= async(req,res)=>{
    const {title,description}=req.body;
    try {
        const course =new Course({
            title,
            description,
                                         // from generated token
        })
        await course.save();
        res.status(200).json({
            message:"Couse added Succesfully"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
}