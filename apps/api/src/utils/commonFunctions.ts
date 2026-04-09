import moment from "moment";
import "moment-timezone";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { formatErrorResponse } from "./apiResponses.ts";
import { HttpException } from "./index.ts";
import { FREQUENCY_TYPE } from "../models/genericTypes.ts";
import FrequencyService from "../services/frequencyService.ts";

const MAX_YEAR_CAP = 1000
export const isUndefined = (value: unknown) => value === undefined;
export const isNull = (value: null) => value === null;

export const handleException = async (
  method: () => Promise<any>,
  messageKey: string
) => {
  try {
    return await method();
  } catch (error) {
    throw (
      error ||
      new HttpException.ServerError(
        formatErrorResponse(messageKey, "serverError")
      )
    );
  }
};

export function addOneMonthSafe(date: Date): Date {
  const d = new Date(date);
  const day = d.getDate();
  d.setMonth(d.getMonth() + 1);

  while (d.getDate() < day) {
    d.setDate(d.getDate() - 1);
  }
  return d;
}

export function normalizeDate(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export const convertIsoDateToIsoDateTime = (date: undefined) => {
  if (isUndefined(date)) return undefined;
  if (!date) {
    return null;
  }
  return `${date}T${moment().format("HH:mm:ssZ")}`;
};

export const convertToIsoDateTime = (date: moment.MomentInput) => {
  if (isUndefined(date)) return undefined;
  if (!date) {
    return null;
  }
  return moment(date).format("YYYY-MM-DDTHH:mm:ss");
};

export const convertToIsoDate = (date: moment.MomentInput) => {
  if (isUndefined(date)) return undefined;
  if (!date) {
    return null;
  }
  return moment(date).format("YYYY-MM-DD");
};

export const checkIfValidDate = (date: moment.MomentInput) => {
  if (!date) return false;
  return moment(date).isValid();
};

export const convertToStartOfDay = (date: moment.MomentInput) => {
  if (!date) return null;
  return moment(date).set({
    h: 0,
    m: 0,
    s: 0,
    ms: 0,
  });
};

export const convertToEndOfDay = (date: moment.MomentInput) => {
  if (!date) return null;
  return moment(date).set({
    h: 23,
    m: 59,
    s: 59,
    ms: 999,
  });
};

export const filterUndefinedFromObject = (obj: any) =>
  Object.keys(obj).reduce((acc: { [key: string]: any }, key) => {
    if (!isUndefined(obj[key])) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});

export const deleteFile = (filePath: fs.PathLike) =>
  new Promise((resolve, reject) => {
    if (!filePath) {
      reject(new Error("Invalid Path"));
    }
    fs.unlink(filePath, (err) => {
      if (err) reject(err);
      // if no error, file has been deleted successfully
      resolve(true);
    });
  });

export const getFileContent = (resourceDir: string, relativePath: string) =>
  new Promise((resolve, reject) => {
    fs.readFile(path.join(resourceDir, relativePath), "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });

export const formatStr = (str: string) => str || "";
export const formatDate = (date: moment.MomentInput) =>
  date ? moment(date).format("DD/MM/YYYY") : "";

export const sanitizeUrl = (url: string) => {
  if (!url) return url;
  let newUrl = url;
  if (url.endsWith("/")) {
    newUrl = url.substring(0, url.length - 1);
  }
  return newUrl;
};

export const getEnumArrayFromObj = (enumObj: { [x: string]: any }) => {
  if (!enumObj) return null;
  return Object.keys(enumObj).map((key) => enumObj[key]);
};

/**
 * Returns true if the value is a float
 * @param {string|number} val
 * @returns {boolean}
 */
export const isFloat = (val: string | number): boolean => {
  const floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
  const strVal = String(val); // convert number or string to string

  if (!floatRegex.test(strVal)) return false;

  const parsedVal = parseFloat(strVal.replace(",", ".")); // in case of comma as decimal
  return !Number.isNaN(parsedVal);
};

/**
 * Returns if the value is an integer without any decimal
 * @param {string|number} val
 * @returns {boolean}
 */
export const isInt = (val: string | number): boolean => {
  const intRegex = /^-?\d+$/;
  const strVal = String(val);
  if (!intRegex.test(strVal)) return false;

  const intVal = parseInt(strVal, 10);
  return parseFloat(strVal) === intVal && !Number.isNaN(intVal);
};

export const isValidString = (str: unknown): boolean => {
  const invalidTypes = new Set(["function", "object", "symbol"]);
  if (invalidTypes.has(typeof str)) return false;

  const stringifiedValue = String(str).trim();
  if (stringifiedValue.length < 1) return false;

  const incorrectValues = new Set([
    "null",
    "undefined",
    "NaN",
    "Symbol",
    "Symbol()",
    "[object Object]",
  ]);
  return !incorrectValues.has(stringifiedValue);
};

export const parserString = (value: unknown) =>
  isValidString(value) ? String(value) : null;

/**
 * Returns an array of arrays split into chunks specified by the limit
 * @param {Array} array
 * @param {number} limit
 * @returns {Array.<Array>}
 */
export const splitArray = (
  array: Array<any>,
  limit: number
): Array<Array<any>> => {
  if (limit <= 0) {
    throw new Error("Limit must be greater than 0.");
  }

  const result = [];
  let currentIndex = 0;

  while (currentIndex < array.length) {
    result.push(array.slice(currentIndex, currentIndex + limit));
    currentIndex += limit;
  }

  return result;
};

/**
 * Checks if the date supplied is in YYYY-MM-DD format
 * @param {string} dateString
 * @returns {boolean}
 */
export const isValidDateFormat = (dateString: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  const isInValidFormat = regex.test(dateString);
  if (isInValidFormat) {
    return moment(dateString, "YYYY-MM-DD").isValid();
  }
  return false;
};

// Function to handle circular references
const handleCircularReferences = (
  key: string,
  value: null,
  seen: WeakSet<WeakKey>
) => {
  if (typeof value === "object" && value !== null) {
    if (seen.has(value)) {
      return null; // Circular reference detected, discard key
    }
    seen.add(value);
  }
  return value;
};

// Function to handle Unicode characters
const handleUnicodeCharacters = (c: string) => {
  const charCode = c.charCodeAt(0).toString(16);
  const paddedCharCode = `0000${charCode}`.slice(-4);
  return `\\u${paddedCharCode}`;
};

// Main function
export const JSONStringify = (s: any, emitUnicode: any) => {
  const seen = new WeakSet();
  const json = JSON.stringify(s, (key, value) =>
    handleCircularReferences(key, value, seen)
  );
  return emitUnicode
    ? json
    : json.replace(/[\u007f-\uffff]/g, handleUnicodeCharacters);
};

/**
 * Returns SQL query with the values substituted in the placeholders, useful for debugging
 * @param {string} string Sql query
 * @param {Array} values Array of values for the query
 * @returns {String} Sql query with values
 */
export const interpolateString = (string: string, values: Array<any>): string =>
  string.replace(/\$(\d+)/g, (_, index) => {
    const arrayIndex = parseInt(index, 10) - 1;
    return values[arrayIndex] !== undefined
      ? `'${values[arrayIndex]}'`
      : `$${index}`;
  });

export const transformCase = (str: string) => {
  if (!isValidString(str)) return null;
  return str.toUpperCase().replace(/ /g, "_");
};

export const logOrigin = (
  origin: string | any[] | undefined,
  allowedOriginsCS: any[]
) => {
  if (origin) {
    console.info(
      "[CORS] Origin: %s - Allowed Origins: %s",
      origin,
      allowedOriginsCS.some((x) => origin?.indexOf(x) !== -1)
    );
  }
};

export const transformCapitalize = (str: string) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ")
    .replace(/_/g, " ");
};

export const isValueInEnum = (str: string, enumObject: string[]) => {
  if (!isValidString(str)) return false;
  let enumArray = [];
  if (Array.isArray(enumObject)) {
    enumArray = enumObject;
  }
  enumArray = getEnumArrayFromObj(enumObject) ?? [];
  return (
    enumArray
      .map((i) => transformCase(String(i)))
      .find((i) => i === transformCase(str)) !== undefined
  );
};

export const isValidUUIDString = (string: string) => {
  if (!isValidString(string)) {
    return false;
  }
  return /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(string);
};

export const generateUUIDString = () => uuidv4();

/**
 * Removes the duplicate entries of a object based on the
 * key provided
 * @param {Array.<Object>} arr
 * @param {string} key
 * @returns {Array.<Object>}
 */ export const removeDuplicatesObjects = (
  arr: Array<Record<string, any>>,
  key: string
): Array<Record<string, any>> => {
  const map = new Map();
  arr.forEach((obj) => {
    if (!map.has(obj[key])) {
      map.set(obj[key], obj);
    }
  });
  return Array.from(map.values());
};

export const commonCatchHandler = (error: Error, message: string) => {
  let messageKey = message || "commonCatchHandler";
  if (error) {
    return error;
  }
  return new HttpException.ServerError(
    formatErrorResponse(messageKey, "serverError")
  );
};

export function removeNullValues<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      if (value == null || Number.isNaN(value)) return false;

      if (typeof value === "object" && !Array.isArray(value)) {
        if (value instanceof Date) return true; // keep dates
        return Object.keys(value).length > 0; // skip empty objects
      }

      return true;
    })
  ) as Partial<T>;
}

