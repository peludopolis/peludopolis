interface Service {
    id: string | number;
    name: string;
    description: string;
    price: number;
    duration: number;
    type: "perro" | "gato"; 
    category: "adulto" | "cachorro"; 
  }
  
  const services: Service[] = [
    {
      id: "a0f553e4-0289-49b7-8c25-d05d759a73e3",
      name: "Corte de pelo",
      description: "Un corte de pelo profesional adaptado a la raza y estilo de tu mascota.",
      price: 10,
      duration: 30,
      type: "perro",
      category: "adulto",
    },
    {
      id: "cfab1588-6aa9-40f8-9833-8fd21116aa91",
      name: "Corte de pelo",
      description: "Un corte de pelo especializado para cachorros, suave y seguro.",
      price: 15,
      duration: 30,
      type: "perro",
      category: "cachorro",
    },
    {
      id: "05025e0e-2707-4fd9-8e19-4faf823334d8",
      name: "Corte de pelo",
      description: "Un corte de pelo profesional adaptado a la raza y estilo de tu mascota.",
      price: 13,
      duration: 30,
      type: "gato",
      category: "adulto",
    },
    {
      id: "5c46193f-2bb7-4d56-aeeb-4e3e7440e4d0",
      name: "Corte de pelo",
      description: "Un corte de pelo especializado para cachorros, suave y seguro.",
      price: 12,
      duration: 30,
      type: "gato",
      category: "cachorro",
    },
    {
      id: "1e7894d1-90de-4131-97e8-bf8cadf45b01",
      name: "Baño",
      description: "Baño completo con productos específicos para el cuidado del pelaje.",
      price: 11,
      duration: 30,
      type: "perro",
      category: "adulto",
    },
    {
      id: "910850af-b908-4477-a4e9-59e805fa0ec7",
      name: "Baño",
      description: "Baño para gatitos, utilizando productos hipoalergénicos.",
      price: 14,
      duration: 30,
      type: "perro",
      category: "cachorro",
    },
    {
      id: "9807bc28-da71-48ce-8f68-b31c01eae417",
      name: "Baño",
      description: "Baño completo con productos específicos para el cuidado del pelaje.",
      price: 17,
      duration: 30,
      type: "gato",
      category: "adulto",
    },
    {
      id: "3cbb71cb-b6ee-469b-852b-f29643514e76",
      name: "Baño",
      description: "Baño para gatitos, utilizando productos hipoalergénicos.",
      price: 13,
      duration: 30,
      type: "gato",
      category: "cachorro",
    },
    {
      id: "19862ad6-eecf-4a3f-b2ee-8510de1c0d7e",
      name: "Corte de uñas",
      description: "Corte y limado de uñas para mantenerlas en una longitud saludable.",
      price: 16,
      duration: 30,
      type: "perro",
      category: "adulto",
    },
    {
      id: "a90cee51-13da-42f5-9845-b606699a8d80",
      name: "Corte de uñas",
      description: "Corte de uñas suave y seguro para cachorros.",
      price: 15,
      duration: 30,
      type: "perro",
      category: "cachorro",
    },
    {
      id: "27e9cad2-3afc-45ec-bfb7-5c5ca71853f8",
      name: "Corte de uñas",
      description: "Corte y limado de uñas para mantenerlas en una longitud saludable.",
      price: 18,
      duration: 30,
      type: "gato",
      category: "adulto",
    },
    {
      id: "c45668ea-25b7-4c22-9706-202444611c5a",
      name: "Corte de uñas",
      description: "Corte de uñas suave y seguro para cachorros.",
      price: 14,
      duration: 30,
      type: "gato",
      category: "cachorro",
    },
    {
      id: "0599ae1d-2640-45fd-84c1-223e394e1fe3",
      name: "Spa",
      description: "Experiencia relajante con masajes, baño especial y cuidado del pelaje.",
      price: 15,
      duration: 30,
      type: "perro",
      category: "adulto",
    },
    {
      id: "7cf6d380-1d22-44d3-b746-6bb5fda8df43",
      name: "Spa",
      description: "Tratamiento suave y relajante para cachorros, incluye baño y masajes.",
      price: 12,
      duration: 30,
      type: "perro",
      category: "cachorro",
    },
    {
      id: "64270336-13f1-419d-810f-22403e3fc092",
      name: "Spa",
      description: "Spa completo para gatos, con masajes y baño especializado.",
      price: 11,
      duration: 30,
      type: "gato",
      category: "adulto",
    },
    {
      id: "25f5be0e-9440-4c19-aa2f-9af201d63245",
      name: "Spa",
      description: "Spa para gatitos, incluye masajes y cuidado especial del pelaje.",
      price: 17,
      duration: 30,
      type: "gato",
      category: "cachorro",
    },
    {
      id: "8594d6d7-346d-49a9-abde-90cdcc30f823",
      name: "Consulta veterinaria",
      description: "Consulta general con un veterinario profesional.",
      price: 13,
      duration: 30,
      type: "perro",
      category: "adulto",
    },
    {
      id: "fa3bafe7-4f71-42f8-b905-d836adda6912",
      name: "Consulta veterinaria",
      description: "Consulta general con un veterinario profesional.",
      price: 18,
      duration: 30,
      type: "gato",
      category: "adulto",
    }

  ];
  
  export default services;
  