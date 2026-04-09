// Budget-related utility functions and interfaces

// ===== INTERFACES =====
export interface LivingExpense {
  id: string;
  name: string;
  amount: number;
  frequency: 'weekly' | 'monthly' | 'yearly';
  category: 'housing' | 'transport' | 'groceries' | 'essential';
}

export interface ExpensesByCategory {
  housing: LivingExpense[];
  transport: LivingExpense[];
  groceries: LivingExpense[];
  essential: LivingExpense[];
}

export interface OtherExpense {
  id: string;
  name: string;
  amount: number;
  frequency: 'weekly' | 'monthly' | 'yearly';
  // Debt-specific fields (optional for non-debt expenses)
  interestRate?: number;
  dueDate?: string;
  amountOwing?: number;
  monthlyMinRepayments?: number;
}

export interface OtherExpensesByCategory {
  fun: OtherExpense[];
  medical: OtherExpense[];
  debt: OtherExpense[];
}

export interface SpendingPlanGoals {
  livingExpenses: number;
  funEntertainment: number;
  medicalInsurance: number;
  debtRepayments: number;
  savings: number;
  investment: number;
}

export interface ValueWithPercentage {
  value: number;
  percentage: number;
}

export interface SpendingPlanGoalsWithPercentage {
  livingExpenses: ValueWithPercentage;
  funEntertainment: ValueWithPercentage;
  medicalInsurance: ValueWithPercentage;
  debtRepayments: ValueWithPercentage;
  savings: ValueWithPercentage;
  investment: ValueWithPercentage;
}

export interface IncomeData {
  amount: string;
  frequency: string;
  nextPayDate: string;
  savings: string;
  expensesByCategory?: ExpensesByCategory;
  otherExpensesByCategory?: OtherExpensesByCategory;
  spendingPlanGoals?: SpendingPlanGoalsWithPercentage;
  livingExpensesPerMonth?: ValueWithPercentage;
  savingsAndInvestmentPerMonth?: ValueWithPercentage;
}

// ===== UTILITY FUNCTIONS =====

/**
 * Calculate monthly income from amount and frequency
 */
export const calculateMonthlyIncome = (amount: string | number, frequency: string): number => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) return 0;

  switch (frequency) {
    case 'weekly':
      return numericAmount * 4.33;
    case 'fortnightly':
      return numericAmount * 2.17;
    case 'monthly':
      return numericAmount;
    case 'yearly':
      return numericAmount / 12;
    default:
      return numericAmount;
  }
};

/**
 * Calculate spending plan goals based on monthly income
 */
export const calculateSpendingPlanGoals = (monthlyIncome: number): SpendingPlanGoals => {
  return {
    livingExpenses: monthlyIncome * 0.7 * 0.55, // 55% of 70% living expenses
    funEntertainment: monthlyIncome * 0.7 * 0.1, // 10% of 70% living expenses
    medicalInsurance: monthlyIncome * 0.7 * 0.05, // 5% of 70% living expenses
    debtRepayments: 0, // 0% as shown in breakdown
    savings: monthlyIncome * 0.3 * 0.2, // 20% of 30% savings & investment
    investment: monthlyIncome * 0.3 * 0.1, // 10% of 30% savings & investment
  };
};

/**
 * Convert spending plan goals to goals with percentages
 */
export const createSpendingPlanGoalsWithPercentage = (goals: SpendingPlanGoals): SpendingPlanGoalsWithPercentage => {
  return {
    livingExpenses: { value: goals.livingExpenses, percentage: 55 },
    funEntertainment: { value: goals.funEntertainment, percentage: 10 },
    medicalInsurance: { value: goals.medicalInsurance, percentage: 5 },
    debtRepayments: { value: goals.debtRepayments, percentage: 0 },
    savings: { value: goals.savings, percentage: 20 },
    investment: { value: goals.investment, percentage: 10 }
  };
};

/**
 * Get spending goal from form values with safe JSON parsing
 */
export const getSpendingGoalFromFormValues = (formValues: any, category: string) => {
  if (!formValues?.spendingPlanGoals?.value) return null;
  
  try {
    const goals = typeof formValues.spendingPlanGoals.value === 'string' 
      ? JSON.parse(formValues.spendingPlanGoals.value)
      : formValues.spendingPlanGoals.value;
    
    return goals[category] || null;
  } catch (error) {
    console.error('Error parsing spending plan goals:', error);
    return null;
  }
};

/**
 * Calculate total expenses for a category
 */
export const calculateCategoryTotal = (expenses: (LivingExpense | OtherExpense)[]): number => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
};

/**
 * Calculate total expenses across all categories
 */
export const calculateTotalExpenses = (expensesByCategory: ExpensesByCategory | OtherExpensesByCategory): number => {
  return Object.values(expensesByCategory)
    .flat()
    .reduce((sum, expense) => sum + expense.amount, 0);
};

/**
 * Format currency with proper locale formatting
 */
export const formatCurrency = (amount: number, options?: { maximumFractionDigits?: number }): string => {
  return amount.toLocaleString('en-US', { 
    maximumFractionDigits: options?.maximumFractionDigits ?? 2 
  });
};

/**
 * Calculate percentage of goal achieved
 */
export const calculateGoalPercentage = (actual: number, goal: number): number => {
  if (goal === 0) return 0;
  return Math.round((actual / goal) * 100);
};

/**
 * Create living expenses and savings data with percentages
 */
export const createBudgetBreakdownData = (monthlyIncome: number) => {
  return {
    livingExpensesPerMonth: { value: monthlyIncome * 0.7, percentage: 70 },
    savingsAndInvestmentPerMonth: { value: monthlyIncome * 0.3, percentage: 30 }
  };
};