/**
 * Deep removes null, undefined, and NaN values from objects and arrays recursively.
 * Also removes empty objects and empty arrays.
 * Preserves Date objects, functions, and other special types.
 *
 * @param obj - The object or array to clean
 * @returns A new object/array with null/undefined values removed
 */
export function deepRemoveNullValues<T>(obj: T): T {
  if (obj === null || obj === undefined || Number.isNaN(obj)) {
    return undefined as T;
  }

  // Handle primitive types
  if (typeof obj !== "object" || obj instanceof Date || obj instanceof RegExp) {
    return obj;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    const cleaned = obj
      .map((item) => deepRemoveNullValues(item))
      .filter((item) => {
        // Remove null, undefined, NaN
        if (item === null || item === undefined || Number.isNaN(item)) {
          return false;
        }
        // Remove empty objects and empty arrays
        if (
          typeof item === "object" &&
          !Array.isArray(item) &&
          !(item instanceof Date)
        ) {
          return Object.keys(item).length > 0;
        }
        if (Array.isArray(item)) {
          return item.length > 0;
        }
        return true;
      });

    return cleaned as T;
  }

  // Handle objects
  const cleaned: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    const cleanedValue = deepRemoveNullValues(value);

    // Skip null, undefined, NaN values
    if (
      cleanedValue === null ||
      cleanedValue === undefined ||
      Number.isNaN(cleanedValue)
    ) {
      continue;
    }

    // Skip empty objects
    if (
      typeof cleanedValue === "object" &&
      !Array.isArray(cleanedValue) &&
      !(cleanedValue instanceof Date) &&
      Object.keys(cleanedValue).length === 0
    ) {
      continue;
    }

    // Skip empty arrays
    if (Array.isArray(cleanedValue) && cleanedValue.length === 0) {
      continue;
    }

    cleaned[key] = cleanedValue;
  }

  return cleaned as T;
}

