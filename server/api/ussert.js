const express = require('express');
const verifyToken = require('../middleware/verifytoken');
const router = express.Router();
const User = require('../models/user');  // adjust the path as needed
const File = require('../models/File');
const path = require('path')


router.get('/admin', verifyToken, (req, res) => {
  if (req.user.role === 'admin') {
    return res.json({ message: 'Welcome Admin!' });
  }
  res.status(403).json({ message: 'Access denied' });
});

router.get('/student', verifyToken, (req, res) => {
  if (req.user.role === 'student') {
    return res.json({ message: 'Welcome Student!' });
  }
  res.status(403).json({ message: 'Access denied' });
});

router.get('/faculty', verifyToken, (req, res) => {
  if (req.user.role === 'faculty') {
    return res.json({ message: 'Welcome Faculty!' });
  }
  res.status(403).json({ message: 'Access denied' });
});
router.get('/faculty-list', async (req, res) => {
    try {
      const role = "Faculty";
      const users = await User.find({ role }).select('name');
      if (users.length === 0) {
        return res.status(404).json({ message: 'No faculty found' });
      }
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  });


  router.get('/faculty-files', verifyToken, async (req, res) => {
  // if (req.user.role !== 'faculty') {
  //   return res.status(403).json({ message: 'Access denied' });
  // }

  try {
    // const files = await File.find({ facultyId: req.user.id });
    const files = await File.find({ facultyId: req.user.id }).populate('studentId', 'email').select('university course uploadedAt filename facultyId');
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: 'Server error',error:err.message });
  }
});
router.get('/student-files', verifyToken, async (req, res) => {
  try {
    // Find files where the studentId matches the current user's ID
    const files = await File.find({ studentId: req.user.id })
     // Populate faculty details if needed
      .select('studentId facultyId filename university course uploadedAt comment'); // Select specific fields

    res.json(files);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/delete-file',verifyToken, async (req, res) => {
  console.log("Request Recieved",req.query);
  const { facultyId, uploadedAt } = req.query;
  
  if (!facultyId || !req.user.id|| !uploadedAt) {
    return res.status(400).json({ message: 'Missing required fields: facultyId, studentId, or uploadedAt' });
  }

  console.log('FacutlyID',facultyId);
  console.log('uploaded time',uploadedAt);
  console.log('user id',req.user.id);
  const parsedUploadedAt = new Date(uploadedAt);
  console.log('recieved Upload',uploadedAt);
  console.log('Parsed upload',parsedUploadedAt)


  if (isNaN(parsedUploadedAt)) {
    return res.status(400).json({ message: 'Invalid uploadedAt format' });
  }
  try {
    // Find and delete the file
    const deletedFile = await File.findOneAndDelete({
      facultyId,
      uploadedAt: parsedUploadedAt, // Ensure uploadedAt is handled as a Date object
    });

    if (!deletedFile) {
      return res.status(404).json({ message: 'File not found or already deleted' });
    }

    res.json({ message: 'File successfully deleted', deletedFile });
  } catch (err) {
    console.error('Error deleting file:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.get("/download/:filename/:facultyId", async (req, res) => {
  try {
    const { filename, facultyId } = req.params;

    // Find the file in the database by filename and facultyId
    const file = await File.findOne({ filename, facultyId });

    if (!file) {
      return res.status(404).json({ message: "File not found or unauthorized access" });
    }

    // Set headers for file download
    res.set({
      "Content-Type": file.mimeType,
      "Content-Disposition": `attachment; filename="${file.filename}"`,
    });

    // Send the file content
    res.send(file.content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//Fetching the data for pie chart
router.get("/faculty-documents",async (req, res) => {
  try {
    const data = await File.aggregate([
      { $group: { _id: "$facultyId", count: { $sum: 1 } } }, // Group by facultyId and count
    ]);

    res.status(200).json(data); // Send aggregated data as response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});




module.exports = router;
