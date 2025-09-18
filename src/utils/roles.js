import { auth } from "@clerk/nextjs/server"

// Check if logged in user has a specific role
export async function checkRole(role) {
  const { sessionClaims } = await auth()
  return sessionClaims?.metadata?.role === role
}
