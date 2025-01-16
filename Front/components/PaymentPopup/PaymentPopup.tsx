import React from "react";

interface PaymentPopupProps {
  url: string;
  onClose: () => void;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ url, onClose }) => {
  const handleRedirect = () => {
    console.log('Redirigiendo a MercadoPago:', url);
    window.location.href = url;
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Pago con Mercado Pago</h2>
        <p className="mb-6 text-gray-600">
          Serás redirigido a Mercado Pago para completar el pago de forma segura.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleRedirect}
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-colors"
          >
            Continuar a Mercado Pago
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;

