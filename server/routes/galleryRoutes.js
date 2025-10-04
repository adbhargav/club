import express from "express";
import Gallery from "../models/Gallery.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload gallery image
router.post("/", protect, admin, upload.single("image"), async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const result = await cloudinary.uploader.upload(req.file.path);
    const galleryItem = await Gallery.create({
      title,
      description,
      imageURL: result.secure_url,
    });

    res.status(201).json(galleryItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all gallery images
router.get("/", async (req, res) => {
  try {
    const gallery = await Gallery.find();
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
