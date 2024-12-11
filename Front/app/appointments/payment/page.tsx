'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const PaymentPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [appointmentData, setAppointmentData] = useState<any>(null);

  useEffect(() => {
    if (searchParams) {
      const name = searchParams.get('name');
      const petName = searchParams.get('petName');
      const date = searchParams.get('date');
      const time = searchParams.get('time');

      if (name && petName && date && time) {
        setAppointmentData({ name, petName, date, time });
      }
    }
  }, [searchParams]);

  const handlePayment = () => {
    // Lógica de redirección a la pasarela de pago
    console.log('Iniciar el proceso de pago...');
    // Agregar la integración de la pasarela de pago aquí
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className=" text-black text-3xl font-bold mb-6">Confirmación de Cita y Pago</h1>
      {appointmentData ? (
        <div className="text-black mb-6">
          <p><strong>Cliente:</strong> {appointmentData.name}</p>
          <p><strong>Mascota:</strong> {appointmentData.petName}</p>
          <p><strong>Fecha:</strong> {appointmentData.date}</p>
          <p><strong>Hora:</strong> {appointmentData.time}</p>
        </div>
      ) : (
        <p className='text-black'>Cargando información de la cita...</p>
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
