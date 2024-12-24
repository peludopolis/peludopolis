import { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, PawPrint, Camera } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Post {
  id: string;
  image?: string;
  description: string;
}

const Experiences = ({
  posts,
  onEdit,
  onDelete,
}: {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}) => {
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [newDescription, setNewDescription] = useState<string>("");
  const [newImage, setNewImage] = useState<string>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleEditModalOpen = (post: Post) => {
    setEditingPost(post);
    setNewDescription(post.description);
    setNewImage(post.image || "");
  };

  const handleEditSubmit = async () => {
    if (editingPost) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${apiUrl}/posts/${editingPost.id}`;
        
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: newDescription,
            image: newImage,
          }),
        });

        if (response.ok) {
          const updatedPost = { ...editingPost, description: newDescription, image: newImage };
          onEdit(updatedPost);
          setEditingPost(null);
          toast.success('¡Experiencia actualizada exitosamente!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error('Error al actualizar la experiencia');
        }
      } catch (error) {
        toast.error('Error al procesar la solicitud');
      }
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const url = `${apiUrl}/posts/${postId}`;

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        onDelete(postId);
        const storedUser = JSON.parse(localStorage.getItem("user")!);
        storedUser.user.posts = posts.filter(post => post.id !== postId);
        localStorage.setItem("user", JSON.stringify(storedUser));
        toast.success('Experiencia eliminada correctamente');
      } else {
        toast.error('Error al eliminar la experiencia');
      }
    } catch (error) {
      toast.error('Error al procesar la solicitud');
    }
    setShowDeleteConfirm(null);
  };

  const handleModalClose = () => {
    setEditingPost(null);
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <div className="overflow-x-auto rounded-xl shadow-lg border border-purple-100">
        {/* ... Tu tabla existente ... */}
        <table className="min-w-full table-auto bg-white">
          <thead>
            <tr className="bg-dark">
              <th className="px-6 py-4 text-white font-semibold rounded-tl-xl">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Imagen
                </div>
              </th>
              <th className="px-6 py-4 text-white font-semibold">
                <div className="flex items-center gap-2">
                  <PawPrint className="w-5 h-5" />
                  Descripción
                </div>
              </th>
              <th className="px-6 py-4 text-white font-semibold rounded-tr-xl">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100">
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-light transition-colors duration-150">
                  <td className="px-6 py-4">
                    {post.image && (
                      <div className="relative group">
                        <Image
                          src={post.image}
                          alt="Imagen de mascota"
                          width={80}
                          height={80}
                          className="rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{post.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditModalOpen(post)}
                        className="flex items-center gap-1 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-blue-400 transition-colors duration-150 shadow-sm"
                      >
                        <Pencil className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(post.id)}
                        className="flex items-center gap-1 px-4 py-2 bg-danger text-white rounded-lg hover:bg-primary transition-colors duration-150 shadow-sm"
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
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  <PawPrint className="w-12 h-12 mx-auto mb-3 text-purple-200" />
                  No tienes experiencias registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">¿Estás seguro?</h3>
            <p className="text-gray-600 mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeletePost(showDeleteConfirm)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición */}
      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full mx-4 transform transition-all">
            <h3 className="text-2xl font-semibold mb-6 text-purple-700">Editar Experiencia</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Descripción</label>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="Describe la experiencia..."
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Imagen URL</label>
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleModalClose}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEditSubmit}
                  className="px-6 py-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-150 shadow-sm"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experiences;







