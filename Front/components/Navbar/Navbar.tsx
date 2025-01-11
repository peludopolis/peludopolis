import React from 'react';
import Link from 'next/link';
import { PawPrint } from 'lucide-react';

import NavMenu from './navMenu/NavMenu';
import NavAuth from './navAuth/NavAuth';
import SearchBar from './searchBar/SearchBar';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-light mb-4">
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 px-4 py-2 items-center">
        {/* Columna 1: Logo */}
        <div className="flex items-center justify-start">
          <Link href="/">
            <div className="flex items-center gap-2 font-bold text-3xl tracking-wide">
              <PawPrint className="w-12 h-12" color="#F9A826" />
              <span className="text-blue-500 font-fun drop-shadow-[0_0_10px_rgba(37,99,235,0.9)]">
                Peludópolis
              </span>
            </div>
          </Link>
        </div>

        {/* Columna 2: Search Input */}
        <div className="hidden md:block">
            <SearchBar />
          </div>

        {/* Columna 3: Menú de Autenticación */}
        <div className="flex items-center justify-end space-x-4">
          <NavAuth />
        </div>

        {/* Navegación en la misma fila */}
        <div className="col-span-3 flex justify-center mt-2">
          <NavMenu />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center space-y-4 px-4 py-2">
        {/* Logo (mantiene su posición) */}
        <div className="flex items-center justify-center">
        <Link href="/">
            <div className="flex items-center gap-2 font-bold text-3xl tracking-wide">
              <PawPrint className="w-12 h-12" color="#F9A826" />
              <span className="text-blue-500 font-fun drop-shadow-[0_0_10px_rgba(37,99,235,0.9)]">
                Peludópolis
              </span>
            </div>
          </Link>
        </div>

        {/* NavMenu y NavAuth juntos */}
        <div className="flex items-center justify-center space-x-4">
          <NavMenu />
          <NavAuth />
        </div>

        {/* Search Input */}
        <div className="w-full">
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

