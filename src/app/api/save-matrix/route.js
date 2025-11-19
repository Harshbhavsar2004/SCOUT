import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "../models/Course";

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { courseId, matrix } = body;
    console.log(courseId, matrix);

    if (!courseId || !matrix) {
      return NextResponse.json(
        { success: false, message: "courseId and matrix are required" },
        { status: 400 }
      );
    }

    const updated = await Course.findByIdAndUpdate(
      courseId,
      { coPoMatrix: matrix },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "CO–PO mapping saved successfully",
      course: updated,
    });
  } catch (error) {
    console.error("SAVE MAPPING ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error while saving mapping" },
      { status: 500 }
    );
  }
}
