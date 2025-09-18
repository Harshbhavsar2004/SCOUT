import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth()
  const pathname = req.nextUrl.pathname

  // ✅ Public routes that don't require login
  const publicRoutes = ["/", "/about", "/contact"] // add more if needed

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // ✅ If not logged in, redirect to sign-in
  if (!sessionClaims) {
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }

  const role = sessionClaims.metadata?.role
  console.log(role)

  // Define role-based access rules
  const roleRoutes = {
    student: /^\/student(\/|$)/,
    teacher: /^\/teacher(\/|$)/,
    admin: /^\/admin(\/|$)/,
    coordinator: /^\/coordinator(\/|$)/,
  }

  // ✅ Allow if user’s role matches the route
  if (role && roleRoutes[role] && roleRoutes[role].test(pathname)) {
    return NextResponse.next()
  }

  // ❌ Otherwise → redirect to home
  return NextResponse.redirect(new URL("/", req.url))
})

export const config = {
  matcher: [
    // Run middleware for everything except static files/_next
    "/((?!_next|.*\\..*).*)",
  ],
}
