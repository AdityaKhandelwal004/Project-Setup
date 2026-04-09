export const createResourceRoutes = (resource: string) => ({
  root: `/${resource}`,
  create: `/${resource}/create`,
  view: `/${resource}/view/:id`,
});

export const routes = {
  root: "/",
  content : {
    root : '/disclaimer',
    disclaimer : '/disclaimer',
    terms_and_conditions : '/terms-and-conditions',
    privacy_policy : '/privacy-policy'
  },
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/:token",
  logout: "/logout",
  twoFactorAuthentication: "/two-factor-authentication",
  verifyEmail: "/verify-email/:token",
  dashboard: createResourceRoutes("dashboard"),
  onboarding: "/onboarding",
  onboardingIntro: "/onboarding-intro",
  optimiseIntro: "/optimise-intro",
  welcomeOverview: "/welcome-overview",
  thankYouSetup: "/thank-you-setup",
  main: "/main",
  maximise: "/maximise",
  protect: "/protect",
  profile: "/profile",
  transactionHistory: "/profile/transaction-history",
  partners: "/partners",
  digitalVault: "/digital-vault",
  digitalVaultWithPath: "/digital-vault/:folderPath*",
  learn: "/learn/:tab",
  learnResources : "/learn/curated-resources",
  learnPillars : "/learn/financial-pillars",
  

  // Module-specific routes with dynamic parameters
  moduleRoute: "/:module/:subModule?",

  // Specific routes for direct access
  super: "/maximise/super",
  investing: "/maximise/investing",
  insurance: "/protect/insurance",
  assetProtection: "/protect/asset-protection",
  estatePlanning: "/protect/estate-planning",
  budget: "/optimise/budget",
  safetyNet: "/optimise/safety-net",
  debt: "/optimise/debt",
  savings: "/optimise/savings",

  //dashboard routes
  
  budgetDashboard: "/dashboard/optimise/budget",
  manageBudgetDashboard: "/dashboard/optimise/budget/manage",
  manageExpensesBudgetDashboard: "/dashboard/optimise/budget/manage-expenses",
  manageBudgetUpdatePlan: "/dashboard/optimise/budget/update-plan",
  manageBudgetIncome: "/dashboard/optimise/budget/manage-income",
  safetyNetDashboard: "/dashboard/optimise/safety-net",
  manageSafetyNet: "/dashboard/optimise/safety-net/manage",
  editSafetyNetFund: "/dashboard/optimise/safety-net/edit/:goalType",
  debtDashboard: "/dashboard/optimise/debt",
  manageDebt: "/dashboard/optimise/debt/manage",
  savingsDashboard: "/dashboard/optimise/savings",
  manageSavings: "/dashboard/optimise/savings/manage",
  updateSavingsAllocation: "/dashboard/optimise/savings/update-allocation/:goalId",
  insuranceDashboard: "/dashboard/protect/insurance",
  manageInsurance: "/dashboard/protect/insurance/manage",
  assetProtectionDashboard: "/dashboard/protect/asset-protection",
  manageAssetProtection: "/dashboard/protect/asset-protection/manage",
  estatePlanningDashboard: "/dashboard/protect/estate-planning",
  manageEstatePlanning: "/dashboard/protect/estate-planning/manage",
  superDashboard: "/dashboard/maximise/super",
  manageSuper: "/dashboard/maximise/super/manage",
  investingDashboard: "/dashboard/maximise/investing",
  manageInvesting: "/dashboard/maximise/investing/manage",
  overview: '/dashboard/overview',
  challenges: '/dashboard/challenges',
  resources: '/dashboard/resources',
};



export const mainModuleTabs = {
  optimize: 'optimize',
  maximise: 'maximise',
  protect: 'protect',
} as const;

export type MainModuleTab = typeof mainModuleTabs[keyof typeof mainModuleTabs];

export const optimiseSubTabs = {
  budget: 'budget',
  safetynet: 'safetynet',
  debt: 'debt',
  savings: 'savings',
} as const;

export type OptimiseSubTab = typeof optimiseSubTabs[keyof typeof optimiseSubTabs];

export default routes;
