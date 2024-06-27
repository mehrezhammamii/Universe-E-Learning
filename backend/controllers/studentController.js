
const studentModel = require("../models/studentModel");


const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const validator =require("validator");
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}
const loginStudent = async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    console.log("the pass is",password);
    console.log("the email is",email)
    try {
        const student = await studentModel.findOne({ email }); 
        if (!student) {
          console.log("reach email bad");
            return res.status(400).json({ success: false, error: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
           console.log("log reach pass");
            return res.status(400).json({ success: false, error: "Invalid email or password" });
        }
        const token = createToken(student._id);
        return res.status(200).json({ message: 'Login successful', success: true, token });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
const registerStudent=async(req,res)=>{
const password=req.body.password;
console.log("password",password);
console.log("email",req.body.email);
console.log("name",req.body.name);
    try{
    if(!validator.isEmail(req.body.email)){
    res.status(500).json({ success:false,error:"error email not valid"});
}
console.log("enter ");
if(password.length<8){
    res.status(500).json({ success:false,error: "please enter strong password" });
}
const salt=await bcrypt.genSalt(10);
const hashPassword=await bcrypt.hash(password,salt);
const newStudent=new studentModel({
    name:req.body.name,
    email:req.body.email,
    password:hashPassword
})
const student =await newStudent.save();
const token= createToken(student._id);
console.log("the token is",token);
res.status(200).json({ message: 'student added success', success:true,token });
}
catch(error) {
    console.log(error);
    res.status(500).json({  success:false,error:error});
}
}
module.exports={registerStudent,loginStudent};