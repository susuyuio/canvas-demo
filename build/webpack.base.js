const path = require('path');
const merge = require('webpack-merge');
const common =require('./webpack.common.js');
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    compress: true,
    port: 8090
  }
})