"use client"

// pages/dashboard.tsx
import { useEffect, useState } from 'react';

const Dashboard = () => {
  interface UserData {
    name: string;
    email: string;
    appointments: { id: number; date: string; service: string; payment: string }[];
  }
  
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Simula la carga de datos del usuario (puedes reemplazar esto más tarde)
    setUserData({
      name: 'Simula Dashboard Peludopolis',
      email: 'peludopolis@gmail.com',
      appointments: [
        { id: 1, date: '2024-12-15', service: 'Corte de cabello', payment: 'Visa' },
        { id: 2, date: '2024-12-20', service: 'Baño', payment: 'Amex' },
      ],
    });
  }, []);

  if (!userData) {
    return <div className='text-black'>Cargando...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-black text-2xl font-bold mb-4">Bienvenido, {userData.name}</h1>
      <section>
        <h2 className="text-black text-xl font-semibold mb-2">Mis citas</h2>
        <ul className="space-y-2">
          {userData.appointments.map((appointment) => (
            <li key={appointment.id} className="text-black p-4 border rounded-lg shadow-sm">
              <p><strong>Fecha:</strong> {appointment.date}</p>
              <p><strong>Servicio:</strong> {appointment.service}</p>
              <p><strong>Metodo de Pago:</strong> {appointment.payment}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;

