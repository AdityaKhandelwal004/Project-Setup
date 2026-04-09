/* eslint-disable no-unused-vars */
export const STATUS = Object.freeze({
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  DELETED: "DELETED",
});

export const RESULT = Object.freeze({
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
});

export const TASK_STATUS = Object.freeze({
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
});

export const ROLE = Object.freeze({
  SUPER_ADMIN: "SUPER_ADMIN",
  OBIE_USER: "OBIE_USER",
});

export const MAPPED_ROLE = Object.freeze({
  SUPER_ADMIN: 1,
  ADMIN: 2,
});

export const MESSAGE_TYPES = Object.freeze({
  EMAIL: "EMAIL",
});

export const ACTION_BY_TYPE = Object.freeze({
  SELF: "SELF",
  ADMIN: "ADMIN",
});

export const TOKEN_TYPE = Object.freeze({
  LOGIN: "LOGIN",
  ENABLE: "ENABLE_2FA",
  DISABLE: "DISABLE_2FA",
  MODIFY: "UPDATE_2FA_SETTINGS",
});

export const ACTION_TYPE = Object.freeze({
  LOGIN: "LOGIN",
  MODIFY: "MODIFY",
  ENABLE: "ENABLE",
  DISABLE: "DISABLE",
});

export const SUCCESS_ACTION_TYPE = Object.freeze({
  LOGIN: "LOGIN",
  ENABLE_2FA: "ENABLED",
  DISABLE_2FA: "DISABLED",
  UPDATE_2FA_SETTINGS: "UPDATED",
});

export const LOGIN_TYPE = Object.freeze({
  ACCESS_CREDENTIALS: "ACCESS_CREDENTIALS",
  ACCESS_CREDENTIALS_WITH_2FA: "ACCESS_CREDENTIALS_WITH_2FA",
});

export const LOGIN_TOKEN_TYPE = Object.freeze({
  OTP: "OTP",
  RECOVERY_CODE: "RECOVERY_CODE",
});

export const WEEK_DAYS = Object.freeze({
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
  SUNDAY: "SUNDAY",
});

export enum LIABILITY_TYPES {
  DEBT = "DEBT",
  FIXED_COST = "FIXED_COST",
}

export enum ESTATE_PLANNING_STATUS {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  NOT_APPLICABLE = "NOT_APPLICABLE",
}

export enum INSURANCE_STATUS {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
}

export enum CHALLENGES_STATUS {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  SKIPPED = "SKIPPED",
}

export enum SUBSCRIPTION_TYPES {
  TRIAL = "TRIAL",
  MONTHLY = "MONTHLY",
}

export const IMAGE_MIMES = [
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/bmp",
  "image/tiff",
  "image/webp",
  "image/avif",
  "image/jpg",
];

export const VIDEO_MIMES = [
  "video/mp4",
  "video/ogg",
  "video/webm",
  "video/x-msvideo",
  "video/quicktime",
  "video/x-flv",
  "video/x-ms-wmv",
  "application/x-mpegURL",
  "video/MP2T",
];

export const IMAGE_VIDEO_MIMES = [...IMAGE_MIMES, ...VIDEO_MIMES];

export const FILE_MIMES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ...IMAGE_MIMES,
  "text/plain",
  "text/csv",
  ...VIDEO_MIMES,
];

export const MAX_FILE_SIZE = 20 * 1024 * 1024;
export const MAX_NUM_FILES = 7;

export const FREQUENCY_TYPES = [
  {
    id: "DAILY",
    label: "Daily",
  },
  {
    id: "WEEKLY",
    label: "Weekly",
  },
  {
    id: "FORTNIGHTLY",
    label: "Fortnightly",
  },
  {
    id: "MONTHLY",
    label: "Monthly",
  },
  {
    id: "QUARTERLY",
    label: "Quarterly",
  },
  {
    id: "YEARLY",
    label: "Yearly",
  },
];

export const INCOME_SOURCES = [
  {
    id: "WAGES",
    label: "Wages",
  },
  {
    id: "SALARY",
    label: "Salary",
  },
  {
    id: "SIDE_HUSTLE",
    label: "Side Hustle",
  },
  {
    id: "SELF_EMPLOYED",
    label: "Self employed",
  },
  {
    id: "GOVT_ASSISTANCE",
    label: "Govt. Assistance",
  },
  {
    id: "BOARD",
    label: "Board",
  },
  {
    id: "RENT",
    label: "Rent",
  },
  {
    id: "PENSION",
    label: "Pension",
  },
  {
    id: "OTHER",
    label: "Other",
  },
];

export const STEP_BADGES_MAP = Object.freeze({
  BUDGET: ["BUDGET_NAILED"],
  SAFETY_NET: ["SAFETY_NET_SORTED"],
  DEBT: ["DEBT_FREE_PLAN_SET"],
  SAVINGS_GOALS: ["SAVINGS_GOAL_SET"],
  SUPER: ["SUPER_MAXIMISED"],
  INVESTING: ["AUTO_INVEST_SET"],
  INSURANCE: ["INSURANCE_REVIEWED"],
  ESTATE_PLANNING: ["WILL_INSTRUCTIONS_DONE"],
  ASSET_PROTECTION: ["ASSET_MANAGED"],
});

export const MASTER_BADGE = "MONEY_MASTERED";

export const OWEND_BY_LIST = [
  { label: "Sole Ownership", value: "SOLE_OWNERSHIP" },
  { label: "Joint Tenants", value: "JOINT_TENANTS" },
  { label: "Tenants in Common", value: "TENANTS_IN_COMMON" },
  { label: "Sole Trader", value: "SOLE_TRADER" },
  { label: "Company", value: "COMPANY" },
  { label: "Partnership", value: "PARTNERSHIP" },
  { label: "SMSF", value: "SMSF" },
  { label: "Discretionary Trust", value: "DISCRETIONARY_TRUST" },
  { label: "Family Trust", value: "FAMILY_TRUST" },
  { label: "Trading Trust", value: "TRADING_TRUST" },
  { label: "Unit Trust", value: "UNIT_TRUST" },
  { label: "Other", value: "OTHER" },
];

export const FORMS_DETAILS = {
  FEEDBACK_FORM: {
    title: "Feedback and Suggestions",
    link: "https://form.typeform.com/to/z6vUEXfW",
    code: "FEEDBACK_FORM",
  },
};
