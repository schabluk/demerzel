import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff'
import chroma from 'chroma-js'

import { Box } from '../components'
import Container from '../layout/Container'

/**
 * The Speach util is client-side-only.
 */
const Speech = process.browser ? require('../utils/speech').default : undefined

const foo = () => {
  console.log('effect foo')
}

const bar = () => {
  console.log('effect bar')
}

function useSpeech() {
  const [recording, setRecording] = useState(false)
  const [transcript, setTranscript] = useState({ match: '', error: null })

  useEffect(() => {
    if (recording) {
      Speech.start()
    } else {
      Speech.stop()
    }
  }, [recording])

  Speech.onresult = ({ results }) => {
    const [resultList] = results // Frist list from results.
    const [resultItem] = resultList // First item from result list.

    const { transcript } = resultItem

    setTranscript({ match: transcript, error: null })
  }

  Speech.onspeechend = () => {
    Speech.stop()
    setRecording(false)
  }

  Speech.onnomatch = e => setTranscript({ match: null, error: `I didn't recognise that` })
  Speech.onerror = ({ error }) => setTranscript({ match: null, error })

  return [recording, setRecording, transcript]
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
