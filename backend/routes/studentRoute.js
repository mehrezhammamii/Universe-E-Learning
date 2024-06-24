const express=require("express"); 
const studentController=require("../controllers/studentController");
const studentRouter=express.Router();
studentRouter.post("/register",studentController.registerStudent);
studentRouter.post("/login",studentController.loginStudent);
module.exports=studentRouter;