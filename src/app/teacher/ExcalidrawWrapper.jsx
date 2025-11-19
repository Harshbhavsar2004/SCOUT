"use client";

import { useState } from "react";
import { Excalidraw, exportToBlob } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { Button } from "@/components/ui/button";

function App() {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const [saving, setSaving] = useState(false); // ⬅️ Loading state

  // HIDE Excalidraw default UI
  const UIOptions = {
    canvasActions: {
      changeViewBackgroundColor: false,
      clearCanvas: false,
      loadScene: false,
      saveToActiveFile: false,
      saveAsImage: false,
      export: false,
      image: false,
    },
    tools: {
      image: false,
    },
  };

  const handleExport = async () => {
    if (!excalidrawAPI) return;

    setSaving(true); // ⬅️ Start loading

    try {
      console.log("🟦 Step 1: Exporting canvas...");
      const elements = excalidrawAPI.getSceneElements();
      if (!elements.length) throw new Error("Canvas is empty!");

      const blob = await exportToBlob({
        elements,
        appState: { exportWithDarkMode: false },
        files: excalidrawAPI.getFiles(),
        mimeType: "image/png",
        quality: 0.92,
      });
      const file = new File([blob], "diagram.png", { type: "image/png" });

      console.log("🟧 Step 2: Requesting Cloudinary signature...");
      const timestamp = Math.round(Date.now() / 1000);
      const signRes = await fetch("/api/cloudinary-sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paramsToSign: { timestamp, folder: "teacher-diagrams" } }),
      }).then((res) => res.json());

      if (!signRes.signature) throw new Error("Failed to generate Cloudinary signature");

      console.log("☁️ Step 3: Uploading to Cloudinary...");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("timestamp", timestamp);
      formData.append("signature", signRes.signature);
      formData.append("folder", "teacher-diagrams");
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      ).then((res) => res.json());

      if (!uploadRes.secure_url) throw new Error("Cloudinary upload failed");

      const diagramUrl = uploadRes.secure_url;
      console.log("✅ Uploaded to Cloudinary:", diagramUrl);

      console.log("🟪 Step 4: Saving URL to DB...");
      const questionId = new URLSearchParams(window.location.search).get("questionId");

      const dbRes = await fetch("/api/questions/add-diagram", {
        method: "PUT", // ⬅️ Use PUT
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, diagramUrl }),
      }).then((res) => res.json());

      if (!dbRes.success) throw new Error("Failed to save diagram URL in DB");

      console.log("🎉 Diagram saved successfully in DB!", dbRes.question);
      alert("Diagram saved successfully!");
    } catch (err) {
      console.error("❌ Error:", err);
      alert(err.message || "Something went wrong!");
    } finally {
      setSaving(false); // ⬅️ Stop loading
    }
  };

  return (
    <div className="flex flex-col w-full h-full relative">
      {saving && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50 text-xl font-semibold">
          Saving...
        </div>
      )}

      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        UIOptions={UIOptions}
        renderTopRightUI={() => (
          <Button onClick={handleExport} disabled={saving}>
            {saving ? "Saving..." : "Save File"}
          </Button>
        )}
      />
    </div>
  );
}

export default App;
