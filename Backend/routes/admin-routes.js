const express =require ('express')
const router = express.Router();
const {getAlluser, deleteUser} = require('../controllers/admin.controllers')
const {authMiddleware, isAdmin} = require("../middleware/auth.middleware")

router.get("/user",authMiddleware,isAdmin,getAlluser)
router.delete("/deleteuser/:id",authMiddleware,isAdmin,deleteUser)

module.exports=router;