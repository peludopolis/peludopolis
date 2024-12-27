"use client";

import React, { useEffect } from "react";
import { TIP_CATEGORIES, TIP_CONTENT } from "./constants";
import Banners from "./Banners";

const PetCareTips = () => {
  const [activeCategory, setActiveCategory] = React.useState<string>("general");

  const handleHashChange = () => {
    const hash = window.location.hash.substring(1);
    if (hash && TIP_CATEGORIES.some(category => category.key === hash)) {
      setActiveCategory(hash);
      const section = document.getElementById(hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  


  const handleCategoryClick = (categoryKey: string) => {
    setActiveCategory(categoryKey);
    window.location.hash = categoryKey;
    const section = document.getElementById(categoryKey); 
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };


  useEffect(() => {
    handleHashChange(); 
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12" id="tips-section">
          <h1 className="font-title text-primary text-4xl font-extrabold sm:text-5xl">
            Tips de Cuidado para <span>tu mascota</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Guía completa para el cuidado de tus mejores amigos peludos
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          {TIP_CATEGORIES.map((category) => (
            <button
              key={category.key}
              onClick={() => handleCategoryClick(category.key)} 
              className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300
                ${activeCategory === category.key 
                  ? "bg-blue-100 border-2 border-blue-500 scale-105" 
                  : "bg-white hover:bg-gray-100 border border-gray-200"}`}
            >
              {category.icon}
              <span className="mt-2 text-sm font-semibold text-black">
                {category.title}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-5 m-20">
          {TIP_CONTENT[activeCategory].map((tip, index) => (
            <div
              key={index}
              id={activeCategory}
              className="bg-white shadow-lg rounded-xl p-6 transform transition-all hover:scale-105"
            >
              <div className="flex items-center mb-4">
                {tip.icon}
                <h3 className="ml-4 text-xl font-bold text-gray-800">
                  {tip.title}
                </h3>
              </div>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Banners />
    </div>
  );
};

export default PetCareTips;
