import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConversionSessionState } from '../types/conversion';
import { revokeAllManagedObjectURLs } from '../utils/blob';

interface ConversionContextType {
  session: ConversionSessionState | null;
  setSession: (session: ConversionSessionState | null) => void;
  clearSession: () => void;
}

const ConversionContext = createContext<ConversionContextType | undefined>(undefined);

export const ConversionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSessionState] = useState<ConversionSessionState | null>(() => {
    // Session in memory
    return null;
  });

  const setSession = (newSession: ConversionSessionState | null) => {
    setSessionState(newSession);
  };

  const clearSession = () => {
    revokeAllManagedObjectURLs();
    setSessionState(null);
  };

  // Clean up object URLs on full unmount if any
  useEffect(() => {
    return () => {
      // Cleanup
    };
  }, []);

  return (
    <ConversionContext.Provider value={{ session, setSession, clearSession }}>
      {children}
    </ConversionContext.Provider>
  );
};

export function useConversionSession() {
  const context = useContext(ConversionContext);
  if (!context) {
    throw new Error('useConversionSession must be used within a ConversionProvider');
  }
  return context;
}

