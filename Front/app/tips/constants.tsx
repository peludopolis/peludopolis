import React from 'react';
import { 
  Dog, PawPrint, Scissors, Bath, Thermometer, HeartPulse, 
  Bone, Syringe, AlertTriangle, Utensils 
} from 'lucide-react';
import { TipCategory, TipContent } from './types';

export const TIP_CATEGORIES: TipCategory[] = [
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

export const TIP_CONTENT: TipContent = {
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