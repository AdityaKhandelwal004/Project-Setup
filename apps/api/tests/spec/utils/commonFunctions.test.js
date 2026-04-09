import { join } from 'path';
import { writeFileSync } from 'fs';
import moment from 'moment';
import {
  convertIsoDateToIsoDateTime,
  convertToIsoDateTime,
  convertToIsoDate,
  checkIfValidDate,
  convertToStartOfDay,
  convertToEndOfDay,
  filterUndefinedFromObject,
  deleteFile,
  getFileContent,
  sanitizeUrl,
  getEnumArrayFromObj,
  isFloat,
  isInt,
  splitArray,
  isValidDateFormat,
  JSONStringify,
  interpolateString,
  logOrigin,
  transformCapitalize,
  formatStr,
  formatDate,
  isValidId,
  isValueInEnum,
  isValidString,
  parserString,
  transformCase,
  isValidUUIDString,
  generateUUIDString,
  removeDuplicatesObjects,
} from '../../../src/utils';

afterAll(() => {
  jest.clearAllMocks();
});

describe('convertIsoDateToIsoDateTime', () => {
  it('should return undefined when no date is passed', () => {
    const date = convertIsoDateToIsoDateTime();
    expect(date).toBeUndefined();
  });

  it('should return null when date is invalid', () => {
    const date = convertIsoDateToIsoDateTime(null);
    expect(date).toBeNull();
  });

  it('should return valid date time formatted in ISO format', () => {
    const expectedDateTime = '2022-01-01T12:00:00+00:00';
    const momentFormatSpy = jest.spyOn(moment.prototype, 'format');
    momentFormatSpy.mockImplementationOnce(() => '12:00:00+00:00');
    const date = convertIsoDateToIsoDateTime('2022-01-01');
    expect(date).toBe(expectedDateTime);
  });
});

describe('convertToIsoDateTime', () => {
  it('should return undefined when no date is passed', () => {
    const date = convertToIsoDateTime();
    expect(date).toBeUndefined();
  });

  it('should return null when date is invalid', () => {
    const date = convertToIsoDateTime(null);
    expect(date).toBeNull();
  });

  it('should return valid date time formatted in ISO format', () => {
    const inputData = moment().toISOString()
    const expected = moment(inputData).format('YYYY-MM-DDTHH:mm:ss');
    const resultData = convertToIsoDateTime(inputData);
    expect(resultData).toBe(expected);
  });
});

describe('convertToIsoDate', () => {
  it('should return undefined when no date is passed', () => {
    const date = convertToIsoDate();
    expect(date).toBeUndefined();
  });

  it('should return null when date is invalid', () => {
    const date = convertToIsoDate(null);
    expect(date).toBeNull();
  });

  it('should return valid date formatted in ISO format', () => {
    const inputData = '2023-01-01T12:00:00+00:00';
    const expected = '2023-01-01';
    const resultData = convertToIsoDate(inputData);
    expect(resultData).toBe(expected);
  });
});

describe('checkIfValidDate', () => {
  it('should return false when no date is passed', () => {
    const date = checkIfValidDate();
    expect(date).toBe(false);
  });

  it('should return false when date is null', () => {
    const date = checkIfValidDate(null);
    expect(date).toBe(false);
  });

  it('should return false when date is invalid', () => {
    const inputData = '2023-01-01T25:65:00+00:00';
    const expected = false;
    const resultData = checkIfValidDate(inputData);
    expect(resultData).toBe(expected);
  });

  it('should return true if date passed is valid', () => {
    const inputData = '2023-01-01T12:00:00+00:00';
    const expected = true;
    const resultData = checkIfValidDate(inputData);
    expect(resultData).toBe(expected);
  });
});

describe('convertToStartOfDay', () => {
  it('should return undefined when no date is passed', () => {
    const date = convertToStartOfDay();
    expect(date).toBeNull();
  });

  it('should return null when date is invalid', () => {
    const date = convertToStartOfDay(null);
    expect(date).toBeNull();
  });

  it('should return moment object that has hours, mins, seconds and milliseconds set to 0', () => {
    const inputData = '2023-01-01T15:20:15+00:00';
    const expected = moment(inputData).startOf('day');
    const resultData = convertToStartOfDay(inputData);
    expect(resultData).toEqual(expected);
  });
});

