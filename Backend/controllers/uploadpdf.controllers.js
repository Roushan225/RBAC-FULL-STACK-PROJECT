const express = require("express")
const PDF = require("../models/media")
const upload = require("../middleware/upload")

const uploadpdf = async (req, res) => {
    

    try {
        const { pdfname, uploadedby, role } = req.body
        const newPdf = new PDF({
            filename: req.file.filename,
            filepath: req.file.path,
            pdfname: pdfname || req.file.originalname,
            role: role,
            uploadedby: uploadedby || "Student"
        });



        await newPdf.save();
        console.log(req.file);
        res.json({
            message: "Assignment uploaded succesfully",
            data: newPdf,
            success: "true"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}
const getallpdf = async (req, res) => {
    const files = await PDF.find();


    res.json(files);
}

module.exports = { uploadpdf, getallpdf }