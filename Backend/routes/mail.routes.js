const express = require("express")
const router=express.Router()
const {sendMail} =require("../controllers/sendmail.controllers")
const {sendgmail} =require("../controllers/Gmail.controllers")

// router.post("/",sendMail)
router.post("/g",sendgmail)

module.exports=router;