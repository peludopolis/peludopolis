"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importamos el hook para redirigir
import { AuthContext } from "../../contexts/authContext";
import Image from "next/image";

const Dashboard = () => {
    const { user } = useContext(AuthContext); // Accedemos al user desde el contexto
    const router = useRouter(); // Usamos el hook de router

    // Si no hay usuario, redirigimos al home
    useEffect(() => {
        if (!user?.user) {
            router.push("/"); // Redirige al home
        }
    }, [user, router]);

    if (!user?.user) {
        // Mientras se verifica, puedes mostrar un "loading" o nada
        return <div className="text-black">Cargando...</div>;
    }

    return (
        <div>
            <h1>Bienvenido, {user.user.name}</h1>
            <Image 
    src={user.user.picture || "/placeholder.jpg"} // Reemplaza con una imagen predeterminada si no existe
    alt="Profile" 
    width={150} 
    height={150} 
/>

            <p>Email: {user.user.email}</p>
        </div>
    );
};

export default Dashboard;



