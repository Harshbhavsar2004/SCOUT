import { createClerkClient } from '@clerk/nextjs/server';

const clerkClientCustom = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function GET() {
  try {
    const users = await clerkClientCustom.users.getUserList({ limit: 100 });
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { userId, role } = await req.json();
    console.log(userId, role);

    if (!userId || !role) {
      return new Response(
        JSON.stringify({ error: 'userId and role are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Use the SAME client here
    const user = await clerkClientCustom.users.getUser(userId);

    const updatedMetadata = {
      ...user.publicMetadata,
      role,
    };

    const updatedUser = await clerkClientCustom.users.updateUser(userId, {
      publicMetadata: updatedMetadata,
    });

    return new Response(
      JSON.stringify({ message: 'Role updated successfully', user: updatedUser }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error updating role:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
