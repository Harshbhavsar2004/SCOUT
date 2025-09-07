import { checkRole } from "@/lib/roles";
import { redirect } from "next/navigation";

export default async function TeacherPage() {
  if (!(await checkRole("teacher"))) redirect("/");
  return <p>Teacher Dashboard</p>;
}
