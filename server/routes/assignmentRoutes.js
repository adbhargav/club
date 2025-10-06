import express from "express";
import Assignment from "../models/Assignment.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Give assignment
router.post("/", protect, admin, upload.single("file"), async (req, res) => {
  const { title, description, dueDate, link } = req.body;
  try {
    let fileURL = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      fileURL = result.secure_url;
    }

    const assignment = await Assignment.create({ title, description, dueDate, fileURL, link });
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all assignments
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update assignment
router.put("/:id", protect, admin, upload.single("file"), async (req, res) => {
  const { title, description, dueDate, link } = req.body;
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    assignment.title = title || assignment.title;
    assignment.description = description || assignment.description;
    assignment.dueDate = dueDate || assignment.dueDate;
    assignment.link = link || assignment.link;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      assignment.fileURL = result.secure_url;
    }

    await assignment.save();
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete assignment
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Assignment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
