import React from 'react'
import PostMocks from '../../components/post/PostMocks';
import PostList from '../../components/post/PostList';
import Link from 'next/link';

const page = () => {
    return (
        <div>
            <Link href='/post' className='flex justify-center'>
                <button className='bg-cyan-600 text-white py-2 px-4 rounded-full font-bold text-lg hover:bg-cyan-700 transition flex items-center justify-center space-x-2 group'>
                    Dejar mi experiencia
                </button>
            </Link>
            <PostMocks />
            <PostList />
        </div>
    )
}

export default page;