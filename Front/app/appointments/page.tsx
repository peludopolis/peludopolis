"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppointmentCard from '../../components/AppointmentCard/AppointmentCard';

const AppointmentPage: React.FC = () => {
  const [appointments, setAppointments] = useState<
    { name: string; petName: string; date: string; time: string }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await fetch("http://localhost:3000/api/appointments"); // Cambiar cuando esté listo el backend
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          console.error("Error al obtener las citas");
        }
      } catch (error) {
        console.error("Error al cargar las citas:", error);
      }
    }

    fetchAppointments();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-black text-3xl font-bold mb-6">Citas Programadas</h1>

      {/* Botón para agregar nueva cita */}
      <button
        onClick={() => router.push("/appointments/new")}
        className="mb-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Agregar nueva cita
      </button>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <AppointmentCard key={index} appointment={appointment} />
          ))
        ) : (
          <p className="text-gray-600">No hay citas programadas.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;