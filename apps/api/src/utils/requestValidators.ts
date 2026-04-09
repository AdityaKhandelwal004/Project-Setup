import Joi from 'joi';
import type { CustomHelpers } from 'joi';
import moment from 'moment';
import {
  joiStringError,
  joiNumberError,
  joiBooleanError,
  joiEmailError,
  joiDateError,
  joiGeneralError,
} from './apiResponses.ts';

type MessageKey = string;
type FieldKey = string;

type DateValidatorOptions = {
  onlyPast?: boolean;
};

// --- ID Validators ---
export const idValidator = (messageKey: MessageKey, key: FieldKey) =>
  Joi.number().integer().positive().messages(joiNumberError(messageKey, key));

export const requiredIdValidator = (messageKey: MessageKey, key: FieldKey) =>
  idValidator(messageKey, key)
    .required()
    .messages(joiNumberError(messageKey, key));

export const nullableIdValidator = (messageKey: MessageKey, key: FieldKey) =>
  idValidator(messageKey, key)
    .allow(null)
    .messages(joiNumberError(messageKey, key));

// --- Money Validators ---
export const moneyValidator = () => Joi.number().positive().precision(2);

export const requiredMoneyValidator = (messageKey: MessageKey, key: FieldKey) =>
  moneyValidator().required().messages(joiNumberError(messageKey, key));

export const nullableMoneyValidator = (messageKey: MessageKey, key: FieldKey) =>
  moneyValidator().allow(null).messages(joiNumberError(messageKey, key));

// --- String Validators ---
export const stringValidator = (messageKey: MessageKey, key: FieldKey) =>
  Joi.string().messages(joiStringError(messageKey, key));

export const requiredStringValidator = (
  messageKey: MessageKey,
  key: FieldKey
) => Joi.string().required().messages(joiStringError(messageKey, key));

export const nullableStringValidator = (
  messageKey: MessageKey,
  key: FieldKey
) => Joi.string().allow(null).messages(joiStringError(messageKey, key));

// --- Date Validators ---
export const dateValidator = ({ onlyPast }: DateValidatorOptions = {}) => {
  let validator = Joi.date().iso().raw();
  if (onlyPast) {
    validator = validator.max('now');
  }
  return validator;
};

export const requiredDateValidator = (
  messageKey: MessageKey,
  key: FieldKey,
  options?: DateValidatorOptions
) => dateValidator(options).required().messages(joiDateError(messageKey, key));

export const nullableDateValidator = (
  messageKey: MessageKey,
  key: FieldKey,
  options?: DateValidatorOptions
) => dateValidator(options).allow(null).messages(joiDateError(messageKey, key));

// --- Custom End Date Validator ---
export const validateEndDate =
  (startDateKey: string) =>
  (value: any, helpers: CustomHelpers): any => {
    const ancestor = helpers?.state?.ancestors?.[0];
    const startDate = ancestor?.[startDateKey];

    if (startDate && !value) {
      return helpers.error('any.invalid');
    }

    if (startDate && value && moment(startDate).isAfter(moment(value))) {
      return helpers.error('any.invalid');
    }

    return value;
  };

// --- Email Validators ---
export const emailValidator = () => Joi.string().lowercase().email();

export const requiredEmailValidator = (messageKey: MessageKey, key: FieldKey) =>
  emailValidator().required().messages(joiEmailError(messageKey, key));

export const nullableEmailValidator = (messageKey: MessageKey, key: FieldKey) =>
  emailValidator().allow(null).messages(joiEmailError(messageKey, key));

export const stringEmailValidator = (messageKey: MessageKey, key: FieldKey) =>
  emailValidator().messages(joiEmailError(messageKey, key));

// --- Number Validators ---
export const numberValidator = (messageKey: MessageKey, key: FieldKey) =>
  Joi.number().messages(joiNumberError(messageKey, key));

export const requiredNumberValidator = (
  messageKey: MessageKey,
  key: FieldKey
) => Joi.number().required().messages(joiNumberError(messageKey, key));

export const nullableNumberValidator = (
  messageKey: MessageKey,
  key: FieldKey
) => Joi.number().allow(null).messages(joiNumberError(messageKey, key));

// --- Boolean Validators ---
export const booleanValidator = (messageKey: MessageKey, key: FieldKey) =>
  Joi.boolean().messages(joiBooleanError(messageKey, key));

export const requiredBooleanValidator = (
  messageKey: MessageKey,
  key: FieldKey
) => Joi.boolean().required().messages(joiBooleanError(messageKey, key));

export const requiredTrueBooleanValidator = (
  messageKey: MessageKey,
  key: FieldKey
) =>
  Joi.boolean()
    .valid(true)
    .required()
    .messages(joiBooleanError(messageKey, key));

