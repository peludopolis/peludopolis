import React from 'react'
import PostList from '../../components/post/PostList';
import Link from 'next/link';

const page = () => {
    return (
        <div >
            <Link href='/post' className='flex justify-center'>
                <button className='bg-dark text-white py-2 px-4 rounded-full font-bold text-lg hover:bg-primary transition flex items-center justify-center space-x-2 group'>
                    Dejar mi experiencia
                </button>
            </Link>
            <h1 className="text-center font-title text-primary text-2xl font-extrabold sm:text-3xl m-4">
                Conoce la experiencia de nuestros clientes
            </h1>
            <PostList />
            <h1 className="text-center font-title text-primary text-2xl font-extrabold sm:text-3xl m-4">
                Comenta y comparte
            </h1>
        </div>
    )
}

export default page;