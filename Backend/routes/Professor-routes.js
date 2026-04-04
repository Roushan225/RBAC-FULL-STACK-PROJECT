const express =require("express");
const { present, absent } = require("../controllers/professor.constrollers");
const { authMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/present/:id",present)
router.post("/absent/:id",absent)

module.exports=router;