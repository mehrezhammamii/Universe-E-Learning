const express = require('express');
const router = express.Router();
const cloudinary = require('../cloudinary/cloudinary'); // Assuming you've set up cloudinary config
const Student = require('../models/Student'); // Assuming you have a Student model

// POST route to update profile picture
router.post('/update-profile-pic', async (req, res) => {
  const studentId = req.studen.id; // Assuming authenticateToken middleware sets req.user.id
  const imageUrl = req.body.imageUrl;

  try {
    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
      folder: 'profile_pics', // Optional folder in Cloudinary
      resource_type: 'image' // Ensure it's an image
    });

    // Update the profile picture URL in your database
    await Student.updateOne({ _id: studentId }, { profilePic: uploadResponse.secure_url });

    res.json({ success: true, message: 'Profile picture updated successfully.' });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile picture.' });
  }
});

module.exports = router;
