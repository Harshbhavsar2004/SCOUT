"use client";

import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";

// Dynamically import Excalidraw only on the client
const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  {
    ssr: false,
    loading: () => <p>Loading drawing board...</p>, // optional fallback
  }
);

const ExcalidrawWrapper = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Excalidraw />
    </div>
  );
};

export default ExcalidrawWrapper;