export const getAmountBasedOnFrequency = (
  frequency: FREQUENCY_TYPE,
  amount: number
): number => {
  let finalAmount = 0;
  switch (frequency) {
    case FREQUENCY_TYPE.DAILY:
      finalAmount += Number(amount) * 30;
      break;
    case FREQUENCY_TYPE.WEEKLY:
      finalAmount += Number(amount) * 4;
      break;
    case FREQUENCY_TYPE.FORTNIGHTLY:
      finalAmount += Number(amount) * 2;
      break;
    case FREQUENCY_TYPE.MONTHLY:
      finalAmount += Number(amount);
      break;
    case FREQUENCY_TYPE.QUARTERLY:
      finalAmount += Number(amount) / 3;
      break;
    case FREQUENCY_TYPE.YEARLY:
      finalAmount += Number(amount) / 12;
      break;
    default:
      finalAmount += Number(amount);
  }

  return finalAmount;
};

export function roundToDecimalsSafe(
  value: unknown,
  decimals = 2,
  fallback: number | null = 0
): number | null {
  if (value == null) return fallback;
  const num = Number(value);
  if (isNaN(num)) return fallback;
  const factor = 10 ** decimals;
  return Math.round(num * factor) / factor;
}

// Timezone utility functions
export const DEFAULT_TIMEZONE = "Australia/Sydney";

