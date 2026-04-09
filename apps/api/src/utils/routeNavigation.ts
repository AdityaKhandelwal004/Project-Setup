const API_ROOT = '/api';
const USER_ROOT = `${API_ROOT}/user`;
const ROLES = `${API_ROOT}/roles`;
const COUNTRIES = `${API_ROOT}/countries`;
const USER_FORM = `${USER_ROOT}/user-form`;
const PARTNER_ROOT = `${API_ROOT}/partner`;
const PARTNER_CATEGORY_ROOT = `${PARTNER_ROOT}/category`;
const LEARN_RESOURCE_ROOT = `${API_ROOT}/learn-resource`;
const LEARN_RESOURCE_TYPE_ROOT = `${LEARN_RESOURCE_ROOT}/type`;
const LEARN_RESOURCE_CATEGORY_ROOT = `${LEARN_RESOURCE_ROOT}/category`;
const LEARN_RESOURCE_TAG_ROOT = `${LEARN_RESOURCE_ROOT}/tag`;
const INCOME = `${USER_ROOT}/income`;
const SAVING = `${USER_ROOT}/saving`;
const BUDGET_PLAN = `${USER_ROOT}/budget-plan`;
const ALLOCATE_BUDGET = `${USER_ROOT}/allocate-budget`;
const EXPENSE_MANAGEMENT = `${USER_ROOT}/expense`;
const SAFETY_NET_MANAGEMENT = `${USER_ROOT}/safety-net`;
const STEPS_AND_STAGES_MANAGEMENT = `${USER_ROOT}/stage`;
const INVESTMENT_MANAGEMENT = `${USER_ROOT}/investment`;
const SUPERANNUATION = `${API_ROOT}/superannuation`;
const SUPERFUND = `${API_ROOT}/super-fund`;
const SUPERHEALTH = `${API_ROOT}/super-health`;
const SAVINGS_PLAN_MANAGEMENT = `${USER_ROOT}/goal`;
const DEBT_MANAGEMENT = `${USER_ROOT}/debt`;
const DEBT_ACCELERATOR_MANAGEMENT = `${USER_ROOT}/debt-accelerator`;
const DEBT_PAYMENT_MANAGEMENT = `${USER_ROOT}/debt-payment`;
const DIGITAL_VAULT = `${USER_ROOT}/vault`;
const ASSET_ROOT = `${API_ROOT}/asset`;
const ESTATE_PLANNING_ROOT = `${USER_ROOT}/estate-planning`;
const USER_SUBSCRIPTION = `${USER_ROOT}/subscription`;
const INSURANCE_POLICY_ROOT = `${USER_ROOT}/insurance-policy`;
const CHALLENGE_ROOT = `${USER_ROOT}/challenge`;
const BADGE_ROOT = `${USER_ROOT}/badge`;
const ANALYTICS_ROOT = `${API_ROOT}/analytic`;
const CUSTOMER_MANAGEMENT_ROOT = `${API_ROOT}/customer`;
const DASHBOARD_MANAGEMENT = `${USER_ROOT}/dashboard`;
const USER_EXPENSE_MANAGEMENT = `${USER_ROOT}/user-expense`;
const USER_FUND_ALLOCATION_MANAGEMENT = `${USER_ROOT}/allocate-funds`;

