const express = require('express');
const quizController = require('../controllers/quizController');
const quizRouter = express.Router();

quizRouter.post("/", quizController.addQuiz);
quizRouter.get("/", quizController.getQuiz);
quizRouter.put("/:id", quizController.updateQuiz);
quizRouter.delete("/:id", quizController.deleteQuiz);

module.exports = quizRouter;
