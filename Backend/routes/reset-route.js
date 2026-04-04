const express =require("express");
const { resetpassword } = require("../controllers/resetpassword.constroller");
router=express.Router();

router.post("/",resetpassword)