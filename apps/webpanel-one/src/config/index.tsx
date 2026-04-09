export enum FeatureLevel {
  production = "production",
  staging = "staging",
  development = "development",
}
export interface Config {
  featureLevel: FeatureLevel;
  apiHost: string;
  staticUploadsHost?: string;
  stripeKey: string;
  mixpanelToken: string;
}
const featureLevelValue = Object.freeze({
  development: 0,
  staging: 1,
  production: 2,
});

export const config: Config = Object.freeze({
  featureLevel:
    (process.env.FEATURE_LEVEL as FeatureLevel) || FeatureLevel.development,
  apiHost: process.env.API_HOST as string,
  staticUploadsHost: process.env.STATIC_UPLOADS_HOST,
  stripeKey: process.env.STRIPE_PUBLIC_KEY as string,
  mixpanelToken: process.env.MIXPANEL_TOKEN as string
});

export const isApplicableFeatureLevel = (level: FeatureLevel): boolean =>
  featureLevelValue[config?.featureLevel] <= featureLevelValue[level];
