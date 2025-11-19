import { connectDB } from "@/lib/db";
import Exam from "../models/Exam";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const exam = await Exam.create({
      title: body.title,
      date: body.date,
      duration: body.duration,
    });

    return Response.json({ success: true, exam });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}


export async function GET(req) {
  try {
    await connectDB();

    // Fetch all exams
    const exams = await Exam.find();

    // Print the full exam data in terminal
    console.log("All Exams →", exams);

    return Response.json({ success: true, exams });
  } catch (err) {
    console.error("Exam Fetch Error →", err); // also print error
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
