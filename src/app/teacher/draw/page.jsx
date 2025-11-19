"use client";

import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const ExcalidrawWrapper = dynamic(
  () => import("../ExcalidrawWrapper"),
  { ssr: false }
);

export default function DrawPage() {
  const searchParams = useSearchParams();
  const questionId = searchParams.get("questionId");

  return (
    <div className="h-screen">
      <ExcalidrawWrapper questionId={questionId} />
    </div>
  );
}
