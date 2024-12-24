"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../contexts/authContext";
import Image from "next/image";

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

    if (isLoading) {
        return <div className="text-black text-center mt-10">Cargando...</div>;
    }

    if (!user?.user) {
        return null; // Previene errores visuales mientras redirige
    }

    // Determinar la imagen a usar
    const profilePicture =
        user.user.profilePicture || // Imagen de Google
        user.user.picture || // Imagen de usuarios normales
        "/images/predeterminada.jpg"; // Imagen predeterminada

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex items-center p-6 bg-gray-800 text-white">
                    <Image
                        src={profilePicture.startsWith("/") ? profilePicture : user.user.picture || "/images/predeterminada.jpg"}
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
                        {/* Validaciones para cada dato */}
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
                        {/* Mensaje si no hay información adicional */}
                        {!user.user.address && !user.user.phone && (
                            <p className="text-gray-500">No hay información adicional disponible.</p>
                        )}
                    </div>
                    <h1 className="text-lg text-primary my-5">Mis experiencias</h1>
                    <div className="space-y-4 flex gap-6">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post.id} className="bg-gray-200 p-4 rounded-lg">
                                    {post.image && (
                                        <Image
                                            src={post.image}
                                            alt="Post image"
                                            width={50}
                                            height={50}
                                            className="rounded-lg mt-2"
                                        />
                                    )}
                                    <p className="text-tertiary">{post.description}</p>

                                    {/* Aquí podrías agregar más detalles o acciones, como editar o eliminar */}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No tienes experiencias registradas.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

















