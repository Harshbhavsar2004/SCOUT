"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function EditExamPage() {
  const router = useRouter();
  const params = useSearchParams();
  const examId = params.get("examId");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [step, setStep] = useState(1);
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [diagramMode, setDiagramMode] = useState({}); // per-question diagram mode

  // -----------------------------
  // Fetch exam and questions
  // -----------------------------
  useEffect(() => {
    async function fetchData() {
      console.log("Fetching data for examId:", examId);
      if (!examId) return;

      try {
        const res = await fetch(`/api/exams/${examId}`);
        if (!res.ok) throw new Error("Failed to fetch exam");
        const data = await res.json();

        setExam(data.exam);
        setQuestions(data.questions || []);
      } catch (err) {
        console.error("❌ Failed to fetch exam:", err);
        alert("Failed to load exam data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [examId]);

  // -----------------------------
  // Update exam
  // -----------------------------
  async function handleExamUpdate(e) {
    e.preventDefault();
    setSaving(true);

    const form = new FormData(e.target);

    try {
      const res = await fetch(`/api/exams/${examId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.get("title"),
          date: form.get("date"),
          duration: form.get("duration"),
        }),
      });

      const data = await res.json();
      setExam(data.exam);
      alert("✅ Exam updated!");
    } catch (err) {
      console.error("❌ Failed to update exam:", err);
      alert("Failed to update exam");
    } finally {
      setSaving(false);
    }
  }

  // -----------------------------
  // Update question
  // -----------------------------
  async function handleQuestionUpdate(e, questionId) {
    e.preventDefault();
    setSaving(true);

    const form = new FormData(e.target);

    const body = {
      text: form.get("question"),
      options:
        diagramMode[questionId] === "yes"
          ? []
          : [
              form.get("option1"),
              form.get("option2"),
              form.get("option3"),
              form.get("option4"),
            ],
      answer: diagramMode[questionId] === "yes" ? null : form.get("answer"),
    };

    try {
      const res = await fetch(`/api/questions/${questionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const updated = await res.json();
      setQuestions((prev) =>
        prev.map((q) => (q._id === updated._id ? updated : q))
      );

      // Redirect to draw page if diagram mode is yes
      if (diagramMode[questionId] === "yes") {
        router.push(`/teacher/draw?questionId=${questionId}`);
        return;
      }

      alert("✅ Question updated!");
    } catch (err) {
      console.error("❌ Failed to update question:", err);
      alert("Failed to update question");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-6">Loading exam...</div>;
  if (!exam) return <div className="p-6 text-red-500">Exam not found!</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto relative">
      {saving && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-xl font-semibold z-50">
          Saving...
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Edit Exam: {exam.title}</h1>

      {/* STEP SWITCH */}
      <div className="flex gap-3 mb-6">
        <Button
          variant={step === 1 ? "default" : "outline"}
          onClick={() => setStep(1)}
        >
          Edit Exam
        </Button>
        <Button
          variant={step === 2 ? "default" : "outline"}
          onClick={() => setStep(2)}
        >
          Edit Questions
        </Button>
      </div>

      {/* STEP 1: EDIT EXAM */}
      {step === 1 && (
        <form
          onSubmit={handleExamUpdate}
          className="space-y-4 p-4 border rounded-lg"
        >
          <div>
            <label>Title</label>
            <input
              name="title"
              className="w-full border p-2 rounded"
              defaultValue={exam.title}
              required
            />
          </div>

          <div>
            <label>Date</label>
            <input
              type="date"
              name="date"
              className="w-full border p-2 rounded"
              defaultValue={exam.date?.substring(0, 10)}
              required
            />
          </div>

          <div>
            <label>Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              className="w-full border p-2 rounded"
              defaultValue={exam.duration}
              required
            />
          </div>

          <Button type="submit">Save Exam</Button>
        </form>
      )}

      {/* STEP 2: EDIT QUESTIONS */}
      {step === 2 && (
        <div className="mt-6 space-y-6">
          {questions.length === 0 && <p>No questions for this exam yet.</p>}

          {questions.map((q, i) => (
            <div key={q._id} className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Question {i + 1}</h3>

              {/* Display diagram if exists */}
              {q.diagram && (
                <div className="mb-4">
                  <img
                    src={q.diagram}
                    alt={`Diagram for question ${i + 1}`}
                    className="max-w-full border rounded"
                  />
                </div>
              )}

              <form
                onSubmit={(e) => handleQuestionUpdate(e, q._id)}
                className="space-y-4"
              >
                <textarea
                  name="question"
                  defaultValue={q.text}
                  className="w-full border p-2 rounded"
                  required
                />

                {/* Show options if not diagram-based */}
                {!q.diagram && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        name="option1"
                        defaultValue={q.options[0]}
                        className="border p-2 rounded"
                      />
                      <input
                        name="option2"
                        defaultValue={q.options[1]}
                        className="border p-2 rounded"
                      />
                      <input
                        name="option3"
                        defaultValue={q.options[2]}
                        className="border p-2 rounded"
                      />
                      <input
                        name="option4"
                        defaultValue={q.options[3]}
                        className="border p-2 rounded"
                      />
                    </div>

                    <div>
                      <label>Correct Answer</label>
                      <select
                        name="answer"
                        defaultValue={q.answer}
                        className="border p-2 rounded w-full"
                      >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        <option value="option4">Option 4</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Diagram Mode */}
                <div>
                  <label>Change Diagram?</label>
                  <select
                    name="diagram"
                    className="border p-2 rounded w-full"
                    value={diagramMode[q._id] || "no"}
                    onChange={(e) =>
                      setDiagramMode((prev) => ({
                        ...prev,
                        [q._id]: e.target.value,
                      }))
                    }
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes, edit/add diagram</option>
                  </select>
                </div>

                <Button type="submit">Save Question</Button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
