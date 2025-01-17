import { ReactNode } from "react";

export interface Payment {
  id: number;
  mpId: string;
  amount: number;
  paymentMethodId: string;
  status: "approved" | "pending" | "failed"; // Cambio aquí
  createdAt: string;
  updatedAt: string;
  externalReference: string;
}



export interface Appointment {
  name: string;
  petName: string;
  service: string;
  time: string;
  id: number;
  date: string;
  namePet: string;
  startTime: string;
  endTime?: string;
  createdAt: string;
  status: string;
  userId: number;
  paymentId: string;
}


export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: "admin" | "user";
}


export interface UserSession {
  picture: string | undefined;
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture?: string;
  login: boolean;
  token: string;
  user: User; 
  isAdmin?: boolean; // Aquí eliminamos el "?" para hacer que el usuario no sea opcional
}



export interface Service {
  id: number | string;
  name: string;
  description: string;
  price: number;
}


export interface Slot {
  name: string;
  petName: string;
  service: string;
  date: string;
  time: string;
}


export interface AvailableSlots {
  [key: string]: "available" | "occupied";
}


export interface ServiceSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}
export interface PaymentPopupProps {
  checkoutUrl: string;
  onClose: () => void;
}

export interface UserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address?: string; // Puedes agregar campos adicionales si es necesario
  phone?: string;
}

""

export interface UserLogin {
  email: string;
  password: string;
}