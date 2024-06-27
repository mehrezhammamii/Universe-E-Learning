const studentModel=require("../models/studentModel")



const addToScore=async(req,res)=>{
    console.log("the student has ",req.body.studentId);
    // this id of student he is from auth file middleware when genreate token we store the id to him
    // and then the auth file decoded the token again and back us the id of student and 
    //we put it in body check the code logic again in middlware
    console.log("the item has ",req.body.couseId);
try{
const studentData=await studentModel.findById(req.body.studentId);
const scoreData=await studentData.score;
if(!scoreData[req.body.courseId]){
scoreData[req.body.courseId]=1;
}else{
    scoreData[req.body.courseId]+=1
}
await studentModel.findByIdAndUpdate(req.body.studentId,{score:scoreData});
res.status(200).json({success:true,message:"added to score"});
    } 
    catch(error){
res.status(500).json({success:false,message:"error score"})
    }
}
  const getScoreOneStudent=async (req,res)=>{
    console.log("the student has ", req.body.studentId);
    try {
        const studentData = await studentModel.findById(req.body.studentId);
        const scoreData = studentData.score ;

        res.status(200).json({ success: true, scoreStudent:scoreData });
    } catch (error) {
        console.error("Error getting cart:", error.message);
        res.status(500).json({ success: false, message: "Error getting cart" });
    }
}
const removeScore=async(req,res)=>{
   
    try{
const studentData=await studentModel.findById(req.body.studentId);
const scoreData=await studentData.score;

delete scoreData[req.body.courseId]
await studentModel.findByIdAndUpdate(req.body.studentId,{score:scoreData});
res.status(200).json({success:true,message:"remove score",data:scoreData});
    } 
    catch(error){
res.status(500).json({success:false,message:"error score"})
    }
}
module.exports={addToScore,getScoreOneStudent,removeScore};