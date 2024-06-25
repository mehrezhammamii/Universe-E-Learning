const express=require("express"); 
const scoreController=require("../controllers/scoreController");
const authMiddleWare=require("../middleware/auth");
const scoreRouter=express.Router();
scoreRouter.post("/add",authMiddleWare,scoreController.addToScore);
scoreRouter.get("/get",authMiddleWare,scoreController.getScoreOneStudent);

module.exports=scoreRouter;