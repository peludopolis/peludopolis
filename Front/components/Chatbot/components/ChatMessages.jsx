import React from 'react';

export const ChatMessages = ({ 
  messages, 
  isTyping, 
  messagesEndRef, 
  onOptionClick 
}) => (
  <div className="flex-grow p-4 overflow-y-auto h-96 space-y-3">
    {messages.map((msg) => (
      <div 
        key={msg.id}
        className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
      >
        <div 
          className={`
            max-w-[70%] p-3 rounded-2xl whitespace-pre-line
            ${msg.sender === 'bot' 
              ? 'bg-light text-gray-600' 
              : 'bg-dark text-white'}
            ${msg.type === 'options' ? 'mb-2' : ''}
          `}
        >
          {msg.text}
          {msg.options && msg.options.map((option) => (
            <button
              key={option}
              onClick={() => onOptionClick(option)}
              className="block w-full mt-2 px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-400 transition-all"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    ))}
    {isTyping && (
      <div className="flex justify-start">
        <div className="bg-primary text-white p-3 rounded-2xl">
          Poly está escribiendo...
        </div>
      </div>
    )}
    <div ref={messagesEndRef} />
  </div>
);