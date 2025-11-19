"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/admin/loading";
import { Button } from "@/components/ui/button";

export default function ViewCoursePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMapping, setShowMapping] = useState(false);
  const [matrix, setMatrix] = useState({});
  const [ratingLoading, setRatingLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/get-course?id=${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.course);
        // if mapping already exists, show it
        if (res.course?.coPoMatrix) {
          setMatrix(res.course.coPoMatrix);
          setShowMapping(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading || !data) return <Loading />;

  const setRating = (coID, poCode, value) => {
    setMatrix((prev) => ({
      ...prev,
      [coID]: {
        ...(prev[coID] || {}),
        [poCode]: value,
      },
    }));
  };

  // 🔥 Auto rate using OpenAI API
  async function autoRate() {
    setRatingLoading(true);
    try {
      const res = await fetch("/api/rate-co-po", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          syllabus: data.syllabus,
          pos: data.pos,
          cos: data.cos,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setMatrix(json.matrix);
        setShowMapping(true);
      } else {
        alert("AI failed to generate mapping.");
      }
    } catch (err) {
      console.error(err);
      alert("API error.");
    } finally {
      setRatingLoading(false);
    }
  }

  // 🔥 Save mapping to database
  async function saveMapping() {
    if (!matrix || Object.keys(matrix).length === 0) {
      return alert("Please map CO–PO before saving.");
    }

    setSaving(true);
    try {
      const res = await fetch("/api/save-matrix", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: id, matrix }),
      });

      const json = await res.json();
      if (json.success) {
        alert("CO–PO Mapping saved successfully!");
      } else {
        alert("Failed to save mapping");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while saving mapping");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Course Name */}
        <div>
          <h1 className="text-4xl font-bold">{data.subjectName}</h1>
          <p className="text-muted-foreground mt-1">Course ID: {data._id}</p>
        </div>

        {/* Syllabus */}
        <div className="border rounded-lg p-5 bg-muted/30 shadow-sm">
          <h2 className="font-semibold text-xl mb-2">Syllabus</h2>
          <p className="text-sm whitespace-pre-wrap">{data.syllabus}</p>
        </div>

        {/* POs */}
        <div className="border rounded-lg p-5 bg-muted/30 shadow-sm">
          <h2 className="font-semibold text-xl mb-4">Program Outcomes (POs)</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary/10">
                <th className="border p-2">PO Code</th>
                <th className="border p-2">PO Description</th>
              </tr>
            </thead>
            <tbody>
              {data.pos.map((po, index) => (
                <tr key={index}>
                  <td className="border p-2 font-medium">{po.code}</td>
                  <td className="border p-2">{po.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* COs */}
        <div className="border rounded-lg p-5 bg-muted/30 shadow-sm">
          <h2 className="font-semibold text-xl mb-4">Course Outcomes (COs)</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary/10">
                <th className="border p-2">CO ID</th>
                <th className="border p-2">Outcome Description</th>
              </tr>
            </thead>
            <tbody>
              {data.cos.map((co, index) => (
                <tr key={index}>
                  <td className="border p-2 font-medium">{co.coID}</td>
                  <td className="border p-2">{co.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 justify-end">
          <Button className="bg-primary" onClick={() => setShowMapping(true)}>
            Manual Mapping
          </Button>
          <Button
            className="bg-purple-600"
            onClick={autoRate}
            disabled={ratingLoading}
          >
            {ratingLoading ? "AI Rating..." : "Auto Map with AI"}
          </Button>
        </div>

        {/* CO–PO Mapping Table */}
        {showMapping && (
          <div className="mt-10 border rounded-lg p-5 bg-muted/20 shadow-sm">
            <h2 className="font-semibold text-xl mb-4">
              CO–PO Mapping (Rate 0–3)
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-[700px] w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="border p-2 w-40 text-left">CO ↓ / PO →</th>
                    {data.pos.map((po) => (
                      <th key={po.code} className="border p-2 text-center w-16">
                        {po.code}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.cos.map((co) => (
                    <tr key={co.coID}>
                      <td className="border p-2 font-medium">{co.coID}</td>
                      {data.pos.map((po) => (
                        <td key={po.code} className="border p-2 text-center">
                          <select
                            value={matrix[co.coID]?.[po.code] ?? ""}
                            onChange={(e) =>
                              setRating(co.coID, po.code, Number(e.target.value))
                            }
                            className="border rounded p-1 w-12 text-center"
                          >
                            <option value="">-</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex justify-end">
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={saveMapping}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Mapping"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
