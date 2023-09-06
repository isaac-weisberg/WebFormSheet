const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    'index': './sample/index.js'
  },
  mode: 'development',
  target: 'web',
  module: {
    rules: [
        
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist_sample'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./sample/index.html" },
      ],
    })
  ],
  devServer: {
    server: {
      type: 'http'
    },
    static: {
      directory: path.join(__dirname, 'sample_dist'),
    },
    compress: false,
    port: 9000,
  }
};