const express=require("express");
const { register,login,logout,profile } = require("../controllers/auth.controllers");
const { authMiddleware } = require("../middleware/auth.middleware");
const router= express.Router();

router.post("/register",register)
router.post("/login",authMiddleware,login)
router.post("/logout",authMiddleware,logout)
router.get("/me",authMiddleware,profile)

    
module.exports = router;