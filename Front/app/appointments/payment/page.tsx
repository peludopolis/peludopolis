'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Appointment } from '../../interfaces/index';
import services from '../../servicesPets/services';

const PaymentPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    const rawAppointments = searchParams.get('appointments');
    if (rawAppointments) {
      const parsedAppointments: Appointment[] = JSON.parse(rawAppointments);
      parsedAppointments.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
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
  }, [searchParams]);

  useEffect(() => {
    const totalPrice = appointments.reduce((sum, appointment) => {
      const service = services.find((s) => s.name === appointment.service);
      return service ? sum + service.price : sum;
    }, 0);
    setTotal(totalPrice);
  }, [appointments]);

  useEffect(() => {
    const status = searchParams.get('status');
    if (status) {
      setPaymentStatus(status);

      if (status === 'approved') {
        handleSendAppointment();
      }
    }
  }, [searchParams]);

  // Genera un orderId único basado en fecha y hora
  const generateOrderId = () => {
    return `order_${new Date().getTime()}`;
  };

  const handlePayment = async () => {
    try {
      const localUrl = 'http://localhost:3000';

      const preferenceData = {
        orderId: generateOrderId(), // Nuevo orderId único
        items: appointments.map((appointment) => {
          const service = services.find((s) => s.name === appointment.service);
          return {
            title: service?.name || 'Servicio',
            description: service?.description || '',
            quantity: 1,
            currency_id: 'ARS',
            unit_price: service?.price || 0,
          };
        }),
        back_urls: {
          success: `${localUrl}/appointments/payment?status=approved`,
          failure: `${localUrl}/appointments/payment?status=failure`,
          pending: `${localUrl}/appointments/payment?status=pending`,
        },
      };

      // Llamada a tu endpoint en /api/mercadopago
      const response = await fetch('/api/mercadopago', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferenceData),
      });

      const data = await response.json();

      if (data.init_point) {
        setCheckoutUrl(data.init_point);
      } else {
        console.error('Error al generar la preferencia:', data);
        alert('No se pudo generar la preferencia de pago.');
      }
    } catch (error) {
      console.error('Error al generar la preferencia de pago:', error);
      alert('Ocurrió un error inesperado.');
    }
  };

  const handleSendAppointment = async () => {
    try {
      const response = await fetch('http://localhost:3001/appointments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: appointments[0].date,
          namePet: appointments[0].petName,
          startTime: appointments[0].time,
          user: '29bd6879-16eb-4cd5-b071-633b1959f932',
          services: [{ id: '412ab873-5428-45ee-8205-ff905db3508b' }],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Cita agendada correctamente');
        router.push('/');
      } else {
        console.error('Error al enviar la cita:', data);
        alert('No se pudo agendar la cita, intente nuevamente.');
      }
    } catch (error) {
      console.error('Error en la petición al backend:', error);
      alert('Error en la conexión con el servidor.');
    }
  };

  if (paymentStatus === 'failure') {
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-black text-3xl font-bold mb-6">Pago Fallido</h1>
        <p className="text-red-600">El pago no se pudo completar. Intenta nuevamente.</p>
        <button
          onClick={() => router.push('/appointments')}
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
          <div className="mt-4">
            {appointments.map((appointment, index) => (
              <div key={index} className="mb-4">
                <p><strong>Servicio:</strong> {appointment.service}</p>
                <p><strong>Fecha:</strong> {appointment.date}</p>
                <p><strong>Hora:</strong> {appointment.time}</p>
              </div>
            ))}
          </div>
          <p className="text-lg font-bold mt-4">Total: ${total}</p>
        </div>
      ) : (
        <p className="text-black">Cargando información de la cita...</p>
      )}
      {checkoutUrl ? (
        <iframe
          src={checkoutUrl}
          width="100%"
          height="650"
          style={{ border: 'none' }}
          title="Mercado Pago Checkout"
        />
      ) : (
        <div className="flex gap-4 mt-4">
          <button
            onClick={handlePayment}
            className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
          >
            Realizar Pago
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
