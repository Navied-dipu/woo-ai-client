
import AdminUsersTable from '@/components/Dashboard/AdminUserTable';
import { getAllUsers } from '@/lib/api/users';
import React from 'react';

const page = async () => {
    const users = await getAllUsers();
    // console.log('users', users);
    return (
        <div>
            <AdminUsersTable users={users} />
        </div>
    );
};

export default page;