// --- Enum Validators ---
export const requiredEnumValidator = (
  options: string[],
  messageKey: MessageKey,
  key: FieldKey
) =>
  Joi.string()
    .valid(...options)
    .required()
    .messages(joiStringError(messageKey, key));

export const nullableEnumValidator = (
  options: string[],
  messageKey: MessageKey,
  key: FieldKey
) =>
  Joi.string()
    .valid(...options)
    .allow(null)
    .messages(joiStringError(messageKey, key));

export const enumValidator = (
  options: string[],
  messageKey: MessageKey,
  key: FieldKey
) =>
  Joi.string()
    .valid(...options)
    .messages(joiStringError(messageKey, key));

// --- Regex Validators ---
export const requiredRegexValidator = (
  pattern: RegExp,
  messageKey: MessageKey,
  key: FieldKey
) =>
  Joi.string()
    .regex(pattern)
    .required()
    .messages(joiStringError(messageKey, key));

export const nullableRegexValidator = (
  pattern: RegExp,
  messageKey: MessageKey,
  key: FieldKey
) =>
  Joi.string()
    .regex(pattern)
    .allow(null)
    .messages(joiStringError(messageKey, key));

export const regexValidator = (
  pattern: RegExp,
  messageKey: MessageKey,
  key: FieldKey
) => Joi.string().regex(pattern).messages(joiStringError(messageKey, key));

// --- Array Validators ---
export const numberArrayValidator = (messageKey: MessageKey, key: FieldKey) =>
  Joi.array()
    .items(Joi.number())
    .unique()
    .messages(joiNumberError(messageKey, key));

export const requiredNumberArrayValidator = (
  messageKey: MessageKey,
  key: FieldKey
) =>
  Joi.array()
    .items(Joi.number())
    .min(1)
    .unique()
    .required()
    .messages(joiNumberError(messageKey, key));

export const nullableNumberArrayValidator = (
  messageKey: MessageKey,
  key: FieldKey
) =>
  Joi.array()
    .items(Joi.number())
    .unique()
    .allow(null)
    .optional()
    .messages(joiNumberError(messageKey, key));

export const stringArrayValidator = (messageKey: MessageKey, key: FieldKey) =>
  Joi.array()
    .items(Joi.string())
    .unique()
    .messages(joiStringError(messageKey, key));

export const requiredStringArrayValidator = (
  messageKey: MessageKey,
  key: FieldKey
) =>
  Joi.array()
    .items(Joi.string())
    .min(1)
    .unique()
    .required()
    .messages(joiStringError(messageKey, key));

export const nullableStringArrayValidator = (
  messageKey: MessageKey,
  key: FieldKey
) =>
  Joi.array()
    .items(Joi.string())
    .unique()
    .allow(null)
    .optional()
    .messages(joiStringError(messageKey, key));

export const arrayValidatorWithItem = (allowedItems: string[]) =>
  Joi.array()
    .items(Joi.string().valid(...allowedItems))
    .unique()
    .min(1);

export const requiredArrayValidatorWithItems = (
  allowedItems: string[],
  messageKey: MessageKey,
  key: FieldKey
) =>
  arrayValidatorWithItem(allowedItems)
    .required()
    .messages(joiGeneralError(messageKey, key));

export const nullableArrayValidatorWithItems = (
  allowedItems: string[],
  messageKey: MessageKey,
  key: FieldKey
) =>
  arrayValidatorWithItem(allowedItems)
    .allow(null)
    .optional()
    .messages(joiGeneralError(messageKey, key));

// --- URL Validators ---
export const urlValidator = (messageKey: MessageKey, key: FieldKey) =>
  Joi.string()
    .trim()
    .uri({ scheme: ['https'], allowRelative: false })
    .messages(joiStringError(messageKey, key));

export const requiredUrlValidator = (messageKey: MessageKey, key: FieldKey) =>
  urlValidator(messageKey, key)
    .required()
    .messages(joiStringError(messageKey, key));

export const nullableUrlValidator = (messageKey: MessageKey, key: FieldKey) =>
  urlValidator(messageKey, key)
    .allow(null)
    .messages(joiStringError(messageKey, key));

// --- Cent Validators ---
export const centValidator = (messageKey: MessageKey, key: FieldKey) =>
  Joi.number().integer().min(0).messages(joiNumberError(messageKey, key));

export const requiredCentValidator = (messageKey: MessageKey, key: FieldKey) =>
  centValidator(messageKey, key)
    .required()
    .messages(joiEmailError(messageKey, key));

export const nullableCentValidator = (messageKey: MessageKey, key: FieldKey) =>
  centValidator(messageKey, key)
    .allow(null)
    .messages(joiEmailError(messageKey, key));
