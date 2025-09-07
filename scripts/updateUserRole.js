// Temporary script to update user role to admin
// Run this with: node scripts/updateUserRole.js

import { clerkClient } from '@clerk/nextjs/server';

async function updateUserToAdmin() {
  try {
    // Replace 'YOUR_USER_ID' with your actual Clerk user ID
    // You can find this in the Clerk Dashboard under Users
    const userId = 'YOUR_USER_ID'; // Replace with your actual user ID
    
    const updatedUser = await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'admin'
      }
    });

    console.log('User role updated to admin successfully!');
    console.log('Updated user:', updatedUser);
  } catch (error) {
    console.error('Error updating user role:', error);
  }
}

updateUserToAdmin();
