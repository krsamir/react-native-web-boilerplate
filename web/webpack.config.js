const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootDir = path.join(__dirname, '..');
const webpackEnv = process.env.NODE_ENV || 'development';
require('core-js');
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};
const configurationForRNP = {
  test: /\.js$/,
  // exclude: /node_modules[/\\](?!react-native-vector-icons)/,
  use: {
    loader: 'babel-loader',
    options: {
      // Disable reading babel configuration
      babelrc: false,
      configFile: false,

      // The configuration for compilation
      presets: [
        ['@babel/preset-env', {useBuiltIns: 'entry', corejs: '3.30.1'}],
        '@babel/preset-react',
        '@babel/preset-flow',
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
      ],
    },
  },
};

module.exports = {
  devServer: {
    port: 3000,
    open: true,
  },
  mode: webpackEnv,
  entry: {
    app: path.join(rootDir, './index.web.ts'),
  },
  output: {
    path: path.resolve(rootDir, './backend/dist'),
    filename: 'app-[hash].bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      configurationForRNP,
      {
        test: /\.(tsx|ts|jsx|js|mjs)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/resource',
      },
      imageLoaderConfiguration,
      {
        test: /\.ttf$/,
        loader: 'url-loader', // or directly file-loader
        include: path.resolve(
          __dirname,
          'node_modules/react-native-vector-icons',
        ),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.jsx',
      '.js',
    ], // read files in fillowing order
    // alias: Object.assign({
    //   'react-native$': 'react-native-web',
    // }),
    alias: {
      'react-native$': require.resolve('react-native-web'),
    },
  },
};
