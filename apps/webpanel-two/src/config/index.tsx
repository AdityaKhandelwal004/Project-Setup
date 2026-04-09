export enum FeatureLevel {
  production = 'production',
  staging = 'staging',
  development = 'development',
}
export interface Config {
  featureLevel: FeatureLevel;
  apiHost?: string;
  staticUploadsHost?: string;
}
const featureLevelValue = Object.freeze({
  development: 0,
  staging: 1,
  production: 2,
});


export const config: Config = Object.freeze({ 
    featureLevel : process.env.FEATURE_LEVEL as FeatureLevel || FeatureLevel.development,
    apiHost : process.env.API_HOST,
    staticUploadsHost : process.env.STATIC_UPLOADS_HOST,
});

export const isApplicableFeatureLevel = (level: FeatureLevel): boolean =>
  featureLevelValue[config.featureLevel] <= featureLevelValue[level];
