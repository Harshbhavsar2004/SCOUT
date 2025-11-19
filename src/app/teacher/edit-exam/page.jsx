import { Suspense } from "react";
import EditExamPage from "./editexampage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditExamPage />
    </Suspense>
  );
}
