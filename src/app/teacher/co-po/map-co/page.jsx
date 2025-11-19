import { Suspense } from "react";
import ViewCoursePage from "./viewcoursepage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewCoursePage />
    </Suspense>
  );
}
