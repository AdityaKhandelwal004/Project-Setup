import moment from "moment";
import type { Moment } from "moment";
import momenttz from "moment-timezone";
import type { Id, Option } from "@mono/models";

export const convertIsoDatoToIsoDateTime = (
  date?: string
): string | undefined => {
  if (!date) {
    return undefined;
  }
  return `${date}T${moment().format("HH:mm:ssZ")}`;
};

export const dateFormatterFunction = (
  date: string | Moment,
  formatType: string = "DD MMM YYYY"
) => moment(date).format(formatType);

export const getTimeZoneForLocation = (location: string) => {
  switch (location) {
    case "AUSTRALIA":
      return "Australia/Melbourne";
    default:
      return "America/Los_Angeles";
  }
};

export const dateFormatterFunctionTimeZone = (
  date: string | Moment,
  formatType: string = "DD MMM YYYY",
  timeZone: string = "UTC" // Default to UTC
) => momenttz(date).tz(timeZone).format(formatType);

export const dateFormatterUTC = (
  date: string,
  formatType: string = "DD MMM YYYY",
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
) => {
  return momenttz.utc(date).tz(timeZone).format(formatType);
};

export const roundToOneDecimal = (value: number) => Math.round(value * 10) / 10;

export const capitalizeEntireString = (
  str: string | number
): string | undefined => {
  if (!str) {
    return null;
  }
  const stringToCapitalize = str as string;
  return stringToCapitalize?.toUpperCase();
};

export const mapIdNameToOptionWithoutCaptializing = (entity: {
  id: Id;
  name: string;
}): Option => ({ id: entity?.id, label: trimWordWrapper(entity?.name) });

export const convertToIsoDateTime = (date?: string): string | undefined => {
  if (!date) {
    return undefined;
  }
  return moment(date).format("YYYY-MM-DDTHH:mm:ssZ");
};

export const convertToIsoDate = (date?: string): string | undefined => {
  if (!date) {
    return undefined;
  }
  return moment(date).format("YYYY-MM-DD");
};

export const isUndefined = (value: unknown): boolean => value === undefined;
export const isNull = (value: unknown): boolean => value === null;

export const getApiDate = (
  value: string | moment.Moment | undefined | null
): string | undefined | null => {
  if (isNull(value)) return null;
  if (isUndefined(value)) return undefined;
  return convertToIsoDate(value as string);
};

export const convertToMomentDate = (
  value: string | moment.Moment | undefined | null
): moment.Moment | undefined | null => {
  if (isNull(value)) return null;
  if (isUndefined(value)) return undefined;
  return moment(value);
};

/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
export const getEditUrl =
  (route: string) =>
  (entity: any): string =>
    route.replace(":id", entity?.id);

export const convertSingleToDoubleDigit = (
  value?: number
): string | undefined => {
  if (isNull(value)) return null;
  if (isUndefined(value)) return undefined;

  if (value >= 0 && value <= 9) {
    return `0${value}`;
  }
  return `${value}`;
};

export const fileSizeCheckFunction = (
  fileSize: number,
  acceptedFileSize: number
) => {
  if (fileSize / 1024 / 1024 >= acceptedFileSize) {
    return true;
  }
  return false;
};

export const capitalizeLegend = (str?: string) => {
  if (str === null || str === undefined) {
    return str;
  }
  return `${str?.charAt(0)?.toUpperCase()}${str
    ?.slice(1)
    ?.toLowerCase()
    .replace("_", " ")}`;
};

export const mapIdNameToOption = (entity: {
  id: Id;
  name: string;
}): Option => ({ id: entity?.id, label: capitalizeLegend(entity?.name) });

export const underscoreChangeFunction = (str: string): string => {
  if (!str.includes("_")) {
    return str;
  }
  return str.replace("_", " ");
};

export const trimWordWrapper = (str: string): string => str?.trim();

export const capitalize = (str: string) => {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1)?.toLowerCase();
};
export const formatStatus = (status: string) => {
  let formatted = status
    ?.replace(/_AND_/gi, " & ") // Replace "_AND_" with " & "
    ?.replace(/\bAND\b/gi, "&") // Replace standalone "AND" with "&" (case-insensitive)
    ?.split(/[_\s]+/) // Split by underscores or spaces
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
    ?.join(" ");
  if (formatted === "Vision Mission & Values") {
    formatted = "Vision, Mission & Values";
  }
  return formatted;
};

