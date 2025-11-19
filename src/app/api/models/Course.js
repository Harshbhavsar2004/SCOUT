import mongoose from "mongoose";

const POSchema = new mongoose.Schema({
  id: String,
  code: String,
  desc: String,
});

const COSchema = new mongoose.Schema({
  coID: String,
  description: String,
});

const CourseSchema = new mongoose.Schema(
  {
    subjectName: String,
    syllabus: String,
    pos: [POSchema],
    cos: [COSchema],
    coPoMatrix: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
