import express from "express";
import Assignment from "../models/Assignment.js";
import Project from "../models/Project.js";
import Event from "../models/Event.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/stats - fetch user stats
router.get("/", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    // Count projects submitted by the student
    const projectsCount = await Project.countDocuments({ student: userId });
    
    // For assignments and events, just count total available (since Assignment/Event models don't track individual student completion)
    const assignmentsCount = await Assignment.countDocuments();
    const eventsCount = await Event.countDocuments();

    res.json({
      assignments: assignmentsCount,
      projects: projectsCount,
      events: eventsCount,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
