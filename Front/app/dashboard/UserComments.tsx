"use client";

import { useEffect, useState, useContext } from "react";
import { Pencil, Trash2, PawPrint, AlertTriangle, X } from "lucide-react";
import Image from "next/image";
import { AuthContext } from "../../contexts/authContext";

interface Comment {
  author: string;
  id: string;
  content: string;
  post: {
    id: string;
    title: string;
  };
}

interface UserCommentsProps {
  userId: string;
  apiUrl: string;
}

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

const UserComments: React.FC<UserCommentsProps> = ({ userId, apiUrl }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [newCommentContent, setNewCommentContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastProps | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  // Traer comentarios desde el backend
  const fetchComments = async () => {
    try {
      setIsLoading(true);

      if (!user) return;

      const endpoint = user?.user?.isAdmin ? `${apiUrl}/comments` : `${apiUrl}/comments/user/${userId}`;
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setComments(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      setComments([]);
      showToast('Error al cargar los comentarios', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [userId, apiUrl, user]);

  // Editar un comentario
  const handleEditCommentSubmit = async () => {
    if (!editingComment) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/comments/${editingComment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newCommentContent.trim() }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el comentario");
      }

      await fetchComments();
      setEditingComment(null);
      showToast('¡El comentario se ha actualizado exitosamente!', 'success');
    } catch (error) {
      showToast('Hubo un error al actualizar el comentario', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar un comentario
  const handleDeleteComment = async (commentId: string) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el comentario");
      }

      await fetchComments();
      setShowDeleteConfirm(null);
      showToast('El comentario ha sido eliminado exitosamente', 'success');
    } catch (error) {
      showToast('Hubo un error al eliminar el comentario', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Custom Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-fade-in-up">
          <div
            className={`rounded-lg px-4 py-3 shadow-lg ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white flex items-center gap-2 min-w-[300px]`}
          >
            {toast.type === 'success' ? (
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl shadow-lg border border-dark">
        <table className="min-w-full table-auto bg-white">
          <thead>
            <tr className="bg-dark text-white">
              <th className="px-6 py-4 font-semibold rounded-tl-xl">Comentó</th>
              <th className="px-6 py-4 font-semibold">Comentario</th>
              <th className="px-6 py-4 font-semibold">Titulo</th>
              <th className="px-6 py-4 font-semibold rounded-tr-xl">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <tr key={comment.id} className="hover:bg-light transition-colors duration-150">
                  <td className="px-6 py-4 text-gray-600">{comment.author}</td>
                  <td className="px-6 py-4 text-gray-600">{comment.content}</td>
                  <td className="px-6 py-4 text-gray-600">{comment.post?.title || "Sin título"}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditingComment(comment);
                          setNewCommentContent(comment.content);
                        }}
                        className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors duration-150 shadow-sm"
                      >
                        <Pencil className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(comment.id)}
                        className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors duration-150 shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8">
                  <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                    <PawPrint className="w-8 h-8 text-primary" />
                    <p className="text-lg">¡Aún no has realizado ningún comentario!</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de edición */}
      {editingComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
            <h3 className="text-2xl font-semibold mb-6 text-primary">Editar Comentario</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-secondary mb-2 font-medium">Contenido</label>
                <textarea
                  value={newCommentContent}
                  onChange={(e) => setNewCommentContent(e.target.value)}
                  className="w-full px-4 py-3 border border-warning rounded-lg focus:ring-2"
                  placeholder="Edita tu comentario..."
                  rows={4}
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditingComment(null)}
                  className="px-6 py-2.5 border border-warning text-gray-700 rounded-lg hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEditCommentSubmit}
                  className="px-6 py-2.5 bg-dark text-white rounded-lg hover:bg-tertiary"
                  disabled={isLoading}
                >
                  {isLoading ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(null)}
          />
          
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 transform transition-all">
            <button 
              onClick={() => setShowDeleteConfirm(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-red-600">
                  ¿Eliminar comentario?
                </h3>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  Estás a punto de eliminar el siguiente comentario:
                </p>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="font-medium text-gray-900">
                    {comments.find(comment => comment.id === showDeleteConfirm)?.post?.title || 'Sin título'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {comments.find(comment => comment.id === showDeleteConfirm)?.content}
                  </p>
                </div>

                <p className="text-sm text-red-500 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Esta acción no se puede deshacer.
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDeleteComment(showDeleteConfirm)}
                  disabled={isLoading}
                  className={`flex-1 px-4 py-2 bg-red-600 text-white rounded-lg 
                    ${isLoading 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-red-700 active:bg-red-800'} 
                    transition-colors`}
                >
                  {isLoading ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserComments;


