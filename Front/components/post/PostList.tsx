"use client";

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { PostService, CommentService } from './service';
import { Post, Comment } from './type';
import { Trash2, User as UserIcon, MessageSquare } from 'lucide-react';
import Image from 'next/image';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await PostService.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  const fetchComments = async (postId: string) => {
    try {
      const comments = await CommentService.getComments(postId);
      setComments(comments);
    } catch (error) {
      console.error('Error fetching comments', error);
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

  const handleCommentSubmit = async (postId: string) => {
    if (!user || !newComment.trim()) return;
    
    try {
      await CommentService.createComment({
        content: newComment,
        postId: postId,
        userId: user.id
      });
      setNewComment('');
      fetchComments(postId);
    } catch (error) {
      console.error('Error creating comment', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-muted">
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
                width={100}
                height={100}
              />
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center mb-3 space-x-3">
              <UserIcon className="text-cyan-500 w-8 h-8" />
              <div>
                <h3 className="text-xs text-gray-600">
                  <span className='font-bold'>User:</span> {post.userId}
                </h3>
              </div>
            </div>

            <p className="text-gray-700 mb-4 line-clamp-3">
              {post.description}
            </p>

            <div className="border-t pt-4">
              <button
                onClick={() => {
                  setSelectedPost(selectedPost === post.id ? null : post.id);
                  if (post.id !== selectedPost) {
                    fetchComments(post.id);
                  }
                }}
                className="flex items-center text-sm text-cyan-600 hover:text-cyan-700"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Comentarios
              </button>

              {selectedPost === post.id && (
                <div className="mt-4">
                  <div className="max-h-40 overflow-y-auto mb-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 p-3 rounded-lg mb-2">
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                    ))}
                  </div>

                  {user && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escribe un comentario..."
                        className="flex-1 px-3 py-2 border rounded-lg text-sm"
                      />
                      <button
                        onClick={() => handleCommentSubmit(post.id)}
                        className="px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm hover:bg-cyan-600"
                      >
                        Enviar
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

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