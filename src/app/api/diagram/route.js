import { connectDB } from "@/lib/db";
import Question from "../models/Question";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const update = await Question.findByIdAndUpdate(
      body.questionId,
      { diagram: body.diagram }, // Save excalidraw JSON or link
      { new: true }
    );

    return Response.json(update);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
