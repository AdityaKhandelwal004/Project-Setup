import messages from '@mono/messages';

/**
 * Resolves backend error codes to user-friendly messages
 * @param errorCode - The error code from backend (e.g., 'error.login.invalidCredentials')
 * @param fallbackMessage - Fallback message if error code not found
 * @returns User-friendly error message
 */
export const resolveErrorMessage = (
  errorCode: string | undefined,
  fallbackMessage: string = 'An unexpected error occurred. Please try again.'
): string => {
  if (!errorCode) {
    return fallbackMessage;
  }

  // Handle nested error codes like 'error.login.invalidCredentials'
  const errorPath = errorCode.split('.');

  try {
    // Navigate through the messages object using the error path
    let messageObj: any = messages;

    for (const pathSegment of errorPath) {
      if (messageObj && typeof messageObj === 'object' && pathSegment in messageObj) {
        messageObj = messageObj[pathSegment];
      } else {
        // Path not found, return fallback
        return fallbackMessage;
      }
    }

    // If we found a string message, return it
    if (typeof messageObj === 'string') {
      return messageObj;
    }

    // If not a string, return fallback
    return fallbackMessage;
  } catch (error) {
    // If any error occurs during resolution, return fallback
    return fallbackMessage;
  }
};

/**
 * Resolves login-specific errors with contextual fallbacks
 * @param error - Error object from API response
 * @returns User-friendly login error message
 */
export const resolveLoginError = (error: any): string => {
  // Handle different error formats
  let errorCode: string | undefined;

  if (typeof error === 'string') {
    errorCode = error;
  } else if (error?.message) {
    errorCode = error.message;
  } else if (error?.code) {
    errorCode = error.code;
  } else if (error?.error) {
    errorCode = error.error;
  }

  // Map common HTTP status codes to user-friendly messages
  if (error?.status) {
    switch (error.status) {
      case 401:
        return resolveErrorMessage('error.login.invalidCredentials');
      case 403:
        return resolveErrorMessage('error.login.accountDisabled');
      case 429:
        return resolveErrorMessage('error.login.tooManyAttempts');
      case 500:
      case 502:
      case 503:
        return resolveErrorMessage('error.login.serverError');
      default:
        break;
    }
  }

  // Try to resolve the error code
  const resolvedMessage = resolveErrorMessage(
    errorCode,
    "Oops! The email or password you entered doesn't match our records. Please double-check and try again."
  );

  return resolvedMessage;
};

/**
 * Resolves forgot password specific errors
 * @param error - Error object from API response
 * @returns User-friendly forgot password error message
 */
export const resolveForgotPasswordError = (error: any): string => {
  let errorCode: string | undefined;

  if (typeof error === 'string') {
    errorCode = error;
  } else if (error?.message) {
    errorCode = error.message;
  } else if (error?.code) {
    errorCode = error.code;
  }

  // Handle specific forgot password errors
  if (error?.status) {
    switch (error.status) {
      case 404:
        return "We couldn't find an account with that email address. Please check and try again.";
      case 429:
        return 'Too many reset attempts. Please wait a few minutes before trying again.';
      case 500:
      case 502:
      case 503:
        return "We're experiencing technical difficulties. Please try again in a moment.";
      default:
        break;
    }
  }

  return resolveErrorMessage(errorCode, 'Failed to send reset link. Please try again.');
};

/**
 * Resolves signup-specific errors with contextual fallbacks
 * @param error - Error object from API response
 * @returns User-friendly signup error message
 */
export const resolveSignupError = (error: any): string => {
  // Handle different error formats
  let errorCode: string | undefined;

  if (typeof error === 'string') {
    errorCode = error;
  } else if (error?.message) {
    errorCode = error.message;
  } else if (error?.code) {
    errorCode = error.code;
  } else if (error?.error) {
    errorCode = error.error;
  }

  // Map common HTTP status codes to user-friendly messages
  if (error?.status) {
    switch (error.status) {
      case 400:
        return error?.message || 'Invalid signup data. Please check your information and try again.';
      case 409:
        return error?.message || 'An account with this email already exists. Please try signing in instead.';
      case 422:
        return error?.message || 'Please check your information and ensure all fields are filled correctly.';
      case 429:
        return 'Too many signup attempts. Please wait a few minutes before trying again.';
      case 500:
      case 502:
      case 503:
        return "We're experiencing technical difficulties. Please try again in a moment.";
      default:
        break;
    }
  }

  // Try to resolve the error code
  const resolvedMessage = resolveErrorMessage(
    errorCode,
    'Unable to create your account right now. Please check your information and try again.'
  );

  return resolvedMessage;
};

/**
 * Resolves general API errors
 * @param error - Error object from API response
 * @returns User-friendly error message
 */
export const resolveApiError = (error: any): string => {
  let errorCode: string | undefined;

  if (typeof error === 'string') {
    errorCode = error;
  } else if (error?.message) {
    errorCode = error.message;
  } else if (error?.code) {
    errorCode = error.code;
  }

  // Handle network errors
  if (error?.name === 'NetworkError' || error?.code === 'NETWORK_ERROR') {
    return 'Unable to connect. Please check your internet connection and try again.';
  }

  // Handle timeout errors
  if (error?.name === 'TimeoutError' || error?.code === 'TIMEOUT') {
    return 'Request timed out. Please try again.';
  }

  return resolveErrorMessage(errorCode, 'An unexpected error occurred. Please try again.');
};
