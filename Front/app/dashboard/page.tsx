"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../contexts/authContext";
import Image from "next/image";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user?.user) {
            router.push("/"); // Redirige al home si no hay usuario
        }
    }, [user, router]);

    if (!user?.user) {
        return <div className="text-black text-center mt-10">Cargando...</div>;
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
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
















