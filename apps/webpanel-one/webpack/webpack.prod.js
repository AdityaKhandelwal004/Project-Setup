import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import Dotenv from 'dotenv-webpack'

const processEnv = new Dotenv({
  systemvars: true, // also allow system env vars
})


export default merge(common, {
  mode: 'production',
  devtool: 'source-map',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [processEnv],
});
