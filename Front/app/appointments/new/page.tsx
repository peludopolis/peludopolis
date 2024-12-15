"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { format, addWeeks, startOfWeek, addDays, isBefore, isToday } from "date-fns";
import { es } from "date-fns/locale";
import { Slot, AvailableSlots } from "../../interfaces/index";

const NewAppointmentPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    petName: "",
    service: "",
    date: "",
    time: "",
  });

  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlots>({});
  const [appointments, setAppointments] = useState<Slot[]>([]);
  const router = useRouter();
  const services = ["Elija un servicio", "Baño", "Corte de pelo", "Corte de uña"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (appointments.length === 0) {
        router.push(
          `/appointments/payment?${new URLSearchParams(formData).toString()}`
        );
      } else {
        const citas = [selectedSlot, ...appointments].filter(Boolean);
        const queryString = new URLSearchParams({
          appointments: JSON.stringify(citas),
        }).toString();
        router.push(`/appointments/payment?${queryString}`);
      }
    } catch (error) {
      alert("Error al enviar la cita. Por favor, verifica la conexión al servidor.");
    }
  };

  const handleAddAnotherService = () => {
    if (selectedSlot) {
      setAppointments((prevAppointments) => [...prevAppointments, selectedSlot]);
    }

    setFormData({
      ...formData,
      service: "",
      date: "",
      time: "",
    });
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
  const [selectedDay, setSelectedDay] = useState<string>("lunes");

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
        const previousSlotKey = `${selectedSlot.date} ${selectedSlot.time}`;
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
      name: formData.name,
      petName: formData.petName,
      service: formData.service,
      date,
      time,
    });
    setFormData({
      ...formData,
      date,
      time,
    });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-black text-3xl text-center font-bold mb-6 mt-4">
        Nueva Cita
      </h1>
      <form className="max-w-md mx-auto space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-black block mb-2 text-sm font-medium">
            Nombre del Cliente
          </label>
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
          <label className="text-black block mb-2 text-sm font-medium">
            Nombre de la Mascota
          </label>
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
          <label className="text-black block mb-2 text-sm font-medium">Servicio</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded text-black"
            required
          >
            {services.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold text-black">
            Selecciona el día y horario:
          </label>
          <div className="flex justify-between mb-4 gap-2 -ml-2">
            {["lunes", "martes", "miércoles", "jueves", "viernes"].map((day, index) => (
              <button
                key={index}
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
                <h3 className="text-black text-xl font-bold">{`${d.day.charAt(0).toUpperCase() + d.day.slice(1)} ${format(new Date(d.date), 'd MMMM yyyy', { locale: es })}`}</h3>
                {["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00"].map((time, timeIndex) => {
                  const slotKey = `${format(new Date(d.date), 'd MMMM yyyy', { locale: es })} ${time}`;
                  const isOccupied = availableSlots[slotKey] === "occupied";
                  return (
                    <button
                      key={timeIndex}
                      type="button"
                      onClick={() => handleSelectSlot(format(new Date(d.date), 'd MMMM yyyy', { locale: es }), time)}
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
