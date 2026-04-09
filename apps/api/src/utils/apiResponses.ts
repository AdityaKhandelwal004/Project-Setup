/**
 * This function is used to convert a string to camelCase, it will convert
 * even if the string has spaces, tabs, newlines and if it is pascal case too
 * [\s_](\w) selects whitespace and _ \w selects the first word of the string
 * and replace if it is capitalized to lowercase of the string
 * @param {string} message The message that you want to convert
 * @returns {string} the camel case version of the message
 */
function convertToCamelCase(message: string) {
  return message
    .replace(/[\s_](\w)/g, (_, char) => char.toUpperCase())
    .replace(/^\w/, (char) => char.toLowerCase());
}

export const formatResponse = (api: string, type: string, message: string) =>
  `${type}.${api}.${convertToCamelCase(message)}`;

export const formatSuccessResponse = (api: string, message: string) =>
  formatResponse(api, 'success', message);
export const formatErrorResponse = (api: string, message: string) =>
  formatResponse(api, 'error', message);

export const messageResponse = (message: string, metaData?: any) => ({
  message: message || null,
  data: metaData,
});

export const joiGeneralError = (schema: string, field: any) => {
  const invalid = formatErrorResponse(schema, `${field}.invalid`);
  return {
    'any.required': formatErrorResponse(schema, `${field}.required`),
    'any.only': invalid,
    'any.invalid': invalid,
    'array.unique': invalid,
    'array.base': formatErrorResponse(schema, `${field}.invalidArray`),
    'array.includesRequiredUnknowns': formatErrorResponse(
      schema,
      `${field}.emptyArray`
    ),
  };
};

interface JoiErrorMap {
  [key: string]: string;
}

export const joiStringError = (schema: string, field: string): JoiErrorMap => {
  const invalid = formatErrorResponse(schema, `${field}.invalid`);
  return {
    'string.base': invalid,
    'string.empty': formatErrorResponse(schema, `${field}.empty`),
    'string.length': invalid,
    'string.uri': invalid,
    'string.uriCustomScheme': invalid, 
    'string.pattern.base': invalid,
    'string.domain': invalid,
    ...joiGeneralError(schema, field),
  };
};

interface JoiEmailErrorMap extends JoiErrorMap {
  'string.email': string;
}

export const joiEmailError = (
  schema: string,
  field: string
): JoiEmailErrorMap => ({
  ...joiStringError(schema, field),
  'string.email': formatErrorResponse(schema, `${field}.invalid`),
});

interface JoiNumberErrorMap extends JoiErrorMap {
  'number.base': string;
  'number.positive': string;
  'number.integer': string;
  'number.min': string;
  'number.max': string;
  'number.unsafe': string;
}

export const joiNumberError = (
  schema: string,
  field: string
): JoiNumberErrorMap => {
  const invalid = formatErrorResponse(schema, `${field}.invalid`);
  return {
    ...joiGeneralError(schema, field),
    'number.base': invalid,
    'number.positive': invalid,
    'number.integer': invalid,
    'number.min': invalid,
    'number.max': invalid,
    'number.unsafe': invalid,
  };
};

interface JoiBooleanErrorMap extends JoiErrorMap {
  'boolean.base': string;
}

export const joiBooleanError = (
  schema: string,
  field: string
): JoiBooleanErrorMap => {
  const invalid = formatErrorResponse(schema, `${field}.invalid`);
  return {
    ...joiGeneralError(schema, field),
    'boolean.base': invalid,
  };
};

interface JoiDateErrorMap extends JoiErrorMap {
  'date.base': string;
  'date.format': string;
  'date.max': string;
  'date.min': string;
}

export const joiDateError = (
  schema: string,
  field: string
): JoiDateErrorMap => {
  const invalid = formatErrorResponse(schema, `${field}.invalid`);
  return {
    ...joiGeneralError(schema, field),
    'date.base': invalid,
    'date.format': invalid,
    'date.max': invalid,
    'date.min': invalid,
  };
};
