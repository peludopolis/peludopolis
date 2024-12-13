"use client";

import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/authContext';

const Greeting = () => {
    const { user } = useContext(AuthContext);

    if (!user) return null;

    return (
        <div>
            <h1 className='ml-2 text-danger'>
                {user.user.name}
            </h1>
        </div>
    );
};

export default Greeting;
