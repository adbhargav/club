import mongoose from "mongoose";

const gallerySchema = mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    imageURL: { type: String, required: true }, // can be a base64 string or a local path
    type: { type: String, default: "image" },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
