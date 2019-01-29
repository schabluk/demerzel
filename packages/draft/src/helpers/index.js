import { convertToRaw } from 'draft-js'
export { findInBlock, findWithRegex } from './regex'

/*
 * Returns content string from the editorState.
 */
export const getContentString = editorState => {
  const { blocks } = convertToRaw(editorState.getCurrentContent())

  return blocks.reduce((a, b) => `${a} ${b.text}`, '').trim()
}