describe('convertToEndOfDay', () => {
  it('should return undefined when no date is passed', () => {
    const date = convertToEndOfDay();
    expect(date).toBeNull();
  });

  it('should return null when date is invalid', () => {
    const date = convertToEndOfDay(null);
    expect(date).toBeNull();
  });

  it('should return moment object that has hours, mins, seconds and milliseconds set to 0', () => {
    const inputData = '2023-01-01T15:20:15+00:00';
    const expected = moment(inputData).endOf('day');
    const resultData = convertToEndOfDay(inputData);
    expect(resultData).toEqual(expected);
  });
});

describe('filterUndefinedFromObject', () => {
  it('should return empty object when object is empty', () => {
    const obj = filterUndefinedFromObject({});
    expect(obj).toEqual({});
  });

  it('should remove the undefined key value pairs from object', () => {
    const obj = {
      key1: 'value1',
      key2: undefined,
      key3: 'value3',
    };
    const expected = {
      key1: 'value1',
      key3: 'value3',
    };
    const result = filterUndefinedFromObject(obj);
    expect(result).toEqual(expected);
  });
});

describe('deleteFile', () => {
  it('Should delete file if exists', async () => {
    const filePath = join(__dirname, 'del_test.txt');
    writeFileSync(filePath, 'del_test');
    const result = await deleteFile(filePath);
    expect(result).toBe(true);
  });

  it('Should fail if the file does not exist', async () => {
    await expect(deleteFile()).rejects.toThrow('Invalid Path');
  });

  it('Should fail if the file does not exist', async () => {
    const filePath = join(__dirname, 'del_test.txt');
    try {
      await deleteFile(filePath);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.code).toBe('ENOENT');
      expect(error.message).toBe(`ENOENT: no such file or directory, unlink '${filePath}'`);
    }
  });
});

describe('getFileContent', () => {
  const dirName = __dirname;
  it('Should read file if exists', async () => {
    const filePath = 'test.txt';
    writeFileSync(join(dirName, filePath), 'test');
    const result = await getFileContent(dirName, filePath);
    deleteFile(join(dirName, filePath));
    expect(result).toBe('test');
  });

  it('Should fail if the file does not exist', async () => {
    const filePath = 'test.txt';
    try {
      await getFileContent(dirName, filePath);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.code).toBe('ENOENT');
      expect(error.message).toBe(`ENOENT: no such file or directory, open '${join(dirName, filePath)}'`);
    }
  });
});

describe('sanitizeUrl', () => {
  it('should return the parameter if it is falsy value: undefined', () => {
    const inputData = undefined;
    const expected = undefined;
    const resultData = sanitizeUrl(inputData);
    expect(resultData).toBe(expected);
  });

  it('should return the parameter if it is falsy value: null', () => {
    const inputData = null;
    const expected = null;
    const resultData = sanitizeUrl(inputData);
    expect(resultData).toBe(expected);
  });

  it('should return the parameter if it is falsy value: false', () => {
    const inputData = false;
    const expected = false;
    const resultData = sanitizeUrl(inputData);
    expect(resultData).toBe(expected);
  });

  it('should return the parameter if it is falsy value: 0', () => {
    const inputData = 0;
    const expected = 0;
    const resultData = sanitizeUrl(inputData);
    expect(resultData).toBe(expected);
  });

  it('should remove / at the end of the url', () => {
    const inputData = 'https://example.com/hello/';
    const expected = 'https://example.com/hello';
    const resultData = sanitizeUrl(inputData);
    expect(resultData).toBe(expected);
  });

  it('should return the exact url if it does not end with /', () => {
    const inputData = 'https://example.com/hello';
    const expected = 'https://example.com/hello';
    const resultData = sanitizeUrl(inputData);
    expect(resultData).toBe(expected);
  });
});

