"use client";

import React from 'react';
import { Trash2, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Datos mockeados de posts
const MOCK_POSTS = [
    {
        id: 'mock1',
        userId: 'user123',
        description: '¡Mi perro quedó súper feliz después de su sesión de estética! El personal fue muy amable y profesional.',
        image: '/images/perrito.jpeg',
        createdAt: new Date().toISOString()
    },
    {
        id: 'mock2',
        userId: 'user456',
        description: 'Increíble servicio de baño y corte para mi gato. Muy recomendado el centro de estética.',
        image: '/images/gato.jpeg',
        createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
        id: 'mock3',
        userId: 'user789',
        description: 'Primera vez que llevo a mi mascota y estoy super satisfecho. Limpieza, profesionalismo y cariño.',
        image: '/images/gato2.jpeg',
        createdAt: new Date(Date.now() - 172800000).toISOString()
    },
    {
        id: 'mock4',
        userId: 'user101',
        description: 'Un servicio excepcional. Mi mascota salió completamente renovada y feliz.',
        image: '/images/perrito2.jpeg',
        createdAt: new Date(Date.now() - 259200000).toISOString()
    }
];

const PostMocks: React.FC = () => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-muted">
                {MOCK_POSTS.map(post => (
                    <div
                        key={post.id}
                        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl relative group"
                    >
                        {post.image && (
                            <div className="h-48 w-full overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt="Post imagen"
                                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                                    width={300}
                                    height={300}
                                />
                            </div>
                        )}

                        <div className="p-6">
                            <div className="flex items-center mb-3 space-x-3">
                                <UserIcon className="text-cyan-500 w-8 h-8" />
                                <div>
                                    {/*                 <h3 className="font-bold text-lg text-gray-800">
                  ID: {post.userId}
                </h3> */}
                                    <p className="text-sm text-gray-500">
                                        {formatDate(post.createdAt)}
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-4 line-clamp-3">
                                {post.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostMocks;