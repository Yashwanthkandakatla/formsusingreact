const express = require("express");

const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
// const mongoose = require('mongoose')

const router = express.Router();
router.use(express.json());

const ai = new GoogleGenAI({ apiKey: 'AIzaSyAGlfQiQSVOrjDcD5awnbn0MwcU4xiIFzs'});

router.post("/enhance-comment", async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { comment } = req.body;
    
    // Send comment to Gemini AI
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Give Students ideas to tackle the given comments for their SOP in 5-10 sentences: "${comment}"`,
    });

    const enhancedComment = response.text; // Extract AI-enhanced text
    res.json({ enhancedComment });
  } catch (error) {
    console.error("Gemini AI error:", error);
    res.status(500).json({ error: "Failed to enhance comment" });
  }
});
router.post("/test-body", (req, res) => {
    console.log("Received request body:", req.body);
    res.json({ receivedBody: req.body });
  });



module.exports = router
