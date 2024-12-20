"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../../contexts/authContext";
import Greeting from "../greeting/Greeting";

const NavAuth = () => {
  const { user, logout } = useContext(AuthContext); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex items-center justify-center gap-3 m-3 relative">
      <div>
        {!user && ( // Mostrar ícono solo si no hay usuario autenticado
          <div className="flex justify-center items-center border-2 border-blue-400 p-2 rounded-full">
            <Link href="/login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                width="28"
                fill="#60a5fa"
                viewBox="0 0 448 512"
              >
                <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
              </svg>
            </Link>
          </div>
        )}
        <Greeting />
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-md text-white text-sm font-medium shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Mi Cuenta ▽
        </button>

        {isDropdownOpen && (
          <div className="absolute z-10 right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
            {user ? (
              <>
                <button
                  onClick={() => {
                    logout();
                    setIsDropdownOpen(false);
                  }}
                  className="group flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 transition-colors duration-200 w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-red-400 group-hover:text-red-600 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="group-hover:text-red-600 transition-colors">
                    Cerrar Sesión
                  </span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="group flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-blue-400 group-hover:text-blue-600 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="group-hover:text-blue-600 transition-colors">
                    Iniciar Sesión
                  </span>
                </Link>
                <div className="border-t border-gray-100"></div>
                <Link
                  href="/register"
                  className="group flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-green-400 group-hover:text-green-600 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <span className="group-hover:text-green-600 transition-colors">
                    Registrate
                  </span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavAuth;


