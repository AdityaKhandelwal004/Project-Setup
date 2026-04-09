// services/screenTracker.ts

import { trackEvent } from "./mixpanelService";
import { getSessionId } from "./sessionManager";

let lastScreen: string | null = null;

export const trackScreen = (
  screenName: string,
  properties?: Record<string, any>,
) => {
  if (lastScreen === screenName) return;

  lastScreen = screenName;

  trackEvent("Screen Viewed", {
    screen_name: screenName,
    session_id: getSessionId(),
    ...properties,
  });
};
