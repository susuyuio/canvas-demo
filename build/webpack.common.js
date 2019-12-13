const path = require('path');
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanHtmlPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const VueloaderPlugin = require('vue-loader/lib/plugin')

const publicPath = '/';
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.ts'
  },
  output: {
    filename: 'static/js/[name].[hash].js',
    publicPath
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      '@icon': resolve('./node_modules/shopee-ui/lib/icon'),
      '@config': resolve('./config'),
      '@test': resolve('./test')
    },
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/seller-common/dist')]
      },
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              // appendTsSuffixTo: [/\.vue$/],
              appendTsxSuffixTo: [/\.vue$/]
            }
          }
        ],
        include: [resolve('src'), resolve('test'), resolve('node_modules/seller-common/dist')],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
          publicPath: publicPath
        }
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
        include: /assets\/flags\//,
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
          publicPath: publicPath
        }
      },
      {
        test: /\.svg$/,
        exclude: /assets\/flags\//,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
          publicPath: publicPath
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
          publicPath: publicPath
        }
      }
    ]
  },
  plugins: [
    new cleanHtmlPlugin(),
    new htmlWebpackPlugin({
      template: resolve('index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash].css',
      chunkFilename: '[id].css',
    }),
    new VueloaderPlugin()
  ],
}