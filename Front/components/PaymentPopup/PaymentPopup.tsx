import React from "react";

interface PaymentPopupProps {
  url: string;
  onClose: () => void;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ url, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center w-full">
      <div className="bg-white p-4 rounded-lg w-full max-w-[90%]">
        <h2 className="text-lg font-semibold">Pago con Mercado Pago</h2>
        <iframe
          src={url}
          className="w-full h-96"
          title="Mercado Pago"
        ></iframe>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default PaymentPopup;
