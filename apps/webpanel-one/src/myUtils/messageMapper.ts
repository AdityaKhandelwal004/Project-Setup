export const getMessageFromKey = (messageKey: string, module: 'budget' | 'investment' | 'insurance' | 'estate' | 'safetynet' | 'savings' | 'debt' | 'super', defaultMessage?: string): string => {
  if (!messageKey) {
    return defaultMessage || 'Operation completed';
  }

  try {

    const parts = messageKey.split('.');
    let message: any;

    for (const part of parts) {
      if (message && typeof message === 'object' && part in message) {
        message = message[part];
      } else {
        return defaultMessage || messageKey;
      }
    }

    if (typeof message === 'string') {
      return message;
    }

    return defaultMessage || messageKey;
  } catch (error) {
    console.error('Error mapping message key:', messageKey, error);
    return defaultMessage || messageKey;
  }
};

/**
 * Extracts and maps the message from API response
 *
 * @param response - API response object
 * @param module - Module name ('budget', 'investment', 'insurance', 'estate', 'safetynet', or 'savings')
 * @param defaultMessage - Fallback message
 * @returns User-friendly message string
 */
export const getApiMessage = (response: any, module: 'budget' | 'investment' | 'insurance' | 'estate' | 'safetynet' | 'savings' | 'debt' | 'super', defaultMessage?: string): string => {
  if (!response) {
    return defaultMessage || 'Operation completed';
  }

  if (response.message) {
    return getMessageFromKey(response.message, module, defaultMessage);
  }

  if (typeof response === 'string') {
    return getMessageFromKey(response, module, defaultMessage);
  }

  return defaultMessage || 'Operation completed';
};