describe('getEnumArrayFromObj', () => {
  it('should return null if it is falsy value: undefined', () => {
    const inputData = undefined;
    const resultData = getEnumArrayFromObj(inputData);
    expect(resultData).toBeNull();
  });

  it('should return null if it is falsy value: null', () => {
    const inputData = null;
    const resultData = getEnumArrayFromObj(inputData);
    expect(resultData).toBeNull();
  });

  it('should return null if it is falsy value: false', () => {
    const inputData = false;
    const resultData = getEnumArrayFromObj(inputData);
    expect(resultData).toBeNull();
  });

  it('should return null if it is falsy value: 0', () => {
    const inputData = 0;
    const resultData = getEnumArrayFromObj(inputData);
    expect(resultData).toBeNull();
  });

  it('Should convert enum object to array', () => {
    const inputData = Object.freeze({
      ACTIVE: 'ACTIVE',
      INACTIVE: 'INACTIVE',
      DELETED: 'DELETED',
    });
    const expected = ['ACTIVE', 'INACTIVE', 'DELETED'];
    const resultData = getEnumArrayFromObj(inputData);
    expect(resultData).toEqual(expected);
  });
});

describe('isFloat', () => {
  it('should return false if it is undefined', () => {
    const inputData = undefined;
    const resultData = isFloat(inputData);
    expect(resultData).toBe(false);
  });

  it('should return false if it is null', () => {
    const inputData = null;
    const resultData = isFloat(inputData);
    expect(resultData).toBe(false);
  });

  it('should return false if it is alphabetical value', () => {
    const inputData = 'abc';
    const resultData = isFloat(inputData);
    expect(resultData).toBe(false);
  });

  it('should return false if is a object or array', () => {
    const inputDataArray = [];
    const inputDataObject = {};
    const resultDataArray = isFloat(inputDataArray);
    const resultDataObject = isFloat(inputDataObject);
    expect(resultDataArray).toBe(false);
    expect(resultDataObject).toBe(false);
  });

  it('should return false if it is boolean', () => {
    const inputData = true;
    const resultData = isFloat(inputData);
    expect(resultData).toBe(false);
  });

  it('Should return false for Floating point numbers with multiple decimal points', () => {
    const inputData = '12.56.1';
    const expected = false;
    const resultData = isFloat(inputData);
    expect(resultData).toBe(expected);
  });

  it('Floating point numbers with commas not followed by digits', () => {
    const inputData = '123.,456';
    const expected = false;
    const resultData = isFloat(inputData);
    expect(resultData).toBe(expected);
  });

  it('Should return true for integers as string', () => {
    const inputData = '123';
    const expected = true;
    const resultData = isFloat(inputData);
    expect(resultData).toBe(expected);
  });

  it('Should return true for integers', () => {
    const inputData = 123;
    const expected = true;
    const resultData = isFloat(inputData);
    expect(resultData).toBe(expected);
  });

  it('Should return true for Integer with tailing decimal should return false', () => {
    const inputData = '12.';
    const expected = true;
    const resultData = isFloat(inputData);
    expect(resultData).toBe(expected);
  });

  it('Should return true for floating point numbers as string', () => {
    const inputData = '123.5';
    const expected = true;
    const resultData = isFloat(inputData);
    expect(resultData).toBe(expected);
  });

  it('Should return true for floating point numbers', () => {
    const inputData = '123.5';
    const expected = true;
    const resultData = isFloat(inputData);
    expect(resultData).toBe(expected);
  });
});

