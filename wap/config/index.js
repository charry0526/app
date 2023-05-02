'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
// console.log(new HtmlWebpackPlugin(), __dirname, path.resolve(__dirname, '../favicon.png'), new HtmlWebpackPlugin({
//   favicon: path.resolve(__dirname, '../favicon.png')
// }))
module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/wifeed': {
        // target: 'https://pc.zsycyy.com',
        // target: 'http://www.shehua56.com',
        target: 'https://wifeed.vn',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/wifeed': ''
        }
      },
      '/apis': {
        // target: 'https://pc.zsycyy.com',
        // target: 'http://www.shehua56.com',
        target: 'http://8.213.195.188:8080/stock2c1',
        // target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/apis': ''
        }
      }
    },

    // plugins: [
    //   new HtmlWebpackPlugin({
    //     filename: 'index.html',
    //     template: 'index.html',
    //     inject: true,
    //     favicon: path.resolve(__dirname, '../favicon.png')
    //   })
    // ],
    // Various Dev Server settings
    host: '127.0.0.1', // can be overwritten by process.env.HOST
    port: 8085, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    plugins: [
      // new HtmlWebpackPlugin({
      //   filename: 'index.html',
      //   template: 'index.html',
      //   inject: true,
      //   // filename, titile, template ...
      //   favicon: path.resolve(__dirname, '../favicon.png')
      //   // favicon: '../favicon.png'
      // }),
      // new HtmlWebpackPlugin({
      //   filename: 'index.html',
      //   template: 'index.html',
      //   inject: true,
      //   favicon: path.resolve('favicon.png') // 在此处设置
      // }),

      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 下面两项配置才是 compression-webpack-plugin 压缩配置
      // 压缩成 .gz 文件
      new CompressionPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: '[name].js',
        minChunks: function (module, count) {
          console.log(module.resource, `引用次数${count}`)
          // "有正在处理文件" + "这个文件是 .js 后缀" + "这个文件是在 node_modules 中"
          return (
            module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
          )
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime',
        filename: '[name].js',
        chunks: ['vendor']
      })
    ],
    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
