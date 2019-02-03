const path = require('path')

const merge = require('webpack-merge')
const common = require('./webpack.config.js')

/**
 * This is configuration file for testing Webpack plugins.
 * The rabbit.js file is used as test file for the plugin
 * to operate on.
 */
const TestPlugin = require('./plugins/TestPlugin.js')

const PATHS = {
  index: path.join(__dirname, './plugins/rabbit.js'),
  build: path.join(__dirname, 'dist'),
}

module.exports = merge(common, {
  mode: 'development',
  entry: {
    lib: PATHS.index,
  },
  // entry: [
  //   PATHS.index
  // ],
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  plugins: [new TestPlugin({ entry: 'lib' })],
})
