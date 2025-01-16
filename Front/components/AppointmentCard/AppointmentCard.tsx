import React from "react";

interface AppointmentCardProps {
  appointment: {
    name: string;
    namePet: string;
    date: string;
    startTime: string;
  };
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <div className="text-black bg-white border border-gray-300 rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-2">{appointment.name}</h2>
      <p className="text-sm text-gray-600">Mascota: {appointment.namePet}</p>
      <p className="text-sm text-gray-600">Fecha: {appointment.date}</p>
      <p className="text-sm text-gray-600">Hora: {appointment.startTime}</p>
    </div>
  );
};

export default AppointmentCard;

