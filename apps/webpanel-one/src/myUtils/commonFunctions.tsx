import { formatCurrency } from './budgetUtils';

export const truncateAmount = (amount: number, maxLength: number = 7) => {
  const formatted = formatCurrency(amount);
  if (formatted.length <= maxLength) return formatted;
  return `${formatted.substring(0, maxLength)}...`;
};


export const formatAndTruncateValue = (
  value: number,
  decimalPlaces: number = 2,
  maxDigits: number = 6
) => {
  const formattedValue = value.toFixed(decimalPlaces);
  const digitCount = formattedValue.replace(/[^0-9]/g, '').length;
  const shouldTruncate = digitCount > maxDigits;
  const truncatedValue = shouldTruncate 
    ? `${formattedValue.substring(0, maxDigits)}...` 
    : formattedValue;
  
  return {
    formattedValue,
    truncatedValue,
    shouldTruncate
  };
};


export const formatAndTruncatePercentage = (
  percentage: number,
  decimalPlaces: number = 2,
  maxDigitsBeforeDecimal: number = 3
) => {
  const fullPrecision = percentage.toString();
  const parts = fullPrecision.split('.');
  const integerPart = parts[0] || '0';
  const decimalPart = parts[1] || '';
  
  const hasExcessDigits = integerPart.length > maxDigitsBeforeDecimal;
  const hasExcessDecimals = decimalPart.length > 2 && parseFloat(`0.${decimalPart}`) !== 0;
  const shouldTruncate = hasExcessDigits || hasExcessDecimals;
  
  // Format with decimal places
  let formattedPercentage = percentage.toFixed(decimalPlaces);
  
  // Remove .00 if present (e.g., 100.00 becomes 100)
  if (formattedPercentage.endsWith('.00')) {
    formattedPercentage = formattedPercentage.slice(0, -3);
  }
  
  const truncatedPercentage = shouldTruncate 
    ? `${formattedPercentage.substring(0, 4)}...` 
    : formattedPercentage;
  
  return {
    formattedPercentage,
    truncatedPercentage,
    shouldTruncate
  };
};


// Frequency conversion constants
// All conversions are approximate based on standard calendar assumptions
const FREQUENCY_TO_ANNUAL_MULTIPLIER: Record<string, number> = {
  'weekly': 52,
  'Weekly': 52,
  'fortnightly': 26,
  'Fortnightly': 26,
  'monthly': 12,
  'Monthly': 12,
  'annually': 1,
  'Annually': 1,
};

interface IncomeEntry {
  amount: number;
  frequency: string;
  isPrimary?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const FREQUENCY_TO_DAYS: Record<string, number> = {
  'DAILY': 1,
  'daily': 1,
  'Daily': 1,
  'WEEKLY': 7,
  'weekly': 7,
  'Weekly': 7,
  'FORTNIGHTLY': 14,
  'fortnightly': 14,
  'Fortnightly': 14,
  'MONTHLY': 30,
  'monthly': 30,
  'Monthly': 30,
  'QUARTERLY': 90,
  'quarterly': 90,
  'Quarterly': 90,
  'YEARLY': 365,
  'yearly': 365,
  'Yearly': 365,
  'ANNUALLY': 365,
  'annually': 365,
  'Annually': 365,
};



export const FREQUENCY_MULTIPLIERS: Record<string, Record<string, number>> = {
  daily: {
    weekly: 7,
    fortnightly: 14,
    monthly: 30,
    quarterly: 90,
    yearly: 365,
    annually: 365,
  },
  weekly: {
    daily: 1 / 7,
    fortnightly: 2,
    monthly: 30 / 7,
    quarterly: 90 / 7,
    yearly: 52,
    annually: 52,
  },
  fortnightly: {
    daily: 1 / 14,
    weekly: 1 / 2,
    monthly: 30 / 14,
    quarterly: 90 / 14,
    yearly: 26,
    annually: 26,
  },
  monthly: {
    daily: 1 / 30,
    weekly: 7 / 30,
    fortnightly: 14 / 30,
    quarterly: 3,
    yearly: 12,
    annually: 12,
  },
  quarterly: {
    daily: 1 / 90,
    weekly: 7 / 90,
    fortnightly: 14 / 90,
    monthly: 1 / 3,
    yearly: 4,
    annually: 4,
  },
  yearly: {
    daily: 1 / 365,
    weekly: 1 / 52,
    fortnightly: 1 / 26,
    monthly: 1 / 12,
    quarterly: 1 / 4,
  },
  annually: {
    daily: 1 / 365,
    weekly: 1 / 52,
    fortnightly: 1 / 26,
    monthly: 1 / 12,
    quarterly: 1 / 4,
  },
};

export const convertFrequencyDirect = (
  amount: number,
  fromFrequency: string,
  toFrequency: string
): number => {
  if (!amount) return 0;

  const from = fromFrequency.toLowerCase();
  const to = toFrequency.toLowerCase();

  if (from === to) return amount;

  const fromMap = FREQUENCY_MULTIPLIERS[from];
  if (fromMap) {
    const multiplier = fromMap[to];
    if (multiplier) {
      return amount * multiplier;
    }
  }

  const fromDays = FREQUENCY_TO_DAYS[from];
  const toDays = FREQUENCY_TO_DAYS[to];

  if (!fromDays || !toDays) {
    return amount;
  }

  const perDay = amount / fromDays;
  return perDay * toDays;
};

// Calculates total income by converting all incomes to the primary income's frequency
export const calculateTotalIncomeByPrimaryFrequency = (incomes: IncomeEntry[]): number => {
  if (!incomes || incomes.length === 0) return 0;
  
  // Find the primary income
  const primaryIncome = incomes.find(income => income.isPrimary);
  
  // If no primary income is set, return sum without conversion (fallback)
  if (!primaryIncome) {
    return incomes.reduce((total, income) => total + (income.amount || 0), 0);
  }
  
  const primaryFrequency = primaryIncome.frequency;
  
  // Convert all incomes to primary frequency and sum them
  return incomes.reduce((total, income) => {
    const convertedAmount = convertFrequencyDirect(
      income.amount || 0,
      income.frequency,
      primaryFrequency
    );
    return total + convertedAmount;
  }, 0);
};


// Gets the primary income frequency from income entries

export const getPrimaryIncomeFrequency = (incomes: IncomeEntry[]): string => {
  if (!incomes || incomes.length === 0) return 'monthly';
  
  const primaryIncome = incomes.find(income => income.isPrimary);
  return primaryIncome?.frequency || 'monthly';
};


// Formats the frequency label for display (e.g., 'Weekly' -> 'week', 'Monthly' -> 'month')

export const getFrequencyLabel = (frequency: string): string => {
  const frequencyMap: Record<string, string> = {
    'weekly': 'week',
    'Weekly': 'week',
    'fortnightly': 'fortnight',
    'Fortnightly': 'fortnight',
    'monthly': 'month',
    'Monthly': 'month',
    'annually': 'year',
    'Annually': 'year',
  };
  
  return frequencyMap[frequency] || 'month';
};
