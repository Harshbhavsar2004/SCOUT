import Question from "../../models/Question";
import { connectDB } from "@/lib/db";

export async function PUT(req) {
  await connectDB();

  try {
    const { questionId, diagramUrl } = await req.json();
    console.log("Received diagram URL for question:", questionId, diagramUrl);

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { diagram: diagramUrl },
      { new: true }
    );

    return Response.json({ success: true, question: updatedQuestion });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
