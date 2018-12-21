const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery/dist/jquery.min.js',
        jQuery: 'jquery/dist/jquery.min.js',
        jquery: 'jquery/dist/jquery.min.js',
      }),
    ]
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:6789/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};