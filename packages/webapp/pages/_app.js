/**
 * Custom App wrapper.
 *
 * See: https://nextjs.org/docs/#custom-app
 */

import React from 'react'
import { getSnapshot } from 'mobx-state-tree'
import App, { Container } from 'next/app'

import { getStore } from '../stores'

export default class Application extends App {
  static async getInitialProps({ Component, router, ctx }) {
    const isServer = typeof window === 'undefined'
    const store = getStore(isServer)

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      initialState: getSnapshot(store),
      isServer,
      pageProps,
    }
  }

  render() {
    const { Component, pageProps, initialState, isServer } = this.props

    /**
     * Create client side Store instance.
     */
    const store = getStore(isServer, initialState)

    /**
     * ToDo: we might want to pass the store using React.Context.
     */
    return (
      <Container>
        <Component {...pageProps} store={store} />
        <style global jsx>{`
          body {
            font-family: 'Lato', sans-serif;
          }
        `}</style>
      </Container>
    )
  }
}
