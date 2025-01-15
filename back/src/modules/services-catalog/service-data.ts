import {
  AnimalType,
  ServiceCategory,
  Stage
} from './entities/services-catalog.entity';

export const serviceData = [
  {
    name: 'Corte de pelo',
    description:
      'Un corte de pelo profesional adaptado a la raza y estilo de tu mascota.',
    price: 10.0,
    employeeName: 'Carlos Martínez',
    category: ServiceCategory.CORTEDEPELO,
    type: AnimalType.PERRO,
    stage: Stage.Adulto,
    duration: 30
  },
  {
    name: 'Corte de pelo',
    description:
      'Un corte de pelo profesional adaptado a la raza y estilo de tu mascota.',
    price: 15.0,
    employeeName: 'Carlos Martínez',
    category: ServiceCategory.CORTEDEPELO,
    type: AnimalType.PERRO,
    stage: Stage.Cachorro,
    duration: 30
  },
  {
    name: 'Corte de pelo',
    description: 'Corte profesional para gatos adultos, cuidando su comodidad.',
    price: 13.0,
    employeeName: 'Carlos Martínez',
    category: ServiceCategory.CORTEDEPELO,
    type: AnimalType.GATO,
    stage: Stage.Adulto,
    duration: 30
  },
  {
    name: 'Corte de pelo',
    description: 'Un corte suave para gatitos, sin estrés.',
    price: 12.0,
    employeeName: 'Carlos Martínez',
    category: ServiceCategory.CORTEDEPELO,
    type: AnimalType.GATO,
    stage: Stage.Cachorro,
    duration: 30
  },
  {
    name: 'Baño',
    description:
      'Baño completo con productos específicos para el cuidado del pelaje.',
    price: 11.0,
    employeeName: 'Patricia Ramos',
    category: ServiceCategory.BAÑO,
    type: AnimalType.PERRO,
    stage: Stage.Adulto,
    duration: 30
  },
  {
    name: 'Baño',
    description: 'Baño relajante para cachorros, con productos suaves.',
    price: 14.0,
    employeeName: 'Patricia Ramos',
    category: ServiceCategory.BAÑO,
    type: AnimalType.PERRO,
    stage: Stage.Cachorro,
    duration: 30
  },
  {
    name: 'Baño',
    description:
      'Baño profesional para gatos adultos, respetando su naturaleza.',
    price: 17.0,
    employeeName: 'Patricia Ramos',
    category: ServiceCategory.BAÑO,
    type: AnimalType.GATO,
    stage: Stage.Adulto,
    duration: 30
  },
  {
    name: 'Baño',
    description: 'Baño delicado para gatitos, con shampoo especial.',
    price: 13.0,
    employeeName: 'Patricia Ramos',
    category: ServiceCategory.BAÑO,
    type: AnimalType.GATO,
    stage: Stage.Cachorro,
    duration: 30
  },
  {
    name: 'Corte de uñas',
    description:
      'Corte y limado de uñas para mantenerlas en una longitud saludable.',
    price: 16.0,
    employeeName: 'María González',
    category: ServiceCategory.CORTEUÑAS,
    type: AnimalType.PERRO,
    stage: Stage.Adulto,
    duration: 30
  },
  {
    name: 'Corte de uñas',
    description: 'Corte de uñas suave y seguro para cachorros.',
    price: 15.0,
    employeeName: 'María González',
    category: ServiceCategory.CORTEUÑAS,
    type: AnimalType.PERRO,
    stage: Stage.Cachorro,
    duration: 30
  },
  {
    name: 'Corte de uñas',
    description:
      'Corte y limado de uñas para mantenerlas en una longitud saludable.',
    price: 18.0,
    employeeName: 'María González',
    category: ServiceCategory.CORTEUÑAS,
    type: AnimalType.GATO,
    stage: Stage.Adulto,
    duration: 30
  },
  {
    name: 'Corte de uñas',
    description: 'Corte de uñas suave y seguro para cachorros.',
    price: 14.0,
    employeeName: 'María González',
    category: ServiceCategory.CORTEUÑAS,
    type: AnimalType.GATO,
    stage: Stage.Cachorro,
    duration: 30
  },
  {
    name: 'Spa',
    description:
      'Experiencia relajante con masajes, baño especial y cuidado del pelaje.',
    price: 15.0,
    employeeName: 'Luis Pérez',
    category: ServiceCategory.SPA,
    type: AnimalType.PERRO,
    stage: Stage.Adulto,
    duration: 30
  },
  {
    name: 'Spa',
    description:
      'Tratamiento suave y relajante para cachorros, incluye baño y masajes.',
    price: 12.0,
    employeeName: 'Luis Pérez',
    category: ServiceCategory.SPA,
    type: AnimalType.PERRO,
    stage: Stage.Cachorro,
    duration: 30
  },
  {
    name: 'Spa',
    description: 'Spa completo para gatos, con masajes y baño especializado.',
    price: 11.0,
    employeeName: 'Luis Pérez',
    category: ServiceCategory.SPA,
    type: AnimalType.GATO,
    stage: Stage.Adulto,
    duration: 30
  },
  {
    name: 'Spa',
    description:
      'Spa para gatitos, incluye masajes y cuidado especial del pelaje.',
    price: 17.0,
    employeeName: 'Luis Pérez',
    category: ServiceCategory.SPA,
    type: AnimalType.GATO,
    stage: Stage.Cachorro,
    duration: 30
  },
  {
    name: 'Consulta veterinaria',
    description: 'Consulta general con un veterinario profesional.',
    price: 13.0,
    employeeName: 'Anabel Gutierrez',
    category: ServiceCategory.CONSULTA,
    type: AnimalType.PERRO,
    stage: Stage.Adulto,
    duration: 30
  },
  {
    name: 'Consulta veterinaria',
    description: 'Consulta general con un veterinario profesional.',
    price: 18.0,
    employeeName: 'Anabel Gutierrez',
    category: ServiceCategory.CONSULTA,
    type: AnimalType.GATO,
    stage: Stage.Adulto,
    duration: 30
  },

];
