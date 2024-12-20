"use client";

import { ServicePet, UserSession } from "../app/interfaces";
import { createContext, useEffect, useState } from "react";



interface AuthContextProps {
    user: {
        id: string;
        user: UserSession | null;
        login: boolean;
    } | null;
    setUser: (user: { id: string; user: UserSession | null; login: boolean } | null) => void;
    logout: () => void;
    services: ServicePet[];
    setServices: (services: ServicePet[]) => void;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    services: [],
    setUser: () => { },
    logout: () => { },
    setServices: () => { },
    isLoading: false
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ id: string; user: UserSession | null; login: boolean } | null>(null);
    const [services, setServices] = useState<ServicePet[]>([]);

    useEffect(() => {
        if (user) {
            if (!user.id) {
                user.id = "default-id"; // Generar ID si falta
            }
            localStorage.setItem("user", JSON.stringify(user));
            setServices(user?.user?.services || []);
            localStorage.setItem("services", JSON.stringify(user?.user?.services || []));
        }
    }, [user]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("user")!);
        const localServices = JSON.parse(localStorage.getItem("services")!);
    
        if (localUser) {
            if (!localUser.id) {
                localUser.id = "default-id"; // Generar ID si falta
            }
            setUser(localUser);
        }
        if (localServices) {
            setServices(localServices);
        }
    
        setIsLoading(false); // Marcamos que ya se cargó
    }, []);

    
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("services");
        setUser(null);
        setServices([]);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, services, setServices, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

