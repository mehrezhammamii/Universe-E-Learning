const jwt=require("jsonwebtoken");
const authMiddleWare=async(req,res,next)=>{
    const token=req.headers.token;
    console.log("the token is ",token);
    if(!token){
        res.status(500).json({success:false ,message:"not authorized login again"});
    }
 try{
const token_decode=jwt.verify(token,process.env.JWT_SECRET);
req.body.studentId=token_decode.id;
console.log("the id of student is",req.body.studentId);
next();
    }
    catch(error){
        console.log(error);
res.status(500).json({success:false, message:"error for token"});
    }
}
module.exports=authMiddleWare