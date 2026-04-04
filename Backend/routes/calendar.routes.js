const express =require("express")
const router=express.Router()
const {isAdmin,authMiddleware}=require("../middleware/auth.middleware")
const {addEvent, getEvent}=require("../controllers/calendra.controllers")

router.post("/addEvent",addEvent)
router.get("/getallevent",getEvent)



module.exports=router;