'use strict';

var webpack = require('webpack')

var env = process.env.NODE_ENV
var config = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: 'app.js',
    path: './dist'
  },
  externals: [
    {
      'react': 'var React',
      'react-dom': 'var ReactDOM',
      'immutable': 'var Immutable'
    }
  ],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
}

module.exports = config
