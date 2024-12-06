import React from 'react';
import Link from 'next/link';  // Importa Link de Next.js
import Image from 'next/image';
import { PawPrint } from 'lucide-react';
import NavMenu from './navMenu/NavMenu';
import NavAuth from './navAuth/NavAuth';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-light ">
      <div className="grid grid-cols-3 gap-4 px-4 py-2 items-center">
        {/* Columna 1: Logo */}
        <div className="flex items-center justify-start">
          <Link href="/" passHref>  {/* Link a la página de inicio */}
            <div className="flex items-center justify-center gap-2 font-bold text-3xl tracking-wide cursor-pointer">
              <PawPrint className="w-12 h-12 " color="#F9A826" />
              <span className="text-blue-500 font-fun drop-shadow-[0_0_10px_rgba(37,99,235,0.9)]">
                Peludópolis
              </span>
            </div>
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
            {/*   <NavMenu /> */}
          </div>
        </div>

        {/* Columna 3: Menú de Autenticación */}
        <div className="flex items-center justify-end space-x-4">
          <NavAuth />
        </div>
      </div>
      <NavMenu />
    </nav>
  );
};

export default Navbar;
