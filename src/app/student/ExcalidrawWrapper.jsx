import { useState } from "react";
import { Excalidraw, exportToBlob } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { Button } from "@/components/ui/button";

function App() {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  // Hide Excalidraw’s default export/save buttons
  const UIOptions = {
    canvasActions: {
      changeViewBackgroundColor: false,
      clearCanvas: false,
      loadScene: false,
      saveToActiveFile: false,
      saveAsImage: false,
      export: false, // 🔹 disables built-in Export menu
      image: false
    },
    tools: {
      image: false
    }
  };

  const handleExport = async () => {
    if (!excalidrawAPI) return;

    const elements = excalidrawAPI.getSceneElements();
    if (!elements || !elements.length) return;

    // Export to Blob (PNG)
    const blob = await exportToBlob({
      elements,
      appState: {
        exportWithDarkMode: false,
      },
      files: excalidrawAPI.getFiles(),
      mimeType: "image/png",
      quality: 0.92,
    });

    // Trigger download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "excalidraw-diagram.png";
    link.click();
    URL.revokeObjectURL(url);

    
  };

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <Excalidraw  renderTopRightUI={() => {
          return (
            <Button onClick={handleExport}>
              Save File
            </Button>
          );
        }} excalidrawAPI={(api) => setExcalidrawAPI(api)} UIOptions={UIOptions} />
      </div>
    </>
  );
}

export default App;
