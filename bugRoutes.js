const express = require("express");
const router = express.Router();
const Bug = require("./bugModel");

// Get all bugs
router.get("/", async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bugs" });
  }
});

// Create a new bug
router.post("/", async (req, res) => {
  try {
    const newBug = new Bug(req.body);
    await newBug.save();
    res.status(201).json(newBug);
  } catch (error) {
    res.status(400).json({ message: "Failed to create bug" });
  }
});

module.exports = router;
