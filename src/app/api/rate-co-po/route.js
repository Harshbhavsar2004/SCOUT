import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { cos, pos, syllabus } = body;

    if (!cos || !pos) {
      return NextResponse.json(
        { success: false, message: "cos and pos are required" },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert in Outcome-Based Education (OBE).
Assign CO–PO mapping ratings based on logical academic relevance.

Rating Rules:
0 = No association  
1 = Low association  
2 = Medium association  
3 = High association  

### Syllabus:
${syllabus}

### Course Outcomes:
${cos.map((c) => `${c.coID}: ${c.description}`).join("\n")}

### Program Outcomes:
${pos.map((p) => `${p.code}: ${p.desc}`).join("\n")}

### Task:
Return ONLY JSON in this exact structure:
{
  "CO1": { "PO1": 0, "PO2": 3, ... },
  "CO2": { "PO1": 2, "PO2": 1, ... },
  ...
}
Do NOT include \`\`\` or extra text.
`;

    const completion = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    let raw = completion.output_text;

    // 🔥 remove code block wrappers if present
    raw = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

    const result = JSON.parse(raw);
    return NextResponse.json({ success: true, matrix: result });
  } catch (err) {
    console.error("CO–PO Rating Error:", err);
    return NextResponse.json(
      { success: false, message: "Internal error while generating ratings." },
      { status: 500 }
    );
  }
}
