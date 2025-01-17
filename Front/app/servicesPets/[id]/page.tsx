// app/services/[id]/page.tsx
"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Droplet, 
  Scissors, 
  Bed, 
  Stethoscope, 
  Dog, 
  Cat, 
  PawPrint, 
  Clock, 
  DollarSign, 
  ArrowLeft, 
  Calendar
} from 'lucide-react';
import services from '../services';

interface Service {
  id: number ;
  name: string;
  description: string;
  price: number;
  duration: number;
  type: 'perro' | 'gato';
  category: 'adulto' | 'cachorro';
}

const serviceIcons: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
  'Corte de pelo': Scissors,
  'Baño': Droplet,
  'Corte de uñas': Scissors,
  'Consulta veterinaria': Stethoscope,
  'Spa': Bed
};

const ServiceDetailPage = () => {
  const params = useParams();
  const service = services.find(s => s.id.toString() === params.id);
  
  if (!service) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Servicio no encontrado</h1>
          <Link href="/servicesPets" className="text-blue-500 hover:text-blue-600">
            Volver a servicios
          </Link>
        </div>
      </motion.div>
    );
  }

  const ServiceIcon = serviceIcons[service.name] || Droplet;

  const renderServiceExtras = () => {
    switch (service.name) {
      case 'Spa':
        return (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">El servicio incluye:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Masaje relajante para tu mascota</li>
              <li>Aromaterapia con productos especiales</li>
              <li>Cepillado profundo y suave</li>
              <li>Productos premium para el cuidado del pelaje</li>
              <li>Ambiente tranquilo y relajante</li>
            </ul>
          </div>
        );
      case 'Corte de pelo':
        return (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">El servicio incluye:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Corte personalizado según la raza</li>
              <li>Limpieza de orejas</li>
              <li>Cepillado completo</li>
              <li>Perfumado hipoalergénico</li>
              <li>Corte de puntas específico</li>
            </ul>
          </div>
        );
      case 'Baño':
        return (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">El servicio incluye:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Baño con shampoo específico</li>
              <li>Acondicionador especial</li>
              <li>Secado profesional</li>
              <li>Peinado completo</li>
              <li>Perfumado suave</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <Link href="/servicesPets" className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver a servicios
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <div className="flex items-center mb-6">
              <ServiceIcon className="w-12 h-12 text-blue-500 mr-4" />
              <h1 className="text-4xl font-bold text-gray-800">{service.name}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  {service.type === 'perro' ? 
                    <Dog className="w-6 h-6 text-blue-600 mr-2" /> : 
                    <Cat className="w-6 h-6 text-purple-600 mr-2" />
                  }
                  <span className={`px-4 py-2 rounded-full text-sm font-bold 
                    ${service.type === 'perro' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                    {service.type === 'perro' ? 'Servicio para Perros' : 'Servicio para Gatos'}
                  </span>
                </div>

                <div className="flex items-center">
                  <PawPrint className="w-6 h-6 text-gray-600 mr-2" />
                  <span className="px-4 py-2 rounded-full text-sm font-bold bg-gray-100 text-gray-800">
                    {service.category === 'adulto' ? 'Para mascotas adultas' : 'Para cachorros'}
                  </span>
                </div>

                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-gray-600 mr-2" />
                  <span className="text-gray-700">Duración estimada: {service.duration} minutos</span>
                </div>

                <div className="flex items-center">
                  <DollarSign className="w-6 h-6 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-green-600">{service.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Descripción del servicio</h2>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                {renderServiceExtras()}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Link href="/appointments/new" className="block">
                <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-full 
                  hover:bg-blue-600 transition-colors duration-300 font-semibold text-lg
                  flex items-center justify-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Reservar turno
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceDetailPage;