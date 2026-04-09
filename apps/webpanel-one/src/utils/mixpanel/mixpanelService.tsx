import mixpanel from "mixpanel-browser";
import { config } from "../../config";

let isInitialized = false;

const isDev = process.env.NODE_ENV !== "production";

interface MixpanelConfig {
  debug?: boolean;
  track_pageview?: boolean;
  persistence?: "localStorage" | "cookie";
}

export const initMixpanel = (mixpanelConfig?: MixpanelConfig) => {
  if (isInitialized) {
    return;
  }

  if (!config.mixpanelToken) {
    return;
  }

  try {
    const defaultConfig: MixpanelConfig = {
      debug: isDev,
      track_pageview: true,
      persistence: "localStorage",
      ...mixpanelConfig,
    };

    mixpanel.init(config.mixpanelToken, defaultConfig);
    isInitialized = true;
  } catch (error) {
    console.error("❌ Failed to initialize Mixpanel:", error);
  }
};

export const trackEvent = (event: string, properties?: Record<string, any>) => {
  if (!isInitialized) {
    return;
  }

  try {
    mixpanel.track(event, properties);
  } catch (error) {
    console.error("❌ Error tracking event:", event, error);
  }
};

export const registerSuperProperties = (properties: Record<string, any>) => {
  if (!isInitialized) {
    return;
  }

  mixpanel.register(properties);
};

export const setUserProfile = (
  userId: string,
  properties?: Record<string, any>,
) => {
  if (!isInitialized) {
    return;
  }

  try {
    mixpanel.identify(userId);
    if (properties) {
      mixpanel.people.set(properties);
    }
  } catch (error) {
    console.error("❌ Error setting user profile:", userId, error);
  }
};

export const updateUserProfile = (properties: Record<string, any>) => {
  if (!isInitialized) {
    return;
  }

  try {
    mixpanel.people.set(properties);
  } catch (error) {
    console.error("❌ Error updating user profile:", error);
  }
};

export const incrementUserProperty = (property: string, by: number = 1) => {
  if (!isInitialized) {
    return;
  }

  try {
    mixpanel.people.increment(property, by);
  } catch (error) {
    console.error("❌ Error incrementing user property:", property, error);
  }
};

export const resetMixpanel = () => {
  if (!isInitialized) {
    return;
  }

  try {
    mixpanel.reset();
  } catch (error) {
    console.error("❌ Error resetting Mixpanel:", error);
  }
};

export const getDistinctId = (): string | null => {
  if (!isInitialized) {
    return null;
  }

  try {
    const distinctId = mixpanel.get_distinct_id();
    return distinctId;
  } catch (error) {
    console.error("❌ Error getting distinct ID:", error);
    return null;
  }
};

export const isMixpanelInitialized = (): boolean => {
  return isInitialized;
};

export { mixpanel };
