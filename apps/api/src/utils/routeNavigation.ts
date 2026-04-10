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

});
