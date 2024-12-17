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
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3vmVvhdhYy7rj0AkIP4A42d2S39-bxgNLHw&s',
        createdAt: new Date().toISOString()
    },
    {
        id: 'mock2',
        userId: 'user456',
        description: 'Increíble servicio de baño y corte para mi gato. Muy recomendado el centro de estética.',
        image: 'https://www.hola.com/horizon/landscape/a039f8eb7ba2-lenguaje-corporal-gato-felicidad-estres-miedo-t.jpg',
        createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
        id: 'mock3',
        userId: 'user789',
        description: 'Primera vez que llevo a mi mascota y estoy super satisfecho. Limpieza, profesionalismo y cariño.',
        image: 'data:image/jpeg;base64,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',
        createdAt: new Date(Date.now() - 172800000).toISOString()
    },
    {
        id: 'mock4',
        userId: 'user101',
        description: 'Un servicio excepcional. Mi mascota salió completamente renovada y feliz.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqtnDBWX7tfO9moeMJQ-OhT-4QABu7M7h1fwbShVKd01FWz8St-8RakvOYXotGYNwVQfA&usqp=CAU',
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