import express from "express";
import Project from "../models/Project.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit project
router.post("/", protect, async (req, res) => {
  const { title, description, githubLink } = req.body;
  try {
    const project = await Project.create({
      student: req.user._id,
      title,
      description,
      githubLink,
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all projects (Admin)
router.get("/", protect, admin, async (req, res) => {
  try {
    const projects = await Project.find().populate("student", "name email registerNumber");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
