import { connectDB } from "@/lib/db";
import Question from "../models/Question";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const question = await Question.create({
      examId: body.examId,
      text: body.text,
      options: body.options,
      answer: body.answer,
      diagram: null, // will fill later
    });

    return Response.json(question);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();

    // Fetch all exams
    const exams = await Question.find();

    // Print the full exam data in terminal
    console.log("All Question →", exams);

    return Response.json({ success: true, exams });
  } catch (err) {
    console.error("Exam Fetch Error →", err); // also print error
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}