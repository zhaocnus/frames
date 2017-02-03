'use strict';

const webpack = require('webpack');
const path = require('path');

const SRC = path.join(__dirname, 'ext/src/');
const DEST = path.join(__dirname, 'ext/build/');
const APP_ROOT = path.join(__dirname, 'ext');

var config = {
  entry: {
    background: path.join(SRC + 'background/index.js'),
    contentScript: path.join(SRC + 'contentScript/index.js'),
    upload: path.join(SRC + 'upload/index.js')
  },
  output: {
    path: DEST,
    filename: '[name].bundle.js'
  },
  module : {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        include: SRC,
        loaders: ['babel']
      },
      {
        test: /\.scss$/,
        include : SRC,
        loaders: ['style', `css?root=${APP_ROOT}`, 'sass']
      },
      // {
      //   test: /\.scss$/,
      //   include : SRC,
      //   loaders: ['style', 'css', 'sass']
      // },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [ 'file?name=img/[name].[ext]' ]
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/,
        loader: 'url'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [],
  resolve: {
    root: SRC
  }
};

module.exports = config;