import { primitiveColors, brand } from "@mono/theme";
import { TabModule } from "./baseEntities";

const optimiseIcon = require('../../public/assets/images/optimiseIcon.png');
const protectIcon = require('../assets/protect.png');
const maximiseIcon = require('../assets/maximise.png');
const budget = require('../assets/budget.png');
const safetyNet = require('../assets/safetyNet.png');
const debt = require('../assets/debt.png');
const savings = require('../assets/savings.png');
const superIcon = require('../assets/super.png');
const investingIcon = require('../assets/investing.png');
const insuranceIcon = require('../assets/insurance.png');
const protectionIcon = require('../assets/protection.png');
const estateIcon = require('../assets/estate.png');



export const CUSTOMER_LIST_MOCK = [
  {
    name: "Brooklyn Simmons",
    email: "brooklyn.simmons@example.com",
    accountStatus: "ACTIVE",
    subscriptionPlan: "Monthly",
    registrationDate: "21 Sep 2025",
    lastLogin: "29 Sep 2025 04:04 PM",
  },
  {
    name: "Brooklyn Simmons",
    email: "brooklyn.simmons@example.com",
    accountStatus: "ACTIVE",
    subscriptionPlan: "Monthly",
    registrationDate: "21 Sep 2025",
    lastLogin: "29 Sep 2025 04:04 PM",
  },
  {
    name: "Brooklyn Simmons",
    email: "brooklyn.simmons@example.com",
    accountStatus: "ACTIVE",
    subscriptionPlan: "Monthly",
    registrationDate: "21 Sep 2025",
    lastLogin: "29 Sep 2025 04:04 PM",
  },
];

export const TRANSACTION_HISTORY_MOCK = [
  {
    date: "20/09/2025",
    description: "Monthly subscription - September 2025",
    id: "pi_1234567",
    method: "Visa....4242",
    amount: "$ 25.99",
    status: "ACTIVE",
  },
  {
    date: "20/09/2025",
    description: "Monthly subscription - September 2025",
    id: "pi_1234567",
    method: "Visa....4242",
    amount: "$ 25.99",
    status: "ACTIVE",
  },
  {
    date: "20/09/2025",
    description: "Monthly subscription - September 2025",
    id: "pi_1234567",
    method: "Visa....4242",
    amount: "$ 25.99",
    status: "ACTIVE",
  },
];

export const DEFAULT_METADATA = {
  order: null,
  direction: "asc" as const,
  page: 1,
  limit: 10,
  total: 3,
  filters: {},
};

export const DEFAULT_PAGINATION_CONFIG = {
  key: "staffList",
  name: "",
  api: "",
};



export const MODULE_ICONS = {
  budget,
  safety: safetyNet,
  debt,
  savings,
  super: superIcon,
  investing: investingIcon,
  insurance: insuranceIcon,
  protection: protectionIcon,
  estate: estateIcon,
};

export const MODULE_CONFIG = [
  {
    title: "Progress",
    icon: optimiseIcon,
    label: "Optimise",
    color: primitiveColors.orange500,
    bgColor: brand.progressBackground,
    percentage: 75,
    currentModule: TabModule.OPTIMISE,
    items: [
      { icon: MODULE_ICONS.budget, label: "Budget", completed: true },
      { icon: MODULE_ICONS.safety, label: "Safety Net", completed: true },
      { icon: MODULE_ICONS.debt, label: "Debt Free", completed: false },
      { icon: MODULE_ICONS.savings, label: "Savings", completed: false },
    ],
  },
  {
    icon: maximiseIcon,
    label: "Maximise",
    color: primitiveColors.purple500,
    bgColor: primitiveColors.purple100,
    percentage: 0,
    currentModule: TabModule.MAXIMISE,
    items: [
      { icon: MODULE_ICONS.super, label: "Super", completed: false },
      { icon: MODULE_ICONS.investing, label: "Investing", completed: false },
    ],
  },
  {
    icon: protectIcon,
    label: "Protect",
    color: primitiveColors.teal500,
    bgColor: primitiveColors.teal50,
    percentage: 0,
    currentModule: TabModule.PROTECT,
    items: [
      { icon: MODULE_ICONS.insurance, label: "Insurance", completed: false },
      { icon: MODULE_ICONS.protection, label: "Asset Protection", completed: false },
      { icon: MODULE_ICONS.estate, label: "Estate Planning", completed: false },
    ],
  },
];
