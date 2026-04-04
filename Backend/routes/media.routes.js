const express =require("express")
const router=express.Router()
const {uploadpdf,getallpdf} =require("../controllers/uploadpdf.controllers")
const upload =require("../middleware/upload")
const { authMiddleware } = require("../middleware/auth.middleware")
const {uploadprofilepic ,getallpic} = require("../controllers/profilepic.controllers")

router.post("/pdf",upload.single("pdf"),authMiddleware,uploadpdf)
router.get("/pdf/getallpdf",authMiddleware,getallpdf)
router.post("/profilepic",upload.single("profilepic"),authMiddleware,uploadprofilepic)
router.get("/getallpic",getallpic)


module.exports=router