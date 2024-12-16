'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Appointment } from '../../interfaces/index';
import services from '../../servicesPets/services';

const PaymentPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

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

  const handlePayment = async () => {
    try {
      const accessToken = process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN;

      if (!accessToken) {
        console.error('Error: Falta configurar la clave de Mercado Pago.');
        alert('Error en la configuración de Mercado Pago. Contacte con soporte.');
        return;
      }

      const ngrokUrl = 'https://c1fa-186-158-144-211.ngrok-free.app';

      const preference = {
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
          success: `${ngrokUrl}/payment-result?status=approved`,
          failure: `${ngrokUrl}/payment-result?status=failure`,
          pending: `${ngrokUrl}/payment-result?status=pending`,
        },
        auto_return: 'approved',
      };

      const response = await fetch(
        'https://api.mercadopago.com/checkout/preferences',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(preference),
        }
      );

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

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-black text-3xl font-bold mb-6">
        Confirmación de Cita y Pago
      </h1>

      {appointments.length > 0 ? (
        <div className="text-black mb-6 border p-4 rounded-md bg-gray-50">
          <h2 className="text-lg font-bold mb-4">Detalles de la Cita</h2>
          <p>
            <strong>Cliente:</strong> {appointments[0]?.name}
          </p>
          <p>
            <strong>Mascota:</strong> {appointments[0]?.petName}
          </p>
          <div className="mt-4">
            {appointments.map((appointment, index) => (
              <div key={index} className="mb-4">
                <p>
                  <strong>Servicio:</strong> {appointment.service}
                </p>
                <p>
                  <strong>Fecha:</strong> {appointment.date}
                </p>
                <p>
                  <strong>Hora:</strong> {appointment.time}
                </p>
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
        <button
          onClick={handlePayment}
          className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
        >
          Realizar Pago
        </button>
      )}
    </div>
  );
};

export default PaymentPage;
