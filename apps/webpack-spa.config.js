// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
var _ = require('lodash');
var webpack = require('webpack');

var baseConfig = require('./webpack').config;
var config = _.extend({}, baseConfig, {
  mode: 'production',
  entry: './src/spa/spa.js',
  output: {
    path: path.resolve(__dirname, 'build/spa'),
    filename: 'main.js'
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.DefinePlugin({
      IN_UNIT_TEST: JSON.stringify(false),
      IN_STORYBOOK: JSON.stringify(false),
      'process.env.mocha_entry': JSON.stringify(''),
      'process.env.NODE_ENV': JSON.stringify('development'),
      PISKEL_DEVELOPMENT_MODE: JSON.stringify(false)
    })
  ]
  // module: _.extend({}, baseConfig.module, {
  //   rules: [
  //     {
  //       test: /\.(js|jsx)$/,
  //       exclude: /node_modules/,
  //       use: ['babel-loader']
  //     }
  //   ]
  // })
});

module.exports = config;
