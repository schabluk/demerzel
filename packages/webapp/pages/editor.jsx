import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, withTheme } from '@material-ui/core/styles'

import Container from '../layout/Container'
import Editor from '../draft'

// interface IPage {
//   width: string
//   classes: object
//   store: object
//   isServer: boolean
// }

const content = {
  blocks: [
    {
      key: '2sjp4',
      text: 'Hello!',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
}

const Page = ({ screenSize, classes, store, isServer = false }) => (
  <Container style={{ flex: '1' }}>
    <div className={classes.searchBox}>
      <Editor metadata={content} />
    </div>
  </Container>
)

Page.propTypes = {
  screenSize: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
  classes: PropTypes.object.isRequired,
  store: PropTypes.object,
  isServer: PropTypes.bool,
}

const styles = theme => ({
  root: {},
  searchBox: {
    backgroundColor: 'white',
    padding: '0.5rem',
    margin: '2rem auto',
    width: '600px',
  },
})

export default withStyles(styles)(withTheme()(Page))
