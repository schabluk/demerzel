import { withWidth } from '@material-ui/core'
import { getSnapshot } from 'mobx-state-tree'
import App, { Container } from 'next/app'
import React from 'react'

import Layout from '../layout/Layout'
import Navigation from '../modules/Navigation'
import { Services } from '../services'
import { getStore, IStore } from '../stores'

import 'normalize.css'
import './_app.css'

class Application extends App {
  public static async getInitialProps({ Component, ctx, router }: any) {
    const isServer = typeof window === 'undefined'
    const store = getStore({ Services }, isServer)

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      initialSnapshot: getSnapshot(store),
      isServer,
      pageProps,
    }
  }

  private store: IStore

  constructor(props: any) {
    super(props)

    this.store = getStore({ Services }, props.isServer, props.initialSnapshot)
  }

  public render() {
    const { Component, pageProps, width } = this.props

    return (
      <Container>
        <Layout screenSize={width} header={<Navigation />} sidebar={''} footer={''}>
          <Component store={this.store} {...pageProps} screenSize={width} />
        </Layout>
      </Container>
    )
  }
}

export default withWidth()(Application)
