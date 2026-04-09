import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAuthService } from '../services/authService';
import type { LoginCredentials, SignupCredentials, SignupResponse, ForgotPasswordCredentials, ForgotPasswordResponse } from '../services/authService';

export interface UseAuthReturn {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<SignupResponse>;
  forgotPassword: (credentials: ForgotPasswordCredentials) => Promise<ForgotPasswordResponse>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

/**
 * Custom hook for authentication operations
 * Provides a clean interface for auth operations with loading and error states
 */
export const useAuth = (): UseAuthReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const authService = createAuthService(dispatch);

  const clearError = () => setError(null);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.login(credentials);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err; // Re-throw so components can handle success/failure
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<SignupResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.signup(credentials);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed';
      setError(errorMessage);
      throw err; // Re-throw so components can handle success/failure
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (credentials: ForgotPasswordCredentials): Promise<ForgotPasswordResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.forgotPassword(credentials);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send reset link';
      setError(errorMessage);
      throw err; // Re-throw so components can handle success/failure
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    signup,
    forgotPassword,
    isLoading,
    error,
    clearError,
  };
};
