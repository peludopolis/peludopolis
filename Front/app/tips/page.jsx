"use client";

import React, { useState } from 'react';
import { 
  Dog, PawPrint, Scissors, Bath, Thermometer, HeartPulse, 
  Bone, Syringe, AlertTriangle, Utensils 
} from 'lucide-react';

const PetCareTips = () => {
  const [activeCategory, setActiveCategory] = useState('general');

  const tipCategories = [
    { 
      icon: <Dog className="w-10 h-10 text-blue-600" />, 
      title: 'Cuidado General', 
      key: 'general' 
    },
    { 
      icon: <PawPrint className="w-10 h-10 text-green-600" />, 
      title: 'Higiene', 
      key: 'hygiene' 
    },
    { 
      icon: <Thermometer className="w-10 h-10 text-red-600" />, 
      title: 'Salud', 
      key: 'health' 
    },
    { 
      icon: <Utensils className="w-10 h-10 text-orange-600" />, 
      title: 'Nutrición', 
      key: 'nutrition' 
    }
  ];

  const tipContent = {
    general: [
      {
        title: 'Socialización Temprana',
        description: 'Expón a tu mascota a diferentes personas, animales y entornos desde pequeño para desarrollar un comportamiento equilibrado.',
        icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />
      },
      {
        title: 'Ejercicio Diario',
        description: 'Mantén a tu mascota activa con paseos diarios y juegos que estimulen su mente y cuerpo.',
        icon: <Bone className="w-6 h-6 text-brown-500" />
      }
    ],
    hygiene: [
      {
        title: 'Baño Regular',
        description: 'Lava a tu mascota cada 4-6 semanas con champú especial para su tipo de pelaje. No abuses del baño para no resecar su piel.',
        icon: <Bath className="w-6 h-6 text-blue-500" />
      },
      {
        title: 'Corte de Pelo',
        description: 'Programa cortes de pelo cada 6-8 semanas, especialmente para razas de pelo largo.',
        icon: <Scissors className="w-6 h-6 text-purple-500" />
      }
    ],
    health: [
      {
        title: 'Vacunas al Día',
        description: 'Mantén un calendario de vacunas actualizado. Consulta con tu veterinario sobre el esquema adecuado.',
        icon: <Syringe className="w-6 h-6 text-green-500" />
      },
      {
        title: 'Revisiones Periódicas',
        description: 'Realiza chequeos veterinarios anuales para detectar problemas de salud tempranamente.',
        icon: <HeartPulse className="w-6 h-6 text-red-500" />
      }
    ],
    nutrition: [
      {
        title: 'Alimentación Balanceada',
        description: 'Elige alimentos de calidad adaptados a la edad, raza y condición de tu mascota.',
        icon: <Utensils className="w-6 h-6 text-orange-500" />
      },
      {
        title: 'Hidratación',
        description: 'Asegura agua fresca y limpia disponible todo el tiempo. Cambia el agua diariamente.',
        icon: <Dog className="w-6 h-6 text-blue-500" />
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-primary sm:text-5xl">
            Tips de Cuidado para 
            <span className=""> tu mascota</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Guía completa para el cuidado de tus mejores amigos peludos
          </p>
        </div>

        {/* Categoría Selector */}
        <div className="flex justify-center space-x-4 mb-8">
          {tipCategories.map((category) => (
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
          {tipContent[activeCategory].map((tip, index) => (
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