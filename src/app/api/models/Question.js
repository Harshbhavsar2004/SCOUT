import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
    },
    text: String,
    options: [String],
    answer: String,
    diagram: {
      type: String, // Store diagram JSON or export link
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Question ||
  mongoose.model("Question", QuestionSchema);
