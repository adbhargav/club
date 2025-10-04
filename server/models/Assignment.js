import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  fileURL: { type: String }, // Optional: PDF or doc link
}, { timestamps: true });

export default mongoose.model("Assignment", assignmentSchema);
