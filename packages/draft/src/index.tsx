import React, { useRef, useState } from 'react'

import Draft, {
  // convertFromRaw,
  // convertToRaw,
  Editor,
  // getDefaultKeyBinding,
  // KeyBindingUtil,
  // RichUtils,
} from 'draft-js'

import { Delimiter } from './components/decorators'
import { getInitialState, register } from './helpers'
import { ExtendedDecorator as getDecorator } from './hocs'
import { delimiterStrategy, getEntityStrategy } from './strategies'

/**
 * Custom Block styling and rendering.
 */
import { blockRendererFn, blockStyleFn } from './blocks'

/**
 * Draft styles are mandatory.
 * See: https://draftjs.org/docs/advanced-topics-issues-and-pitfalls.html#missing-draftcss
 */
import 'draft-js/dist/Draft.css'
import styles from './styles/index.scss'

export interface IDraftEditor {
  metaData: Draft.RawDraftContentState
  readOnly: boolean
  decorators?: []
}

/**
 * Default decorators. To be removed.
 */
const defaultDecorators = [{ strategy: delimiterStrategy, component: Delimiter }]

/**
 * Main Editor function.
 */
function DraftEditor({ metaData, readOnly = false, decorators = [] }: IDraftEditor) {
  // console.group('DraftEditor')
  // console.log('metaData', metaData)

  const editorRef = useRef<Draft.Editor>(null)
  const decorator = getDecorator(
    // Pairs of strategies and decorator components.
    [...defaultDecorators, ...decorators],
    // Props for decorator components.
    {
      // If the Editor is read-only, decorators might want to know this to limit their behaviour.
      readOnly,
      // The 'register' function provide decorators with a method to store their data & props.
      register,
    },
  )
  const initState = getInitialState(metaData, decorator)
  const [editorState, setEditorState] = useState(initState)

  const handleFocusClick = () => {
    const { current: editor } = editorRef
    if (editor) { editor.focus() }
  }

  // console.groupEnd()
  return (
    <div className={styles.editor} onClick={handleFocusClick}>
      <Editor
        blockStyleFn={blockStyleFn}
        // blockRendererFn={blockRendererFn}
        editorState={editorState}
        ref={editorRef}
        readOnly={readOnly}
        onChange={setEditorState}
      />
    </div>
  )
}

export default DraftEditor
export { getEntityStrategy }
