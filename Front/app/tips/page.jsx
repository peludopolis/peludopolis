"use client";

import React, { useState } from 'react';
import { 
  AlertTriangle 
} from 'lucide-react';
import { TIP_CATEGORIES, TIP_CONTENT } from './constants';

const PetCareTips = () => {
  const [activeCategory, setActiveCategory] = useState('general');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-title text-primary text-4xl font-extrabold  sm:text-5xl">
            Tips de Cuidado para 
            <span > tu mascota</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Guía completa para el cuidado de tus mejores amigos peludos
          </p>
        </div>

        {/* Categoría Selector */}
        <div className="flex justify-center space-x-4 mb-8">
          {TIP_CATEGORIES.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`
                flex flex-col items-center p-4 rounded-lg transition-all duration-300
                ${activeCategory === category.key 
                  ? 'bg-blue-100 border-2 border-blue-500 scale-105' 
                  : 'bg-white hover:bg-gray-100 border border-gray-200'}
              `}
            >
              {category.icon}
              <span className="mt-2 text-sm font-semibold">{category.title}</span>
            </button>
          ))}
        </div>

        {/* Contenido de Tips */}
        <div className="grid md:grid-cols-2 gap-6">
          {TIP_CONTENT[activeCategory].map((tip, index) => (
            <div 
              key={index} 
              className="bg-white shadow-lg rounded-xl p-6 transform transition-all hover:scale-105"
            >
              <div className="flex items-center mb-4">
                {tip.icon}
                <h3 className="ml-4 text-xl font-bold text-gray-800">{tip.title}</h3>
              </div>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>

        {/* Sección de Advertencia */}
        <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-yellow-700">
                Recuerda: Cada mascota es única. Estas son recomendaciones generales. 
                Siempre consulta con un veterinario para consejos personalizados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCareTips;