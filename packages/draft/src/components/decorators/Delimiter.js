import React from 'react'
import PropTypes from 'prop-types'

function color(character) {
  switch (character) {
    case '(':
      return 'magenta'
    case ')':
      return 'magenta'
    case '~':
      return 'orange'
    case '[':
      return 'blue'
    case ']':
      return 'blue'
    case '!':
      return 'red'
    default:
      return 'teal'
  }
}

class Delimiter extends React.Component {
  static displayName = 'Delimiter'

  static propTypes = {
    children: PropTypes.node,
    offsetKey: PropTypes.string,
    decoratedText: PropTypes.string,
  }

  render() {
    const { children, decoratedText, offsetKey } = this.props

    return (
      <span data-offset-key={offsetKey} style={{ color: color(decoratedText) }}>
        {children}
      </span>
    )
  }
}

export default Delimiter
