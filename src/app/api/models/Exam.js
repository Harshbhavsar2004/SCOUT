import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    title: String,
    date: String,
    duration: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Exam || mongoose.model("Exam", ExamSchema);
