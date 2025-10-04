import express from "express";
import TeamMember from "../models/TeamMember.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Add team member
router.post("/", protect, admin, upload.single("profileImage"), async (req, res) => {
  const { name, role, branch, year, contact } = req.body;
  try {
    let profileImageURL = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      profileImageURL = result.secure_url;
    }

    const member = await TeamMember.create({ name, role, branch, year, contact, profileImageURL });
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all team members
router.get("/", async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update team member
router.put("/:id", protect, admin, upload.single("profileImage"), async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    const { name, role, branch, year, contact } = req.body;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      member.profileImageURL = result.secure_url;
    }

    member.name = name || member.name;
    member.role = role || member.role;
    member.branch = branch || member.branch;
    member.year = year || member.year;
    member.contact = contact || member.contact;

    await member.save();
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete team member
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    await member.remove();
    res.json({ message: "Team member removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
