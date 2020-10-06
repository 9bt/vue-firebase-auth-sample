const path = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const envFile = process.env.ENV_FILE || '.env';
const isProduction = envFile === '.env.production';
require('dotenv').config({
  path: `${__dirname}/../${envFile}`,
});

module.exports = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      CLIENT_BASE_PATH: JSON.stringify(process.env.CLIENT_BASE_PATH),
      SERVER_BASE_PATH: JSON.stringify(process.env.SERVER_BASE_PATH),
      FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': `${__dirname}/src`,
    },
  },
};
