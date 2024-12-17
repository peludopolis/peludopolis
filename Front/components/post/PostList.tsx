"use client";

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { PostService } from './service';
import { Post } from './type';
import { Trash2, User as UserIcon } from 'lucide-react';
import Image from 'next/image';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await PostService.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    try {
      await PostService.deletePost(postId);
      fetchPosts();
    } catch (error) {
      console.error('Error eliminando post', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6  bg-muted">
      {posts.map(post => (
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
                  {formatDate(post.createdAt || new Date().toISOString())}
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-4 line-clamp-3">
              {post.description}
            </p>

            {user && user.id === post.userId && (
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500/20 text-red-600 p-2 rounded-full hover:bg-red-500/40 transition"
                  title="Eliminar post"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;