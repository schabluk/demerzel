/**
 * Custom Document wrapper.
 *
 * See: https://nextjs.org/docs/#custom-document
 * See: https://github.com/zeit/next.js/blob/canary/examples/with-styled-components
 */

import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import { LanguageContext } from '../utils/context'

import 'normalize.css'

/* eslint-disable react/no-danger */
class MainDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: [...initialProps.styles, ...sheet.getStyleElement()],
    }
  }

  render() {
    const language = this.context

    return (
      <html lang={language}>
        <Head>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
          />
          <link
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500|Lato'
            rel='stylesheet'
          />
          <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
          <link href='/static/css/fa-all.min.css' rel='stylesheet' />
          {this.props.style}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
/* eslint-enable react/no-danger */

MainDocument.contextType = LanguageContext

export default MainDocument
