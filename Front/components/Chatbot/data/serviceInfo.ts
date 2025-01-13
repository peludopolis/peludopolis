interface Service {
  id: number; // ID numérico
  name: string;
  description: string;
  price: number;
  duration: number;
  type: "perro" | "gato"; 
  category: "adulto" | "cachorro"; 
}

const services: Service[] = [
  {
    id: 1,
    name: "Corte de pelo",
    description: "Un corte de pelo profesional adaptado a la raza y estilo de tu mascota.",
    price: 10,
    duration: 30,
    type: "perro",
    category: "adulto",
  },
  {
    id: 2,
    name: "Corte de pelo",
    description: "Un corte de pelo especializado para cachorros, suave y seguro.",
    price: 15,
    duration: 30,
    type: "perro",
    category: "cachorro",
  },
  {
    id: 3,
    name: "Corte de pelo",
    description: "Un corte de pelo profesional adaptado a la raza y estilo de tu mascota.",
    price: 13,
    duration: 30,
    type: "gato",
    category: "adulto",
  },
  {
    id: 4,
    name: "Corte de pelo",
    description: "Un corte de pelo especializado para cachorros, suave y seguro.",
    price: 12,
    duration: 30,
    type: "gato",
    category: "cachorro",
  },
  {
    id: 5,
    name: "Baño",
    description: "Baño completo con productos específicos para el cuidado del pelaje.",
    price: 11,
    duration: 30,
    type: "perro",
    category: "adulto",
  },
  {
    id: 6,
    name: "Baño",
    description: "Baño para gatitos, utilizando productos hipoalergénicos.",
    price: 14,
    duration: 30,
    type: "perro",
    category: "cachorro",
  },
  {
    id: 7,
    name: "Baño",
    description: "Baño completo con productos específicos para el cuidado del pelaje.",
    price: 17,
    duration: 30,
    type: "gato",
    category: "adulto",
  },
  {
    id: 8,
    name: "Baño",
    description: "Baño para gatitos, utilizando productos hipoalergénicos.",
    price: 13,
    duration: 30,
    type: "gato",
    category: "cachorro",
  },
  {
    id: 9,
    name: "Corte de uñas",
    description: "Corte y limado de uñas para mantenerlas en una longitud saludable.",
    price: 16,
    duration: 30,
    type: "perro",
    category: "adulto",
  },
  {
    id: 10,
    name: "Corte de uñas",
    description: "Corte de uñas suave y seguro para cachorros.",
    price: 15,
    duration: 30,
    type: "perro",
    category: "cachorro",
  },
  {
    id: 11,
    name: "Corte de uñas",
    description: "Corte y limado de uñas para mantenerlas en una longitud saludable.",
    price: 18,
    duration: 30,
    type: "gato",
    category: "adulto",
  },
  {
    id: 12,
    name: "Corte de uñas",
    description: "Corte de uñas suave y seguro para cachorros.",
    price: 14,
    duration: 30,
    type: "gato",
    category: "cachorro",
  },
  {
    id: 13,
    name: "Spa",
    description: "Experiencia relajante con masajes, baño especial y cuidado del pelaje.",
    price: 15,
    duration: 30,
    type: "perro",
    category: "adulto",
  },
  {
    id: 14,
    name: "Spa",
    description: "Tratamiento suave y relajante para cachorros, incluye baño y masajes.",
    price: 12,
    duration: 30,
    type: "perro",
    category: "cachorro",
  },
  {
    id: 15,
    name: "Spa",
    description: "Spa completo para gatos, con masajes y baño especializado.",
    price: 11,
    duration: 30,
    type: "gato",
    category: "adulto",
  },
  {
    id: 16,
    name: "Spa",
    description: "Spa para gatitos, incluye masajes y cuidado especial del pelaje.",
    price: 17,
    duration: 30,
    type: "gato",
    category: "cachorro",
  },
  {
    id: 17,
    name: "Consulta veterinaria",
    description: "Consulta general con un veterinario profesional.",
    price: 13,
    duration: 30,
    type: "perro",
    category: "adulto",
  },
  {
    id: 18,
    name: "Consulta veterinaria",
    description: "Consulta general con un veterinario profesional.",
    price: 18,
    duration: 30,
    type: "gato",
    category: "adulto",
  }

];

export default services;


  