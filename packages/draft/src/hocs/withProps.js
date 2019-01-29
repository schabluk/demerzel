import React from 'react'

/*
 * Props Proxy HoC.
 */
const withProps = (Component, props) => {
  return class extends React.Component {
    render() {
      return <Component {...this.props} {...props} />
    }
  }
}

export default withProps
