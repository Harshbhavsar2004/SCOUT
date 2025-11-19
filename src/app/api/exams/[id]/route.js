import { connectDB } from "@/lib/db";
import Exam from "../../models/Exam";
import Question from "../../models/Question";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const id = params.id; // get ID from URL path
    console.log("Fetching exam ID:", id);

    if (!id) return new Response(JSON.stringify({ error: "Missing exam ID" }), { status: 400 });

    const exam = await Exam.findById(id);
    if (!exam) return new Response(JSON.stringify({ error: "Exam not found" }), { status: 404 });

    const questions = await Question.find({ examId: id });

    return new Response(JSON.stringify({ exam, questions }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error", details: err.message }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const id = params.id;
    if (!id) return new Response(JSON.stringify({ error: "Missing exam ID" }), { status: 400 });

    const body = await req.json();
    const updatedExam = await Exam.findByIdAndUpdate(id, body, { new: true });

    return new Response(JSON.stringify({ exam: updatedExam }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to update exam", details: err.message }), { status: 500 });
  }
}

// ---------------------
// DELETE exam by ID
// ---------------------
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const id = params.id;
    if (!id) return new Response(JSON.stringify({ error: "Missing exam ID" }), { status: 400 });

    // Delete all questions related to this exam first
    await Question.deleteMany({ examId: id });

    // Then delete the exam
    const deletedExam = await Exam.findByIdAndDelete(id);
    if (!deletedExam) return new Response(JSON.stringify({ error: "Exam not found" }), { status: 404 });

    return new Response(JSON.stringify({ success: true, message: "Exam deleted successfully" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to delete exam", details: err.message }), { status: 500 });
  }
}
