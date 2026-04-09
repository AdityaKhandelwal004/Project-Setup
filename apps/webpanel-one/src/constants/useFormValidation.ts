import { useState } from 'react';
import { FormFields, FormField, validateField } from './formValidation';

export const useFormValidation = (initialFields: FormFields) => {
  const [fields, setFields] = useState<FormFields>(initialFields);

  const updateField = (fieldName: string, value: string) => {
    const updatedFields = validateField(fieldName, value, fields);
    setFields(updatedFields);
  };

  const isFormValid = Object.values(fields).every(
    (field: FormField) => field.error === undefined && field.value.trim() !== ''
  );

  return { fields, updateField, isFormValid, setFields };
};
