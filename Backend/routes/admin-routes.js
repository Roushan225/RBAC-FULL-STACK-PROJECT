const express =require ('express')
const router = express.Router();
const {getAlluser, deleteUser} = require('../controllers/admin.controllers')
const {authMiddleware, isAdmin,Adminonly} = require("../middleware/auth.middleware")
const LoginLog =require("../models/LoginLog")


router.get("/user",authMiddleware,isAdmin,getAlluser)
router.delete("/deleteuser/:id",authMiddleware,isAdmin,deleteUser)



router.get("/loginlogs", async (req, res) => {
  const logs = await LoginLog.find()
    .populate("userId", "name email")
    .sort({ loginTime: -1 });

  res.json(logs);
});

module.exports=router;