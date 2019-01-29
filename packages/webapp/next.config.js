const withType = require('@zeit/next-typescript')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withMDX = require('@zeit/next-mdx')({ extension: /.mdx?$/ })

/**
 * Workaround to have CSS *without* modules,
 * and SCSS *with* modules.
 */
const withModules = withCSS => {
  withCSS.cssModules = true

  return withSass(withCSS)
}

const settings = {
  cssModules: false, // option for withCSS.
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  webpack(config, { buildId, dev, isServer, defaultLoaders }) {
    /**
     * Allow for resolving modules via symlinks. Easy for prototyping,
     * because it's not necessary to configure the full package in monorepo.
     */
    config.resolve.symlinks = false

    return config
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    user: process.env.USER, // Pass through env variables
  },
}

module.exports = withType(withModules(withCSS(withMDX(settings))))
