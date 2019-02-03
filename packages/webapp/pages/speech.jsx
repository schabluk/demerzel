import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff'
import chroma from 'chroma-js'

import { useSpeech } from '../hooks'
import { Box } from '../components'
import Container from '../layout/Container'

const foo = () => {
  console.log('effect foo')
}

const bar = () => {
  console.log('effect bar')
}

const Page = ({ screenSize, classes, store, isServer = false }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [mikeOn, setMikeOn, transcript] = useSpeech()

  const { match, error } = transcript

  useEffect(() => {
    foo()
    return function cleanup() {
      bar()
    }
  })

  const colour = mikeOn ? 'secondary' : 'primary'
  const backgroundColor = chroma.valid(match) ? match : '#fff'

  return (
    <Container style={{ flex: '1' }}>
      <div style={{ backgroundColor }}>
        <IconButton
          size='large'
          className={classes.button}
          aria-label='Toggle'
          onClick={e => setMikeOn(!mikeOn)}>
          {mikeOn ? (
            <MicIcon color={colour} fontSize='large' />
          ) : (
            <MicOffIcon color={colour} fontSize='large' />
          )}
        </IconButton>
        <span>{match}</span>
      </div>
      <p>{error}</p>
      <br />
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
  searchBox: {
    backgroundColor: 'white',
    padding: '0.5rem',
    margin: '2rem auto',
    width: '600px',
  },
})

export default withStyles(styles)(withTheme()(Page))
