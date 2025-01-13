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

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  return (
    <div className="relative w-full max-w-[980px] mx-auto overflow-hidden rounded-lg">
      {/* Contenedor principal con aspect ratio 16:9 */}
      <div className="relative w-full pb-[46%]">
        {/* Contenedor del carrusel */}
        <div 
          className="absolute top-0 left-0 w-full h-full flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 relative"
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 980px"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 md:p-4">
                <p className="text-sm md:text-base text-center">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
          aria-label="Previous slide"
        >
          &#10094;
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
          aria-label="Next slide"
        >
          &#10095;
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index
                  ? "bg-white w-4"
                  : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
