// API endpoints go here

import { HttpMethods } from "@mono/utils";
import { getToken } from "./redux/reducers/auth";
import { config } from "./config";

const LOGIN = '/api/login';
const PING = '/api/ping';
const SIGNUP = '/api/signup';
const FORGOT_PASSWORD = '/api/forgot-password';
export const RESET_PASSWORD = '/api/reset-password';

//Profile Management API
export const UPDATE_PROFILE = '/api/user/profile';
export const GET_PROFILE = '/api/user/profile';
export const UPLOAD_IMAGE = '/api/user/profile/upload';
export const REMOVE_IMAGE = '/api/user/profile/remove';
export const CHANGE_PASSWORD = '/api/change-password';
export const SEND_EMAIL_LINK = '/api/send';
export const VERIFY_EMAIL = '/api/verify-email';

//MFA
export const TWO_FACTOR_AUTHENTICATION = "/api/verify-token";
export const TWO_FA_AUTHENTICATION_METHOD = "/api/two-factor-authentication-methods";
export const USER_TWO_FA_AUTENTICATION = "/api/user/two-factor-authentication";
export const VERIFY_USER_TWO_FA_AUTHENTICATION = "/api/user/two-factor-authentication/verify";


// Learn Resources API
export const GET_STAGE_PROGRESS = '/api/user/stage/progress';

//Dashbaord API
export const BUDGETS_MONTHLY_INSIGHTS = '/api/user/dashboard/budget-plan/monthly-insights';
export const BUDGETS_YEARLY_INSIGHTS = '/api/user/dashboard/budget-plan/spending-overview?year=:yearDate';
export const SAFETY_NET_INSIGHTS = '/api/user/dashboard/safety-net/insights';
export const DEBT_INSIGHTS = '/api/user/dashboard/debt/insights';
export const SAVINGS_INSIGHTS = '/api/user/dashboard/savings-plan/insights';
export const OVERVIEW_INSIGHTS = '/api/user/dashboard/budget-plan-overview';
export const USER_EXPENSE = '/api/user/user-expense';
export const GET_EXPENSE_ALLOCATIONS = '/api/user/user-expense/allocations';
export const ALLOCATE_FUNDS = '/api/user/allocate-funds';
export const AVAILABLE_SURPLUS_AMOUNT = '/api/user/income-savings';


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
  password: string;
  dateOfBirth?: string;
  termAccepted?: boolean;
  privacyPolicyAccepted?: boolean;
}): Promise<string> => {
  return apiCall(SIGNUP, HttpMethods.POST, formData);
};

export const forgotPassword = (formData: {
  email: string;
}): Promise<string> => apiCall(FORGOT_PASSWORD, HttpMethods.POST, formData);

export const twoFactorAuthentication = (formData: any): Promise<string> => apiCall(TWO_FACTOR_AUTHENTICATION, HttpMethods.POST, formData);