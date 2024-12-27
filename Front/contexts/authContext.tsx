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
  setUser: () => {},
  logout: () => {},
  setServices: () => {},
  isLoading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string; user: UserSession | null; login: boolean } | null>(null);
  const [services, setServices] = useState<ServicePet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Guardar usuario y servicios en localStorage cuando cambian
  useEffect(() => {
    if (user) {
      if (!user.id || user.id === "default-id") {
        console.warn("El usuario no tiene un ID válido.");
        return; // No guardamos usuarios inválidos
      }
      localStorage.setItem("user", JSON.stringify(user));
      setServices(user?.user?.services || []);
      localStorage.setItem("services", JSON.stringify(user?.user?.services || []));
    }
  }, [user]);

  // Cargar usuario y servicios desde localStorage al inicializar
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user") || "null");
    const localServices = JSON.parse(localStorage.getItem("services") || "null");

    if (localUser) {
      if (!localUser.id || localUser.id === "default-id") {
        console.warn("El usuario cargado desde localStorage no tiene un ID válido.");
        setUser(null); // No cargamos usuarios inválidos
      } else {
        setUser(localUser);
      }
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