export const getUserTimezone = (userTimezone?: string): string => {
  return userTimezone || DEFAULT_TIMEZONE;
};

export const toUserTimezone = (
  date: Date | string,
  timezone?: string
): moment.Moment => {
  return moment(date).tz(getUserTimezone(timezone));
};

export const isExpiringToday = (
  expiryDate: Date | string,
  timezone?: string
): boolean => {
  const userTz = getUserTimezone(timezone);
  const today = moment().tz(userTz).startOf("day");
  const expiry = moment(expiryDate).tz(userTz).startOf("day");
  return expiry.isSame(today);
};

export const calculateGracePeriodEndDate = (
  expiryDate: Date | string,
  gracePeriodDays: number = 3,
  timezone?: string
): Date => {
  const userTz = getUserTimezone(timezone);
  return moment(expiryDate)
    .tz(userTz)
    .add(gracePeriodDays, "days")
    .endOf("day")
    .toDate();
};

export const getExpectedCompletionDate = (
  incomeFrequency: FREQUENCY_TYPE,
  currentBalance: number,
  targetAmount: number,
  incomeContributionAmount?: number,
  contributionStartDate?: string
) => {
  if (
    !incomeContributionAmount ||
    incomeContributionAmount <= 0 ||
    currentBalance >= targetAmount
  ) {
    return null;
  }
  const amountPending = targetAmount - currentBalance;
  let incomePeriod = Math.ceil(amountPending / incomeContributionAmount);
  const nextPayDate = getNextPayDate(
    contributionStartDate || moment().format("YYYY-MM-DD"),
    incomeFrequency
  );

  const { durationTag, periodFactior } = getDurationTag(incomeFrequency);
  
  if (moment(nextPayDate).isAfter()) {
    incomePeriod = incomePeriod - 1;
  }
  return moment(nextPayDate)
    .add(Math.ceil(incomePeriod * periodFactior), durationTag)
    .toDate();
};

export const getNextPayDate = (
  payDate: string,
  frequency: FREQUENCY_TYPE = FREQUENCY_TYPE.MONTHLY,
  afterDate?: Date | string
) => {
  const today = moment().startOf("day");
  const duration = getDurationTag(frequency);
  // durationTag → 'week', 'month', 'year'
  // periodFactior → 1, etc.
  const sanitizedAfterDate = afterDate ? moment(afterDate).startOf("day") : null;
  let loopUntil = (sanitizedAfterDate && sanitizedAfterDate.isValid()) ? sanitizedAfterDate : today;
  let nextPay = moment(payDate).startOf("day");
  // If nextPay is before today, move forward until it is AFTER today
  while (nextPay.isBefore(loopUntil, "day")) {
    nextPay.add(duration.periodFactior, duration.durationTag);
  }
  return nextPay.format("YYYY-MM-DD");
};

