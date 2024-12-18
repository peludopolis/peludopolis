"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserSession } from '../app/interfaces/index'; 

interface UserContextType {
  userSession: UserSession | null;
  setUserSession: (session: UserSession | null) => void;
}


const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  return (
    <UserContext.Provider value={{ userSession, setUserSession }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
};
