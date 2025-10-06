import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  link: String,
}, { timestamps: true });

export default mongoose.model("Notice", noticeSchema);
