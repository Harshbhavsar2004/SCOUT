// utils/roles.js
import { auth } from "@clerk/nextjs/server";

/**
 * Checks if user has a specific role.
 * @param {string} roleName
 * @returns {Promise<boolean>}
 */
export async function checkRole(roleName) {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata?.role === roleName;
}
