import { getSnapshot } from 'mobx-state-tree'
import App, { Container } from 'next/app'
import React from 'react'

import { Services } from '../services'
import { getStore, IStore } from '../stores'

import 'normalize.css'
import './_app.css'

export default class Application extends App {
  public static async getInitialProps({ Component, ctx }: any) {
    const isServer = typeof window === 'undefined'
    const store = getStore({ Services }, isServer)

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

  private store: IStore

  constructor(props: any) {
    super(props)

    this.store = getStore({ Services }, props.isServer, props.initialState)
  }

  public render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Component store={this.store} {...pageProps} />
      </Container>
    )
  }
}
