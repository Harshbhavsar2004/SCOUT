import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PostLoginRedirect() {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role;

  switch (role) {
    case "admin":
      redirect("/admin");
    case "teacher":
      redirect("/teacher");
    case "coordinator":
      redirect("/coordinator");
    default:
      redirect("/student");
  }
}