describe('isInt', () => {
  it('should return false if it is undefined', () => {
    const inputData = undefined;
    const resultData = isInt(inputData);
    expect(resultData).toBe(false);
  });

  it('should return false if it is null', () => {
    const inputData = null;
    const resultData = isInt(inputData);
    expect(resultData).toBe(false);
  });

  it('should return false if it is alphabetical value', () => {
    const inputData = 'abc';
    const resultData = isInt(inputData);
    expect(resultData).toBe(false);
  });

  it('should return false if is a object or array', () => {
    const inputDataArray = [];
    const inputDataObject = {};
    const resultDataArray = isInt(inputDataArray);
    const resultDataObject = isInt(inputDataObject);
    expect(resultDataArray).toBe(false);
    expect(resultDataObject).toBe(false);
  });

  it('should return false if it is boolean', () => {
    const inputData = true;
    const resultData = isInt(inputData);
    expect(resultData).toBe(false);
  });

  it('Should return false for Floating point numbers with multiple decimal points', () => {
    const inputData = '12.56.1';
    const expected = false;
    const resultData = isInt(inputData);
    expect(resultData).toBe(expected);
  });

  it('Floating point numbers with commas not followed by digits', () => {
    const inputData = '123.,456';
    const expected = false;
    const resultData = isInt(inputData);
    expect(resultData).toBe(expected);
  });

  it('Should return false for Integer with tailing decimal should return false', () => {
    const inputData = '12.';
    const expected = false;
    const resultData = isInt(inputData);
    expect(resultData).toBe(expected);
  });

  it('Should return false for floating point numbers as string', () => {
    const inputData = '123.5';
    const expected = false;
    const resultData = isInt(inputData);
    expect(resultData).toBe(expected);
  });

  it('Should return false for floating point numbers', () => {
    const inputData = '123.5';
    const expected = false;
    const resultData = isInt(inputData);
    expect(resultData).toBe(expected);
  });

  it('Should return true for integers as string', () => {
    const inputData = '123';
    const expected = true;
    const resultData = isInt(inputData);
    expect(resultData).toBe(expected);
  });

  it('Should return true for integers', () => {
    const inputData = 123;
    const expected = true;
    const resultData = isInt(inputData);
    expect(resultData).toBe(expected);
  });
});

describe('splitArray', () => {
  it('if limit is less than 0', () => {
    const inputData = [1, 2, 3];
    const expected = 'Limit must be greater than 0.';
    try {
      splitArray(inputData, -1);
    } catch (error) {
      expect(error.message).toBe(expected);
    }
  });

  it('if limit is equal to 0', () => {
    const inputData = [1, 2, 3];
    const expected = 'Limit must be greater than 0.';
    try {
      splitArray(inputData, 0);
    } catch (error) {
      expect(error.message).toBe(expected);
    }
  });

  it('Should split the array into given number of chunks', () => {
    const inputData = [1, 2, 3];
    const expected = [[1, 2], [3]];
    const resultData = splitArray(inputData, 2);
    expect(resultData).toStrictEqual(expected);
  });
});

describe('isValidDateFormat', () => {
  it('should return false for invalid date format', () => {
    const invalidDates = ['2020/01/01', '01-01-2020', '20200101', '2020.01.01', '2020-13-01', '2020-02-30'];
    invalidDates.forEach((date) => {
      expect(isValidDateFormat(date)).toBe(false);
    });
  });

  it('should return true for valid date format', () => {
    const validDate = '2020-01-01';
    expect(isValidDateFormat(validDate)).toBe(true);
  });
});

describe('JSONStringify', () => {
  it('should return a JSON string with unicode characters escaped when emitUnicode is false', () => {
    const obj = { name: 'John', age: 30, city: 'New York' };
    const result = JSONStringify(obj, false);
    expect(result).toBe(JSON.stringify(obj));
  });

  it('should return a JSON string with unicode characters unescaped when emitUnicode is true', () => {
    const obj = { name: 'John', age: 30, city: 'New York' };
    const result = JSONStringify(obj, true);
    expect(result).toBe(JSON.stringify(obj));
  });

  it('should return a JSON string with emoji unescaped when emitUnicode is true', () => {
    const obj = { message: 'Hello, world! 👋' };
    const result = JSONStringify(obj, true);
    expect(result).toBe(JSON.stringify(obj));
  });

  it('should return a JSON string with emoji escaped when emitUnicode is false', () => {
    const obj = { message: 'Hello, world! 👋' };
    const result = JSONStringify(obj, false);
    expect(result).not.toBe(JSON.stringify(obj));
  });

  it('should return null when circular reference is detected', () => {
    const obj = { name: 'John', age: 30, city: 'New York' };
    obj.circularObj = obj;
    const result = JSONStringify(obj, false);
    const expected = {
      ...obj,
      circularObj: null,
    };
    expect(JSON.parse(result)).toEqual(expected);
  });
});

