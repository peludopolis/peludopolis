"use client";

import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/authContext';
import Image from 'next/image';
import Link from 'next/link';

const Greeting = () => {
    const { user } = useContext(AuthContext);

    // Verificar si el usuario está logueado
    if (!user?.user) {
        return null; // Si no hay usuario, no renderizar nada
    }

    return (
        <div className="flex items-center">
            <Link href="/dashboard">
                <Image
                    src={user.user.picture || "/images/predeterminada.jpg"}
                    alt="User Profile"
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                />
            </Link>
            <h1 className="ml-2 text-danger">
                {user.user.name}
            </h1>
        </div>
    );
};

export default Greeting;



