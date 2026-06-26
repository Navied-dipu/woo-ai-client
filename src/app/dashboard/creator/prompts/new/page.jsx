import React from 'react';
import CreatePrompts from './CreatePrompts';
import { getUserSession } from '@/lib/core/session';

const page = () => {
    const user = getUserSession(); // Call the getUserSession function to retrieve the user session
    return (
        <div>
            <CreatePrompts user={user}></CreatePrompts>
        </div>
    );
};

export default page;