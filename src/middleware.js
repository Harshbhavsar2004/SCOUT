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

  const role = sessionClaims?.metadata?.role
  console.log("Role from session:", role)

  // ✅ Role-based route patterns
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

})

export const config = {
  matcher: [
    // Run middleware for everything except static files/_next
    "/((?!_next|.*\\..*).*)",
  ],
}
