import { HttpMethods } from '@mono/utils';
import { config } from './config';
import { getToken } from './redux/reducers/auth';


const PING = '/api/ping';
const LOGIN = '/api/admin-login';
const SIGNUP = '/api/signup';
export const FORGOT_PASSWORD = '/api/change-password';
export const RESET_PASSWORD = '/api/reset-password';


//Profile Section

export const UPDATE_PROFILE = '/api/user/profile';
export const GET_PROFILE = '/api/user/profile';
export const UPLOAD_IMAGE = '/api/user/profile/upload';
export const REMOVE_IMAGE = '/api/user/profile/remove';
export const CHANGE_PASSWORD = '/api/change-password';


//MFA

export const TWO_FACTOR_AUTHENTICATION = "/api/verify-token";
export const TWO_FA_AUTHENTICATION_METHOD = "/api/two-factor-authentication-methods";
export const USER_TWO_FA_AUTENTICATION = "/api/user/two-factor-authentication";
export const VERIFY_USER_TWO_FA_AUTHENTICATION = "/api/user/two-factor-authentication/verify";

//Learn Resource

export const GET_RESOURCE_LIST = '/api/learn-resources/filter'
export const CREATE_RESOURCE = '/api/learn-resource'
export const UPLOAD_RESOURCE_THUMBNAIL = '/api/learn-resource/:id/upload'
export const UPDATE_RESOURCE = '/api/learn-resource/:id'
export const DELETE_RESOURCE = '/api/learn-resource/:id'
export const GET_RESOURCE_BY_ID = '/api/learn-resource/:id'
export const REMOVE_RESOURCE_THUMBNAIL = '/api/learn-resource/:id/remove'

export const GET_RESOURCE_CATEGORY_LIST = '/api/learn-resource/categories/filter'
export const GET_TYPE_LIST = '/api/learn-resource/types/filter'
export const CREATE_TYPE ='/api/learn-resource/type'
export const UPDATE_TYPE = '/api/learn-resource/type/:id'
export const DELETE_TYPE = '/api/learn-resource/type/:id'
export const GET_Type_BY_ID  = '/api/learn-resource/type/:id'

export const GET_TAGS_LIST = '/api/learn-resource/tags/filter'
export const CREATE_TAGS ='/api/learn-resource/tag'
export const UPDATE_TAGS = '/api/learn-resource/tag/:id'
export const DELETE_TAGS = '/api/learn-resource/tag/:id'
export const GET_Tags_BY_ID = '/api/learn-resource/tag/:id'


//Analytics
export const GET_ANALYTICS_SUMMARY = '/api/analytic/summary'
export const GET_RECENT_ACTIVITIES = '/api/analytic/recent-activities/filter'

//Users/Customers
export const GET_CUSTOMERS_LIST = '/api/customer/filter'
export const GET_CUSTOMER_DETAILS = '/api/customer/:id'
export const UPDATE_CUSTOMER_STATUS = '/api/customer/:id'
export const GET_CUSTOMER_PAYMENTS = '/api/customer/:id/payments/filter'
export const GET_TRANSACTION_HISTORY = '/api/user/subscription/payments/filter';
export const DOWNLOAD_INVOICE = '/api/user/subscription/invoice/:id/download';

//Partner

export const GET_PARTNER_LIST = '/api/partners/filter'
export const CREATE_PARTNER = '/api/partner'
export const UPLOAD_PARTNER_THUMBNAIL = '/api/partner/:id/upload'
export const UPDATE_PARTNER = '/api/partner/:id'
export const DELETE_PARTNER = '/api/partner/:id'
export const GET_PARTNER_BY_ID = '/api/partner/:id'
export const REMOVE_PARTNER_THUMBNAIL = '/api/partner/:id/remove'

export const GET_PARTNER_CATEGORY_LIST = '/api/partner/categories/filter'
export const CREATE_CATEGORY = '/api/partner/category'
export const UPDATE_CATEGORY = '/api/partner/category/:id'
export const DELETE_CATEGORY = '/api/partner/category/:id'
export const GET_CATEGORY_BY_ID = '//api/partner/catagory/:id'









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
}): Promise<string> => apiCall(SIGNUP, HttpMethods.POST, formData);

export const forgotPassword = (formData: {
  email: string;
}): Promise<string> => apiCall(FORGOT_PASSWORD, HttpMethods.POST, formData);

export const twoFactorAuthentication = (formData: any): Promise<string> => apiCall(TWO_FACTOR_AUTHENTICATION, HttpMethods.POST, formData);