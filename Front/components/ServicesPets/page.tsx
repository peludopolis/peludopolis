"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const ServiciosMascota = () => {
  const router = useRouter();

  const servicios = [
    {
      titulo: "BAÑO",
      imagen: "https://th.bing.com/th/id/OIP.iKs9SMj6dwqsgWGXPpTd_AAAAA?rs=1&pid=ImgDetMain",
      descripcion: "Servicio de grooming para tu mascota",
    },
    {
      titulo: "CORTE DE PELO",
      imagen: "https://th.bing.com/th/id/OIP.6gixoITdMAhXLrlTCKsN2wAAAA?rs=1&pid=ImgDetMain",
      descripcion: "Entrenamiento amigable y positivo",
    },
    {
      titulo: "SPA",
      imagen: "https://th.bing.com/th/id/OIP.HuNKtgGupal9Il0n22bV8gHaE4?rs=1&pid=ImgDetMain",
      descripcion: "Atención veterinaria para tus mascotas",
    },
    {
      titulo: "CORTE DE UÑAS",
      imagen: "https://nfnatcane.es/blog/wp-content/uploads/2019/03/como-cortar-las-u%C3%B1as-a-un-perro.jpg",
      descripcion: "Encuentra un nuevo hogar para tu mascota",
    },
  ];

  const handleCardClick = () => {
    router.push('/servicesPets');
  };

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-8">
      <h2 className="text-center font-title text-primary text-xl sm:text-2xl lg:text-3xl font-extrabold mb-6 sm:mb-8">
        Servicios para tu mascota
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {servicios.map((servicio, index) => (
          <div
            key={index}
            onClick={handleCardClick}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden text-center cursor-pointer group"
          >
            <div className="relative w-full pb-[75%]">
              <Image
                src={servicio.imagen}
                alt={servicio.titulo}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority={index === 0}
              />
            </div>
            <div className="p-4">
              <h3 className="text-base sm:text-lg font-medium text-black group-hover:text-primary transition-colors duration-300">
                {servicio.titulo}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {servicio.descripcion}
              </p>
            </div>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiciosMascota;