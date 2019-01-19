import Fetch from 'isomorphic-unfetch'
import React from 'react'
import Link from 'next/link'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { withWidth } from '@material-ui/core'

import Layout from '../layout/Layout'
import Container from '../layout/Container'
import Navigation from '../modules/Navigation'

const Page = ({
  width: screenSize, classes, store, isServer, data
}) => (
  <Layout
    screenSize={screenSize}
    header={<Navigation />}
  >
    <Container style={{ flex: '1' }}>
      <section>
        <p>
          This is another page of the SSR example, you accessed it{' '}
          <strong>{isServer ? 'server' : 'client'} side</strong>.
        </p>
      </section>
      <ul>
        {data.map(({ show }) => (
          <li key={show.id}>
            <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  </Layout>
)

Page.getInitialProps = async function getInitialProps () {
  const isServer = typeof window === 'undefined'
  const res = await Fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  return {
    isServer,
    data
  }
}

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2
  }
})

export default withStyles(styles)(withTheme()(withWidth()(Page)))
