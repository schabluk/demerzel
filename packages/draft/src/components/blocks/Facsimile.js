import React from 'react'
import PropTypes from 'prop-types'

const style = {
  width: '50px',
  height: '50px',
}

class Facsimile extends React.Component {
  render() {
    const { src } = this.props.blockProps

    return <img style={style} src={src} />
  }
}

Facsimile.displayName = 'Facsimile'

Facsimile.propTypes = {
  blockProps: PropTypes.object,
}

export default Facsimile
