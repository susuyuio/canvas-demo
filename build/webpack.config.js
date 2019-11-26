const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const ASSET_PATH = process.env.ASSET_PATH || '/febuild-cli/';

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new uglifyjsWebpackPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    })
  ]
})