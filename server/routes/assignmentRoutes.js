import express from "express";
import Assignment from "../models/Assignment.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Give assignment
router.post("/", protect, admin, upload.single("file"), async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    let fileURL = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      fileURL = result.secure_url;
    }

    const assignment = await Assignment.create({ title, description, dueDate, fileURL });
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all assignments
router.get("/", protect, async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
