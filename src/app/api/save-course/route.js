import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "../models/Course";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { subjectName, syllabus, pos, cos , coPoMatrix = null } = body;

    const saved = await Course.create({
      subjectName,      // ⬅ NEW
      syllabus,
      pos,
      cos,
      coPoMatrix: null
    });

    return NextResponse.json(
      { success: true, message: "Saved successfully", id: saved._id },
      { status: 200 }
    );
  } catch (err) {
    console.error("Save Course Error:", err);
    return NextResponse.json(
      { success: false, message: "DB Error" },
      { status: 500 }
    );
  }
}
