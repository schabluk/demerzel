// import Fetch from 'isomorphic-unfetch'
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { withStyles, withTheme } from '@material-ui/core/styles'

import Container from '../layout/Container'
import { Services } from '../services'

const Page = ({ screenSize, classes, store, isServer = false, data = [] }) => (
  <Container
    style={{
      flex: '1',
    }}>
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
)

Page.propTypes = {
  screenSize: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
  classes: PropTypes.object.isRequired,
  store: PropTypes.object,
  isServer: PropTypes.bool,
  data: PropTypes.array,
}

Page.getInitialProps = async function getInitialProps() {
  const {
    show: { getShowByName },
  } = Services

  const isServer = typeof window === 'undefined'
  const { data } = await getShowByName('batman')

  return {
    isServer,
    data,
  }
}

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
  },
})

export default withStyles(styles)(withTheme()(Page))
