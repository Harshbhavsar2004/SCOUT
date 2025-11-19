import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { syllabus, pos } = body;

    if (!syllabus || !pos || !Array.isArray(pos)) {
      return NextResponse.json(
        { success: false, message: "Invalid input. Syllabus and an array of POs are required." },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert in Outcome-Based Education (OBE). Generate exactly 5 Course Outcomes (COs) based strictly on the given syllabus. Each CO must be measurable and action-oriented.

Rules:
- DO NOT mention Program Outcomes (PO)
- EXACTLY 5 COs
- Sequential numbering (CO1–CO5)

### Syllabus:
${syllabus}

### Output format (JSON only):
[
  { "coID": "CO1", "description": "..." },
  { "coID": "CO2", "description": "..." },
  { "coID": "CO3", "description": "..." },
  { "coID": "CO4", "description": "..." },
  { "coID": "CO5", "description": "..." }
]
Return ONLY the JSON array — no extra text.
`;

    const completion = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    // Extract JSON safely
    const jsonStr = completion.output_text;
    const parsed = JSON.parse(jsonStr);

    return NextResponse.json({ success: true, cos: parsed });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error during CO generation." },
      { status: 500 }
    );
  }
}
