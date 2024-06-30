const express = require('express');
const studentController = require('../controllers/studentController');
const authenticateToken = require('../middleware/auth'); 
const studentRouter = express.Router();
const multer =require("multer");
const path=require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const uploadsPath = path.join(__dirname,'../uploads');

  const upload =multer({ storage:storage});
  studentRouter.use('/uploads', express.static(uploadsPath));

  
studentRouter.post('/update-profile-pic',upload.single("image"),
authenticateToken, studentController.updateProfilePic);
studentRouter.get('/one',authenticateToken,studentController.getStudentData);
studentRouter.post('/register', studentController.registerStudent);
studentRouter.post('/login', studentController.loginStudent);
<<<<<<< HEAD
studentRouter.post('/update-profile-pic', authenticateToken, studentController.updateProfilePic);
studentRouter.get('/get',authenticateToken,studentController.getStudentData);
=======
>>>>>>> e171b143fd2989ae97701f6d1a155f11e8bee129
module.exports = studentRouter;
