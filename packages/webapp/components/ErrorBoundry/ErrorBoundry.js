import React from 'react'
import PropTypes from 'prop-types'

const error = {
  color: 'white',
  backgroundColor: 'salmon',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'auto',
  bottom: 0,
  top: 0,
  left: 0,
  right: 0,
  position: 'absolute',
}

class ErrorBoundry extends React.Component {
  static propTypes = {
    /** Component to be rendered by default. */
    children: PropTypes.node.isRequired,
    /** Set error state from props */
    hasError: PropTypes.bool,
    /** Callback method called if error occured. */
    onError: PropTypes.func,
  }

  static defaultProps = {
    hasError: false,
    onError: () => {},
  }

  state = { hasError: this.props.hasError, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    this.props.onError(error, info)
  }

  render() {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) {
      return (
        <div style={error}>
          <i className='fas fa-2x fa-bug' />
          <div style={{ height: '14px', margin: '0rem 0.5rem' }}>Error occured</div>
        </div>
      )
    }

    return children
  }
}

export default ErrorBoundry
