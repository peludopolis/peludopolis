"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Slider = () => {
  const images = [
    {
      src: "https://www.purina.com.ar/sites/default/files/styles/webp/public/2024-03/como-banar-un-perro-ar_0.jpg.webp?itok=aPnY5HvZ",
      alt: "Baño feliz para un peludo feliz",
      description: "Baño feliz para un peludo feliz. Nuestros profesionales cuidan a tu mascota con lo mejor."
    },
    {
      src: "https://media.istockphoto.com/id/1083661042/es/foto/profesional-groomer-del-perro-con-perro-rough-collie.jpg?s=612x612&w=0&k=20&c=K5CJUA6jr-F38Q48g4uKSGM_Ref1oOjyhnMm0AfzOHg=",
      alt: "Peinado para peludos",
      description: "Peinado profesional para mantener a tu peludo siempre elegante y cómodo. ¡No más enredos!"
    },
    {
      src: "https://www.purina.com.ar/sites/default/files/styles/webp/public/2023-11/como-cortar-unas-perro-labrador.jpg.webp?itok=tjdSlbtx",
      alt: "Corte de uñas para tu mascota",
      description: "Corte de uñas por profesionales, mantén las patitas de tu peludo saludables y seguras."
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, [images.length]);
  

  return (
    <div
      className="relative mx-auto overflow-hidden border rounded-lg"
      style={{ width: "980px", height: "450px" }}
    >

      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 relative"
            style={{ width: "980px", height: "450px" }}
          >

            <Image
              src={image.src}
              alt={image.alt}
              width={980}
              height={450}
              className="object-cover w-full h-full"
            />

            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 w-full text-center">
              <p>{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
