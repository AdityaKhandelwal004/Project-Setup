/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable */

import moment from 'moment';
import type { ErrorMessage, Validator } from '@mono/hooks';
import messages from '@mono/messages';

export const required =
  (errMessage: string): Validator =>
  (value: any): ErrorMessage =>
    !value || value.length === 0 ? errMessage : undefined;

export const lengthValidator =
  (errMessage: string, lengthOfWord: number): Validator =>
  (value: any): ErrorMessage =>
    !value || value.length >= lengthOfWord ? errMessage : undefined;

export const emptyValueValidator = (value?: string): ErrorMessage =>
  value && value?.trim() === ''
    ? messages?.general?.errors?.emptyValue
    : undefined;

export const passwordValidator = (value?: string): ErrorMessage => {
  if (!value) {
    return messages?.signUp?.errors?.password?.empty;
  } else if (value.length < 8) {
    return messages?.signUp?.errors?.password?.tooShort;
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
    return messages?.signUp?.errors?.password?.weak;
  } else {
    return undefined;
  }
};
export const requiredIf =
  (errMessage: string, callback: (formValues: any) => boolean): Validator =>
  (value: any, formValues: any): ErrorMessage => {
    if (callback(formValues)) {
      return required(errMessage)(value);
    }
    return undefined;
  };
export const emailValidator = (value?: string): ErrorMessage => {
  if (!value) return undefined;
  
  // Basic email format validation
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(value)) {
    return messages?.general?.errors?.invalidEmail;
  }
  
  // Extract domain and TLD
  const [, domain] = value.split('@');
  if (!domain) {
    return messages?.general?.errors?.invalidEmail;
  }
  
  // List of common valid TLDs (this can be expanded)
  const validTLDs = [
    'com', 'org', 'net', 'edu', 'gov', 'mil', 'int', 'io', 'co', 'uk', 'us', 'ca', 'au', 'de', 'fr', 'jp', 'cn', 'in', 'br', 'ru', 'it', 'nl', 'se', 'no', 'dk', 'fi', 'pl', 'cz', 'hu', 'ro', 'bg', 'hr', 'si', 'ee', 'lv', 'lt', 'mt', 'cy', 'gr', 'pt', 'es', 'ie', 'be', 'at', 'ch', 'lu', 'mc', 'li', 'va', 'sm', 'ad', 'kz', 'uz', 'kg', 'tj', 'tm', 'ge', 'am', 'az', 'by', 'md', 'ua', 'sk', 'hu', 'ro', 'bg', 'hr', 'si', 'ee', 'lv', 'lt', 'mt', 'cy', 'gr', 'pt', 'es', 'ie', 'be', 'at', 'ch', 'lu', 'mc', 'li', 'va', 'sm', 'ad', 'kz', 'uz', 'kg', 'tj', 'tm', 'ge', 'am', 'az', 'by', 'md', 'ua', 'sk'
  ];
  
  // Check if TLD is valid
  const tld = domain.split('.').pop()?.toLowerCase();
  if (!tld || !validTLDs.includes(tld)) {
    return messages?.general?.errors?.invalidEmail;
  }
  
  return undefined;
};

export const dobValidator = (value?: string): ErrorMessage => {
  if (!value) return undefined;
   const date = moment(value)
   if (!date.isValid()) {
     return messages.general.errors.invalidDate
   } 

   if (date.isAfter(moment().subtract(18, 'years'))) {
    return messages.general.errors.invalidDob
   }

   if (date.isBefore(moment().subtract(100, 'years'))) {
    return messages.general.errors.invalidDob
   }
  
  return undefined;
};

export const futureDateValidator = (value?: string): ErrorMessage => {
  if (!value) return undefined;
   const date = moment(value)
   if (!date.isValid()) {
     return messages.general.errors.invalidDate
   } 

  if (date.isBefore(moment().subtract(1, 'day'))) {
    return messages.general.errors.invalidDob
  }
  return undefined;
};

export const nextPayDate = (value?: string, ): ErrorMessage => {
  if (!value) return undefined;
   const date = moment(value)
   if (!date.isValid()) {
     return messages.general.errors.invalidDate
   } 
   if (date.isBefore(moment().subtract(1, 'day'))) {
    return messages.general.errors.invalidDob
   }

    if (date.isAfter(moment().add(1, 'years'))) {
    return messages.general.errors.invalidDob
   }
  
  return undefined;
};


export const invalidPasswordValidator = (value?: string): ErrorMessage =>
  value &&
  !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^~`|\\+=\-_{}[\]:";'<>,./])[A-Za-z\d@$!%*?&#^~`|\\+=\-_{}[\]:";'<>,./]{8,}$/.test(
    value
  )
    ? messages?.general?.errors?.invalidPassword
    : undefined;

export const confirmPassword = (validateWith = 'password'): Validator => (value: any, formValues: any): ErrorMessage => {
    if (!value) return undefined;
    if (value !== formValues?.[validateWith]?.value) {
      return messages?.signUp?.errors?.confirmPassword?.mismatch;
    }
    return undefined;
  };

export const validateDate =
  (message: string) =>
  (value?: string): ErrorMessage =>
    value && !moment(value).isValid() ? message : undefined;

export const validateFutureDate =
  (message: string) =>
  (value?: string): ErrorMessage => {
    const today = moment();
    return (value && !moment(value).isValid()) || moment(value).isBefore(today)
      ? message
      : undefined;
  };

export const validatePastDate =
  (message: string) =>
  (value?: string): ErrorMessage => {
    const today = moment();
    return (value && !moment(value).isValid()) || moment(value).isAfter(today)
      ? message
      : undefined;
  };

export const numberValidator =
  (message: string) =>
  (value?: string): ErrorMessage =>
    value && !/^[0-9]+$/i.test(value) ? message : undefined;

export const decimalValidator =
  (message: string) =>
  (value?: string): ErrorMessage =>
    value && !/^[0-9]\d*(\.\d+)?$/i.test(value) ? message : undefined;

export const amountValidator =
  (message?: string) =>
  (value?: string|number): ErrorMessage =>
    value && !/^\d+(\.\d{1,2})?$/i.test(`${value}`) ? (message || 'Please enter a valid amount') : undefined;

export const urlValidator = 
  (message?: string) =>
  (value?: string): ErrorMessage =>
    value && !/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i.test(value) ? (message || 'Please enter a valid URL') : undefined;


// Utility function to get success messages
export const getSuccessMessage = (fieldName: string, value: any, hasError: boolean, module: 'signUp' | 'signIn' | 'forgotPassword' = 'signUp'): string | undefined => {
  if (!value || hasError) return undefined;

  // Get success message from messages based on module and field
  const successMessages = messages?.[module]?.success;
  let message = successMessages?.[fieldName]?.valid;

  // Handle dynamic name replacement for firstName field
  if (fieldName === 'firstName' && message && value) {
    message = message.replace('{name}', value);
  }
}
