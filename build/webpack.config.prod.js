const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');

const path = require('path');

const baseConfig = require('./webpack.config.base');
const config = require('../config');
const utils = require('./utils');

const webpackConfig = merge(baseConfig, {
  mode: 'production',
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath, // importante pois o css extraído possui importações com caminho relativo (../)
    filename: utils.assetsPath('js/[name].[chunkhash].bundle.js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].bundle.js'),
  },
  devtool: config.build.productionSourceMap ? 'source-map' : undefined,
  optimization: {
    minimize: true,
    namedChunks: true,
    minimizer: [
      new TerserPlugin({
        // cache: true,
        cache: '.cache/app/terser-webpack-plugin',
        parallel: true,
        sourceMap: config.build.productionSourceMap,
      }),
      new OptimizeCSSPlugin({}),
    ],
    splitChunks: {
      chunks: 'all', // sobrescreve o default: async
      cacheGroups: {
        vendors: {
          name: true,
          reuseExistingChunk: true,
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      // https://webpack.js.org/plugins/mini-css-extract-plugin/#long-term-caching
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      chunkFilename: utils.assetsPath('css/[id].[contenthash].css'),
      ignoreOrder: true,
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '@static'),
          to: config.build.assetsSubDirectory,
          globOptions: {
            ignore: ['.*'],
          },
        },
      ],
    }),
  ],
});

// if (config.build.productionGzip) {
//   var CompressionWebpackPlugin = require('compression-webpack-plugin')

//   webpackConfig.plugins.push(
//     new CompressionWebpackPlugin({
//       asset: '[path].gz[query]',
//       algorithm: 'gzip',
//       test: new RegExp(
//         '\\.(' +
//         config.build.productionGzipExtensions.join('|') +
//         ')$'
//       ),
//       threshold: 10240,
//       minRatio: 0.8
//     })
//   )
// }

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
