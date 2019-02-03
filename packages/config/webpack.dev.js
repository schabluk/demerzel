const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const common = require('./webpack.config.js')

/**
 * The path to the directory where the process was launched.
 */
const __process = fs.realpathSync(process.cwd())

/**
 * Look for a template in the module's local directory,
 * if not found, use a default from the config.
 */
const indexHTML = 'public/index.html'
const hasOwnTemplate = fs.existsSync(path.join(__process, indexHTML))

const templateFile = hasOwnTemplate
  ? path.join(__process, indexHTML)
  : path.join(__dirname, indexHTML)

const contentDir = hasOwnTemplate ? __process : __dirname

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: [path.join(contentDir, 'dist'), path.join(contentDir, 'public')],
    historyApiFallback: true,
    port: 9000,
    hot: true,
    stats: {
      chunks: false,
      colors: true,
      modules: false,
      performance: true,
      warnings: false,
    },
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
      inject: true,
      template: templateFile,
    }),
    new BundleAnalyzerPlugin(),
  ],
})
