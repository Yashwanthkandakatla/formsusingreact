const express = require("express");
const multer = require("multer");
const verifytoken = require("../middleware/verifytoken");
const File = require("../models/File");
const User = require("../models/users");

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Upload file and associate it with a faculty member
router.post("/api/upload", verifytoken, upload.single("file"), async (req, res) => {
  try {
    const { facultyId } = req.body; // ID of the faculty to share with
    const studentId = req.user.id; // Extracted from the JWT in `verifytoken`

    // Verify if the faculty exists
    const faculty = await User.findOne({ _id: facultyId, role: "faculty" });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Save file metadata in the database
    const file = new File({
      filename: req.file.filename,
      filepath: req.file.path,
      studentId,
      facultyId,
      uploadedAt: new Date(),
    });

    await file.save();

    res.status(200).json({ message: "File uploaded and shared successfully", file });
  } catch (err) {
    console.error("Error uploading file:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
