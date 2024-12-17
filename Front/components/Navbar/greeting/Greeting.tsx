"use client";

import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/authContext';

const Greeting = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex items-center">
            {user?.user?.picture && (
                <img 
                    src={user.user.picture} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full mr-3" 
                />
            )}
            <h1 className="ml-2 text-danger">
                {user?.user?.name}
            </h1>
        </div>
    );
};

export default Greeting;


