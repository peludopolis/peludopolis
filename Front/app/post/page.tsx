import React from 'react'
import PostForm from "../../components/post/PostForm"

const page = () => {
  return (
    <div>
                    <h1 className="text-center font-title text-primary text-2xl font-extrabold sm:text-3xl m-4">
                Dejanos tu experiencia
            </h1>
        <PostForm />
    </div>
  )
}

export default page;