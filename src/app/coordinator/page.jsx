import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

export default async function TeacherPage() {
  if (!(await checkRole("coordinator"))) redirect("/");
  return <p>Coordinator Dashboard</p>;
}
