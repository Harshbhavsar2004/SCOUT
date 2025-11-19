"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SampleXlsxPreview from "@/components/sample-xlsx-preview";
import { useRouter } from "next/navigation";
import SyllabusInput from "@/components/syllabus-input";
import PoUploadSection from "@/components/po-upload-section";
import PoTable from "@/components/po-table";
import CoGenerationPanel from "@/components/co-generation-panel";

export default function CoPoPage() {
  const [syllabus, setSyllabus] = useState("");
  const [pos, setPos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [fileName, setFileName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ code: "", desc: "" });
  const [subjectName, setSubjectName] = useState("");

  const router = useRouter();

  // Handle file upload
  async function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;

    setFileName(f.name);
    const ab = await f.arrayBuffer();
    const wb = XLSX.read(ab, { type: "array" });
    const firstSheet = wb.Sheets[wb.SheetNames[0]];
    const sheetJson = XLSX.utils.sheet_to_json(firstSheet, { defval: "" });

    const extracted = sheetJson
      .map((row) => ({
        id: Math.random().toString(36).substr(2, 9),
        code: row["PO Code"]?.toString().trim(),
        desc: row["PO Description"]?.toString().trim(),
      }))
      .filter((r) => r.code && r.desc);

    setPos(extracted);
  }

  // Download template
  function downloadTemplate() {
    const wsData = [
      ["PO Code", "PO Description"],
      ["PO1", "Engineering knowledge"],
      ["PO2", "Problem analysis"],
      ["PO3", "Design/development of solutions"],
      ["PO4", "Conduct investigations of complex problems"],
      ["PO5", "Modern tool usage"],
      ["PO6", "The engineer and society"],
      ["PO7", "Environment and sustainability"],
      ["PO8", "Ethics"],
      ["PO9", "Individual and team work"],
      ["PO10", "Communication"],
      ["PO11", "Project management and finance"],
      ["PO12", "Life-long learning"],
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "POs");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "po-template.xlsx";
    a.click();

    URL.revokeObjectURL(url);
  }

  // Edit PO
  function startEdit(id, code, desc) {
    setEditingId(id);
    setEditValues({ code, desc });
  }

  function saveEdit(id) {
    setPos(
      pos.map((p) =>
        p.id === id ? { ...p, code: editValues.code, desc: editValues.desc } : p
      )
    );
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditValues({ code: "", desc: "" });
  }

  // Delete PO
  function deletePo(id) {
    setPos(pos.filter((p) => p.id !== id));
  }

  // Generate COs
  async function generateCOs() {
    if (!syllabus.trim()) return alert("Please paste the syllabus text first.");
    if (!pos.length)
      return alert("Please upload a PO Excel with at least one PO.");

    setLoading(true);
    setGenerated(null);

    try {
      const res = await fetch("/api/generate-co", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          syllabus,
          pos: pos.map((p) => ({ code: p.code, desc: p.desc })),
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Server error");
      }

      const data = await res.json();

      setGenerated(data.cos || []);
    } catch (err) {
      console.error("Generate COs error:", err);
      alert("Failed to generate COs. Check console.");
    } finally {
      setLoading(false);
    }
  }

  function resetAll() {
    setSyllabus("");
    setPos([]);
    setGenerated(null);
    setFileName("");
    setEditingId(null);
  }
  async function saveToDatabase() {
    if (!generated?.length) return alert("Generate COs first.");
    if (!subjectName.trim()) return alert("Enter subject name first.");

    try {
      const res = await fetch("/api/save-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectName,
          syllabus,
          pos,
          cos: generated,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Saved Successfully!");
        router.push(`/teacher/co-po/map-co?id=${data.id}`); // ⬅ Redirect with record ID
      } else {
        alert("Failed to save");
      }
    } catch (err) {
      console.error(err);
      alert("DB Error");
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            CO — PO Mapping Dashboard
          </h1>
          <p className="text-muted-foreground">
            Generate Course Outcomes from Program Outcomes using AI
          </p>
        </div>

        <div className="mb-8">
          <label className="font-medium text-foreground">Subject Name</label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="Enter subject name"
            className="w-full border rounded-md p-2 text-sm mt-2"
          />
        </div>

        {/* Sample XLSX Preview - Top Left */}
        <div className="mb-8">
          <SyllabusInput syllabus={syllabus} setSyllabus={setSyllabus} />
        </div>

        {/* Main Layout: Left Panel (PO Management) + Right Panel (CO Display) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT PANEL: PO Management (Shorter: 4/12 width) */}
          <div className="lg:col-span-4 space-y-5">
            <PoUploadSection
              handleFile={handleFile}
              downloadTemplate={downloadTemplate}
              fileName={fileName}
            />
            <div className="flex gap-3">
              <Button
                onClick={generateCOs}
                disabled={loading || !pos.length || !syllabus.trim()}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {loading ? "Generating..." : "Generate COs"}
              </Button>
              <Button variant="outline" onClick={resetAll} className="flex-1">
                Reset All
              </Button>
            </div>
          </div>

          {/* RIGHT PANEL: CO Generation Display (Bigger: 8/12 width) */}
          <div className="lg:col-span-8">
            <PoTable
              pos={pos}
              editingId={editingId}
              editValues={editValues}
              setEditValues={setEditValues}
              startEdit={startEdit}
              saveEdit={saveEdit}
              cancelEdit={cancelEdit}
              deletePo={deletePo}
            />
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1">
          <CoGenerationPanel generated={generated} pos={pos} />
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            className="bg-green-600 hover:bg-green-700"
            disabled={!generated || !generated.length}
            onClick={saveToDatabase}
          >
            Save to Database
          </Button>
        </div>
      </div>
    </div>
  );
}
