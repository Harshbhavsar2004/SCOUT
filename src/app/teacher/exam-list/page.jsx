"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function TeacherExamsList() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);

  // ---------------------------------------------------
  // FETCH ALL EXAMS FROM DB
  // ---------------------------------------------------
  useEffect(() => {
    async function loadExams() {
      try {
        const res = await fetch("/api/exams", { cache: "no-store" });
        const data = await res.json();
        setExams(data.exams || []);
      } catch (err) {
        console.error("❌ Failed to load exams:", err);
      }
      setLoading(false);
    }

    loadExams();
  }, []);

  // ---------------------------------------------------
  // DELETE EXAM
  // ---------------------------------------------------
  async function handleDelete(examId) {
    const confirmDelete = confirm("Are you sure you want to delete this exam?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/exams/${examId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        // Remove deleted exam from state
        setExams((prev) => prev.filter((e) => e._id !== examId));
        alert("✅ Exam deleted successfully!");
      } else {
        alert("❌ Failed to delete exam: " + data.error);
      }
    } catch (err) {
      console.error("❌ Failed to delete exam:", err);
      alert("❌ Failed to delete exam");
    }
  }

  if (loading) return <div className="p-6">Loading exams...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Exams</h1>

      {exams.length === 0 ? (
        <div>No exams found.</div>
      ) : (
        <div className="space-y-4">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="border p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold">{exam.title}</h3>
                <p className="text-sm text-gray-600">
                  Date: {exam.date?.substring(0, 10)}  
                </p>
                <p className="text-sm text-gray-600">
                  Duration: {exam.duration} mins
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    router.push(`/teacher/edit-exam?examId=${exam._id}`)
                  }
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => handleDelete(exam._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
