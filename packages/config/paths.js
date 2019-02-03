const fs = require('fs')
const path = require('path')

/**
 * This is the common Webpack configuration for development and production setups.
 *
 * To make Webpack configuration sharable across workspaces in the monorepository,
 * paths will be resolved from the working directory of node process.
 */
const LOCAL = fs.realpathSync(process.cwd())
const PATHS = {
  source: path.join(LOCAL, 'src'),
  target: path.join(LOCAL, 'dist'),
}

module.exports = {
  LOCAL,
  PATHS,
}
