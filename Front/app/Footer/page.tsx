import React from 'react';
import { FaWhatsapp, FaPhone, FaLightbulb, FaNewspaper, FaRegFileAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-700 py-8 px-6 flex flex-col items-center gap-8 mt-4">
      <div className="flex flex-col items-start p-6 border border-tertiary rounded-lg bg-gray-50 shadow-lg w-full">
        <div className="grid grid-cols-4 gap-6 mb-4 w-full">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaPhone className="text-secondary" size={24} />
              <span className="text-lg font-semibold text-black">Contáctanos</span>
            </div>
            <div>
              <p className="text-black">Teléfono:</p>
              <div className="flex items-center gap-2 text-black">
                <FaWhatsapp className="text-success" />
                <strong>3513908198</strong>
              </div>
            </div>
            <div>
              <p className="text-black">Trabaja con nosotros:</p>
              <a href="mailto:peludopolispf@gmail.com" className="text-black">
                <strong>peludopolispf@gmail.com</strong>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaLightbulb className="text-primary" size={24} />
              <span className="text-lg font-semibold text-black">Tips</span>
            </div>
            <div className="flex flex-col gap-1 text-black">
              <a href="/tips#general">Cuidado General</a>
              <a href="/tips#hygiene">Higiene</a>
              <a href="/tips#health">Salud</a>
              <a href="/tips#nutrition">Nutrición</a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaNewspaper className="text-danger" size={24} />
              <span className="text-lg font-semibold text-black">Noticias</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaRegFileAlt className="text-success" size={24} />
              <span className="text-lg font-semibold text-black">Políticas de la empresa</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
