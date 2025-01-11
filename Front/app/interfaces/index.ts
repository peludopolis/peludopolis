import { ReactNode } from "react";

export interface Payment {
  id: number;              
  mpId: string;          
  amount: number;
  paymentMethodId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  externalReference: string;
}


export interface Appointment {
  name: ReactNode;
  petName: ReactNode;
  service: ReactNode;
  time: ReactNode;
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
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture?: string;
  login: boolean;
  token: string;
  user?: User;
}


export interface Service {
  id: number;
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
