"use client";

import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format, addWeeks, startOfWeek, addDays, isBefore } from "date-fns";
import { es } from "date-fns/locale";
import { AuthContext } from "../../../contexts/authContext";

interface Service {
  id: string;
  name: string;
  type: string;
  stage: string;
}

interface Slot {
  namePet: string;
  date: string;
  startTime: string;
  services: Array<{ id: string }>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const NewAppointmentPage: React.FC = () => {
  const [formData, setFormData] = useState({
    namePet: "",
    service: "", // Aquí se guardará el ID del servicio
    serviceName: "",
    date: "",
    time: "",
  });
  const [services, setServices] = useState<Service[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<Record<string, string>>({});
  const [appointments, setAppointments] = useState<Slot[]>([]);
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [selectedDay, setSelectedDay] = useState<string>("lunes");

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
  }, [user, router]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/services-catalog`);
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
        alert('Error al cargar los servicios. Por favor, intente nuevamente.');
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'service') {
      const selectedService = services.find(s => s.id === value);
      setFormData(prev => ({
        ...prev,
        service: value, // Guardamos el ID del servicio seleccionado
        serviceName: selectedService ? selectedService.name : '' // También guardamos el nombre, si es necesario
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log para ver los datos antes de enviarlos
    console.log("Datos de la cita a enviar:", {
      namePet: formData.namePet,
      date: formData.date,
      startTime: formData.time,
      services: [{ id: formData.service }],
    });
  
    try {
      const appointmentData = {
        namePet: formData.namePet,
        date: formData.date,
        startTime: formData.time,
        services: [{ id: formData.service }],
      };
  
      // Redirigir a la página de pago si no hay citas previas
      if (appointments.length === 0) {
        router.push(`/appointments/payment?${new URLSearchParams({
          ...appointmentData,
          services: JSON.stringify(appointmentData.services),
        }).toString()}`);
      } else {
        const allAppointments = [appointmentData, ...appointments];
        router.push(`/appointments/payment?${new URLSearchParams({
          appointments: JSON.stringify(allAppointments),
        }).toString()}`);
      }
    } catch (error) {
      alert("Error al enviar la cita. Por favor, verifica la conexión al servidor.");
    }
  };
  

  const handleAddAnotherService = () => {
    if (selectedSlot) {
      setAppointments(prev => [...prev, {
        namePet: formData.namePet,
        date: formData.date,
        startTime: formData.time,
        services: [{ id: formData.service }]
      }]);
    }

    setFormData(prev => ({
      ...prev,
      service: "",
      serviceName: "",
      date: "",
      time: "",
    }));
    setSelectedSlot(null);
    alert("Puedes agregar otro servicio ahora.");
  };

  const generateDates = () => {
    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 });
    const week1 = addWeeks(startOfCurrentWeek, 1);
    const week2 = addWeeks(startOfCurrentWeek, 2);

    const daysOfWeek = ["lunes", "martes", "miércoles", "jueves", "viernes"];

    const generateWeek = (startDate: Date) => {
      return daysOfWeek.map((day, index) => {
        const currentDay = addDays(startDate, index);
        return { day, date: currentDay };
      });
    };

    return {
      week1: generateWeek(week1),
      week2: generateWeek(week2),
    };
  };

  const { week1, week2 } = generateDates();

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
  };

  const getDatesForDay = (day: string) => {
    const dates = [...week1, ...week2].filter((d) => d.day === day);
    return dates;
  };

  const handleSelectSlot = (date: string, time: string) => {
    const slotKey = `${date} ${time}`;

    const currentTime = new Date();
    const selectedDate = new Date(date);
    const [hour, minute] = time.split(":");
    selectedDate.setHours(parseInt(hour), parseInt(minute));

    if (isBefore(selectedDate, currentTime)) {
      alert("El horario seleccionado ya pasó. Por favor elige otro.");
      return;
    }

    setAvailableSlots((prevSlots) => {
      if (selectedSlot) {
        const previousSlotKey = `${selectedSlot.date} ${selectedSlot.startTime}`;
        return {
          ...prevSlots,
          [previousSlotKey]: "available",
          [slotKey]: "occupied",
        };
      }
      return {
        ...prevSlots,
        [slotKey]: "occupied",
      };
    });

    setSelectedSlot({
      namePet: formData.namePet,
      date,
      startTime: time,
      services: [{ id: formData.service }]
    });
    
    setFormData(prev => ({
      ...prev,
      date,
      time,
    }));
  };

  if (!user) {
    return (
      <div className="text-center p-6 bg-red-100 border border-red-400 text-red-700 rounded-md">
        <p>Debes estar logueado para agendar una nueva cita.</p>
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
      <h1 className="text-black text-3xl text-center font-bold mb-6 mt-4">
        Nueva Cita
      </h1>
      <form className="max-w-md mx-auto space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-black block mb-2 text-sm font-medium">
            Nombre de la Mascota
          </label>
          <input
            type="text"
            name="namePet"
            value={formData.namePet}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Nombre de la mascota"
            required
          />
        </div>
        <div>
          <label className="text-black block mb-2 text-sm font-medium">Servicio</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded text-black"
            required
          >
            <option value="">Elija un servicio</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {`${service.name} - ${service.type} (${service.stage})`}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-black">
            Selecciona el día y horario:
          </label>
          <div className="flex justify-between mb-4 gap-2 -ml-2">
            {["lunes", "martes", "miércoles", "jueves", "viernes"].map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleDayClick(day)}
                className={`${
                  selectedDay === day ? "bg-blue-500" : "bg-gray-200"
                } text-black px-4 py-2 rounded-md w-full`}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {getDatesForDay(selectedDay).map((d, index) => (
              <div key={index} className="border border-gray-300 p-4 rounded-md">
                <h3 className="text-black text-xl font-bold">
                  {`${d.day.charAt(0).toUpperCase() + d.day.slice(1)} ${format(d.date, 'yyyy-MM-dd', { locale: es })}`}
                </h3>
                {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00"].map((time) => {
                  const slotKey = `${format(d.date, 'yyyy-MM-dd', { locale: es })} ${time}`;
                  const isOccupied = availableSlots[slotKey] === "occupied";
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleSelectSlot(format(d.date, 'yyyy-MM-dd', { locale: es }), time)}
                      className={`${
                        isOccupied ? "bg-red-500" : "bg-green-500"
                      } text-white p-2 w-full rounded-md mt-2`}
                      disabled={isOccupied}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-between gap-4">
          <button
            type="button"
            className="bg-gray-300 text-black px-4 py-2 rounded-md"
            onClick={handleAddAnotherService}
          >
            Agendar otro servicio
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-md"
          >
            Finalizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAppointmentPage;
