import { connectDB } from "@/lib/db";
import Question from "../models/Question";

export default async function handler(req, res) {
  const { id } = req.query;

  await connectDB();

  if (req.method === "PUT") {
    try {
      const body = JSON.parse(req.body);

      const updatedQuestion = await Question.findByIdAndUpdate(
        id,
        {
          text: body.text,
          options: body.options,
          answer: body.answer,
          diagramUrl: body.diagramUrl || null,
        },
        { new: true }
      ).lean();

      res.status(200).json(updatedQuestion);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update question" });
    }
    return;
  }

  res.setHeader("Allow", ["PUT"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
