"use client";

import { useEffect, useState } from 'react';

export function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/users');
    const result = await res.json();
    console.log(result);
    // Extract the array from the "data" property
    if (Array.isArray(result.data)) {
      setUsers(result.data);
    } else {
      setUsers([]);
      console.error('Invalid data from API:', result);
    }
  
    setLoading(false);
  };
  
  

  useEffect(() => {
    fetchUsers();
  }, []);

  // Change role
  const changeRole = async (userId, newRole) => {
    await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role: newRole }),
    });
    fetchUsers(); // refresh the list
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="p-4 border rounded-lg flex justify-between items-center bg-white dark:bg-gray-800"
        >
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{user.firstName} {user.lastName}</p>
            <p className="text-gray-500 dark:text-gray-400">{user.emailAddresses[0].emailAddress}</p>
            <p className="text-sm text-gray-400">Role: {user.publicMetadata?.role || 'student'}</p>
          </div>
          <div className="flex gap-2">
            {['admin', 'teacher', 'coordinator', 'student'].map((roleOption) => (
              <button
                key={roleOption}
                onClick={() => changeRole(user.id, roleOption)}
                className={`px-3 py-1 rounded ${
                  user.publicMetadata?.role === roleOption
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                {roleOption}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