export const darkenColor = (color: string, percent: number) => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`;
};

export const lightenColor = (color: string, percent: number) => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return `#${(
    0x1000000 +
    (R > 255 ? 255 : R) * 0x10000 +
    (G > 255 ? 255 : G) * 0x100 +
    (B > 255 ? 255 : B)
  )
    .toString(16)
    .slice(1)}`;
};

export const scrollToStepTop = () => {
  if (!document) return;
  document?.getElementById("step-start")?.scrollIntoView();
};

export const extractErrorMessage = (
  errorMessages: Record<string, string>,
  errorCode: string
): string => {
  return errorMessages[errorCode] || "An unexpected error occurred";
};

// Perform rollback for failed operations
export const performRollback = async (
  rollbackStack: (() => Promise<void>)[]
) => {
  while (rollbackStack.length) {
    const rollbackFn = rollbackStack.pop();
    if (rollbackFn) {
      try {
        await rollbackFn();
      } catch (err) {
        console.error("Rollback failed:", err);
      }
    }
  }
};

export const flattenObject = <T extends Record<string, unknown>>(
  obj: T,
  parentKey = "",
  separator = "_"
): Record<string, unknown> => {
  const flatObject: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = parentKey ? `${parentKey}${separator}${key}` : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(
        flatObject,
        flattenObject(value as Record<string, unknown>, newKey, separator)
      );
    } else {
      flatObject[newKey] = value;
    }
  }

  return flatObject;
};

export const transformArrayToObject = <T extends { id: string | number }>(
  dataArray: T[]
): Record<string | number, T> => {
  return dataArray.reduce(
    (acc, item) => {
      if (item.id != null) {
        acc[item.id] = item;
      }
      return acc;
    },
    {} as Record<string | number, T>
  );
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to calculate total income
export const calculateTotalIncome = (incomes: any[]): number => {
  return incomes.reduce((total, income) => total + (income.amount || 0), 0);
};

// Helper function to update form values with calculations
export const updateCalculatedValues = (incomes: any[], change?: any): void => {
  if (!change) return;

  const totalIncome = calculateTotalIncome(incomes);

  // Update total income in form values
  change("totalIncome", totalIncome);
};

export const moduleStyles: Record<
  string,
  { color: string; bgColor: string; border: string; bgTab: string; custom: string; cardBg: string }
> = {
  OPTIMISE: {
    color: "#FF4B00",
    bgColor: "#FFF6F2",
    border: "#FFAC8A",
    bgTab:'FFF6F2',
    custom: '#FFC7B0',
    cardBg: '#FFFCF9'
  },
  MAXIMISE: {
    color: "#100937",
    bgColor: "#F9F6FF",
    border: "#D0BCF8",
    bgTab: '#F0EAFD',
    custom: '#D0BCF8',
    cardBg: '#F9F6FF'
  },
  PROTECT: {
    color: "#064345",
    bgColor: "#E6ECEC",
    border: "#8CA9A9",
    bgTab: '#E9F7F4',
    custom: '#B2C5C5',
    cardBg: '#F0F9F7'
  },
};


export const formatAUD = (value: string | number) => {
  if (!value && value !== 0) return "";
  const number = Number(value)?.toFixed(0);
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0, // no decimals
    maximumFractionDigits: 0,
  })?.format(parseFloat(number));
}



  export const calculateMilestoneDate = (targetAmount: number, startingAmount: number = 0, monthlyContribution: number) => {
    if (monthlyContribution <= 0) return new Date();
    const monthsToTarget = Math.ceil((targetAmount - startingAmount) / monthlyContribution);
    const targetDate = new Date(2025, 7, 28); // Start from 28 Aug 2025
    targetDate.setMonth(targetDate.getMonth() + monthsToTarget);
    return targetDate;
  };


  export const formatDate = (dateString: string) => {
    if (!dateString) return "";
  return moment(dateString).format("DD MMM YYYY");
  };

  export const formatDateTime = (dateString: string) => {
    if (!dateString) return "";
    return momenttz(dateString).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format("DD MMM YYYY h:mm A");
  };

export const mapIdNameOptionWithoutCaptializing = (entity: {
  id: Id;
  name: string;
}): Option =>{  
 return ({ id: entity?.id, label: entity?.name });
}
  


export const maskData = (data: string) => {
  if (!data) {
    return "";
  }
  if (data.includes("@")) {
    const parts = data.split("@");
    return `${parts[0].slice(0, 2)}****@${parts[1]}`;
  }
  const dialCode = data.substring(0, 2);
  return `${dialCode} ${data.slice(2, 4)}********${data.slice(-2)}`;
};


export function maskEmail(email?: string): string {
  if(!email) return '';
  const [username, domain] = email.split('@');

  if (!username || !domain) {
    return email; // invalid format fallback
  }

  if (username.length <= 2) {
    return '*'.repeat(username.length) + '@' + domain;
  }

  const firstChar = username[0];
  const lastChar = username[username.length - 1];
  const maskedMiddle = 'x'.repeat(username.length - 2);

  return `${firstChar}${maskedMiddle}${lastChar}@${domain}`;
}

export const maskCardNumber = (cardNumber: string): string => {
  if (!cardNumber) return "";
  
  const cleaned = cardNumber.replace(/\D/g, "");
  const masked = cleaned?.split("")?.map((char, index) =>
      index < cleaned.length - 4 ? "*" : char
    )?.join("");

  return masked.replace(/(.{4})/g, "$1 ").trim();
};


export const getMonthInfo = (dateString: any) => {
  if (!dateString) return { monthNumber: null, monthName: null };

  const date = new Date(dateString);
  const monthNumber = date.getMonth() + 1; 

  const monthName = date.toLocaleString("default", { month: "short" }); 

  return { monthNumber, monthName };
};


export const getProgressPercent = (currentBalance: number = 0, targetAmount: number = 0) => {
  if (!targetAmount || targetAmount <= 0) return 0;
  return Math.round((currentBalance / targetAmount) * 100);
};


export const frequencyKeyMapper = {
  'MONTHLY': 'Month',
  'WEEKLY': 'Week',
  'QUARTERLY': 'Quarter',
  'ANNUAL': 'Year',
}

export const frequencyKeyMapperShort = {
  MONTHLY: 'mo',
  WEEKLY: 'wk',
  QUARTERLY: 'qtr',
  ANNUAL: 'yr',
};


export function getYearMonthDifference(startDate: any, endDate: any) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  const yearPart = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
  const monthPart = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';

  if (yearPart && monthPart) return `${yearPart} ${monthPart}`;
  if (yearPart) return yearPart;
  if (monthPart) return monthPart;
  return '0 months';
}



export function formatDateToReadable(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  const suffix =
    day % 10 === 1 && day !== 11 ? 'st' :
    day % 10 === 2 && day !== 12 ? 'nd' :
    day % 10 === 3 && day !== 13 ? 'rd' : 'th';

  return `${day}${suffix} ${month} ${year}`;
}



export const formatToLocalDate = (utcDateString: any) => {
  if (!utcDateString) return "";

  return moment(utcDateString).local().format("D MMM YYYY");
}

export const calculateCategoryTotal = (expenses: (any)[]): number => {
  return expenses?.reduce((sum, expense) => sum + expense.amount, 0);
};

export const percentageOf = (percent: number, value: number) => (percent / 100) * value;


export const calculateRemainingSubscriptionDays = (endDate) => {
  if (!endDate) return 0;

  const end = new Date(endDate);
  const now = new Date();

  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
};

export function formatNumberToNumber(
  value: number | string | null | undefined
): number {
  if (value === null || value === undefined || value === "") return 0;

  const num = Number(value);

  if (isNaN(num)) return 0;

  if (Number.isInteger(num)) return num;

  return parseFloat(num.toFixed(2));
}

const toLocalMidnight = (date: any) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

export const calculateDay = (startDate: any) => {
  if (!startDate) return 1;

  const start = toLocalMidnight(startDate);
  const today = toLocalMidnight(Date.now());

  const diff = today.getTime() - start.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return Math.min(days + 1, 28);
};
