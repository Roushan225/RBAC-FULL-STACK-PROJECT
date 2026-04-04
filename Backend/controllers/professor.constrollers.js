const express = require("express")
const User = require("../models/user")


module.exports.present = async (req, res) => {
    try {
        const id = req.params.id;
        

        const user = await User.findById(id)

        // const alreadymarked=user.lastmarked===today
        // if(alreadymarked){
        //     res.status(400).json({
        //         message:"Attendance already marked"
        //     })
        // }

        user.present += 1;
        user.totalclasses += 1
        

        await user.save();

        res.status(200).json({
            message: "Marked Present succesfully",
            present: user.present,
            total: user.totalclasses,
            
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }


}

module.exports.absent = async (req, res) => {
    try {
        const id = req.params.id;
        

        const user = await User.findById(id)

        // const alreadymarked=user.lastmarked===today
        // if(alreadymarked){
        //     res.status(400).json({
        //         message:"Attendance already marked"
        //     })
        // }

        
        user.totalclasses += 1
        

        await user.save();

        res.status(200).json({
            message: "Marked Absent succesfully",
            total: user.totalclasses,
            
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }


}