export default Object.freeze({
  ping: `${API_ROOT}/ping`,
  healthCheck: `${API_ROOT}/health-check`,
  security: {
    SIGN_UP: `${API_ROOT}/signup`,
    LOGIN: `${API_ROOT}/login`,
    APP_LOGIN: `${API_ROOT}/app-login`,
    APP_SIGNUP: `${API_ROOT}/app-signup`,
    ADMIN_LOGIN: `${API_ROOT}/admin-login`,
    VERIFY_TOKEN: `${API_ROOT}/verify-token`,
    APP_VERIFY_TOKEN: `${API_ROOT}/app-verify-token`,
    VERIFY_EMAIL: `${API_ROOT}/verify-email`,
    FORGOT_PASSWORD: `${API_ROOT}/forgot-password`,
    RESET_PASSWORD: `${API_ROOT}/reset-password`,
    CHANGE_PASSWORD: `${API_ROOT}/change-password`,
  },

  general: {
    GET_ROLES: `${ROLES}/filter`,
    GET_COUNTRIES: `${COUNTRIES}/filter`,
  },

  twoFa: {
    GET_TWO_FA_METHODS: `${API_ROOT}/two-factor-authentication-methods`,
    TWO_FA: `${API_ROOT}/user/two-factor-authentication`,
    MODIFY_TWO_FA: `${API_ROOT}/user/two-factor-authentication`,
    VERIFY_TWO_FA: `${API_ROOT}/user/two-factor-authentication/verify`,
    USER_TWO_FA_METHODS: `${API_ROOT}/user/two-factor-authentication`,
  },

  profile: {
    GET_PROFILE: `${USER_ROOT}/profile`,
    UPDATE_PROFILE: `${USER_ROOT}/profile`,
    UPLOAD_PROFILE_PICTURE: `${USER_ROOT}/profile/upload`,
    DELETE_PROFILE_PICTURE: `${USER_ROOT}/profile/remove`,
    GET_USER_RIGHTS: `${USER_ROOT}/rights`,
    CHANGE_PASSWORD: `${API_ROOT}/change-password`,
    SEND_EMAIL_VERIFICATION_LINK: `${API_ROOT}/send`,
    REQUEST_ACCOUNT_DELETION: `${API_ROOT}/request-account-deletion`,
  },

  forms: {
    GET_USER_FORMS: `${USER_FORM}/:code`,
    FETCH_FEEDBACK_FORM: `${API_ROOT}/feedback-form`,
    START_FORM: `${USER_FORM}/start`,
    SAVE_RESPONSE: `${USER_FORM}/save-response`,
    SUBMIT_STEP: `${USER_FORM}/submit-step`,
    SUBMIT_USER_FORM: `${USER_FORM}/submit`,
  },

  test: {
    TEST_ACTION: `${API_ROOT}/test/`,
  },

  partners: {
    ROOT: `${PARTNER_ROOT}`,
    UPLOAD_PARTNER_THUMBNAIL: `${PARTNER_ROOT}/:id/upload`,
    REMOVE_PARTNER_THUMBNAIL: `${PARTNER_ROOT}/:id/remove`,
    PARTNER_BY_ID: `${PARTNER_ROOT}/:id`,
    PARTNERS_LIST: `${API_ROOT}/partners/filter`,

    // Categories
    CATEGORY_ROOT: `${PARTNER_CATEGORY_ROOT}`,
    CATEGORY_BY_ID: `${PARTNER_CATEGORY_ROOT}/:id`,
    CATEGORIES_LIST: `${PARTNER_ROOT}/categories/filter`,
  },

  learnResources: {
    // Resources
    ROOT: `${LEARN_RESOURCE_ROOT}`,
    UPLOAD_LEARN_RESOURCE_THUMBNAIL: `${LEARN_RESOURCE_ROOT}/:id/upload`,
    REMOVE_LEARN_RESOURCE_THUMBNAIL: `${LEARN_RESOURCE_ROOT}/:id/remove`,
    LEARN_RESOURCE_BY_ID: `${LEARN_RESOURCE_ROOT}/:id`,
    LEARN_RESOURCES_LIST: `${API_ROOT}/learn-resources/filter`,

    // Types
    TYPE_ROOT: `${LEARN_RESOURCE_TYPE_ROOT}`,
    TYPE_BY_ID: `${LEARN_RESOURCE_TYPE_ROOT}/:id`,
    TYPES_LIST: `${LEARN_RESOURCE_ROOT}/types/filter`,

    // Tags
    TAG_ROOT: `${LEARN_RESOURCE_TAG_ROOT}`,
    TAG_BY_ID: `${LEARN_RESOURCE_TAG_ROOT}/:id`,
    TAGS_LIST: `${LEARN_RESOURCE_ROOT}/tags/filter`,

    // Categories
    CATEGORY_ROOT: `${LEARN_RESOURCE_CATEGORY_ROOT}`,
    CATEGORY_BY_ID: `${LEARN_RESOURCE_CATEGORY_ROOT}/:id`,
    CATEGORIES_LIST: `${LEARN_RESOURCE_ROOT}/categories/filter`,
  },
  income: {
    ADD_INCOME: `${INCOME}`,
    GET_USER_INCOMES: `${USER_ROOT}/incomes`,
    INCOME_BY_ID: `${INCOME}/:id`,
    GET_FREQUENCY_TYPES: `${API_ROOT}/frequency-types`,
    INCOME_SOURCES: `${API_ROOT}/income-sources`,
  },

  saving: {
    SAVING: `${SAVING}`,
    GET_ALL_SAVINGS_LEDGERS: `${USER_ROOT}/saving-ledgers`,
  },

  budgetPlan: {
    BUDGET_PLAN: `${BUDGET_PLAN}`,
    SUBMIT_USER_BUDGET_PLAN: `${BUDGET_PLAN}/submit`,
    RECALCULATE_BUDGET_PLAN: `${BUDGET_PLAN}/recalculate`,
    IDEAL_BUDGET_PLAN: `${API_ROOT}/budget-plan`,
  },

  allocateBudget: {
    ALLOCATE_BUDGET: `${ALLOCATE_BUDGET}`,
    ALLOCATED_BUDGET_BY_ID: `${ALLOCATE_BUDGET}/:id`,
    GET_FILTERED_BUDGET_ALLOCATIONS: `${ALLOCATE_BUDGET}/filter`,
    AVAILABLE_INCOME_SAVINGS: `${USER_ROOT}/income-savings`,
    AVAILABLE_INVESTMENT_SAVINGS: `${USER_ROOT}/investment-savings`,
  },

  expenseManagement: {
    ADD_EXPENSE: `${EXPENSE_MANAGEMENT}`,
    EXPENSE_BY_ID: `${EXPENSE_MANAGEMENT}/:id`,
    GET_FILTERED_EXPENSES: `${EXPENSE_MANAGEMENT}/filter`,
  },

  safetyNet: {
    CREATE_SAFETY_NET: `${SAFETY_NET_MANAGEMENT}`,
    SAFETY_NET_BY_ID: `${SAFETY_NET_MANAGEMENT}/:id`,
    GET_USER_SAFETY_NETS: `${SAFETY_NET_MANAGEMENT}/list`,
    WITHDRAW_FUNDS: `${SAFETY_NET_MANAGEMENT}/withdraw`,
    CONTRIBUTE_FUNDS: `${SAFETY_NET_MANAGEMENT}/contribute`,
  },

  stagesAndSteps: {
    STAGE_BY_ID: `${STEPS_AND_STAGES_MANAGEMENT}/:id`,
    CLONE_USER_STAGE: `${STEPS_AND_STAGES_MANAGEMENT}`,
    GET_ALL_STAGES: `${STEPS_AND_STAGES_MANAGEMENT}/progress`,
    UPDATE_STAGE_STATUS: `${STEPS_AND_STAGES_MANAGEMENT}/:id/update-status`,
    STEP_BY_ID: `${USER_ROOT}/step/:id`,
    UPDATE_STEP_STATUS: `${USER_ROOT}/step/:id/update-status`,
  },

  investmentManagement: {
    ADD_INVESTMENT: `${INVESTMENT_MANAGEMENT}`,
    GET_INVESTMENTS: `${USER_ROOT}/investments`,
    GET_INVESTMENTS_TYPES: `${API_ROOT}/investment-types`,
    ALLOCATE_FUNDS_TO_INVESTMENT: `${INVESTMENT_MANAGEMENT}/:id/allocate-funds`,
    INVESTMENT_BY_ID: `${INVESTMENT_MANAGEMENT}/:id`,
  },

  superAnnuationManagement: {
    CREATE_RETIREMENT_GOAL: `${SUPERANNUATION}`,
    FETCH_USER_RETIREMENT_GOAL: `${SUPERANNUATION}`,
    RETIREMENT_GOAL_BY_ID: `${SUPERANNUATION}/:id`,
    ADD_SUPER_FUND: `${SUPERFUND}`,
    ALLOCATE_FUNDS_TO_SUPER_FUND: `${SUPERFUND}/:id/allocate-funds`,
    SUPER_FUND_BY_ID: `${SUPERFUND}/:id`,
    GET_SUPER_FUNDS: `${USER_ROOT}/super-funds`,
    FETCH_SUPER_HEALTH_DATA: `${SUPERHEALTH}`,
    CREATE_SUPER_HEALTH: `${SUPERHEALTH}`,
    PATCH_SUPER_HEALTH_CHECKPOINT: `${SUPERHEALTH}/checkpoint/:id`,
  },

  savingsPlanManagement: {
    CREATE_GOAL: `${SAVINGS_PLAN_MANAGEMENT}`,
    GET_USER_GOALS: `${USER_ROOT}/goals`,
    GOAL_BY_ID: `${SAVINGS_PLAN_MANAGEMENT}/:id`,
    ALLOCATE_FUNDS: `${SAVINGS_PLAN_MANAGEMENT}/:id/allocate-funds`,
    UPLOAD_GOAL_IMAGES: `${SAVINGS_PLAN_MANAGEMENT}/:id/upload`,
    REMOVE_GOAL_IMAGE: `${SAVINGS_PLAN_MANAGEMENT}/:id/remove`,
  },

  debt: {
    ADD_DEBT: `${DEBT_MANAGEMENT}`,
    DEBT_BY_ID: `${DEBT_MANAGEMENT}/:id`,
    GET_ALL_DEBTS: `${USER_ROOT}/debts`,

    ADD_DEBT_PAYMENT: `${DEBT_PAYMENT_MANAGEMENT}`,
    DEBT_PAYMENT_BY_ID: `${DEBT_PAYMENT_MANAGEMENT}/:id`,
    GET_ALL_DEBT_PAYMENTS: `${USER_ROOT}/debt-payments`,

    ADD_DEBT_ACCELERATOR: `${DEBT_ACCELERATOR_MANAGEMENT}`,
    PATCH_DEBT_ACCELERATOR: `${DEBT_ACCELERATOR_MANAGEMENT}`,
  },

  digitalVault: {
    // Folders
    GET_FILTERED_VAULT_FOLDERS: `${DIGITAL_VAULT}/folders/filter`,
    GET_VAULT_FOLDER_BY_ID: `${DIGITAL_VAULT}/folders/:id`,
    CREATE_VAULT_FOLDER: `${DIGITAL_VAULT}/folders`,
    UPDATE_VAULT_FOLDER: `${DIGITAL_VAULT}/folders/:id`,
    DELETE_VAULT_FOLDER: `${DIGITAL_VAULT}/folders/:id`,

    // Categories
    GET_FILTERED_VAULT_CATEGORIES: `${DIGITAL_VAULT}/categories/filter`,
    GET_VAULT_CATEGORY_BY_ID: `${DIGITAL_VAULT}/categories/:id`,
    CREATE_VAULT_CATEGORY: `${DIGITAL_VAULT}/categories`,
    UPDATE_VAULT_CATEGORY: `${DIGITAL_VAULT}/categories/:id`,
    DELETE_VAULT_CATEGORY: `${DIGITAL_VAULT}/categories/:id`,

    // Audit Logs
    GET_FILTERED_VAULT_AUDIT_LOGS: `${DIGITAL_VAULT}/audit-logs/filter`,

    // Tags
    GET_FILTERED_VAULT_TAGS: `${DIGITAL_VAULT}/tags/filter`,
    GET_VAULT_TAG_BY_ID: `${DIGITAL_VAULT}/tags/:id`,
    CREATE_VAULT_TAG: `${DIGITAL_VAULT}/tags`,
    UPDATE_VAULT_TAG: `${DIGITAL_VAULT}/tags/:id`,
    DELETE_VAULT_TAG: `${DIGITAL_VAULT}/tags/:id`,

    //document
    UPLOAD_VAULT_DOCUMENT: `${DIGITAL_VAULT}/documents/upload`,
    GET_FILTERED_VAULT_DOCUMENTS: `${DIGITAL_VAULT}/documents/filter`,
    GET_VAULT_DOCUMENT_BY_ID: `${DIGITAL_VAULT}/documents/:id`,
  },

  assets: {
    ROOT: `${ASSET_ROOT}`,
    ASSET_BY_ID: `${ASSET_ROOT}/:id`,
    ASSETS_LIST: `${API_ROOT}/assets/filter`,
    UPLOAD_ASSET_IMAGE: `${ASSET_ROOT}/:id/upload`,
    REMOVE_ASSET_IMAGE: `${ASSET_ROOT}/:id/remove`,

    // Types
    TYPES_LIST: `${ASSET_ROOT}/types/filter`,
    OWNED_BY_LIST: `${API_ROOT}/owned-by`,
  },

  estatePlanning: {
    ROOT: `${ESTATE_PLANNING_ROOT}`,
    ESTATE_PLANNING_CHECKPOINT_BY_ID: `${ESTATE_PLANNING_ROOT}/checkpoint/:id`,
    UPLOAD_ESTATE_PLANNING_CHECKPOINT_DOCUMENT: `${ESTATE_PLANNING_ROOT}/checkpoint/:id/upload`,
    REMOVE_ESTATE_PLANNING_CHECKPOINT_DOCUMENT: `${ESTATE_PLANNING_ROOT}/checkpoint/:id/remove/:vaultDocumentId`,

    // Template
    ESTATE_PLANNING_TEMPLATE_BY_ID: `${ESTATE_PLANNING_ROOT}/template/:id`,
  },

  subscription: {
    PLANS: `${API_ROOT}/subscription-plans`,
    PURCHASE: `${USER_SUBSCRIPTION}/purchase`,
    UPDATE_CARD: `${USER_SUBSCRIPTION}/update-card`,
    CANCEL: `${USER_SUBSCRIPTION}/cancel`,
    RENEW: `${USER_SUBSCRIPTION}/renew`,
    EXTEND_TRIAL_PERIOD: `${API_ROOT}/subscription/extend-trial`,
    EXTEND_SUBSCRIPTION_PERIOD: `${API_ROOT}/subscription/extend-subscription`,
    MANUAL_PAYMENT: `${USER_SUBSCRIPTION}/manual-payment`,
    STORE_PAYMENT_METHOD: `${USER_SUBSCRIPTION}/payment-method`,
    GET_PAYMENT_METHOD: `${USER_SUBSCRIPTION}/payment-method`,
    SUBSCRIPTION_DETAILS: `${USER_SUBSCRIPTION}`,
    FETCH_FILTERED_USER_PAYMENTS: `${USER_SUBSCRIPTION}/payments/filter`,
    FETCH_SUBSCRIPTION_BANNER: `${USER_SUBSCRIPTION}/banner`,
    DOWNLOAD_INVOICE: `${USER_SUBSCRIPTION}/invoice/:id/download`,
    REGENERATE_INVOICE: `${USER_SUBSCRIPTION}/invoice/:id/regenerate`,
    CRON_PROCESS_EXPIRING: `${USER_SUBSCRIPTION}/process-expiring`,
    CRON_PROCESS_ALERTS: `${USER_SUBSCRIPTION}/process-alerts`,
  },

  insurancePolicy: {
    ROOT: `${INSURANCE_POLICY_ROOT}`,
    INSURANCE_POLICY_BY_ID: `${INSURANCE_POLICY_ROOT}/:id`,
    INSURANCE_POLICIES_LIST: `${USER_ROOT}/insurance-policies/filter`,
    INSURANCE_POLICIES_SUMMARY: `${USER_ROOT}/insurance-policies/summary`,
    REMOVE_INSURANCE_POLICY_DOCUMENT: `${INSURANCE_POLICY_ROOT}/:id/remove/:vaultDocumentId`,

    TYPES_LIST: `${API_ROOT}/insurance-policy/types/filter`,
  },

  challenges: {
    ROOT: `${CHALLENGE_ROOT}`,
    CHALLENGES_BY_TEMPLATE_CODE: `${USER_ROOT}/challenges`,
    COMPLETE_CHALLENGE: `${CHALLENGE_ROOT}/:id/complete`,

    // System Challenges
    SYSTEM_CHALLENGE_TEMPLATES_LIST: `${API_ROOT}/challenge/templates`,
  },

  rewards: {
    BADGE_ROOT: `${BADGE_ROOT}`,
    BADGE_LIST: `${USER_ROOT}/badges`,

    // System Badges
    SYSTEM_BADGES_LIST: `${API_ROOT}/badges/filter`,
  },

  customerManagement: {
    CUSTOMERS_LIST: `${CUSTOMER_MANAGEMENT_ROOT}/filter`,
    GET_FILTERED_CUSTOMER_PAYMENTS: `${CUSTOMER_MANAGEMENT_ROOT}/:id/payments/filter`,
    CUSTOMER_BY_ID: `${CUSTOMER_MANAGEMENT_ROOT}/:id`,
  },

  analytics: {
    SUMMARY: `${ANALYTICS_ROOT}/summary`,
    RECENT_ACTIVITIES_LIST: `${ANALYTICS_ROOT}/recent-activities/filter`,
  },

  dashboard: {
    BUDGET_PLAN_MONTHLY_INSIGHTS: `${DASHBOARD_MANAGEMENT}/budget-plan/monthly-insights`,
    BUDGET_PLAN_SPENDING_OVERVIEW: `${DASHBOARD_MANAGEMENT}/budget-plan/spending-overview`,
    SAFETY_NET_INSIGHTS: `${DASHBOARD_MANAGEMENT}/safety-net/insights`,
    DEBT_INSIGHTS: `${DASHBOARD_MANAGEMENT}/debt/insights`,
    SAVINGS_PLAN_INSIGHTS: `${DASHBOARD_MANAGEMENT}/savings-plan/insights`,
    SUPER_INSIGHTS: `${DASHBOARD_MANAGEMENT}/super/insights`,
    INVESTMENT_INSIGHTS: `${DASHBOARD_MANAGEMENT}/investment/insights`,
    INSURANCE_INSIGHTS: `${DASHBOARD_MANAGEMENT}/insurance/insights`,
    ASSETS_INSIGHTS: `${DASHBOARD_MANAGEMENT}/assets/insights`,
    ESTATE_PLANNING_INSIGHTS: `${DASHBOARD_MANAGEMENT}/estate-planning/insights`,
    BUDGET_PLAN_OVERVIEW: `${DASHBOARD_MANAGEMENT}/budget-plan-overview`,
    SAFETY_NET_OVERVIEW: `${DASHBOARD_MANAGEMENT}/safety-net-overview`,
  },

  userExpenses: {
    GET_USER_ALLOCATIONS: `${USER_EXPENSE_MANAGEMENT}/allocations`,
    GET_USER_EXPENSE: `${USER_EXPENSE_MANAGEMENT}`,
    CREATE_USER_EXPENSE: `${USER_EXPENSE_MANAGEMENT}`,
    ALLOCATE_USER_FUNDS: `${USER_FUND_ALLOCATION_MANAGEMENT}`,
    USER_EXPENSE_BY_ID: `${USER_EXPENSE_MANAGEMENT}/:id`,
  },
});
