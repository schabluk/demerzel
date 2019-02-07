/* Custom Block Components.  */
import { Line, Facsimile } from './components/blocks'

import styles from './styles/blocks.scss'

export const IMAGE_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXYzix/zkABMECb+U/1xQAAAAASUVORK5CYII='

/**
 * Specify css styles that should be applied to blocks at render time.
 */
export const blockStyleFn = contentBlock => {
  const type = contentBlock.getType()

  switch (type) {
    default:
      return styles.queryBlock
  }
}

/**
 * Define custom React rendering for ContentBlock objects.
 */
export const blockRendererFn = contentBlock => {
  const type = contentBlock.getType()

  switch (type) {
    case 'facsimile':
      return {
        component: Facsimile,
        editable: false,
        props: {
          src: IMAGE_PLACEHOLDER,
        },
      }
    default:
      return {
        component: Line,
        props: {
          onClickLine: function(line) {
            console.log('blockRendererFn:onLineClick', line)
          },
        },
      }
  }
}
