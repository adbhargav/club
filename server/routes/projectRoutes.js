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

// Get all projects (Public for students to view)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate("student", "name email registerNumber");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all projects (Admin only - with full details)
router.get("/admin", protect, admin, async (req, res) => {
  try {
    const projects = await Project.find().populate("student", "name email registerNumber");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get student's own projects
router.get("/my-projects", protect, async (req, res) => {
  try {
    const projects = await Project.find({ student: req.user._id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update project (Admin only)
router.put("/:id", protect, admin, async (req, res) => {
  const { title, description, githubLink } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.title = title || project.title;
    project.description = description || project.description;
    project.githubLink = githubLink || project.githubLink;

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete project (Admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
