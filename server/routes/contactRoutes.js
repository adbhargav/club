// routes/contactRoutes.js
import express from "express";
import Contact from "../models/contact.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/contact
// @desc    Save contact form submission
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(201).json({ message: "Message received successfully!" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});

// @route   GET /api/contact
// @desc    Get all contact messages
// @access  Admin only
router.get("/", protect, admin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});

export default router;
