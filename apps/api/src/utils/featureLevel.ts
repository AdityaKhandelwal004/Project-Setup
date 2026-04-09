import config from "../config/index.ts";

export const featureLevelValue = Object.freeze({
  development: 0,
  staging: 1,
  production: 2,
});

export const featureLevel = Object.freeze({
  development: "development",
  staging: "staging",
  production: "production",
});

export const isApplicableFeatureLevel = (
  level: keyof typeof featureLevelValue
): boolean => {
  return (
    featureLevelValue[config.featureLevel as keyof typeof featureLevelValue] <=
    featureLevelValue[level]
  );
};
