const webpack = require('webpack');
const { merge } = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const config = require('../config');

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    publicPath: config.dev.assetsPublicPath,
    filename: '[name].bundle.js',
    // use absolute paths in sourcemaps (important for debugging via IDE)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },

  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    // contentBase: 'dist',
    compress: true,
    host: config.dev.host,
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    quiet: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
    historyApiFallback: true, // importante para que o vue-router funcione
  },
  devtool: 'cheap-module-eval-source-map', // https://webpack.js.org/configuration/devtool/

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
  ],
});
