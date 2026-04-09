import React, { createContext, useContext, useState } from 'react';

interface FormContextType {
  contextformData: string;
  setContextForm: (value: string) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contextformData, setContextForm] = useState<string>('');

  return (
    <FormContext.Provider value={{ contextformData, setContextForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
