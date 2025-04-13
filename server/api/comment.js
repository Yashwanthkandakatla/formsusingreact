const express = require("express");
const router = express.Router();
const File = require("../models/File"); // update path if needed
router.use(express.json());
// Save comment for a file
  router.post("/add-comment/:fileId", async (req, res) => {
    try {
      const { fileId } = req.params;
      const { comment } = req.body;

      const file = await File.findByIdAndUpdate(
        fileId,
        { comment },
        { new: true }
      );

      res.json({ success: true, file });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save comment" });
    }
  });

module.exports = router;
