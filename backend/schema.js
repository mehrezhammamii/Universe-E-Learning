const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    score: { type: Object, default: {} }
}, { minimize: false });

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    categorie: { type: String, required: true },
    description: { type: String, required: true }
});

const quizSchema = new mongoose.Schema({
    quizName: { type: String, required: true },
    categorie: { type: String, required: true }
});

module.exports = { studentSchema, courseSchema, quizSchema };
const Course = mongoose.model("Course", courseSchema);
const Quiz = mongoose.model("Quiz", quizSchema);
