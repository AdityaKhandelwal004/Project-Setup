import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import Dotenv from 'dotenv-webpack'

const processEnv = new Dotenv({
  systemvars: true, // also allow system env vars
})

export default merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    port: 3001,
  },
  plugins: [processEnv],
});
