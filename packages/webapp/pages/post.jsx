import React from 'react'
import { withRouter } from 'next/router'
import { withWidth } from '@material-ui/core'

import Layout from '../layout/Layout'
import Container from '../layout/Container'
import Navigation from '../modules/Navigation'
import Service from '../services'

const Post = withRouter(({ screenSize, data }) => (
  <Layout screenSize={screenSize} header={<Navigation />}>
    <Container style={{ flex: '1' }}>
      <h1>{data.name}</h1>
      <div style={{ display: 'flex' }}>
        <img src={data.image.medium} style={{ flex: 1 }} alt='Medium' />
        <div style={{ flex: 5, marginLeft: 15 }}>{data.summary.replace(/<[/]?p>/g, '')}</div>
      </div>
    </Container>
  </Layout>
))

Post.getInitialProps = async function getInitialProps(context) {
  const { id } = context.query
  const {
    show: { getShowById },
  } = Service

  const isServer = typeof window === 'undefined'
  const { data } = await getShowById(id)

  return {
    isServer,
    data,
  }
}

export default withWidth()(Post)
