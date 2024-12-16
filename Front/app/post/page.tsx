import React from "react";
import PostForm from "../../components/post/PostForm";
import Link from "next/link";

const post = () => {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold text-primary text-center mt-4 mb-6">
        Nos encantaría conocer tu experiencia, tu opinión nos ayuda a mejorar
      </h2>
      <PostForm />
      <Link href='/comunity' className="flex justify-center">
        <button className='bg-cyan-600 text-white py-2 px-4 rounded-full font-bold text-lg hover:bg-cyan-700 transition flex items-center justify-center space-x-2 group'>
          Ver todas las experiencias
        </button>
      </Link>
    </div>
  )
}

export default post;