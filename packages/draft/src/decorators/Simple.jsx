import React from 'react'
import PropTypes from 'prop-types'

const style = {
  backgroundColor: 'gainsboro',
}

const Simple = props => (
  <span {...props} style={style}>
    {props.children}
  </span>
)

Simple.displayName = 'SimpleDecorator'
Simple.propTypes = {
  children: PropTypes.node,
  offsetKey: PropTypes.string,
}

export default Simple
