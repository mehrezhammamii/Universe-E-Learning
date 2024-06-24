const mongoose =require( "mongoose")
const studentSchema=new mongoose.Schema({
    name:{type:String,required: true },
    email: {type:String, required: true },
    password: { type: String, required: true },
    score: {type: Object, default:{}}
    
},{minimize:false})
const studentModel=mongoose.models.students||mongoose.model("students",studentSchema);
module.exports=studentModel;