describe('interpolateString', () => {
  it('should correctly interpolate values into the string', () => {
    const query = 'SELECT * FROM users WHERE name = $1 AND age = $2';
    const values = ['John', 25];
    const result = interpolateString(query, values);
    expect(result).toBe("SELECT * FROM users WHERE name = 'John' AND age = '25'");
  });

  it('should leave placeholders intact if no corresponding value is provided', () => {
    const query = 'SELECT * FROM users WHERE name = $1 AND age = $2';
    const values = ['John'];
    const result = interpolateString(query, values);
    expect(result).toBe("SELECT * FROM users WHERE name = 'John' AND age = $2");
  });

  it('should handle multiple occurrences of the same placeholder', () => {
    const query = 'SELECT * FROM $1 WHERE $1.name = $2';
    const values = ['users', 'John'];
    const result = interpolateString(query, values);
    expect(result).toBe("SELECT * FROM 'users' WHERE 'users'.name = 'John'");
  });

  it('should handle values that are not strings', () => {
    const query = 'SELECT * FROM users WHERE age > $1';
    const values = [20];
    const result = interpolateString(query, values);
    expect(result).toBe("SELECT * FROM users WHERE age > '20'");
  });
});

describe('logOrigin', () => {
  it('should log the origin and whether it is allowed', () => {
    const consoleSpy = jest.spyOn(console, 'info');
    logOrigin('https://example.com', ['https://example.com']);
    expect(consoleSpy).toHaveBeenCalledWith('[CORS] Origin: %s - Allowed Origins: %s', 'https://example.com', true);
    consoleSpy.mockRestore();
  });

  it('Should not log anything if origin is falsy', () => {
    const consoleSpy = jest.spyOn(console, 'info');
    logOrigin(undefined, ['https://example.com']);
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe('transformCapitalize', () => {
  it('should return the correctly transformed string', () => {
    expect(transformCapitalize('hello_world')).toBe('Hello world');
  });

  it('should return an empty string for null or undefined input', () => {
    expect(transformCapitalize(null)).toBe('');
    expect(transformCapitalize(undefined)).toBe('');
  });
});

describe('formatStr', () => {
  it('should return an empty string for null or undefined input', () => {
    expect(formatStr(null)).toBe('');
    expect(formatStr(undefined)).toBe('');
  });

  it('should return the correctly formatted string', () => {
    expect(formatStr('hello_world')).toBe('hello_world');
  });
});

describe('isValidId', () => {
  it('should return true for valid id', () => {
    expect(isValidId(1)).toBe(true);
  });

  it('should return false for invalid id', () => {
    expect(isValidId(0)).toBe(false);
    expect(isValidId(null)).toBe(false);
    expect(isValidId(undefined)).toBe(false);
  });
});

describe('formatDate', () => {
  it('should correctly format a valid date', () => {
    const date = new Date('2022-01-01');
    const result = formatDate(date);
    expect(result).toBe('01/01/2022');
  });

  it('should return an empty string for an invalid date', () => {
    const date = new Date('invalid date');
    const result = formatDate(date);
    expect(result).toBe('Invalid date');
  });

  it('should return an empty string if no date is provided', () => {
    const result = formatDate();
    expect(result).toBe('');
  });
});

describe('isValueInEnum', () => {
  it('should return false, when the value is not in the enum', () => {
    const value = 'invalid';
    const enumValues = ['valid'];
    const result = isValueInEnum(value, enumValues);
    expect(result).toBe(false);
  });

  it('should return true when the value is in the enum', () => {
    const value = 'valid';
    const enumValues = ['valid'];
    const result = isValueInEnum(value, enumValues);
    expect(result).toBe(true);
  });

  it('should work even if the ENUM is object', () => {
    const value = 'valid';
    const enumValues = {
      valid: 'valid',
      invalid: 'invalid',
    };
    const result = isValueInEnum(value, enumValues);
    expect(result).toBe(true);
  });

  it('should return false when the value is not in the enum', () => {
    const value = 'invalid';
    const enumValues = {
      valid: 'valid',
    };
    const result = isValueInEnum(value, enumValues);
    expect(result).toBe(false);
  });
});

describe('isValidString', () => {
  it('should return false when no value is passed', () => {
    const value = null;
    const expected = false;
    const result = isValidString(value);
    expect(result).toBe(expected);
  });

  it('should return false when symbol is passed to it', () => {
    const value = Symbol('test');
    const expected = false;
    const result = isValidString(value);
    expect(result).toBe(expected);
  });

  it('should return false when Object is passed to it', () => {
    const value = { name: 'test' };
    const expected = false;
    const result = isValidString(value);
    expect(result).toBe(expected);
  });

  it('should return false when null is passed to it', () => {
    const value = null;
    const expected = false;
    const result = isValidString(value);
    expect(result).toBe(expected);
  });

  it('should return false when NaN is passed to it', () => {
    const value = NaN;
    const expected = false;
    const result = isValidString(value);
    expect(result).toBe(expected);
  });

  it('should return false when empty string is passed to it', () => {
    const value = '';
    const expected = false;
    const result = isValidString(value);
    expect(result).toBe(expected);
  });

  it('should return false when empty string with spaces is passed to it', () => {
    const value = ' ';
    const expected = false;
    const result = isValidString(value);
    expect(result).toBe(expected);
  });

  it('should return true when string is passed to it', () => {
    const value = 'test';
    const expected = true;
    const result = isValidString(value);
    expect(result).toBe(expected);
  });
});

describe('parserString', () => {
  it('should return null when invalid value is provided', () => {
    const value = NaN;
    const expected = null;
    const result = parserString(value);
    expect(result).toBe(expected);
  });

  it('should return string value when valid value is passed', () => {
    const value = 123;
    const expected = '123';
    const result = parserString(value);
    expect(result).toBe(expected);
  });
});

describe('transformCase', () => {
  it('Should transform the case to uppercase', () => {
    const value = 'test';
    const expected = 'TEST';
    const result = transformCase(value);
    expect(result).toBe(expected);
  });

  it('should replace spaces with underscore', () => {
    const value = 'test test';
    const expected = 'TEST_TEST';
    const result = transformCase(value);
    expect(result).toBe(expected);
  });
});

describe('isValidUUIDString', () => {
  it('it should return true for valid UUID string', () => {
    const value = '12345678-1234-1234-1234-123456789012';
    const expected = true;
    const result = isValidUUIDString(value);
    expect(result).toBe(expected);
  });

  it('it should return false for invalid UUID string', () => {
    const value = 'invalid';
    const expected = false;
    const result = isValidUUIDString(value);
    expect(result).toBe(expected);
  });

  it('should return false, if invalid string provided', () => {
    const value = null;
    const expected = false;
    const result = isValidUUIDString(value);
    expect(result).toBe(expected);
  });
});

describe('generateUUIDString', () => {
  it('Should generate a valid v4 UUID string', () => {
    const result = generateUUIDString();
    expect(typeof result).toBe('string');
  });
});

describe('removeDuplicatesObjects', () => {
  it('should remove duplicate objects based on the key', () => {
    const arr = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice' },
      { id: 3, name: 'Charlie' },
    ];
    const key = 'id';
    const uniqueArr = removeDuplicatesObjects(arr, key);
    expect(uniqueArr).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]);
  });

  it('should return an empty array if input is empty', () => {
    const arr = [];
    const key = 'id';
    const uniqueArr = removeDuplicatesObjects(arr, key);
    expect(uniqueArr).toEqual([]);
  });

  it('should handle arrays with no duplicates', () => {
    const arr = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    const key = 'id';
    const uniqueArr = removeDuplicatesObjects(arr, key);
    expect(uniqueArr).toEqual(arr);
  });
});
