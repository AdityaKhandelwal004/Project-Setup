import { merge } from 'webpack-merge';

export default async envVars => {
  const { env } = envVars;

  const envModule = await import(`./webpack.${env}.js`);
  const envConfig = envModule.default;

  return merge(envConfig);
};
