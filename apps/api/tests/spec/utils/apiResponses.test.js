import {
  formatResponse, formatSuccessResponse,
  formatErrorResponse, messageResponse,
  joiGeneralError, joiStringError,
  joiEmailError, joiNumberError,
  joiBooleanError, joiDateError,
} from '../../../src/utils';

describe('formatResponse', () => {
  it('should format the response correctly', () => {
    expect(formatResponse('api', 'type', 'message')).toBe('type.api.message');
  });

  it('should convert the message to camelCase', () => {
    expect(formatResponse('api', 'type', 'message with spaces')).toBe('type.api.messageWithSpaces');
  });
});

describe('formatSuccessResponse', () => {
  it('should format the success response correctly', () => {
    expect(formatSuccessResponse('api', 'message')).toBe('success.api.message');
  });
});

describe('formatErrorResponse', () => {
  it('should format the error response correctly', () => {
    expect(formatErrorResponse('api', 'message')).toBe('error.api.message');
  });
});

describe('messageResponse', () => {
  it('should format the message response correctly', () => {
    const message = 'message';
    const metaData = { key: 'value' };
    expect(messageResponse(message, metaData)).toEqual({ message, metaData });
  });

  it('should format the message when no metaData is provided', () => {
    const message = 'message';
    expect(messageResponse(message)).toEqual({ message });
  });

  it('should return null as message, when no message is provided', () => {
    expect(messageResponse()).toEqual({ message: null });
  });
});

describe('joiGeneralError', () => {
  it('should return the correct error messages', () => {
    const schema = 'schema';
    const field = 'field';
    const errorMessages = joiGeneralError(schema, field);
    expect(errorMessages['any.required']).toBe('error.schema.field.required');
    expect(errorMessages['any.only']).toBe('error.schema.field.invalid');
  });
});

describe('joiStringError', () => {
  it('should return the correct error messages', () => {
    const schema = 'schema';
    const field = 'field';
    const errorMessages = joiStringError(schema, field);
    expect(errorMessages['string.base']).toBe('error.schema.field.invalid');
    expect(errorMessages['string.empty']).toBe('error.schema.field.empty');
  });
});

describe('joiEmailError', () => {
  it('should return the correct error messages', () => {
    const schema = 'schema';
    const field = 'field';
    const errorMessages = joiEmailError(schema, field);
    expect(errorMessages['string.email']).toBe('error.schema.field.invalid');
  });
});

describe('joiNumberError', () => {
  it('should return the correct error messages', () => {
    const schema = 'schema';
    const field = 'field';
    const errorMessages = joiNumberError(schema, field);
    expect(errorMessages['number.base']).toBe('error.schema.field.invalid');
  });
});

describe('joiBooleanError', () => {
  it('should return the correct error messages', () => {
    const schema = 'schema';
    const field = 'field';
    const errorMessages = joiBooleanError(schema, field);
    expect(errorMessages['boolean.base']).toBe('error.schema.field.invalid');
  });
});

describe('joiDateError', () => {
  it('should return the correct error messages', () => {
    const schema = 'schema';
    const field = 'field';
    const errorMessages = joiDateError(schema, field);
    expect(errorMessages['date.base']).toBe('error.schema.field.invalid');
  });
});
