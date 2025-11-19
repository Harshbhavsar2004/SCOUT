import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

export default async function TeacherPage() {
  // role guard
  if (!(await checkRole("teacher"))) redirect("/");

  // 🔥 Static data — replace anytime later
  const createdExams = [
    {
      id: "EX101",
      title: "JavaScript Basics Test",
      description: "Covers variables, loops, functions",
      totalQuestions: 20,
      createdAt: "2025-01-15",
    },
    {
      id: "EX102",
      title: "Python Fundamentals",
      description: "Covers datatypes, control flow, OOP",
      totalQuestions: 25,
      createdAt: "2025-01-20",
    },
  ];

  const upcoming = {
    id: "EX200",
    title: "React Advanced Exam",
    description: "Hooks, Context API, Lifecycle",
    date: "2025-02-10",
    time: "10:00 AM",
    duration: 60,
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Teacher Dashboard</h1>

      {/* Created Exams Section */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Your Created Exams</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {createdExams.map((exam) => (
            <div
              key={exam.id}
              className="border p-4 rounded-lg shadow-sm bg-white"
            >
              <h3 className="text-lg font-bold">{exam.title}</h3>
              <p className="text-sm text-gray-500">{exam.description}</p>
              <p className="mt-2 text-sm">
                Total Questions:{" "}
                <span className="font-medium">{exam.totalQuestions}</span>
              </p>
              <p className="text-sm">
                Created On:{" "}
                <span className="font-medium">
                  {new Date(exam.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Exam Section */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Upcoming Exam</h2>

        <div className="border p-5 rounded-lg shadow bg-blue-50">
          <h3 className="text-lg font-bold text-blue-700">{upcoming.title}</h3>
          <p className="text-gray-700 mb-2">{upcoming.description}</p>

          <p>
            Scheduled Date:{" "}
            <span className="font-semibold">
              {new Date(upcoming.date).toLocaleDateString()}
            </span>
          </p>
          <p>
            Time: <span className="font-semibold">{upcoming.time}</span>
          </p>
          <p>
            Duration:{" "}
            <span className="font-semibold">{upcoming.duration} mins</span>
          </p>
        </div>
      </section>
    </div>
  );
}
