import Image from "next/image";

const ServiciosMascota = () => {
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

  return (
    <div className="py-8 mx-8">
      <h2 className="text-center font-title text-primary text-2xl font-extrabold sm:text-3xl m-4">
        Servicios para tu mascota
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {servicios.map((servicio, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden text-center"
          >
            <div className="relative w-full h-48">
              <Image
                src={servicio.imagen}
                alt={servicio.titulo}
                width={300}
                height={300}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-black">{servicio.titulo}</h3>
              <p className="text-sm text-gray-600">{servicio.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiciosMascota;