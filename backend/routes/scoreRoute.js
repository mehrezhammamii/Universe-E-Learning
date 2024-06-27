const express=require("express"); 
const scoreController=require("../controllers/scoreController");
const authMiddleWare=require("../middleware/auth.js");
const scoreRouter=express.Router();
scoreRouter.post("/add",authMiddleWare,scoreController.addToScore);
scoreRouter.get("/get",authMiddleWare,scoreController.getScoreOneStudent);
scoreRouter.post("/remove",authMiddleWare,scoreController.removeScore);
scoreRouter.get("/profile", authMiddleWare, scoreController.getProfileData);


module.exports=scoreRouter;