import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  title: { type: String },
  imageURL: { type: String, required: true },
  description: { type: String },
  uploadedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Gallery", gallerySchema);
