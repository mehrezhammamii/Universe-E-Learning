const mongoose = require('mongoose');
const quizSchema = require('../schema');

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema.quizSchema);

module.exports = Quiz;
