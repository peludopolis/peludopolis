"use client";

import { ServicePet, UserSession } from "../app/interfaces";
import { createContext, useEffect, useState } from "react";

// Actualiza la interfaz para reflejar la nueva estructura del estado 'user'
interface AuthContextProps {
    user: { user: UserSession | null; login: boolean } | null; // Nueva estructura
    setUser: (user: { user: UserSession | null; login: boolean } | null) => void;  // Actualiza el tipo
    logout: () => void;
    services: ServicePet[];
    setServices: (services: ServicePet[]) => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    services: [],
    setUser: () => {},
    logout: () => {},
    setServices: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ user: UserSession | null; login: boolean } | null>(null);  // Actualiza el tipo de 'user'
    const [services, setServices] = useState<ServicePet[]>([]);

    // Guardamos el estado del usuario y de las órdenes en localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            setServices(user?.user?.services || []);
            localStorage.setItem("services", JSON.stringify(user?.user?.services || []));
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
        localStorage.removeItem("services");
        setUser(null);
        setServices([]);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, services, setServices }}>
            {children}
        </AuthContext.Provider>
    );
};
