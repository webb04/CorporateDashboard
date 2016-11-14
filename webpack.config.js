var path = require('path');
var webpack = require('webpack');
var combineLoaders = require('webpack-combine-loaders');

var webpack = require('webpack');
var config;

// check if environemnt varialbe NODE_ENV is `production`?
var ENV_PRODUCTION = process.env.NODE_ENV || false;
if (ENV_PRODUCTION) {
  config = {
    context: path.join(__dirname, './src'),

    entry: './index.js',

    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js'
    },

    module: {
      loaders: [{
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      }, {
        test: /\.css$/,
        loader: combineLoaders([
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            query: {
              modules: false,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ])
      }]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: true,
        mangle: false
      })
    ]
  };

} else {
  config = {
    devtool: 'eval',
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './src/index'
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/static/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      }, {
        test: /\.css$/,
        loader: combineLoaders([
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            query: {
              modules: false,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ])
      }]
    }
  };
}

module.exports = config;
