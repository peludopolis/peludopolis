import React from 'react';
import { X, MessageCircle } from 'lucide-react';

export const ChatHeader = ({ onClose }) => (
  <div className="bg-dark text-white p-4 rounded-t-lg flex justify-between items-center">
    <div className="flex items-center space-x-2">
      <MessageCircle size={24} />
      <span className="font-bold">Poly Chatbot</span>
    </div>
    <button 
      onClick={onClose}
      className="hover:bg-light p-1 rounded-full transition-all"
    >
      <X size={24} />
    </button>
  </div>
);
