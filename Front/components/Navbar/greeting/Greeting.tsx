"use client";

import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/authContext';
import Image from 'next/image';

const Greeting = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex items-center">
            {user?.user?.picture && (
                <Image 
                    src={user.user.picture} 
                    alt="Profile" 
                    width={40} 
                    height={40} 
                    className="rounded-full mr-3" 
                />
            )}
            <h1 className="ml-2 text-danger">
                {user?.user?.name}
            </h1>
        </div>
    );
};

export default Greeting;


