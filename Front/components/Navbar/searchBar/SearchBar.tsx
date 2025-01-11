// components/SearchBar.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import services from '../../../app/servicesPets/services';
import { motion, AnimatePresence } from 'framer-motion';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  type: "perro" | "gato";
  category: "adulto" | "cachorro";
}

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Service[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Cerrar el menú cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Manejar la búsqueda
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    if (value.length > 0) {
      const filtered = services.filter(service =>
        service.name.toLowerCase().includes(value.toLowerCase()) ||
        service.description.toLowerCase().includes(value.toLowerCase()) ||
        service.type.toLowerCase().includes(value.toLowerCase()) ||
        service.category.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  // Navegar al servicio seleccionado
  const handleSelectService = (serviceId: number) => {
    setIsOpen(false);
    setSearchTerm('');
    router.push(`/servicesPets/${serviceId}`);
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar servicios..."
          className="w-full md:w-[300px] px-4 py-2 pl-10 pr-4 rounded-full 
            border border-gray-300 focus:border-blue-500 focus:ring-2 
            focus:ring-blue-200 transition-all duration-300"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
          text-gray-400 w-4 h-4" />
        {searchTerm && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <X className="text-gray-400 w-4 h-4 hover:text-gray-600" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl 
              border border-gray-100 max-h-[400px] overflow-y-auto"
          >
            {results.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ backgroundColor: '#f3f4f6' }}
                onClick={() => handleSelectService(service.id)}
                className="p-3 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">{service.name}</h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-green-600">
                      ${service.price}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full mt-1
                      ${service.type === 'perro' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'}`}
                    >
                      {service.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {isOpen && searchTerm && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 p-4 bg-white rounded-lg shadow-xl 
              border border-gray-100 text-center text-gray-500"
          >
            No se encontraron resultados para "{searchTerm}"
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;