const express = require('express');
const multer = require('multer');
const verifyToken = require('../middleware/verifytoken');
const nodemailer = require('nodemailer');
const File = require('../models/File');


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });


const transporter = nodemailer.createTransport({
  service: "gmail", // You can change this based on your email provider
  auth: {
    user: "kandakatlayash@gmail.com", // Replace with your email
    pass: "wuxo bnrz eppx ifyv",
     // Replace with your email password or app password
     //The app password is generated for services which are no longer safe to use it is a 16 digit apppassword
  },
});


router.post('/upload', verifyToken, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File is missing in the request' });
  }
  

  try {
    const file = new File({
      studentId: req.user.id,
      facultyId:req.body.facultyId,
      filename: req.file.originalname,
      content: req.file.buffer,        // File content as Buffer
      mimeType: req.file.mimetype,
      university:req.body.university,
      course:req.body.course,
      // fileData: req.file.buffer,
    });

    await file.save();
    console.log("File saved successfully")
    // res.status(201).json({ message: 'File uploaded successfully!' });
  
    //This code must be implemented in real world along with this to: must be updated to faculty.email
    // const faculty = await Userroles.findById(req.body.facultyId);

    // if (!faculty) {
    //   return res.status(404).json({ message: "Faculty not found" });
    // }


  const mailOptions = {
    from: "kandakatlayash@gmail.com", // Sender's email
    // to: faculty.email, // Faculty's email
    to:"yashwanthkandakatla.2003@gmail.com",
    subject: "New LOR File Uploaded",
    html: `
      <h3>Hello Yashwanth,</h3>
      <p>A new Letter of Recommendation (LOR) file has been uploaded by a student.</p>
      <p><strong>File Details:</strong></p>
      <ul>
        <li><strong>File Name:</strong> ${req.file.originalname}</li>
        <li><strong>University:</strong> ${req.body.university}</li>
        <li><strong>Course:</strong> ${req.body.course}</li>
        <li><strong>Uploaded At:</strong> ${new Date().toLocaleString()}</li>
      </ul>
      <p>Please log in to your dashboard to review the file.</p>
      <p>Best Regards,<br>Your System</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });

  res.status(201).json({ message: 'File uploaded and email notification sent successfully!' });
} catch (err) {
  console.log(err);
  res.status(500).json({ message: 'Server error' });
}




});



module.exports = router;
