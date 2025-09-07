import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isTeacherRoute = createRouteMatcher(["/teacher(.*)"]);
const isCoordinatorRoute = createRouteMatcher(["/coordinator(.*)"]);
const isStudentRoute = createRouteMatcher(["/student(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);


export default clerkMiddleware(async (auth, req) => {
  const role = (await auth()).sessionClaims?.metadata?.role;
  // Single-role approach
  if ((isTeacherRoute(req) && role !== "teacher") ||
      (isCoordinatorRoute(req) && role !== "coordinator") ||
      (isAdminRoute(req) && role !== "admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  
  // If multiple roles set via array, use hasRole(...)
});

export const config = { matcher: ["/((?!_next).*)"] };
