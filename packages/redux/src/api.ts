import { HttpMethods } from '@mono/utils';
import { getToken } from './reducers/auth.tsx';

// Default config - apps can override this
const config = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  APP_ENV: process.env.REACT_APP_ENV || 'local'
};

const PING = '/api/ping';
const LOGIN = '/api/login';
const SIGNUP = '/api/signup';
const FORGOT_PASSWORD = '/api/forgot-password';
const USER = '/api/user';
const USER_FORM = `${USER}/user-form`
export const START_ONBOARDING_FORM = `${USER_FORM}/start`;
export const ONBOARDING_FORM = `${USER_FORM}/onboarding`;
export const SAVE_ONBOARDING_RESPONSE = `${USER_FORM}/save-response`;
export const SUBMIT_ONBOARDING_STEP = `${USER_FORM}/submit-step`;
export const SUBMIT_ONBOARDING_FORM = `${USER_FORM}/submit`;
//Investment Form
export const START_INVESTMENT_FORM = `${USER_FORM}/start`;
export const INVESTMENT_FORM = `${USER_FORM}/investment`;
export const SAVE_INVESTMENT_RESPONSE = `${USER_FORM}/save-response`;
export const SUBMIT_INVESTMENT_STEP = `${USER_FORM}/submit-step`;
export const SUBMIT_INVESTMENT_FORM = `${USER_FORM}/submit`;
export const SUBMIT_USER_FORM = '/api/user/user-form/submit';
//Budget Module
export const GET_IDEAL_BUDGET_PLAN = '/api/budget-plan';
export const GET_USER_BUDGET_PLAN = `${USER}/budget-plan`;
export const GET_INCOMES = `${USER}/incomes`;
export const CREATE_INCOME = `${USER}/income`;
export const RECALCULATE_BUDGET_PLAN = `${USER}/budget-plan/recalculate`
export const DELETE_INCOME = `${CREATE_INCOME}/:id`;
export const CREATE_EXPENSE = `${USER}/expense`;
export const UPDATE_EXPENSE = `${CREATE_EXPENSE}/:id`;
export const DELETE_EXPENSE = `${CREATE_EXPENSE}/:id`;
export const GET_SAVING = `${USER}/saving`;
export const CREATE_SAVING = `${USER}/saving`;
export const UPDATE_SAVING = `${USER}/saving`;
export const ALLOCATE_BUDGET = `${USER}/allocate-budget`;
export const GET_FREQUENCY_TYPES = '/api/frequency-types';
export const GET_INCOME_SOURCES = '/api/income-sources';
export const SUBMIT_BUDGET = `${USER}/budget-plan/submit`;
//Safety Net Module
export const GET_SAFETY_NET_LIST = `${USER}/safety-net/list`;
export const GET_SAFETY_NET_BY_ID = `${USER}/safety-net/:id`;
export const CREATE_SAFETY_NET = `${USER}/safety-net`;
export const UPDATE_SAFETY_NET = `${USER}/safety-net/:id`;
export const CONTRIBUTE_SAFETY_NET = `${USER}/safety-net/contribute`;
export const WITHDRAW_SAFETY_NET = `${USER}/safety-net/withdraw`;
//Debt Module
export const CREATE_DEBT = `${USER}/debt`;
export const GET_DEBT_LIST = `${USER}/debts`;
export const UPDATE_DEBT = `${USER}/debt/:id`;
export const DELETE_DEBT = `${USER}/debt/:id`;
export const CREATE_DEBT_ACCELERATOR = `${USER}/debt-accelerator`;
//Savings Module
export const CREATE_GOAL = `${USER}/goal`;
export const GET_GOALS = `${USER}/goals`;
export const UPDATE_GOAL = `${USER}/goal/:id`;
export const DELETE_GOAL = `${USER}/goal/:id`;
export const UPLOAD_GOAL_IMAGE = `${USER}/goal/:id/upload`;
export const REMOVE_GOAL_IMAGE = `${USER}/goal/:id/remove`;
// export const ALLOCATE_GOAL_FUNDS = `${USER}/goal/:id/allocate-funds`;
export const ALLOCATE_GOAL_FUNDS = `${USER}/goal/:id`
//Stage Progress
export const GET_STAGE_PROGRESS = `${USER}/stage/progress`;
export const UPDATE_STEP_STATUS = `${USER}/step/:id/update-status`;
//Superannuation Module
export const GET_SUPERANNUATION = '/api/superannuation';
export const CREATE_SUPERANNUATION = '/api/superannuation';
export const UPDATE_SUPERANNUATION = '/api/superannuation/:id';
export const DELETE_SUPERANNUATION = '/api/superannuation/:id';

