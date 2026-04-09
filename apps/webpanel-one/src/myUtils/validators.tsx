/* eslint-disable */

import moment from 'moment';
import messages from '../messages';
import type { ErrorMessage, Validator } from '@mono/hooks';

export const required =
  (errMessage: string): Validator =>
  (value: any): ErrorMessage =>
    !value || value.length === 0 ? errMessage : undefined;

export const lengthValidator =
  (errMessage: string, lengthOfWord: number): Validator =>
  (value: any): ErrorMessage =>
    !value || value.length >= lengthOfWord ? errMessage : undefined;

export const emptyValueValidator = (value?: string): ErrorMessage =>
  value && value?.trim() === '' ? messages?.general?.errors?.emptyValue : undefined;

export const requiredIf =
  (errMessage: string, callback: (formValues: any) => boolean): Validator =>
  (value: any, formValues: any): ErrorMessage => {
    if (callback(formValues)) {
      return required(errMessage)(value);
    }
    return undefined;
  };
export const emailValidator = (value?: string): ErrorMessage =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? messages?.general?.errors?.invalidEmail
    : undefined;

export const confirmPassword =
  (errMessage: string, validateWith = 'password'): Validator =>
  (value: any, formValues: any): ErrorMessage =>
    value && formValues?.[validateWith]?.value !== value ? errMessage : undefined;

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

export const greaterThanZero =
  (errMessage: string): Validator =>
  (value: any): ErrorMessage => {
    const numValue = typeof value === 'object' && value !== null && value.value !== undefined
      ? Number(value.value)
      : Number(value);
    return isNaN(numValue) || numValue <= 0 ? errMessage : undefined;
  };

export const decimalValidator =
  (message: string) =>
  (value?: string): ErrorMessage =>
    value && !/^[0-9]\d*(\.\d+)?$/i.test(value) ? message : undefined;

export const alphaNumericValidator = (value?: string): ErrorMessage =>
  value && !/^[A-Z0-9]+$/i.test(value) ? messages?.general?.errors?.invalidABN : undefined;
