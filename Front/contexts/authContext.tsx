"use client";

import { Service, UserSession } from "../app/interfaces";
import { createContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: {
    id: string;
    user: UserSession | null;
    login: boolean;
    isAdmin: boolean;
    accessToken: string | null;
  } | null;
  setUser: (user: AuthContextProps["user"]) => void;
  logout: () => void;
  services: Service[];
  setServices: (services: Service[]) => void;
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
  const [user, setUser] = useState<AuthContextProps["user"]>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Restaurar estado desde localStorage al cargar la página
  useEffect(() => {
    try {
      const localUser = localStorage.getItem("user");
      const localServices = localStorage.getItem("services");

      if (localUser) setUser(JSON.parse(localUser));
      if (localServices) setServices(JSON.parse(localServices));
    } catch (error) {
      console.error("Error al restaurar la sesión:", error);
      setUser(null);
      setServices([]);
    } finally {
      setIsLoading(false); // El estado de carga se termina después de restaurar los datos
    }
  }, []);

  // Guardar cambios en el estado en localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (services.length) {
      localStorage.setItem("services", JSON.stringify(services));
    } else {
      localStorage.removeItem("services");
    }
  }, [services]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("services");
    setUser(null);
    setServices([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        services,
        setServices,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


