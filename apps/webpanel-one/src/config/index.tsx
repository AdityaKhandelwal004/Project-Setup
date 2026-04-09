export enum FeatureLevel {
  production = 'production',
  staging = 'staging',
  development = 'development',
}

export interface Config {
  featureLevel: FeatureLevel;
  apiHost: string;
}

const featureLevelValue = Object.freeze({
  development: 0,
  staging: 1,
  production: 2,
});

const prod: Config = Object.freeze({
  featureLevel: FeatureLevel.production,
  apiHost: '',
});

const stage: Config = Object.freeze({
  featureLevel: FeatureLevel.staging,
  apiHost: '',
});

const dev: Config = Object.freeze({
  featureLevel: FeatureLevel.development,
  apiHost: '',
});

const local: Config = Object.freeze({
  featureLevel: FeatureLevel.staging,
  apiHost: '',
});

let env: Config;

switch (process.env.ENV_NAME) {
  case 'prod':
    env = { ...prod };
    break;
  case 'stage':
    env = { ...stage };
    break;
  case 'dev':
    env = { ...dev };
    break;
  default:
    env = { ...local };
    break;
}

export const config = Object.freeze({ ...env });
export const isApplicableFeatureLevel = (level: FeatureLevel): boolean => featureLevelValue[config.featureLevel] <= featureLevelValue[level];
export const baseImageUrl = 'https://d1alecj4txoosk.cloudfront.net';
