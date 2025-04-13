const express = require('express');
const router = express.Router();
exports.router = router;
const User = require('../models/user'); // Assuming the user model is in the models folder
const File = require('../models/File')
const { verifyToken } = require('../middleware/verifytoken'); // Middleware to validate JWT

// Get all faculty
router.get('/faculty', verifyToken, async (req, res) => {
  try {
    // Fetch users with role 'faculty'
    const facultyList = await User.find({ role: 'faculty' }).select('name email _id');
    if (!facultyList || facultyList.length === 0) {
      return res.status(404).json({ message: 'No faculty found' });
    }
    res.status(200).json({ faculty: facultyList });
  } catch (error) {
    console.error('Error fetching faculty list:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
