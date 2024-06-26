// studentController.js

const Student = require('../models/studentModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginStudent = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ success: false, error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Invalid email or password' });
    }
    const token = createToken(student._id);
    return res.status(200).json({ message: 'Login successful', success: true, token });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const registerStudent = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, error: 'Password must be at least 8 characters long' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newStudent = new Student({
      name,
      email,
      password: hashPassword,
    });

    const student = await newStudent.save();
    const token = createToken(student._id);
    return res.status(201).json({ message: 'Student registered successfully', success: true, token });
  } catch (error) {
    console.error('Error registering student:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const updateProfilePic = async (req, res) => {
    const { imageUrl } = req.body;
    const userId = req.user.id; // Assuming authenticateToken middleware sets req.user.id
  
    try {
      // Update the profile picture URL in your database (assuming Mongoose)
      await Student.findByIdAndUpdate(userId, { profilePic: imageUrl });
  
      res.json({ success: true, message: 'Profile picture updated successfully.', imageUrl });
    } catch (error) {
      console.error('Error updating profile picture:', error);
      res.status(500).json({ success: false, message: 'Failed to update profile picture.' });
    }
  };



module.exports = { registerStudent, loginStudent, updateProfilePic };
