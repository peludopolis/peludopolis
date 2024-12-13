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
  login: boolean;
  token: string;
  user: UserSessionData;
}

interface UserSessionData {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: string;
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
