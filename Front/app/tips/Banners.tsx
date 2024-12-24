import React from 'react';
import { Heart, Award, Users, Calendar } from 'lucide-react';

const Banners = () => {
  const statistics = [
    {
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      value: "15+",
      label: "Años de experiencia",
      color: "bg-pink-50"
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      value: "1000+",
      label: "Mascotas felices",
      color: "bg-yellow-50"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      value: "10+",
      label: "Especialistas",
      color: "bg-blue-50"
    },
    {
      icon: <Calendar className="w-8 h-8 text-green-500" />,
      value: "24/7",
      label: "Atención Emergencias",
      color: "bg-green-50"
    }
  ];



  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          {statistics.map((stat, index) => (
            <div key={index} className={`${stat.color} rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300`}>
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banners;