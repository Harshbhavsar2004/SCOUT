import { Suspense } from "react";
import DrawPage from "./drawpage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DrawPage />
    </Suspense>
  );
}
