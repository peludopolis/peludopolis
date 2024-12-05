"use client";

import { ServicePet, UserSession } from "../app/interfaces";
import { createContext, useEffect, useState } from "react";

// Creo la interfaz del contexto
interface AuthContextProps {
    user: UserSession | null;
    setUser: (user: UserSession | null) => void;
    logout: () => void;
    services: ServicePet[];
    setServices: (services: ServicePet[]) => void;
}

// Creo el contexto, aquí voy a guardar los datos
export const AuthContext = createContext<AuthContextProps>({
    user: null,
    services: [],
    setUser: () => {},
    logout: () => {},
    setServices: () => {},
});

// Aquí voy a crear el provider que va a tener el contexto de autenticación
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserSession | null>(null);
    const [services, setServices] = useState<ServicePet[]>([]);

    // Guardamos el estado del usuario y de las órdenes en localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            setServices(user?.user.services || []);
            // Guardamos las órdenes también en localStorage
            localStorage.setItem("services", JSON.stringify(user?.user.services || []));
        }
    }, [user]);

    // Cargamos el usuario y las órdenes de localStorage al iniciar
    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("user")!);
        const localServices = JSON.parse(localStorage.getItem("services")!);
        if (localUser) {
            setUser(localUser);
        }
        if (localServices) {
            setServices(localServices);
        }
    }, []);

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("services");  // Eliminar también las órdenes
        setUser(null);
        setServices([]);  // Limpiar las órdenes en el estado
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, services, setServices }}>
            {children}
        </AuthContext.Provider>
    );
};