const { RawSource, ConcatSource } = require('webpack-sources')

module.exports = class DemoPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    const { entry } = this.options

    const source = 'Lorem ipsum dolor'

    compiler.hooks.compilation.tap('DemoPlugin', compilation => {
      // console.log(Object.keys(compilation))
      // console.log('Assets', compilation.options)

      /**
       * Wrap chunk with code.
       */
      compilation.hooks.afterOptimizeChunkAssets.tap('DemoPlugin', chunks => {
        chunks.forEach(chunk => {
          chunk.files.forEach(filename => {
            compilation.assets[filename] = new ConcatSource(
              new RawSource('header'),
              compilation.assets[filename],
              new RawSource('footer'),
            )
          })
        })
      })
      compilation.warnings.push(`Hello ${entry}!`)
    })

    /**
     * Emiting additional assets.
     */
    compiler.plugin('emit', (compilation, callback) => {
      compilation.assets[`${entry}.js`] = new RawSource('demo')
      compilation.assets[`${entry}.md`] = {
        source() {
          return source
        },
        size() {
          return source.length
        },
      }

      compilation.warnings.push(`${entry}: we are doing something nasty here!`)
      // compilation.errors.push('error')

      callback()
    })

    compiler.plugin('done', stats => {
      console.log('Webpack has finished bundling')
    })
  }
}
