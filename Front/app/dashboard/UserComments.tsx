"use client";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [newCommentContent, setNewCommentContent] = useState<string>("");

  // Traer comentarios del usuario desde el backend
  const fetchComments = async () => {
    try {
      const response = await fetch(`${apiUrl}/comments/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        toast.error("Error al obtener los comentarios del usuario");
      }
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
      toast.error("Error al conectar con el servidor");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [userId]);

  // Editar un comentario
  const handleEditCommentSubmit = async () => {
    if (!editingComment) return;

    try {
      const response = await fetch(`${apiUrl}/comments/${editingComment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newCommentContent }),
      });

      if (response.ok) {
        toast.success("¡Comentario actualizado exitosamente!");
        fetchComments();
        setEditingComment(null);
      } else {
        toast.error("Error al actualizar el comentario");
      }
    } catch (error) {
      console.error("Error al actualizar comentario:", error);
      toast.error("Error al conectar con el servidor");
    }
  };

  // Eliminar un comentario
  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await fetch(`${apiUrl}/comments/${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Comentario eliminado correctamente");
        fetchComments();
      } else {
        toast.error("Error al eliminar el comentario");
      }
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
      toast.error("Error al conectar con el servidor");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100">
        <table className="min-w-full table-auto bg-white">
          <thead>
            <tr className="bg-dark text-white">
              <th className="px-4 py-2">Comentario</th>
              <th className="px-4 py-2">Post</th>
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <tr key={comment.id} className="hover:bg-light transition-colors">
                  <td className="px-4 py-2">{comment.content}</td>
                  <td className="px-4 py-2">{comment.post?.title || "Sin título"}</td>
                  <td className="px-4 py-2">{comment.author}</td>
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
                <td colSpan={3} className="text-center py-4">
                  No has realizado comentarios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para editar comentario */}
      {editingComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md">
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
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleEditCommentSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
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

