const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanHtmlPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const VueloaderPlugin = require('vue-loader/lib/plugin')

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
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    },
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        loader: ["ts-loader", 'tslint-loader']
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
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
            },
          },
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 50000,
              outputPath: 'static/image/',
              filename: '[name].[ext]',
            },
          },
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 50000,
              filename: 'static/fonts/[name].[ext]',
            },
          },
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      }
    ]
  },
  plugins: [
    new cleanHtmlPlugin(),
    new htmlWebpackPlugin({
      template: './index.html'
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