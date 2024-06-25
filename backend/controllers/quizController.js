const Quiz = require('../models/quizModule');

exports.getQuiz = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.get

exports.addQuiz = async (req, res) => {
    try {
        const { quizName, categorie } = req.body;
        const quiz = new Quiz({ quizName, categorie });
        await quiz.save();
        res.status(201).json({ message: 'Quiz added successfully', quiz });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding quiz' });
    }
};

exports.updateQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const { quizName, categorie } = req.body;
        const quiz = await Quiz.findByIdAndUpdate(id, { quizName, categorie }, { new: true });
        res.status(200).json({ message: 'Quiz updated successfully', quiz });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating quiz' });
    }
};

exports.deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        await Quiz.findByIdAndDelete(id);
        res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting quiz' });
    }
};
