"use client";

import { useContext, useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import { Pencil, Trash2, Camera, PawPrint, AlertTriangle, X } from "lucide-react";
import Compressor from "compressorjs";
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

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

const Experiences: React.FC<ExperiencesProps> = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
      setNewImagePreview(editingPost.image || "");
    }
  }, [editingPost]);

  const handleEditImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      new Compressor(file, {
        quality: 0.6,
        success(compressedFile) {
          setNewImageFile(compressedFile as File);

          const reader = new FileReader();
          reader.onloadend = () => {
            setNewImagePreview(reader.result as string);
          };
          reader.readAsDataURL(compressedFile);
        },
        error(err) {
          console.error("Error al comprimir la imagen:", err);
          showToast("Error al procesar la imagen", "error");
        },
      });
    }
  };

  const handleEditSubmit = async () => {
    if (!editingPost || isLoading) return;

    setIsLoading(true);
    try {
      let imageString = editingPost.image;

      if (newImageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(newImageFile);
        await new Promise((resolve) => {
          reader.onloadend = () => {
            imageString = reader.result as string;
            resolve(true);
          };
        });
      }

      const response = await fetch(`${apiUrl}/posts/${editingPost.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          image: imageString,
        }),
      });

      if (response.ok) {
        await fetchUserPosts();
        setEditingPost(null);
        showToast('¡La experiencia se ha actualizado exitosamente!', 'success');
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      showToast('Hubo un error al actualizar la experiencia', 'error');
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
        showToast('La experiencia ha sido eliminada exitosamente', 'success');
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      showToast('Hubo un error al eliminar la experiencia', 'error');
    } finally {
      setIsLoading(false);
    }
  };

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

      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
            <h3 className="text-2xl font-semibold mb-6 text-primary">Editar Experiencia</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-secondary mb-2 font-medium">Título</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-warning rounded-lg focus:ring-2"
                  placeholder="Título de la experiencia"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-secondary mb-2 font-medium">Descripción</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-warning rounded-lg focus:ring-2"
                  placeholder="Describe la experiencia..."
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-secondary mb-2 font-medium">Imagen</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageChange}
                    className="hidden"
                    id="editImageUpload"
                  />
                  <label
                    htmlFor="editImageUpload"
                    className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-warning transition"
                  >
                    Subir Imagen
                  </label>
                  {newImagePreview ? (
                    <Image
                      src={newImagePreview}
                      alt="Vista previa"
                      width={80}
                      height={80}
                      className="rounded-lg shadow-lg"
                    />
                  ) : (
                    <p className="text-gray-500">Sin imagen</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditingPost(null)}
                  className="px-6 py-2.5 border border-warning text-gray-700 rounded-lg hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEditSubmit}
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
                  ¿Eliminar experiencia?
                </h3>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  Estás a punto de eliminar la siguiente experiencia:
                </p>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  {posts.find(post => post.id === showDeleteConfirm)?.image && (
                    <Image
                      src={posts.find(post => post.id === showDeleteConfirm)?.image || ''}
                      alt="Imagen de la experiencia"
                      width={100}
                      height={100}
                      className="rounded-lg mb-2 object-cover"
                    />
                  )}
                  <p className="font-medium text-gray-900">
                    {posts.find(post => post.id === showDeleteConfirm)?.title || 'Sin título'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {posts.find(post => post.id === showDeleteConfirm)?.description}
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
                  onClick={() => handleDeletePost(showDeleteConfirm)}
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

export default Experiences;























