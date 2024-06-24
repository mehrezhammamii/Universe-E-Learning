const express=require("express"); 
const studentController=require("../controllers/studentController");
const studentRouter=express.Router();
studentRouter.post("/registor",studentController.registerStudent);
studentRouter.post("/login",studentController.loginStudent);
module.exports=studentRouter;