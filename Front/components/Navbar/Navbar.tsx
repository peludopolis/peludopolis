import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import NavMenu from '../navMenu/NavMenu'

const Navbar: React.FC = () => {

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="grid grid-cols-3 gap-4 px-4 py-2 items-center">
        {/* Columna 1: Logo */}
        <div className="flex items-center justify-start">
          <Link href="/" className='m-3'>
            <Image
              src="/logo.svg"
              alt="Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>

        {/* Columna 2: Search Input y Navegación */}
        <div className="flex flex-col space-y-2">
          {/* Fila de Search Input */}
          <div>
            <input
              type="search"
              placeholder="Buscar..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Fila de Navegación */}
          <div className="flex space-x-4 justify-center">
            <NavMenu />
          </div>
        </div>

        {/* Columna 3: Menú de Autenticación */}
        <div className="flex items-center justify-end space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
