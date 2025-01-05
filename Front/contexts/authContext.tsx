"use client";

import { ServicePet, UserSession } from "../app/interfaces";
import { createContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: {
    id: string;
    user: UserSession | null;
    login: boolean;
    isAdmin: boolean; // Nuevo campo
  } | null;
  setUser: (user: { id: string; user: UserSession | null; login: boolean; isAdmin: boolean } | null) => void;
  logout: () => void;
  services: ServicePet[];
  setServices: (services: ServicePet[]) => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  services: [],
  setUser: () => {},
  logout: () => {},
  setServices: () => {},
  isLoading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string; user: UserSession | null; login: boolean; isAdmin: boolean } | null>(null);
  const [services, setServices] = useState<ServicePet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario y servicios desde localStorage al inicializar
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user") || "null");
    const localServices = JSON.parse(localStorage.getItem("services") || "null");

    if (localUser && localUser.id !== "default-id") {
      setUser(localUser);
    } else {
      setUser(null);
    }

    if (localServices) {
      setServices(localServices);
    }

    setIsLoading(false); // Marcamos que ya se cargó
  }, []);

  // Guardar usuario y servicios en localStorage cuando cambian
  useEffect(() => {
    if (user) {
      if (!user.id) {
        user.id = "default-id"; // Generar un ID si falta
      }
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, isAdmin: user.user?.isAdmin || false })
      );
      localStorage.setItem("services", JSON.stringify(user.user?.services || []));
    }
  }, [user]);

  // Persistir la sesión en el localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedServices = localStorage.getItem("services");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser.id) {
        parsedUser.id = "default-id"; // Generar ID si falta
      }
      // Asegurarnos de incluir el campo `isAdmin`
      const isAdmin = parsedUser?.isAdmin ?? false;
      setUser({ ...parsedUser, isAdmin });
    }

    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }

    setIsLoading(false); // Marcamos que ya se cargó
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("services");
    localStorage.removeItem("userSession");
    setUser(null);
    setServices([]);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, services, setServices, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
