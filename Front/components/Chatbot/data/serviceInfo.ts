

interface Service {
  id: number; // ID numérico
  name: string;
  description: string;
  price: number;
  duration: number;
  type: "perro" | "gato"; // Especifica el tipo de mascota
  category: "adulto" | "cachorro"; // Diferencia entre adulto y cachorro
}

const services: Service[] = [
  {
    id: 1,
    name: "Corte de pelo",
    description: "Un corte de pelo profesional adaptado a la raza y estilo de tu mascota.",
    price: 30, // precio ajustado
    duration: 60,
    type: "perro",
    category: "adulto",
  },
  {
    id: 2,
    name: "Corte de pelo",
    description: "Un corte de pelo especializado para cachorros, suave y seguro.",
    price: 25,
    duration: 50,
    type: "perro",
    category: "cachorro",
  },
  {
    id: 3,
    name: "Baño",
    description: "Baño completo con productos específicos para el cuidado del pelaje.",
    price: 20,
    duration: 45,
    type: "gato",
    category: "adulto",
  },
  {
    id: 4,
    name: "Baño",
    description: "Baño para gatitos, utilizando productos hipoalergénicos.",
    price: 18,
    duration: 40,
    type: "gato",
    category: "cachorro",
  },
  {
    id: 5,
    name: "Corte de uñas",
    description: "Corte y limado de uñas para mantenerlas en una longitud saludable.",
    price: 10,
    duration: 15,
    type: "perro",
    category: "adulto",
  },
  {
    id: 6,
    name: "Corte de uñas",
    description: "Corte de uñas suave y seguro para cachorros.",
    price: 8,
    duration: 10,
    type: "perro",
    category: "cachorro",
  },
  {
    id: 7,
    name: "Consulta veterinaria",
    description: "Consulta general con un veterinario profesional.",
    price: 50,
    duration: 30,
    type: "perro",
    category: "adulto",
  },
  {
    id: 8,
    name: "Consulta veterinaria",
    description: "Revisión veterinaria para cachorros.",
    price: 45,
    duration: 25,
    type: "perro",
    category: "cachorro",
  },
  {
    id: 9,
    name: "Consulta veterinaria",
    description: "Consulta general con un veterinario profesional.",
    price: 50,
    duration: 30,
    type: "gato",
    category: "adulto",
  },
  {
    id: 10,
    name: "Consulta veterinaria",
    description: "Revisión veterinaria para gatitos.",
    price: 45,
    duration: 25,
    type: "gato",
    category: "cachorro",
  },
];

export default services;

  