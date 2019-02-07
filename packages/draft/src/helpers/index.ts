import {
  CompositeDecorator,
  convertFromRaw,
  convertToRaw,
  EditorState,
  RawDraftContentState,
} from 'draft-js'
import memo from 'memoize-one'

export { findInBlock, findWithRegex } from './regex'
export { default as register } from './registry'

/**
 * Returns content string from the editorState.
 */
export const getContentString = (editorState: EditorState) => {
  const { blocks } = convertToRaw(editorState.getCurrentContent())

  return blocks.reduce((a, b) => `${a} ${b.text}`, '').trim()
}

/**
 * Returns the initil editorState generated from raw metadata.
 */
export const getInitialState = memo(
  (metaData: RawDraftContentState, decorator: CompositeDecorator) => {
    return metaData && metaData.blocks && metaData.blocks.length
      ? EditorState.createWithContent(convertFromRaw(metaData), decorator)
      : EditorState.createEmpty(decorator)
  },
)
