import express from "express";
import Event from "../models/Event.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Create event
router.post("/", protect, admin, upload.single("image"), async (req, res) => {
  const { title, description, date, location } = req.body;
  try {
    let imageURL = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageURL = result.secure_url;
    }

    const event = await Event.create({ title, description, date, location, imageURL });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update event
router.put("/:id", protect, admin, upload.single("image"), async (req, res) => {
  const { title, description, date, location } = req.body;
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      event.imageURL = result.secure_url;
    }

    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete event
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
