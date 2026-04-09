/* eslint-disable no-unused-vars */
import type { RoleName } from "../auth/role.ts";

export type Id = number | string;

export type Row = Record<string, any>;
export type ResultSet = { rows: Row[] };

export type RowMapper<T> = (_row: Row) => T;

export type Filter = {
  page: number;
  limit: number;
  allResults?: boolean;
  total?: number;
  order?: string | null;
  direction?: "asc" | "desc";
  filters: Record<string, any>;
  allowedFilters: string[];
};

export type MetaData = {
  order: string | null;
  direction: string;
  page: number;
  limit: number;
  total: number;
  filters: Record<string, any>;
  allowedFilters: string[];
  [key: string]: any;
};

export type PaginatedResponse<T> = {
  metadata: MetaData;
  records: T[];
};

export interface CustomError extends Error {
  status?: number;
  metaData?: any;
}

export type ParsedFilter = {
  page: number;
  limit: number;
  allResults?: boolean;
  total?: number;
  order?: string | null;
  direction: "asc" | "desc";
  filters: Record<string, any>;
  allowedFilters: string[];
};

export interface CurrentUser {
  id: Id;
  tokenAud: string;
  rights: string[];
  role: {
    getId(): number;
    getRoleName(): RoleName;
  };
  roleIds: number[];
  [key: string]: any;
  lastLogin: string;
  schoolIds: number[] | null | undefined;
}

export type RequestMetadata = {
  ip: string;
  userAgent: string;
};

export type CommonCreateDto = {
  name: string;
  description?: string | null;
  status: STATUS;
  createdBy: Id;
};

export type CommonUpdateDto = {
  id: Id;
  name?: string;
  description?: string | null;
  status: STATUS;
  updatedBy: Id;
};
export enum STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}

export enum FREQUENCY_TYPE {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  FORTNIGHTLY = "FORTNIGHTLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  YEARLY = "YEARLY",
}

export enum GOAL_TYPE {
  EMERGENCY_FUND = "EMERGENCY_FUND",
  LUMPY_EXPENSE = "LUMPY_EXPENSE",
  THREE_MONTH_COVERAGE = "THREE_MONTH_COVERAGE",
}

export enum TRANSACTION_TYPE {
  WITHDRAWAL = "WITHDRAWAL",
  CONTRIBUTION = "CONTRIBUTION",
  INSTALLMENT =  "INSTALLMENT",
}

export enum ALLOCATION_TYPE {
  SAVING = "SAVING",
  EXPENSE = "EXPENSE",
}

export enum SOURCE_TYPE {
  SAVING = "SAVING",
  INCOME = "INCOME"
}

export enum PROGRESS_TYPE {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum GOAL_STATUS {
  INACTIVE = "INACTIVE",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum RECOVERY_CODE_STATUS {
  AVAILABLE = "AVAILABLE",
  CONSUMED = "CONSUMED",
}

export enum CONTRIBUTION_TYPE {
  SALARY_SACRIFICE = "SALARY_SACRIFICE",
  AFTER_TAX_CONTRIBUTION = "AFTER_TAX_CONTRIBUTION",
  EMPLOYER_CONTRIBUTION = "EMPLOYER_CONTRIBUTION",
}

export enum SUPER_FUND_STATUS {
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}

export enum FORM_CODES {
  ONBOARDING_FORM = "ONBOARDING_FORM",
  INVESTMENT_FORM = "INVESTMENT_FORM",
}

export interface MessageResponse {
  message: string | null;
  data?: any;
}

export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
}

export enum PAYOFF_STRATEGY {
  SNOWBALL = "SNOWBALL",
  AVALANCHE = "AVALANCHE",
}

export enum DEBT_STATUS {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum PAYMENT_STATUS {
  DUE = "DUE",
  PAID = "PAID",
}

export enum PaymentStatus {
  SUCCEEDED = "succeeded",
  PENDING = "pending",
  FAILED = "failed",
  CANCELED = "canceled",
  REQUIRES_ACTION = "requires_action",
  REQUIRES_PAYMENT_METHOD = "requires_payment_method"
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
  namespace Express {
    interface Request {
      currentUser?: CurrentUser;
    }
  }
}
