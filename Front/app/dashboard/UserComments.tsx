"use client";
import { useEffect, useState, useContext } from "react";
import { Pencil, Trash2, PawPrint } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const UserComments: React.FC<UserCommentsProps> = ({ userId, apiUrl }) => {
  const { user } = useContext(AuthContext);

  const [comments, setComments] = useState<Comment[]>([]);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [newCommentContent, setNewCommentContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

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
      // Silenciosamente manejamos el error sin mostrar toast
      setComments([]);
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

      toast.success("¡Comentario actualizado exitosamente!", {
        toastId: 'updateSuccess'
      });
      await fetchComments();
      setEditingComment(null);
    } catch (error) {
      toast.error("Error al actualizar el comentario", {
        toastId: 'updateError'
      });
    }
  };

  // Eliminar un comentario
  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este comentario?")) {
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el comentario");
      }

      toast.success("Comentario eliminado correctamente", {
        toastId: 'deleteSuccess'
      });
      await fetchComments();
    } catch (error) {
      toast.error("Error al eliminar el comentario", {
        toastId: 'deleteError'
      });
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        limit={3}
      />
      <div className="overflow-x-auto rounded-xl shadow-lg border border-dark">
        <table className="min-w-full table-auto bg-white">
          <thead>
            <tr className="bg-dark text-white">
              <th className="px-4 py-2">Comentó</th>
              <th className="px-4 py-2">Comentario</th>
              <th className="px-4 py-2">Titulo</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center divide-y divide-dark">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <tr key={comment.id} className="hover:bg-light transition-colors">
                  <td className="px-4 py-2">{comment.author}</td>
                  <td className="px-4 py-2">{comment.content}</td>
                  <td className="px-4 py-2">{comment.post?.title || "Sin título"}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-3 text-center justify-center">
                      <button
                        onClick={() => {
                          setEditingComment(comment);
                          setNewCommentContent(comment.content);
                        }}
                        className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors duration-150 shadow-sm"
                      >
                        <Pencil className="w-4 h-4" /> Editar
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors duration-150 shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" /> Eliminar
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

      {/* Modal para editar comentario */}
      {editingComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-lg w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Editar Comentario</h3>
            <textarea
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingComment(null)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleEditCommentSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                disabled={!newCommentContent.trim()}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserComments;


