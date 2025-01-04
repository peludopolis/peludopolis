import { ReactNode } from "react";

export interface ServiceSectionProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
  }

  // Interfaz para el usuario
export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role:  "admin" | "user";
}



export interface UserLogin { 
  email: string;
  password: string;
}

export interface UserData { 
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface UserSession {
  picture: string;
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture?: string;
  login: boolean;
  token: string;
  user?: UserSessionData;
  services: ServicePet[];
  isAdmin?: boolean; // Nuevo campo para indicar si el usuario es administrador
}


interface UserSessionData {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: "admin" | "user";
  credential: Credential;
  services: ServicePet[];
}

// Interfaz para el servicioMascota
export interface ServicePet {
  id: number;
  status?: string;
  date?: string;
}

interface Credential {
  id: number;
  password: string;
}

export interface Slot {
  name: string;
  petName: string;
  service: string;
  date: string;
  time: string;
}

export interface AvailableSlots {
  [key: string]: 'available' | 'occupied';
}

export interface Appointment {
  name: string;
  petName: string;
  service: string;
  date: string;
  time: string;
}
