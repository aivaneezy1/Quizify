"use client"
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Define the type for the context value
interface DatiContextType {
  selectedCategories: string;
  setSelectedCategories: Dispatch<SetStateAction<string>>;
}

// Set default values for the context
const defaultContextValue: DatiContextType = {
  selectedCategories: '',
  setSelectedCategories: () => {},
};

export const DatiContext = createContext<DatiContextType>(defaultContextValue);

interface DatiContextProviderProps {
  children: ReactNode;
}

const DatiContextProvider: React.FC<DatiContextProviderProps> = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState<string>('');

  return (
    <DatiContext.Provider value={{ selectedCategories, setSelectedCategories }}>
      {children}
    </DatiContext.Provider>
  );
};

export default DatiContextProvider;
