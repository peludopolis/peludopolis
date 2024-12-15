"use client";

import React, { useState } from "react";
import { FaWhatsapp, FaPhone, FaLightbulb, FaNewspaper, FaRegFileAlt } from "react-icons/fa";


const Footer = () => {
  const [popupContent, setPopupContent] = useState<null | string>(null);

  const openPopup = (url: string) => setPopupContent(url);
  const closePopup = () => setPopupContent(null);

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
              <a href="/tips#general" className="block w-fit">Cuidado</a>
              <a href="/tips#hygiene" className="block w-fit">Higiene</a>
              <a href="/tips#health" className="block w-fit">Salud</a>
              <a href="/tips#nutrition" className="block w-fit">Nutrición</a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FaNewspaper className="text-danger" size={24} />
              <span className="text-lg font-semibold text-black">Noticias</span>
            </div>
            <div className="flex flex-col gap-1 text-blue-500">
              <button
                onClick={() =>
                  openPopup(
                    "https://www.infobae.com/mascotas/2024/12/10/la-triste-historia-de-chocolate-el-perro-anciano-que-paso-de-ser-maltratado-a-morir-rodeado-de-amor/"
                  )
                }
                className="text-left"
              >
                La triste historia de Chocolate
              </button>
              <button
                onClick={() =>
                  openPopup(
                    "https://www.lanacion.com.ar/lifestyle/cual-es-el-mejor-horario-para-alimentar-a-los-perros-esto-es-lo-que-dice-la-ciencia-nid10122024/"
                  )
                }
                className="text-left"
              >
                ¿Cuál es el mejor horario para alimentar a los perros?
              </button>
              <button
                onClick={() =>
                  openPopup(
                    "https://tn.com.ar/mascotas/2024/12/09/que-quiere-demostrar-un-perro-que-mete-la-cabeza-entre-las-piernas-de-su-dueno/"
                  )
                }
                className="text-left"
              >
                ¿Que quiere decir tu perro cuando...?
              </button>
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

  
      <div className="flex gap-8 mt-6">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-16 h-16 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:scale-110 hover:bg-blue-500"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            alt="Facebook"
            className="w-10 h-10 transition-all duration-300 ease-in-out transform rotate-animate"
          />
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-16 h-16 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:scale-110 hover:bg-gray-800"
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/031/737/206/non_2x/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023-x-social-media-icon-free-png.png"
            alt="X"
            className="w-10 h-10 transition-all duration-300 ease-in-out transform rotate-animate"
          />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-16 h-16 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:scale-110 hover:bg-pink-500"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
            alt="Instagram"
            className="w-10 h-10 transition-all duration-300 ease-in-out transform rotate-animate"
          />
        </a>
      </div>

      {popupContent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-11/12 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-red-600 font-bold text-lg"
            >
              &times;
            </button>
            <iframe
              src={popupContent}
              title="Noticia"
              className="w-full h-[400px] border-0"
            />
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
