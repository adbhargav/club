import express from "express";
import Notice from "../models/Notice.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Issue notice
router.post("/", protect, admin, async (req, res) => {
  const { title, description, date, link } = req.body;
  try {
    const notice = await Notice.create({ title, description, date, link });
    res.status(201).json(notice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all notices
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update notice
router.put("/:id", protect, admin, async (req, res) => {
  const { title, description, date, link } = req.body;
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });

    notice.title = title || notice.title;
    notice.description = description || notice.description;
    notice.date = date || notice.date;
    notice.link = link || notice.link;

    await notice.save();
    res.json(notice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete notice
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });

    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: "Notice deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
