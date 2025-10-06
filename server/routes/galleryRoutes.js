import express from "express";
import multer from "multer";
import Gallery from "../models/Gallery.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create (Upload) Image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image uploaded" });
    const imageBase64 = req.file.buffer.toString("base64");
    const imageURL = `data:${req.file.mimetype};base64,${imageBase64}`;
    const newImage = await Gallery.create({
      title: req.body.title,
      description: req.body.description,
      imageURL,
    });
    res.status(201).json({ success: true, data: newImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Images
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update Image Metadata (title, description)
router.put("/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Image not found" });
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Image
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Gallery.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Image not found" });
    res.json({ success: true, data: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;