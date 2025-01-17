"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Scissors, Bed, Stethoscope, Dog, Cat, PawPrint, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import services from './services';

const serviceIcons: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
  'Corte de pelo': Scissors,
  'Baño': Droplet,
  'Corte de uñas': Scissors,
  'Consulta veterinaria': Stethoscope,
  'Spa': Bed
};

interface Service {
  id: string | number;
  name: string;
  description: string;
  price: number;
  duration: number;
  type: 'perro' | 'gato';
  category: 'adulto' | 'cachorro';
}

const ServiceCard = ({ service }: { service: Service }) => {
  const ServiceIcon = serviceIcons[service.name as keyof typeof serviceIcons] || Droplet;
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/servicesPets/${service.id}`);
  };

  const handleAppointmentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push('/appointments/new');
  };

  return (
    <motion.div
      onClick={handleCardClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white shadow-lg rounded-xl p-4 sm:p-6 border border-gray-100 
        transform transition-all duration-300 hover:shadow-xl 
        hover:border-blue-200 mb-4 cursor-pointer"
    >
      <div className="flex items-center mb-3">
        <ServiceIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-3" />
        <h3 className="text-sm sm:text-md font-bold text-gray-800">{service.name}</h3>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-green-600 font-semibold text-sm sm:text-base">
            ${service.price.toFixed(2)}
          </span>
          <span className="text-gray-500 text-xs sm:text-sm">
            {service.duration} min
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="flex items-center">
            {service.type === 'perro' ? 
              <Dog className="w-4 h-4 mr-1 text-blue-600" /> : 
              <Cat className="w-4 h-4 mr-1 text-purple-600" />
            }
            <span className={`px-2 py-1 rounded-full text-xs font-bold 
              ${service.type === 'perro' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
              {service.type === 'perro' ? 'Perro' : 'Gato'}
            </span>
          </div>
          <div className="flex items-center">
            <PawPrint className="w-4 h-4 mr-1 text-gray-600" />
            <span className="px-2 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
              {service.category === 'adulto' ? 'Adulto' : 'Cachorro'}
            </span>
          </div>
        </div>
        <button
          onClick={handleAppointmentClick}
          className="w-full flex items-center justify-center bg-blue-400 text-white 
          py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 mt-3 text-sm sm:text-base"
        >
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Solicitar Turno
        </button>
      </div>
    </motion.div>
  );
};

const ServicesPage = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = services.filter(service =>
    (selectedType === 'all' || service.type === selectedType) &&
    (selectedCategory === 'all' || service.category === selectedCategory)
  );

  const groupedServices = filteredServices.reduce((acc: { [key: string]: { [key: string]: Service[] } }, service) => {
    if (!acc[service.name]) {
      acc[service.name] = {};
    }
    if (!acc[service.name][service.type]) {
      acc[service.name][service.type] = [];
    }
    acc[service.name][service.type].push(service);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-title text-center mb-8 sm:mb-12 text-primary"
        >
          Nuestros Servicios
        </motion.h1>

        {/* Filtros responsivos */}
        <div className="flex flex-col sm:flex-row justify-around space-y-6 sm:space-y-0 sm:space-x-4 mb-8">
          <div className="w-full sm:w-auto">
            <h2 className="text-center text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 font-fun text-secondary">
              Elige tipo de mascota
            </h2>
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base ${
                  selectedType === 'all' ? 'bg-danger text-white' : 'bg-tertiary text-white'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedType('perro')}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base ${
                  selectedType === 'perro' ? 'bg-danger text-white' : 'bg-tertiary text-white'
                }`}
              >
                Perro
              </button>
              <button
                onClick={() => setSelectedType('gato')}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base ${
                  selectedType === 'gato' ? 'bg-danger text-white' : 'bg-tertiary text-white'
                }`}
              >
                Gato
              </button>
            </div>
          </div>

          <div className="w-full sm:w-auto">
            <h2 className="text-center text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 font-fun text-secondary">
              Elige su edad
            </h2>
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base ${
                  selectedCategory === 'all' ? 'bg-danger text-white' : 'bg-tertiary text-white'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedCategory('adulto')}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base ${
                  selectedCategory === 'adulto' ? 'bg-danger text-white' : 'bg-tertiary text-white'
                }`}
              >
                Adulto
              </button>
              <button
                onClick={() => setSelectedCategory('cachorro')}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base ${
                  selectedCategory === 'cachorro' ? 'bg-danger text-white' : 'bg-tertiary text-white'
                }`}
              >
                Cachorro
              </button>
            </div>
          </div>
        </div>

        {/* Grid de servicios responsivo */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          >
            {Object.entries(groupedServices).map(([serviceName, serviceTypeGroups]) => (
              <motion.div
                key={serviceName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="col-span-1"
              >
                <div className="shadow-xl rounded-2xl sm:rounded-3xl overflow-hidden">
                  <div className="p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4">
                      {serviceName}
                    </h2>

                    {Object.entries(serviceTypeGroups).map(([serviceType, serviceGroup]) => (
                      <div key={serviceType} className="mb-4 sm:mb-6">
                        <div className="flex items-center mb-3">
                          {serviceType === 'perro' ?
                            <Dog className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-blue-600" /> :
                            <Cat className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-purple-600" />
                          }
                          <h3 className="text-base sm:text-lg font-semibold text-gray-700 bg-light rounded-md p-2 sm:p-3">
                            {serviceType === 'perro' ? 'Servicios para Perros' : 'Servicios para Gatos'}
                          </h3>
                        </div>
                        {serviceGroup.map(service => (
                          <ServiceCard key={service.id} service={service} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServicesPage;