"use client";

import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import { Appointment } from "../interfaces/index";
import { AuthContext } from "../../contexts/authContext";

const AppointmentPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    //if (!user) {
      //router.push("/login"); // Redirige a la página de inicio de sesión si no está autenticado
      //return;
    //}

    async function fetchAppointments() {
      try {
        const response = await fetch("http://localhost:3001/appointments/all"); // Cambiar cuando esté listo el backend
        if (response.ok) {
          const data: Appointment[] = await response.json();
          setAppointments(data);
        } else {
          setError("Error al obtener las citas");
        }
      } catch (error) {
        setError("Error al cargar las citas: " + error);
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, [user, router]);

  if (!user) {
    return (
      <div className="text-center p-6 bg-red-100 border border-red-400 text-red-700 rounded-md">
        <p>Debes estar logueado para ver las citas programadas.</p>
        <p>
          Por favor,{" "}
          <a href="/login" className="text-blue-600 underline">
            inicia sesión
          </a>{" "}
          o{" "}
          <a href="/register" className="text-blue-600 underline">
            regístrate
          </a>.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-black text-3xl font-bold mb-6">Citas Programadas</h1>

      <button
        onClick={() => router.push("/appointments/new")}
        className="mb-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Agregar nueva cita
      </button>

      {loading && <p>Cargando citas...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <AppointmentCard key={index} appointment={appointment} />
          ))
        ) : (
          !loading && <p className="text-black">No hay citas programadas.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;

