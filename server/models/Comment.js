const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Userroles", required: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Userroles", required: true },
  fileId: { type: mongoose.Schema.Types.ObjectId, ref: "File", required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;