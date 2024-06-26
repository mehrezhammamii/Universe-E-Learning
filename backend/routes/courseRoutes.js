const express = require('express');
const courseController = require('../controllers/courseController');
const courseRouter = express.Router();

courseRouter.post("/", courseController.addCourse);
courseRouter.get("/", courseController.getCourse);
courseRouter.put("/:id", courseController.updateCourse);
courseRouter.delete("/:id", courseController.deleteCourse);
courseRouter.get("/:id", courseController.getOneCourse);
courseRouter.post("/addExercise/:id",courseController.addExerciseForCourse);
module.exports = courseRouter;
