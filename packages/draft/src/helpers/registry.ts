/**
 * Decorators registry - stores information about decorators when rendered as DOM elements,
 * like client rect, text and range, so it can be then used to position other elements.
 *
 * See: hocs/withRegistry source code for details.
 */
const registry = new Map()

function register(offsetKey: string, offsetData: object) {
  if (offsetData) {
    registry.set(offsetKey, offsetData)
  } else {
    registry.delete(offsetKey)
  }
}

export default register
