import { registerSuperProperties, trackEvent } from './mixpanelService';

let sessionId: string | null = null;
let isAuthenticated = false;

// Generate UUID compatible with web
const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback UUID v4 generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const updateAuthState = (authenticated: boolean) => {
  isAuthenticated = authenticated;
};

export const startSession = (reason: string) => {
  sessionId = generateUUID();

  registerSuperProperties({
    session_id: sessionId,
  });

  trackEvent('Session Started', {
    session_id: sessionId,
    reason,
    started_at: new Date().toISOString(),
  });

};

export const endSession = () => {
  if (!sessionId) return;

  trackEvent('Session Ended', {
    session_id: sessionId,
    ended_at: new Date().toISOString(),
  });

  sessionId = null;
};

export const getSessionId = () => sessionId;

export const initSessionTracking = () => {
  if (document.visibilityState === 'visible' && isAuthenticated) {
    startSession('app_launch');
  }

  // Track page visibility changes
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible' && isAuthenticated) {
      // Page became visible (user came back to tab)
      if (!sessionId) {
        startSession('page_visible');
      }
    } else if (document.visibilityState === 'hidden') {
      // Page became hidden (user switched tab or minimized browser)
      endSession();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Track page unload (user closes tab/navigates away)
  const handleBeforeUnload = () => {
    endSession();
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  // Return cleanup function
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
};
