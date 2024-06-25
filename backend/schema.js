const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    score: { type: Object, default: {} },
    picture : {type: String,required : true}
}, { minimize: false });

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    categorie: { type: String, required: true },
    description: { type: String, required: true },
    price : {type : Number,required : true},
    quiz : {type : Array,required : true}

});

module.exports = { studentSchema, courseSchema, quizSchema };


