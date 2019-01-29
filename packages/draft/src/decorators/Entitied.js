import React from 'react'
import PropTypes from 'prop-types'

class Entitied extends React.Component {
  static displayName = 'Entitied'

  static propTypes = {
    children: PropTypes.node,
    offsetKey: PropTypes.string,
    // decoratedText: PropTypes.string
  }

  render() {
    const { children, offsetKey } = this.props

    return (
      <span data-offset-key={offsetKey} style={{ color: 'steelblue' }}>
        <span data-offset-key={offsetKey} contentEditable={false}>
          <i className='fa fa-fw fa-xs fa-check' />
        </span>
        {children}
      </span>
    )
  }
}

export default Entitied
