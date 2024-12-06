import React, { useState } from 'react';

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', date: '', time: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/appointments', { //Este endpoint se modificara cuando el back tenga
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const newAppointment = await response.json();
        console.log('Cita creada:', newAppointment);
        // Aquí podrías actualizar la lista de citas en el estado
      } else {
        console.error('Error al enviar la cita');
      }
    } catch (error) {
      console.error('Error al enviar la cita:', error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Campos de formulario */}
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Agendar cita
      </button>
    </form>
  );
};

export default AppointmentForm;
