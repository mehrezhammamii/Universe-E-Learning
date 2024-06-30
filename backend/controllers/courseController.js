const Course = require('../models/courseModel');

exports.getCourse = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.addCourse = async (req, res) => {
    try {
        const { courseName, categorie, description, price, picture,video } = req.body; 
        const course = new Course({ courseName, categorie, description, price, picture,video}); 
        await course.save();
        console.log(req.body);
        res.status(201).json({ message: 'Course added successfully', course });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding course' });
    }
};

exports.getOneCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
            }
            res.status(200).json(course);
            } catch (error) {
                res.status(404).json({ message: error.message });
                }
    };

exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { courseName, categorie, description, price, picture, video, quiz } = req.body;
        const course = await Course.findByIdAndUpdate(id, { courseName, categorie, description, price, picture, video, quiz }, { new: true });
        res.status(200).json({ message: 'Course updated successfully', course });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating course' });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        await Course.findByIdAndDelete(id);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting course' });
    }
};


exports.addExerciseForCourse = async (req, res) => {
  const id = req.params.id;
  const exercise = req.body.exercise;

  try {
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await Course.findByIdAndUpdate(id, { $push: { quiz:  exercise  } });

    res.status(200).json({ message: 'Quizzes updated successfully' });
  } catch (error) {
    console.error("Error updating quizzes:", error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
