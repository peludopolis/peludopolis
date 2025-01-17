"use client";

import React, { useEffect, useState, useContext, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AuthContext } from "../../../contexts/authContext";
import PaymentPopup from "../../../components/PaymentPopup/PaymentPopup";

interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface Appointment {
  namePet: string;
  date: string;
  startTime: string;
  services: Array<{ id: string }>;
}

interface Payment {
  id: string;
  status: string;
  external_reference: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const PaymentPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState<boolean>(false);
  const [isCreatingAppointment, setIsCreatingAppointment] = useState<boolean>(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    console.log('Estado inicial:', {
      user: !!user,
      isUserLoaded,
      paymentStatus,
      appointments: appointments.length,
      paymentId
    });
  }, []);

  useEffect(() => {
    console.log('Intentando cargar usuario desde localStorage...');
    const savedUser = localStorage.getItem("user");
    if (savedUser && !user) {
      console.log('Usuario encontrado en localStorage');
      setUser(JSON.parse(savedUser));
    }
    if (user) {
      console.log('Usuario cargado correctamente');
      setIsUserLoaded(true);
    }
  }, [user, setUser]);

  useEffect(() => {
    if (!isUserLoaded) {
      console.log('Esperando carga de usuario para fetch de servicios...');
      return;
    }

    const fetchServices = async () => {
      try {
        console.log('Iniciando fetch de servicios...');
        const response = await fetch(`${API_URL}/services-catalog`);
        const data = await response.json();
        console.log('Servicios obtenidos:', data);
        setServices(data);
      } catch (error) {
        console.error('Error al obtener servicios:', error);
      }
    };

    fetchServices();
  }, [isUserLoaded]);

  useEffect(() => {
    console.log('Procesando parámetros de URL y localStorage...');
    const savedAppointments = localStorage.getItem('pendingAppointments');
    if (savedAppointments) {
      console.log('Appointments encontrados en localStorage:', savedAppointments);
      try {
        const parsed = JSON.parse(savedAppointments);
        setAppointments(parsed);
        return;
      } catch (error) {
        console.error('Error al parsear appointments desde localStorage:', error);
      }
    }

    const rawAppointments = searchParams.get("appointments");
    if (rawAppointments) {
      try {
        const parsedAppointments = JSON.parse(rawAppointments);
        console.log('Appointments parseados de URL:', parsedAppointments);
        setAppointments(parsedAppointments);
        localStorage.setItem('pendingAppointments', JSON.stringify(parsedAppointments));
      } catch (error) {
        console.error('Error al parsear appointments de URL:', error);
      }
    } else {
      const namePet = searchParams.get("namePet");
      const services = searchParams.get("services");
      const date = searchParams.get("date");
      const startTime = searchParams.get("startTime");

      if (namePet && services && date && startTime) {
        try {
          const parsedServices = JSON.parse(services);
          const appointment = {
            namePet,
            date,
            startTime,
            services: parsedServices
          };
          console.log('Appointment individual creado:', appointment);
          setAppointments([appointment]);
          localStorage.setItem('pendingAppointments', JSON.stringify([appointment]));
        } catch (error) {
          console.error('Error al procesar servicios individuales:', error);
        }
      }
    }
  }, [searchParams]);

  // Verificar estado del pago
  useEffect(() => {
    const status = searchParams.get("status");
    const externalRef = searchParams.get("external_reference");

    console.log('Verificando estado de pago:', { status, externalRef, hasUser: !!user?.accessToken });

    if (status && user?.accessToken) {
      console.log('Estado del pago recibido:', status);
      setPaymentStatus(status);
      
      if (status === "approved" && externalRef) {
        console.log('Pago aprobado, verificando detalles con token:', user.accessToken);
        verifyPayment(externalRef);
      }
    }
  }, [searchParams, user?.accessToken]);

  const verifyPayment = async (externalRef: string) => {
    try {
      if (!user?.accessToken) {
        console.log('No hay token de acceso disponible');
        return;
      }

      console.log('Verificando pago con referencia:', externalRef);
      const paymentResponse = await fetch(`${API_URL}/payments/external-reference/${externalRef}`, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json"
        }
      });

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json();
        console.error('Error en la respuesta del servidor:', errorData);
        throw new Error(`Error al verificar el pago: ${errorData.message || 'Error desconocido'}`);
      }

      const paymentData = await paymentResponse.json();
      console.log('Datos del pago verificados:', paymentData);
      
      if (paymentData.id) {
        setPaymentId(paymentData.id);
        localStorage.setItem('pendingPaymentId', paymentData.id);
      } else {
        throw new Error('No se recibió ID de pago en la respuesta');
      }
    } catch (error) {
      console.error('Error al verificar pago:', error);
      alert('Error al verificar el pago. Por favor, contacta con soporte.');
    }
  };

  useEffect(() => {
    const savedPaymentId = localStorage.getItem('pendingPaymentId');
    if (savedPaymentId && !paymentId) {
      console.log('Recuperando paymentId desde localStorage:', savedPaymentId);
      setPaymentId(savedPaymentId);
    }
  }, [paymentId]);

  const handleCreateAppointment = async () => {
    console.log('Iniciando creación de cita con datos:', {
      paymentId,
      userId: user?.user?.id,
      appointments,
      token: user?.accessToken
    });

    if (!paymentId || !user?.user || !appointments.length || !user?.accessToken) {
      console.error('Faltan datos necesarios para crear la cita', {
        paymentId,
        userId: user?.user?.id,
        appointmentsLength: appointments.length,
        hasToken: !!user?.accessToken
      });
      alert('No se pueden procesar los datos de la cita. Por favor, intenta nuevamente.');
      return;
    }

    setIsCreatingAppointment(true);

    try {
      const appointmentData = {
        date: appointments[0].date,
        namePet: appointments[0].namePet,
        startTime: appointments[0].startTime,
        user: user.user.id,
        services: appointments[0].services,
        payment_id: paymentId,
      };

      console.log('Enviando datos de la cita:', appointmentData);

      const response = await fetch(`${API_URL}/appointments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.accessToken}`
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al agendar la cita");
      }

      const data = await response.json();
      console.log('Respuesta exitosa al crear cita:', data);

      localStorage.removeItem('pendingAppointments');
      localStorage.removeItem('pendingPaymentId');
      
      alert("Cita agendada correctamente");
      router.push("/appointments");
    } catch (error) {
      console.error('Error al crear la cita:', error);
      alert(error instanceof Error ? error.message : "Error al agendar la cita");
    } finally {
      setIsCreatingAppointment(false);
    }
  };

  const handlePayment = async () => {
    try {
      if (!user?.user) {
        throw new Error('No hay usuario logueado');
      }

      console.log('Iniciando proceso de pago...');

      const accessToken = process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN;
      if (!accessToken) {
        throw new Error('Falta configurar la clave de Mercado Pago');
      }

      const items = appointments.flatMap((appointment) => 
        appointment.services.map((service) => {
          const serviceInfo = services.find(s => s.id === service.id);
          const price = serviceInfo ? Number(serviceInfo.price) : 0;
          if (isNaN(price)) throw new Error(`Precio inválido para el servicio ${service.id}`);
          return { title: serviceInfo?.name || "Servicio", quantity: 1, unit_price: price, currency_id: "ARS" };
        })
      );

      console.log('Items para el pago:', items);

      const preference = {
        items,
        payer: { email: user.user.email },
        external_reference: user.user.id.toString(),
        back_urls: {
          success: `${window.location.origin}/appointments/payment?status=approved&external_reference=${user.user.id}`,
          failure: `${window.location.origin}/appointments/payment?status=failure&external_reference=${user.user.id}`,
          pending: `${window.location.origin}/appointments/payment?status=pending&external_reference=${user.user.id}`,
        },
        notification_url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/payments/webhook`,
        auto_return: "approved",
      };

      console.log('Preferencia de pago:', preference);

      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${accessToken}` 
        },
        body: JSON.stringify(preference),
      });

      const data = await response.json();
      console.log('Respuesta de MercadoPago:', data);

      if (data.init_point) {
        setCheckoutUrl(data.init_point);
      } else {
        throw new Error("No se recibió el punto de inicio del checkout");
      }
    } catch (error) {
      console.error('Error en el proceso de pago:', error);
      alert(error instanceof Error ? error.message : "Error al procesar el pago");
    }
  };

  const calculateTotal = () => {
    const totalAmount = appointments[0]?.services.reduce((acc, service) => {
      const serviceInfo = services.find(s => s.id === service.id);
      return acc + (serviceInfo ? serviceInfo.price : 0);
    }, 0);

    setTotal(Math.floor(totalAmount || 0));
  };

  useEffect(() => {
    if (appointments.length > 0 && services.length > 0) {
      calculateTotal();
    }
  }, [appointments, services]);

  useEffect(() => {
    return () => {
      if (paymentStatus === "approved" && !isCreatingAppointment) {
        localStorage.removeItem('pendingAppointments');
        localStorage.removeItem('pendingPaymentId');
      }
    };
  }, [paymentStatus, isCreatingAppointment]);

  if (!isUserLoaded) {
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-black text-3xl font-bold mb-6">Cargando...</h1>
        <p>Estamos cargando tu información, por favor espera...</p>
      </div>
    );
  }

  if (paymentStatus === "approved" && !isCreatingAppointment) {
    return (
      <div className="container mx-auto px-4">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-6">
          <h2 className="text-2xl font-bold mb-4">¡Pago Confirmado!</h2>
          <p className="mb-4">Tu pago ha sido procesado exitosamente.</p>
          <button
            onClick={handleCreateAppointment}
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
          >
            Agendar Cita
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus === "failure") {
    return (
      <div className="container mx-auto px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-6">
          <h1 className="text-2xl font-bold mb-4">Pago No Completado</h1>
          <p className="mb-4">El pago no se pudo completar. Por favor, intenta nuevamente.</p>
          <button
            onClick={() => router.push("/appointments")}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Volver a Citas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-black text-3xl font-bold mb-6">Confirmación de Cita y Pago</h1>
      
      {appointments.length > 0 ? (
        <div className="text-black mb-6 border p-4 rounded-md bg-gray-50">
          <h2 className="text-lg font-bold mb-4">Detalles de la Cita</h2>
          <p><strong>Mascota:</strong> {appointments[0]?.namePet}</p>
          <p><strong>Fecha:</strong> {appointments[0]?.date}</p>
          <p><strong>Hora:</strong> {appointments[0]?.startTime}</p>
          <p><strong>Servicios:</strong></p>
          <ul className="list-disc pl-5">
            {appointments[0]?.services.map((service, index) => {
              const serviceInfo = services.find(s => s.id === service.id);
              return (
                <li key={index}>
                  {serviceInfo?.name || 'Servicio no encontrado'} - ${serviceInfo?.price || 0}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>No hay citas para mostrar.</p>
      )}

      <h2 className="text-lg font-bold mb-4">Total: ${total}</h2>

      {!checkoutUrl ? (
        <button
          onClick={handlePayment}
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
        >
          Proceder al Pago
        </button>
      ) : (
        <PaymentPopup
          url={checkoutUrl}
          onClose={() => router.push("/appointments")}
        />
      )}
    </div>
  );
};

const PaymentPage = () => {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4">
        <h1 className="text-black text-3xl font-bold mb-6">Cargando...</h1>
        <p>Por favor espere mientras se carga la página de pagos...</p>
      </div>
    }>
      <PaymentPageContent />
    </Suspense>
  );
};

export default PaymentPage;









