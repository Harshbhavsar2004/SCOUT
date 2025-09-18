import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

export default async function TeacherPage() {
  if (!(await checkRole("teacher"))) redirect("/");
  return <p>Teacher Dashboard</p>;
}
