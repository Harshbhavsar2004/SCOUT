"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CreateExamPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isDiagramMode, setIsDiagramMode] = useState(false); // 👈 NEW

  // ---------------------------------------------------
  // STEP 1: Create Exam
  // ---------------------------------------------------
  async function handleExamSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const res = await fetch("/api/exams", {
      method: "POST",
      body: JSON.stringify({
        title: form.get("title"),
        date: form.get("date"),
        duration: form.get("duration"),
      }),
    });

    const data = await res.json();

    setExam(data.exam);
    setStep(2);
    setLoading(false);
  }

  // ---------------------------------------------------
  // STEP 2: Add Question
  // ---------------------------------------------------
  async function handleQuestionSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    // FINAL SUBMIT REQUEST (same as yours)
    const qRes = await fetch("/api/questions", {
      method: "POST",
      body: JSON.stringify({
        examId: exam._id,
        text: form.get("question"),
        options: isDiagramMode
          ? [] // 👈 No options if diagram question
          : [
              form.get("option1"),
              form.get("option2"),
              form.get("option3"),
              form.get("option4"),
            ],
        answer: isDiagramMode ? null : form.get("answer"),
      }),
    });

    const question = await qRes.json();

    setQuestions((prev) => [...prev, question]);

    // IF teacher selected "Yes → draw"
    if (form.get("diagram") === "yes") {
      setLoading(true); // 👈 overlay loading enabled
      router.push(`/teacher/draw?questionId=${question._id}`);
      return;
    }

    setLoading(false);
    e.target.reset();
  }

  return (
    <div className="p-6 max-w-3xl mx-auto relative">

      {/* LOADING OVERLAY WHEN REDIRECTING */}
      {loading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-xl font-semibold z-50">
          Redirecting...
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Create Exam</h1>

      {/* STEP 1 */}
      {step === 1 && (
        <form
          onSubmit={handleExamSubmit}
          className="space-y-4 p-4 border rounded-lg"
        >
          <div>
            <label>Exam Title</label>
            <input
              name="title"
              className="w-full border p-2 rounded"
              placeholder="Enter exam title"
              required
            />
          </div>

          <div>
            <label>Date</label>
            <input
              type="date"
              name="date"
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label>Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Exam"}
          </Button>
        </form>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <h2 className="text-xl font-semibold mt-8">Add Questions</h2>

          <form
            onSubmit={handleQuestionSubmit}
            className="space-y-4 mt-4 p-4 border rounded-lg"
          >
            <div>
              <label>Question</label>
              <textarea
                name="question"
                className="w-full border p-2 rounded"
                placeholder="Enter the question"
                required
              />
            </div>

            {/* OPTIONS ONLY WHEN NOT DIAGRAM QUESTION */}
            {!isDiagramMode && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <input name="option1" className="border p-2 rounded" placeholder="Option 1" required />
                  <input name="option2" className="border p-2 rounded" placeholder="Option 2" required />
                  <input name="option3" className="border p-2 rounded" placeholder="Option 3" required />
                  <input name="option4" className="border p-2 rounded" placeholder="Option 4" required />
                </div>

                <div>
                  <label>Correct Answer</label>
                  <select name="answer" className="border p-2 rounded w-full">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                  </select>
                </div>
              </>
            )}

            {/* DIAGRAM SELECT */}
            <div>
              <label>Add Diagram?</label>
              <select
                name="diagram"
                className="border p-2 rounded w-full"
                onChange={(e) => setIsDiagramMode(e.target.value === "yes")}
              >
                <option value="no">No</option>
                <option value="yes">Yes, draw diagram</option>
              </select>
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Add Question"}
            </Button>
          </form>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Added Questions</h3>
            {questions.map((q, i) => (
              <div key={i} className="p-3 border rounded mb-2">
                <p className="font-medium">Q{i + 1}: {q.text}</p>
                {q.diagramId && (
                  <span className="text-green-600 text-sm">✔ Diagram attached</span>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