export const getDurationTag = (incomeFrequency: FREQUENCY_TYPE) => {
  let durationTag: any;
  let periodFactior;
  switch (incomeFrequency) {
    case FREQUENCY_TYPE.WEEKLY:
      durationTag = "weeks";
      periodFactior = 1;
      break;
    case FREQUENCY_TYPE.FORTNIGHTLY:
      durationTag = "weeks";
      periodFactior = 2;
      break;
    case FREQUENCY_TYPE.MONTHLY:
      durationTag = "months";
      periodFactior = 1;
      break;
    case FREQUENCY_TYPE.QUARTERLY:
      durationTag = "months";
      periodFactior = 3;
      break;
    case FREQUENCY_TYPE.YEARLY:
      durationTag = "years";
      periodFactior = 1;
      break;
    default:
      durationTag = "months";
      periodFactior = 1;
      break;
  }

  return { durationTag, periodFactior };
};

export function getNextBillingEndDate(
  frequency: FREQUENCY_TYPE,
  startDate: Date = new Date()
): Date {
  const date = moment(startDate);

  switch (frequency) {
    case FREQUENCY_TYPE.DAILY:
      date.add(1, "day");
      break;

    case FREQUENCY_TYPE.WEEKLY:
      date.add(1, "week");
      break;

    case FREQUENCY_TYPE.FORTNIGHTLY:
      date.add(2, "weeks");
      break;

    case FREQUENCY_TYPE.MONTHLY:
      date.add(1, "month");
      break;

    case FREQUENCY_TYPE.QUARTERLY:
      date.add(3, "months");
      break;

    case FREQUENCY_TYPE.YEARLY:
      date.add(1, "year");
      break;

    default:
      throw new Error(`Unsupported billing frequency: ${frequency}`);
  }

  return date.toDate();
}

export const safeParseJSON = <T = any>(
  value: any,
  errorMessage = "Invalid JSON format"
): T | null => {
  if (value === null || value === undefined) return null;
  if (typeof value === "string" && value.trim() === "") return null;

  // If already an object/array/boolean/number → return directly
  if (typeof value !== "string") return value as T;

  // Parse JSON string
  try {
    return JSON.parse(value) as T;
  } catch (err) {
    throw new Error(errorMessage || (err as Error).message);
  }
};

function addPeriodsToDate(
  date: Date,
  freq: FREQUENCY_TYPE,
  periods: number
): Date {
  const d = new Date(date);

  switch (freq) {
    case FREQUENCY_TYPE.MONTHLY:
      d.setMonth(d.getMonth() + periods);
      break;
    case FREQUENCY_TYPE.QUARTERLY:
      d.setMonth(d.getMonth() + periods * 3);
      break;
    case FREQUENCY_TYPE.YEARLY:
      d.setFullYear(d.getFullYear() + periods);
      break;
    case FREQUENCY_TYPE.WEEKLY:
      d.setDate(d.getDate() + periods * 7);
      break;
    case FREQUENCY_TYPE.FORTNIGHTLY:
      d.setDate(d.getDate() + periods * 14);
      break;
    case FREQUENCY_TYPE.DAILY:
      d.setDate(d.getDate() + periods);
      break;
  }

  return d;
}


export function calculateExpectedCompletionDate({
  currentBalance,
  targetAmount,
  annualReturnPercent,
  contributionAmount,
  contributionFrequency,
  startDate = new Date(),
}: {
  currentBalance: number;
  targetAmount: number;
  annualReturnPercent: number;
  contributionAmount: number;
  contributionFrequency: FREQUENCY_TYPE;
  startDate?: Date;
}): Date | null {
  if (contributionAmount <= 0) return null;

  if (currentBalance >= targetAmount) return startDate;
  
  const periodsPerYear = FrequencyService.conversionMapTable[contributionFrequency]?.[FREQUENCY_TYPE.YEARLY];
  const ratePerPeriod = annualReturnPercent / 100 / periodsPerYear;

  let balance = currentBalance;
  let periods = 0;

  const MAX_PERIODS = periodsPerYear * MAX_YEAR_CAP;

  while (balance < targetAmount && periods < MAX_PERIODS) {
    balance += balance * ratePerPeriod;

    balance += contributionAmount;

    periods++;
  }

  if (periods >= MAX_PERIODS) return null;

  return addPeriodsToDate(startDate, contributionFrequency, periods);
}
