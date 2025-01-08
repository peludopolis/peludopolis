"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Search } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const UsersTable: React.FC = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(true);

  const fetchUsers = async () => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      setError("No estás autenticado. Por favor, inicia sesión.");
      setIsLoadingUsers(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener los datos: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (isLoading) return;
    if (user?.isAdmin) {
      fetchUsers();
    } else {
      setError("No tienes permisos para ver esta información.");
      setIsLoadingUsers(false);
    }
  }, [user, isLoading]);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  if (isLoading || isLoadingUsers) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h1 className="text-center text-2xl text-primary mt-3 font-semibold">Lista de usuarios</h1>
      <div className="container p-16">
        <div className="mb-4 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shadow-lg p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <table className="shadow-lg w-full table-auto border border-dark rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-dark text-white">
              <th className="px-6 py-3 text-left text-lg font-semibold">Nombre</th>
              <th className="px-6 py-3 text-left text-lg font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-lg font-semibold">Teléfono</th>
              <th className="px-6 py-3 text-left text-lg font-semibold">Dirección</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark">
            {filteredUsers.map((user) => (
              <tr 
                key={user.id} 
                className="hover:bg-light transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;




