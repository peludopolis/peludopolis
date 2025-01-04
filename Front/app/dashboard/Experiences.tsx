"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Camera, PawPrint } from "lucide-react";
import { AuthContext } from "../../contexts/authContext";

interface Post {
  id: string;
  title?: string;
  image?: string;
  description: string;
  author: string;
  userId: string;
}

interface ExperiencesProps {
  userId: string;
}

const Experiences: React.FC<ExperiencesProps> = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newImage, setNewImage] = useState<string>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchUserPosts = async () => {
    if (!user) return;

    try {
      const response = await fetch(`${apiUrl}/posts`);
      if (response.ok) {
        const data = await response.json();
        const filteredPosts = user?.user?.isAdmin
          ? data
          : data.filter((post: { userId: string }) => post.userId === user?.user?.id.toString());
        setPosts(filteredPosts);
      }
    } catch (error) {
      console.error("Error al obtener experiencias:", error);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [user]);

  useEffect(() => {
    if (editingPost) {
      setNewTitle(editingPost.title || "");
      setNewDescription(editingPost.description || "");
      setNewImage(editingPost.image || "");
    }
  }, [editingPost]);

  const handleEditSubmit = async () => {
    if (!editingPost || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/posts/${editingPost.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          image: newImage,
        }),
      });

      if (response.ok) {
        await fetchUserPosts();
        setEditingPost(null);
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchUserPosts();
        setShowDeleteConfirm(null);
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-xl shadow-lg border border-dark">
        <table className="min-w-full table-auto bg-white">
          <thead>
            <tr className="bg-dark">
              <th className="px-6 py-4 text-white font-semibold rounded-tl-xl">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Imagen
                </div>
              </th>
              <th className="px-6 py-4 text-white font-semibold">Título</th>
              <th className="px-6 py-4 text-white font-semibold">Descripción</th>
              <th className="px-6 py-4 text-white font-semibold">Usuario</th>
              <th className="px-6 py-4 text-white font-semibold rounded-tr-xl">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark">
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-light transition-colors duration-150">
                  <td className="px-6 py-4">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt="Imagen de mascota"
                        width={80}
                        height={80}
                        className="rounded-lg shadow-sm"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{post.title || "Sin título"}</td>
                  <td className="px-6 py-4 text-gray-600">{post.description}</td>
                  <td className="px-6 py-4 text-gray-600">{post.author}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      {(user?.user?.isAdmin || user?.user?.id?.toString() === post.userId) && (
                        <>
                          <button
                            onClick={() => setEditingPost(post)}
                            className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors duration-150 shadow-sm"
                            disabled={isLoading}
                          >
                            <Pencil className="w-4 h-4" />
                            Editar
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(post.id)}
                            className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors duration-150 shadow-sm"
                            disabled={isLoading}
                          >
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8">
                  <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                    <PawPrint className="w-8 h-8 text-primary" />
                    <p className="text-lg">¡Comparte tu experiencia con la comunidad!</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de edición */}
      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
            <h3 className="text-2xl font-semibold mb-6 text-purple-700">
              Editar Experiencia
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Título</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Título de la experiencia"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Descripción</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe la experiencia..."
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Imagen URL</label>
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditingPost(null)}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEditSubmit}
                  className="px-6 py-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Confirmar eliminación
            </h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar esta experiencia? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeletePost(showDeleteConfirm)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                disabled={isLoading}
              >
                {isLoading ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experiences;






















