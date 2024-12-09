'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewAppointmentPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', petName: '', date: '', time: '' });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //este codigo evita el pago sin una respuesta exitosa pero se conecta a la base de datos para probar crear un tunro
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Enviar la solicitud de creación de cita al backend
      const response = await fetch('http://localhost:3001/appointments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Cita creada con éxito');
        // Puedes mostrar un mensaje de éxito o realizar otras acciones aquí
      } else {
        console.error('Error al crear la cita');
        alert('Hubo un problema al crear la cita. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar la cita:', error);
      alert('Error al enviar la cita. Por favor, verifica la conexión al servidor.');
    }
  };
  

  //Cuando la pasarela de pago la tengamos lista aqui la vamos a configurar:
  /*const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/appointments', { // Cambiar cuando esté listo el backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Redirige a la página de pago con los datos de la cita
        router.push(
          `/appointments/payment?${new URLSearchParams(formData).toString()}`
        );
      } else {
        console.error('Error al crear la cita');
      }
    } catch (error) {
      console.error('Error al enviar la cita:', error);
    }
  };*/
  

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-black text-3xl text-center font-bold mb-6 mt-4">Agendar Nueva Cita</h1>
      <form className="max-w-md mx-auto space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-black block mb-2 text-sm font-medium">Nombre del Cliente</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Nombre del cliente"
            required
          />
        </div>
        <div>
          <label className="text-black block mb-2 text-sm font-medium">Nombre de la Mascota</label>
          <input
            type="text"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Nombre de la mascota"
            required
          />
        </div>
        <div>
          <label className="text-black block mb-2 text-sm font-medium">Fecha</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="text-black block mb-2 text-sm font-medium">Hora</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center m-4"
            >
              Proceder al Pago y Agendar Cita
          </button>
        </div>

      </form>
    </div>
  );
};

export default NewAppointmentPage;


