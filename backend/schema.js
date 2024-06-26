const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    score: { type: Object, default: {} },
    picture :{type: String}
}, { minimize:false});
const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    categorie: { type: String, required: true },
    description: { type: String, required: true },
    price : {type : Number,required : true},
    quiz : {type : Array,required : true},
    picture : {type: String},
    video : {type: String}
});



module.exports = { studentSchema, courseSchema };
