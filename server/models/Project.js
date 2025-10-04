import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  githubLink: { type: String },
  submissionDate: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
