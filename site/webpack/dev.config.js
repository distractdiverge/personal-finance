const merge = require('webpack-merge');
const baseConfig = require('./base.config');
const postcssLoader = require('./postcssLoader');

module.exports = merge(baseConfig, {
  devtool: 'eval-source-map',

  devServer: {
    inline: true,
    contentBase: 'client',
    port: process.env.CLIENT_PORT || 3001,
    publicPath: '/',
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          postcssLoader,
        ],
      },
    ],
  },

  watch: true,
});
