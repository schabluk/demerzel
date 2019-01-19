import Fetch from 'isomorphic-unfetch'
import React from 'react'
import { withRouter } from 'next/router'
import { withWidth } from '@material-ui/core'

import Layout from '../layout/Layout'
import Container from '../layout/Container'
import Navigation from '../modules/Navigation'

const Post = withRouter(({ screenSize, show }) => (
  <Layout screenSize={screenSize} header={<Navigation />}>
    <Container style={{ flex: '1' }}>
      <h1>{show.name}</h1>
      <div style={{ display: 'flex' }}>
        <img src={show.image.medium} style={{ flex: 1 }} alt='Medium' />
        <div style={{ flex: 5, marginLeft: 15 }}>{show.summary.replace(/<[/]?p>/g, '')}</div>
      </div>
    </Container>
  </Layout>
))

Post.getInitialProps = async function getInitialProps(context) {
  const { id } = context.query
  const res = await Fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  return { show }
}

export default withWidth()(Post)
