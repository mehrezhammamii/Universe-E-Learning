const express = require('express');
const studentController = require('../controllers/studentController');
const authenticateToken = require('../middleware/auth'); // Correctly import your middleware

const studentRouter = express.Router();

studentRouter.post('/register', studentController.registerStudent);
studentRouter.post('/login', studentController.loginStudent);
studentRouter.post('/update-profile-pic', authenticateToken, studentController.updateProfilePic);
studentRouter.get('/:id',studentController.getStudentData);

module.exports = studentRouter;
