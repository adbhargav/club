import express from "express";
import Notice from "../models/Notice.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Issue notice
router.post("/", protect, admin, async (req, res) => {
  const { title, description } = req.body;
  try {
    const notice = await Notice.create({ title, description });
    res.status(201).json(notice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all notices
router.get("/", protect, async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
