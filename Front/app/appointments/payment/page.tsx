"use client"

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Appointment } from "../../interfaces";
import services from "../../servicesPets/services";
import { useUser } from "../../../contexts/UserContext";

const PaymentPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { userSession } = useUser();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    const rawAppointments = searchParams.get("appointments");
    if (rawAppointments) {
      const parsedAppointments: Appointment[] = JSON.parse(rawAppointments);
      parsedAppointments.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
      setAppointments(parsedAppointments);
    } else {
      const name = searchParams.get("name");
      const petName = searchParams.get("petName");
      const service = searchParams.get("service");
      const date = searchParams.get("date");
      const time = searchParams.get("time");

      if (name && petName && service && date && time) {
        setAppointments([{ name, petName, service, date, time }]);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const totalPrice = appointments.reduce((sum, appointment) => {
      const service = services.find((s) => s.name === appointment.service);
      return service ? sum + service.price : sum;
    }, 0);
    setTotal(totalPrice);
  }, [appointments]);

  useEffect(() => {
    const status = searchParams.get("status");
    if (status) {
      setPaymentStatus(status);

      if (status === "approved") {
        handleSendAppointment();
      }
    }
  }, [searchParams]);

  const handlePayment = async () => {
    try {
      const accessToken = process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN;

      if (!accessToken) {
        console.error("Error: Falta configurar la clave de Mercado Pago.");
        alert("Error en la configuración de Mercado Pago. Contacte con soporte.");
        return;
      }

      const localUrl = "http://localhost:3000";

      const preference = {
        items: appointments.map((appointment) => {
          const service = services.find((s) => s.name === appointment.service);
          return {
            title: service?.name || "Servicio",
            description: service?.description || "",
            quantity: 1,
            currency_id: "ARS",
            unit_price: service?.price || 0,
          };
        }),
        back_urls: {
          success: `${localUrl}/appointments/payment?status=approved`,
          failure: `${localUrl}/appointments/payment?status=failure`,
          pending: `${localUrl}/appointments/payment?status=pending`,
        },
        auto_return: "approved",
      };

      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(preference),
      });

      const data = await response.json();

      if (data.id) {
        setCheckoutUrl(data.init_point);
      } else {
        console.error("Error al generar la preferencia:", data);
        alert("No se pudo generar la preferencia de pago.");
      }
    } catch (error) {
      console.error("Error al generar la preferencia de pago:", error);
      alert("Ocurrió un error inesperado.");
    }
  };

  const handleSendAppointment = async () => {
    if (!userSession || !userSession.user) {
      alert("No hay usuario logueado.");
      return;
    }

    try {
      const appointmentData = {
        date: appointments[0].date,
        namePet: appointments[0].petName,
        startTime: appointments[0].time,
        user: userSession.user.id,
        services: [{ id: "someServiceId" }], 
      };

      const response = await fetch("http://localhost:3001/appointments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cita agendada correctamente");
        router.push("/");
      } else {
        console.error("Error al enviar la cita:", data);
        alert("No se pudo agendar la cita, intente nuevamente.");
      }
    } catch (error) {
      console.error("Error en la petición al backend:", error);
      alert("Error en la conexión con el servidor.");
    }
  };

  if (paymentStatus === "failure") {
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-black text-3xl font-bold mb-6">Pago Fallido</h1>
        <p className="text-red-600">El pago no se pudo completar. Intenta nuevamente.</p>
        <button
          onClick={() => router.push("/appointments")}
          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mt-4"
        >
          Volver a la página de citas
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-black text-3xl font-bold mb-6">Confirmación de Cita y Pago</h1>
      {appointments.length > 0 ? (
        <div className="text-black mb-6 border p-4 rounded-md bg-gray-50">
          <h2 className="text-lg font-bold mb-4">Detalles de la Cita</h2>
          <p><strong>Cliente:</strong> {appointments[0]?.name}</p>
          <p><strong>Mascota:</strong> {appointments[0]?.petName}</p>
          <p><strong>Servicio:</strong> {appointments[0]?.service}</p>
          <p><strong>Fecha:</strong> {appointments[0]?.date}</p>
          <p><strong>Hora:</strong> {appointments[0]?.time}</p>
        </div>
      ) : (
        <p>No hay citas para mostrar.</p>
      )}

      <h2 className="text-lg font-bold">Total: ${total}</h2>

      {!checkoutUrl ? (
        <button
          onClick={handlePayment}
          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mt-4"
        >
          Generar Pago
        </button>
      ) : (
        <div className="mt-4">
          <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
            <button className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded mt-4">
              Realizar Pago
            </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
