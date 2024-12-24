"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../contexts/authContext";
import Image from "next/image";
import Experiences from "./Experiences"; // Importamos el componente de experiencias

const Dashboard = () => {
  const { user, isLoading } = useContext(AuthContext);
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading && !user?.user) {
      router.push("/"); // Redirige solo si no hay usuario y terminó de cargar
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user?.user) {
      // Accede a los posts del usuario desde el localStorage
      const storedUser = JSON.parse(localStorage.getItem("user")!);
      setPosts(storedUser?.user?.posts || []);
    }
  }, [user]);

  const handleEdit = (updatedPost: any) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(updatedPosts);

    const storedUser = JSON.parse(localStorage.getItem("user")!);
    storedUser.user.posts = updatedPosts;
    localStorage.setItem("user", JSON.stringify(storedUser));
  };

  const handleDelete = (id: string) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);

    const storedUser = JSON.parse(localStorage.getItem("user")!);
    storedUser.user.posts = updatedPosts;
    localStorage.setItem("user", JSON.stringify(storedUser));
  };

  if (isLoading) {
    return <div className="text-black text-center mt-10">Cargando...</div>;
  }

  if (!user?.user) {
    return null; // Previene errores visuales mientras redirige
  }

  // Determinar la imagen a usar
  const profilePicture =
    user.user.profilePicture ||
    user.user.picture ||
    "/images/predeterminada.jpg"; // Imagen predeterminada

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center p-6 bg-gray-800 text-white">
          <Image
            src={profilePicture.startsWith("/")
              ? profilePicture
              : user.user.picture || "/images/predeterminada.jpg"}
            alt="User Profile"
            width={100}
            height={100}
            className="rounded-full mr-4 border-2 border-gray-300 object-cover"
            priority={true} // Prioriza la carga de la imagen
          />
          <div>
            <h1 className="text-2xl font-bold">{user.user.name}</h1>
            <p>{user.user.email}</p>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Información del Usuario
          </h2>
          <div className="space-y-2">
            {user.user.address && (
              <p className="text-gray-600">
                <span className="font-bold">Dirección:</span> {user.user.address}
              </p>
            )}
            {user.user.phone && (
              <p className="text-gray-600">
                <span className="font-bold">Teléfono:</span> {user.user.phone}
              </p>
            )}
            {!user.user.address && !user.user.phone && (
              <p className="text-gray-500">No hay información adicional disponible.</p>
            )}
          </div>

          <h1 className="text-center text-lg text-primary my-5">Mis experiencias</h1>

          <Experiences posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




















