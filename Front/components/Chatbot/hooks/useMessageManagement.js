import { useState, useRef, useEffect } from 'react';

export const useMessageManagement = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy Poly, tu asistente virtual de cuidado de mascotas. 🐾",
      sender: 'bot',
      type: 'initial'
    },
    {
      id: 2,
      text: "¿Cómo te llamas?",
      sender: 'bot',
      type: 'name_request'
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const simulateTyping = (callback, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return { 
    messages, 
    addMessage, 
    isTyping, 
    messagesEndRef, 
    simulateTyping 
  };
};
