import React from 'react';
import Link from 'next/link';

const PostButtons = () => {
    return (
        <div>
            <div className='flex justify-around space-x-4 my-4'>
                <Link href='/comunity'>
                    <button className='bg-dark text-white py-2 px-4 rounded-full font-bold text-lg hover:bg-primary transition flex items-center justify-center space-x-2 group'>
                        Ver todas las experiencias
                    </button>
                </Link>
                <Link href='/post'>
                    <button className='bg-dark text-white py-2 px-4 rounded-full font-bold text-lg hover:bg-primary transition flex items-center justify-center space-x-2 group'>
                        Dejar mi experiencia
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default PostButtons;