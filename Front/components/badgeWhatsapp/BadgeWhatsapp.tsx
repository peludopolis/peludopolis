import React from 'react';
import { Phone } from 'lucide-react';

const WhatsAppBadge: React.FC = () => {
  const phoneNumber = '3513908198';
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <div>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center z-50"
      >
      <Phone size={30} />
      <span className="ml-2 hidden sm:inline"></span>
    </a >
    </div >
  );
};

export default WhatsAppBadge;