import type { Dispatch } from 'redux';

import { login, signup, forgotPassword } from '@mono/redux-global/src/actions';

import { resolveLoginError, resolveSignupError, resolveForgotPasswordError } from '../utils/errorHandler';

export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
}

export interface SignupCredentials {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
}

export interface SignupResponse {
  readonly success: boolean;
  readonly token?: string;
  readonly user?: any;
  readonly message: string;
}

export interface ForgotPasswordCredentials {
  readonly email: string;
}

export interface ForgotPasswordResponse {
  readonly success: boolean;
  readonly message: string;
}

export interface AuthServiceError {
  readonly message: string;
  readonly code?: string;
  readonly status?: number;
  readonly errors?: Record<string, string>;
}

export interface AuthService {
  readonly login: (credentials: LoginCredentials) => Promise<void>;
  readonly signup: (credentials: SignupCredentials) => Promise<SignupResponse>;
  readonly forgotPassword: (credentials: ForgotPasswordCredentials) => Promise<ForgotPasswordResponse>;
}

/**
 * Authentication service that handles all auth-related API calls
 * This provides a clean interface between components and Redux actions
 *
 * @param dispatch - Redux dispatch function
 * @returns AuthService instance with login, forgotPassword, and signup methods
 */
export const createAuthService = (dispatch: Dispatch): AuthService => {
  return {
    /**
     * Login user with email and password
     * @param credentials - User login credentials
     * @returns Promise that resolves on success or rejects with user-friendly error
     */
    login: (credentials: LoginCredentials): Promise<void> =>
      new Promise<void>((resolve, reject) => {
        try {
          dispatch(
            login(credentials, resolve, (error: unknown) => {
              const userFriendlyError = resolveLoginError(error);
              reject(new Error(userFriendlyError));
            })
          );
        } catch (error) {
          const userFriendlyError = resolveLoginError(error);
          reject(new Error(userFriendlyError));
        }
      }),

    /**
     * Register a new user account
     * @param credentials - User signup credentials
     * @returns Promise that resolves with signup response or rejects with user-friendly error
     */
    signup: (credentials: SignupCredentials): Promise<SignupResponse> =>
      new Promise<SignupResponse>((resolve, reject) => {
        try {
          dispatch(
            signup(
              credentials,
              (response: any) => {
                // Handle successful signup response
                resolve({
                  success: true,
                  token: response?.token,
                  user: response?.user,
                  message: response?.message || 'Account created successfully!'
                });
              },
              (error: unknown) => {
                const userFriendlyError = resolveSignupError(error);
                reject(new Error(userFriendlyError));
              }
            )
          );
        } catch (error) {
          const userFriendlyError = resolveSignupError(error);
          reject(new Error(userFriendlyError));
        }
      }),

    /**
     * Send forgot password reset link
     * @param credentials - User email for password reset
     * @returns Promise that resolves with success response or rejects with user-friendly error
     */
    forgotPassword: (credentials: ForgotPasswordCredentials): Promise<ForgotPasswordResponse> =>
      new Promise<ForgotPasswordResponse>((resolve, reject) => {
        try {
          dispatch(
            forgotPassword(
              credentials,
              (response: any) => {
                // Handle successful forgot password response
                resolve({
                  success: true,
                  message: response?.message || 'Password reset link sent successfully!'
                });
              },
              (error: unknown) => {
                const userFriendlyError = resolveForgotPasswordError(error);
                reject(new Error(userFriendlyError));
              }
            )
          );
        } catch (error) {
          const userFriendlyError = resolveForgotPasswordError(error);
          reject(new Error(userFriendlyError));
        }
      }),
  };
};
