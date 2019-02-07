import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { EditorBlock } from 'draft-js'

import styles from './Line.scss'

class Line extends React.Component {
  static propTypes = {
    blockProps: PropTypes.object,
    block: PropTypes.object,
    contentState: PropTypes.object,
    selection: PropTypes.object,
  }

  onClick = event => {
    this.props.blockProps.onClickLine(100)
  }

  render() {
    const { contentState, block, selection } = this.props
    const blockMap = contentState.getBlockMap().toList()
    const { size } = blockMap
    const lineNumber = blockMap.findIndex(item => item.key === block.key) + 1
    const currentLine = block.key === selection.getAnchorKey()
    const className =
      size === 1
        ? styles.line
        : currentLine
        ? cn(styles.line, styles.nums, styles.active)
        : cn(styles.line, styles.nums)

    return (
      <div className={className} data-line-number={lineNumber} onClick={this.onClick}>
        <div className={styles.block}>
          <EditorBlock {...this.props} />
        </div>
      </div>
    )
  }
}

export default Line
