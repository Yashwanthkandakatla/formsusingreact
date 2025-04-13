const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  // filepath: { type: String, required: true },
  content: { type: Buffer, required: true },  // Store the file's binary data
  mimeType: { type: String, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Userroles", required: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Userroles", required: true },
  university:{type:String,required:true},
  course:{type:String,required:true},
  uploadedAt: { type: Date, default: Date.now },
  comment: { type: String }, 
});

module.exports = mongoose.model("File", fileSchema);
