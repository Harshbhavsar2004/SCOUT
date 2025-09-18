'use server'

import { clerkClient } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Assign role
export async function setRole(formData) {
  const userId = formData.get('id')
  const role = formData.get('role')
  console.log(role)
  const search = formData.get('search') || ''

  try {
    const client = await clerkClient()
    const res = await client.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    })
    // Ensure the admin page data refreshes and preserve current search
    revalidatePath('/admin', 'page')
    redirect(`/admin${search ? `?search=${encodeURIComponent(search)}` : ''}`)
  } catch (err) {
    // On error, redirect back with an error message in query (optional)
    const errorMsg = encodeURIComponent(err.message || 'Something went wrong')
    redirect(`/admin${search ? `?search=${encodeURIComponent(search)}&` : '?'}error=${errorMsg}`)
  }
}

// Remove role
export async function removeRole(formData) {
  const userId = formData.get('id')
  const search = formData.get('search') || ''

  try {
    const client = await clerkClient()
    const res = await client.users.updateUserMetadata(userId, {
      publicMetadata: { role: null },
    })
    revalidatePath('/admin', 'page')
    redirect(`/admin${search ? `?search=${encodeURIComponent(search)}` : ''}`)
  } catch (err) {
    const errorMsg = encodeURIComponent(err.message || 'Something went wrong')
    redirect(`/admin${search ? `?search=${encodeURIComponent(search)}&` : '?'}error=${errorMsg}`)
  }
}
