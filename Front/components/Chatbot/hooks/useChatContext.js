import { useState } from 'react';

export const useChatContext = () => {
    const [context, setContext] = useState({ 
      stage: 'intro', 
      userName: '',
      petType: '',
      petCategory: ''
    });
  
    const updateContext = (updates) => {
      setContext(prev => ({ ...prev, ...updates }));
    };
  
    return { context, updateContext };
  };