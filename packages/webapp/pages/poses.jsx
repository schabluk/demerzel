import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import { Box } from '../components'
import Container from '../layout/Container'

const Page = ({ screenSize, classes, store, isServer = false }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <Container style={{ flex: '1' }}>
      <div onMouseEnter={e => setIsVisible(true)} onMouseLeave={e => setIsVisible(false)}>
        <Paper className={classes.root} style={{ color: 'red' }}>
          <Box pose={isVisible ? 'visible' : 'hidden'} />
        </Paper>
      </div>
    </Container>
  )
}

Page.propTypes = {
  screenSize: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
  classes: PropTypes.object.isRequired,
  store: PropTypes.object,
  isServer: PropTypes.bool,
}

const styles = theme => ({
  root: {
    // ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
})

export default withStyles(styles)(withTheme()(Page))
