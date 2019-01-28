const withType = require('@zeit/next-typescript')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withMDX = require('@zeit/next-mdx')({
  extension: /.mdx?$/,
})

/**
 * Workaround to have CSS *without* modules,
 * and SCSS *with* modules.
 */
const withSassModules = withCSS => {
  withCSS.cssModules = true

  return withSass(withCSS)
}

module.exports = withType(
  withSassModules(
    withCSS(
      withMDX({
        cssModules: false, // option for withCSS.
        pageExtensions: ['js', 'jsx', 'md', 'mdx'],
      }),
    ),
  ),
)
