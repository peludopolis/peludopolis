"use client";

import React, { useState, useRef } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useChatContext } from './hooks/useChatContext';
import { useMessageManagement } from './hooks/useMessageManagement';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessages } from './components/ChatMessages';
import { 
  formatOpeningHours, 
  getLocationInfo, 
  getContactInfo 
} from './utils/chatbotHelpers';
import services from './data/serviceInfo';

const Chatbot = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { context, updateContext } = useChatContext();
  const { 
    messages, 
    addMessage, 
    isTyping, 
    messagesEndRef, 
    simulateTyping 
  } = useMessageManagement();
  const [inputText, setInputText] = useState('');
  const inputRef = useRef(null);

  const addBotMessage = (text, options = null) => {
    simulateTyping(() => {
      const newMessage = {
        id: Date.now(),
        text,
        sender: 'bot',
        options: options,
        type: options ? 'options' : 'text'
      };
      addMessage(newMessage);
    });
  };

  const handleUserInput = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      type: 'text'
    };

    addMessage(userMessage);
    setInputText('');

    switch (context.stage) {
      case 'intro':
        const userName = text.trim();
        updateContext({ 
          stage: 'greeting', 
          userName 
        });

        addBotMessage(
          `Hola ${userName}, es un placer conocerte. ¿En qué puedo ayudarte hoy?`, 
          ['Servicios', 'Ubicación', 'Contacto', 'Horarios', 'Finalizar Chat']
        );
        break;

      case 'greeting':
        handleOptionClick(text);
        break;
    }
  };

  const handleOptionClick = (option) => {
    const userMessage = {
      id: Date.now(),
      text: option,
      sender: 'user',
      type: 'text'
    };
    addMessage(userMessage);

    switch (option) {
      case 'Finalizar Chat':
        addBotMessage(`Hasta luego, ${context.userName}. ¡Que tengas un excelente día!`);
        setTimeout(() => {
          setIsOpen(false);
          router.push('/');
        }, 2500);
        break;

      case 'Servicios':
        addBotMessage(
          '¿Qué tipo de mascota tienes?', 
          ['Perro', 'Gato', 'Volver al Inicio']
        );
        updateContext({ stage: 'pet_type' });
        break;
      
      case 'Ubicación':
        addBotMessage(
          `${getLocationInfo()}\n\n¿Necesitas más información?`, 
          ['Ver Horarios', 'Volver al Inicio', 'Finalizar Chat']
        );
        break;
      
      case 'Contacto':
        addBotMessage(
          `${getContactInfo()}\n\n¿Necesitas más información?`, 
          ['Ver Ubicación', 'Ver Horarios', 'Volver al Inicio', 'Finalizar Chat']
        );
        break;

      case 'Horarios':
        addBotMessage(
          `Nuestros horarios de atención:\n\n${formatOpeningHours()}\n\n¿Necesitas más información?`,
          ['Ver Ubicación', 'Ver Contacto', 'Volver al Inicio', 'Finalizar Chat']
        );
        break;

      case 'Volver al Inicio':
        addBotMessage(
          `¿En qué puedo ayudarte, ${context.userName}?`, 
          ['Servicios', 'Ubicación', 'Contacto', 'Horarios', 'Finalizar Chat']
        );
        updateContext({ stage: 'greeting' });
        break;
      
      case 'Perro':
      case 'Gato':
        addBotMessage(
          `¿Es tu ${option.toLowerCase()} adulto o cachorro?`, 
          ['Adulto', 'Cachorro', 'Volver al Inicio']
        );
        updateContext({ 
          stage: 'pet_category', 
          petType: option.toLowerCase() 
        });
        break;
      
      case 'Adulto':
      case 'Cachorro':
        const availableServices = services.filter(
          service => service.type === context.petType && service.category === option.toLowerCase()
        );

        addBotMessage(
          'Estos son los servicios disponibles:', 
          [...availableServices.map(service => service.name), 'Volver al Inicio']
        );
        updateContext({ 
          stage: 'service_selection',
          petCategory: option.toLowerCase()
        });
        break;

      case 'Ver Ubicación':
        addBotMessage(
          `${getLocationInfo()}\n\n¿Necesitas más información?`, 
          ['Ver Horarios', 'Volver al Inicio', 'Finalizar Chat']
        );
        break;

      case 'Ver Contacto':
        addBotMessage(
          `${getContactInfo()}\n\n¿Necesitas más información?`, 
          ['Ver Ubicación', 'Ver Horarios', 'Volver al Inicio', 'Finalizar Chat']
        );
        break;

      case 'Ver Horarios':
        addBotMessage(
          `Nuestros horarios de atención:\n\n${formatOpeningHours()}\n\n¿Necesitas más información?`,
          ['Ver Ubicación', 'Ver Contacto', 'Volver al Inicio', 'Finalizar Chat']
        );
        break;

      default:
        const selectedService = services.find(
          service => 
            service.name === option && 
            service.type === context.petType && 
            service.category === context.petCategory
        );

        if (selectedService) {
          addBotMessage(
            `Servicio: ${selectedService.name}
Descripción: ${selectedService.description}
Precio: $${selectedService.price}
Duración: ${selectedService.duration} minutos`, 
            ['Agendar Turno', 'Volver al Inicio', 'Finalizar Chat']
          );
        } else if (option === 'Agendar Turno') {
          addBotMessage('Te redirigiremos a nuestra página de reservas.');
          setTimeout(() => {
            router.push('/appointments/new');
          }, 1500);
        }
        break;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUserInput(inputText);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-400 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all"
        >
          <MessageCircle size={40} />
        </button>
      ) : (
        <div className="w-96 bg-white border rounded-lg shadow-2xl flex flex-col">
          <ChatHeader onClose={() => setIsOpen(false)} />
          
          <ChatMessages 
            messages={messages} 
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
            onOptionClick={handleOptionClick}
          />

          <div className="p-4 border-t flex space-x-2">
            <div className="flex-grow relative">
              <input 
                ref={inputRef}
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe un mensaje..."
                className="w-full p-2 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button 
              onClick={() => handleUserInput(inputText)}
              className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-all"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;