//Super Fund Module
export const GET_SUPER_FUNDS = '/api/user/super-funds';
export const CREATE_SUPER_FUND = '/api/super-fund';
export const UPDATE_SUPER_FUND = '/api/super-fund/:id';
export const DELETE_SUPER_FUND = '/api/super-fund/:id';
export const GET_SUPER_HEALTH = '/api/super-health';
export const POST_SUPER_HEALTH = '/api/super-health';
export const PATCH_SUPER_HEALTH_CHECKPOINT = '/api/super-health/checkpoint/:id';

//Investment Module
export const GET_INVESTMENTS = `${USER}/investments`;
export const CREATE_INVESTMENT = `${USER}/investment`;
export const UPDATE_INVESTMENT = `${USER}/investment/:id`;
export const DELETE_INVESTMENT = `${USER}/investment/:id`;
export const GET_INVESTMENT_TYPES = '/api/investment-types';

//Insurance Module
export const GET_INSURANCE_POLICIES = `${USER}/insurance-policies/filter`;
export const CREATE_INSURANCE_POLICY = `${USER}/insurance-policy`;
export const UPDATE_INSURANCE_POLICY = `${USER}/insurance-policy/:id`;
export const DELETE_INSURANCE_POLICY = `${USER}/insurance-policy/:id`;
export const GET_INSURANCE_POLICY_TYPES = '/api/insurance-policy/types/filter';
export const REMOVE_INSURANCE_DOCUMENT = `${USER}/insurance-policy/:id/remove/:vaultDocumentId`;

//Vault Module
export const CREATE_VAULT_FOLDER = `${USER}/vault/folders`;
export const UPDATE_VAULT_FOLDER = `${USER}/vault/folders/:id`;
export const DELETE_VAULT_FOLDER = `${USER}/vault/folders/:id`;
export const CREATE_VAULT_DOCUMENT = `${USER}/vault/documents/upload`;
export const GET_VAULT_DOCUMENT = `${USER}/vault/documents/:id`;
export const UPDATE_VAULT_DOCUMENT = `${USER}/vault/documents/:id`;
export const DELETE_VAULT_DOCUMENT = `${USER}/vault/documents/:id`;
//Asset Protection Module
export const GET_ASSET_TYPES = '/api/asset/types/filter';
export const GET_OWNED_BY_OPTIONS = '/api/owned-by';
export const CREATE_ASSET = '/api/asset';
export const GET_ASSET_LIST = '/api/assets/filter';
export const GET_ASSET = '/api/asset/:id';
export const UPDATE_ASSET = '/api/asset/:id';
export const DELETE_ASSET = '/api/asset/:id';
export const UPLOAD_ASSET_IMAGE = '/api/asset/:id/upload';
export const REMOVE_ASSET_IMAGE = '/api/asset/:id/remove';

//Estate Planning Module
export const GET_ESTATE_PLANNING = '/api/user/estate-planning';
export const GET_ESTATE_PLANNING_CHECKPOINT = '/api/user/estate-planning/checkpoint/:id';
export const UPDATE_ESTATE_PLANNING_CHECKPOINT = '/api/user/estate-planning/checkpoint/:id';
export const DELETE_ESTATE_PLANNING_VAULT_DOCUMENT = '/api/user/estate-planning/checkpoint/:id/remove/:vaultDocumentId';

export const apiCall = (
    endpoint: string,
    method = HttpMethods.GET,
    body?: any,
    isFormData?: boolean,
  ): Promise<any> => {
    const headers = new Headers({
      Accept: 'application/json',
    });
    if (!isFormData) {
      headers.append('Content-Type', 'application/json');
    }
    const token = getToken();

    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    let finalBody: string | null | undefined = body;

    if (body && !isFormData) {
      finalBody = JSON.stringify(body);
    }
    const url = `${config.apiHost}${endpoint}`;

    return new Promise<any>((resolve, reject) => {
      fetch(url, { body: finalBody, headers, method })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };


export const ping = (): Promise<string> => apiCall(PING);

export const login = (formData: any): Promise<string> => apiCall(LOGIN, HttpMethods.POST, formData);

export const signup = (formData: {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  password: string;
  termAccepted: boolean;
  privacyPolicyAccepted: boolean;
}): Promise<string> => apiCall(SIGNUP, HttpMethods.POST, formData);

export const forgotPassword = (formData: {
  email: string;
}): Promise<string> => apiCall(FORGOT_PASSWORD, HttpMethods.POST, formData);
