'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Appointment {
  name: string;
  petName: string;
  service: string;
  date: string;
  time: string;
}

const PaymentPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (searchParams) {
      const rawAppointments = searchParams.get('appointments');

      if (rawAppointments) {
        const parsedAppointments: Appointment[] = JSON.parse(rawAppointments);
        setAppointments(parsedAppointments);
      } else {
        const name = searchParams.get('name');
        const petName = searchParams.get('petName');
        const service = searchParams.get('service');
        const date = searchParams.get('date');
        const time = searchParams.get('time');

        if (name && petName && service && date && time) {
          setAppointments([{ name, petName, service, date, time }]);
        }
      }
    }
  }, [searchParams]);

  const handlePayment = () => {
    console.log('Iniciar el proceso de pago...');
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-black text-3xl font-bold mb-6">Confirmación de Cita y Pago</h1>
      {appointments.length > 0 ? (
        <div className="text-black mb-6 border p-4 rounded-md bg-gray-50">
          <h2 className="text-lg font-bold mb-4">Detalles de la Cita</h2>
          <p><strong>Cliente:</strong> {appointments[0].name}</p>
          <p><strong>Mascota:</strong> {appointments[0].petName}</p>
          <div className="mt-4">
            {appointments.map((appointment, index) => (
              <div key={index} className="mb-4">
                <p><strong>Servicio:</strong> {appointment.service}</p>
                <p><strong>Fecha:</strong> {appointment.date}</p>
                <p><strong>Hora:</strong> {appointment.time}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-black">Cargando información de la cita...</p>
      )}
      <button
        onClick={handlePayment}
        className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
      >
        Realizar Pago
      </button>
    </div>
  );
};

export default PaymentPage;
