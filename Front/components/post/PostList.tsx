"use client";

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { PostService, CommentService } from './service';
import { Post, Comment } from './type';
import { Trash2, User as UserIcon, MessageSquare, AlertTriangle, X } from 'lucide-react';
import Image from 'next/image';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [commentsByPostId, setCommentsByPostId] = useState<Record<string, Comment[]>>({});
  const [newComment, setNewComment] = useState('');
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const { user } = useContext(AuthContext);
  const [isDeletingPost, setIsDeletingPost] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await PostService.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error al obtener posts:', error);
    }
  };

  const fetchComments = async (postId: string) => {
    if (!postId) return;

    setIsLoadingComments(true);
    try {
      const comments = await CommentService.getComments(postId);
      setCommentsByPostId(prev => ({
        ...prev,
        [postId]: comments || []
      }));
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
      setCommentsByPostId(prev => ({
        ...prev,
        [postId]: []
      }));
    } finally {
      setIsLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeleteClick = (post: Post) => {
    setPostToDelete(post);
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete || isDeletingPost) return;

    setIsDeletingPost(true);
    try {
      await PostService.deletePost(postToDelete.id);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postToDelete.id));
      setCommentsByPostId(prev => {
        const updated = { ...prev };
        delete updated[postToDelete.id];
        return updated;
      });

      if (selectedPost === postToDelete.id) {
        setSelectedPost(null);
      }
    } catch (error) {
      console.error('Error al eliminar post:', error);
      alert('Hubo un error al eliminar el post. Por favor, inténtalo de nuevo.');
    } finally {
      setIsDeletingPost(false);
      setPostToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setPostToDelete(null);
  };

  const handleCommentSubmit = async (postId: string) => {
    if (!user || !newComment.trim() || !postId) return;

    try {
      await CommentService.createComment({
        content: newComment.trim(),
        postId,
        userId: String(user?.user?.id) || '',
      });

      fetchComments(postId);
      setNewComment('');
    } catch (error) {
      console.error('Error al crear comentario:', error);
    }
  };

  const handleDeleteComment = async (commentId: string, postId: string) => {
    try {
      await CommentService.deleteComment(commentId);
      fetchComments(postId);
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
      alert('Hubo un error al eliminar el comentario. Por favor, inténtalo de nuevo.');
    }
  };

  const handleToggleComments = (postId: string) => {
    if (selectedPost === postId) {
      setSelectedPost(null);
    } else {
      setSelectedPost(postId);
      fetchComments(postId);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-muted">
        {posts.map((post) => (
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
                  width={400}
                  height={300}
                />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center mb-3 space-x-3">
                <UserIcon className="text-cyan-500 w-8 h-8" />
                <div>
                  <h3 className="text-xs text-gray-600">
                    Usuario: {' '}
                    <span className="font-bold text-secondary">{post.author}</span>
                  </h3>
                </div>
              </div>

              <p className="text-primary text-sm italic line-clamp-3">{post.title}</p>
              <p className="text-gray-700 mb-4 line-clamp-3">{post.description}</p>
              <p className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleString()}
              </p>

              <div className="border-t pt-4">
                <button
                  onClick={() => handleToggleComments(post.id)}
                  className="flex items-center text-sm text-cyan-600 hover:text-cyan-700"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {selectedPost === post.id ? 'Ocultar Comentarios' : 'Ver Comentarios'}
                </button>

                {selectedPost === post.id && (
                  <div className="mt-4">
                    <div className="max-h-40 overflow-y-auto mb-4">
                      {isLoadingComments ? (
                        <p className="text-sm text-gray-500">Cargando comentarios...</p>
                      ) : commentsByPostId[post.id]?.length > 0 ? (
                        commentsByPostId[post.id].map(comment => (
                          <div key={comment.id} className="bg-gray-50 p-3 rounded-lg mb-2">
                            <p className="text-danger text-xs">
                              {comment.author} <span className="text-xs text-gray-500">dice:</span>
                            </p>
                            <p className="text-xs text-gray-700 italic my-3">{comment.content}</p>
                            <p className="text-xs text-gray-400 italic">{new Date(comment.createdAt).toLocaleDateString()}</p>
                            {(user?.user?.isAdmin || String(user?.user?.id) === String(comment.user?.id)) && (
                              <button
                                onClick={() => handleDeleteComment(comment.id, post.id)}
                                className="text-red-500 hover:underline"
                              >
                                Eliminar
                              </button>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 italic">Sin comentarios</p>
                      )}
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
                          disabled={!newComment.trim() || isLoadingComments}
                          className="px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Enviar
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {(user?.user?.isAdmin || String(user?.user?.id) === post.userId) && (
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleDeleteClick(post)}
                    disabled={isDeletingPost}
                    className={`bg-red-500/20 text-red-600 p-2 rounded-full hover:bg-red-500/40 transition ${
                      isDeletingPost ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
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

      {/* Modal de confirmación */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay con efecto de desenfoque */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCancelDelete}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 transform transition-all animate-in fade-in slide-in-from-bottom-4">
            {/* Botón de cerrar */}
            <button 
              onClick={handleCancelDelete}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Contenido del modal */}
            <div className="p-6">
              {/* Encabezado */}
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-red-600">
                  ¿Eliminar publicación?
                </h3>
              </div>

              {/* Cuerpo */}
              <div className="space-y-4">
                <p className="text-gray-600">
                  Estás a punto de eliminar la siguiente publicación:
                </p>

                {/* Detalles del post */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="font-medium text-gray-900">{postToDelete.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{postToDelete.description}</p>
                </div>

                {/* Advertencia */}
                <p className="text-sm text-red-500 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Esta acción eliminará también todos los comentarios asociados y no se puede deshacer.
                </p>
              </div>

              {/* Botones */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeletingPost}
                  className={`flex-1 px-4 py-2 bg-red-600 text-white rounded-lg 
                    ${isDeletingPost 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-red-700 active:bg-red-800'} 
                    transition-colors`}
                >
                  {isDeletingPost ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostList;


