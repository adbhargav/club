import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  link: { type: String }, // Assignment link
  fileURL: { type: String }, // Optional: PDF or doc link
}, { timestamps: true });

export default mongoose.model("Assignment", assignmentSchema);
