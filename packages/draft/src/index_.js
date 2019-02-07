import React from 'react'
import PropTypes from 'prop-types'

import {
  Editor,
  EditorState,
  RichUtils,
  KeyBindingUtil,
  getDefaultKeyBinding,
  convertFromRaw,
  convertToRaw,
} from 'draft-js'

import { delimiterStrategy, getEntityStrategy } from './strategies'
import { Simple, Delimiter, Entitied } from './decorators'
import { ExtendedDecorator } from './hocs'

// import { print } from 'utils'

/**
 * Draft styles are mandatory.
 * See: https://draftjs.org/docs/advanced-topics-issues-and-pitfalls.html#missing-draftcss
 */
import 'draft-js/dist/Draft.css'

class DraftEditor extends React.Component {
  static displayName = 'DraftEditor'

  static propTypes = {
    /**
     * ContentState serialized to raw JS.
     *
     * See: https://draftjs.org/docs/api-reference-data-conversion.html
     */
    metadata: PropTypes.shape({
      blocks: PropTypes.array,
      entityMap: PropTypes.object,
    }),

    /**
     * Custom strategies. They can be based on custom functions, for example:
     * - regular expressions: https://draftjs.org/docs/advanced-topics-decorators.html
     * - entities: https://draftjs.org/docs/v0-10-api-migration.html#decorator-strategies-that-find-entities
     * - syntax parsers, etc.
     */
    strategies: PropTypes.array,

    /**
     * Indicates whether the Editor is read only.
     */
    readOnly: PropTypes.bool,
  }

  static defaultProps = {
    metadata: {
      blocks: [],
      entityMap: {},
    },
    strategies: [
      {
        strategy: getEntityStrategy('simple'),
        component: Entitied,
      },
    ],
    readOnly: false,
  }

  /**
   * Editor DOM node reference.
   */
  editor = React.createRef()

  /*
   * Decorators registry - stores information about decorators when rendered as DOM elements.
   */
  registry = new Map()

  /**
   * The order of the strategies is important, as if the first strategy is matched,
   * the next one will not be validated.
   *
   * Wild thinking: how about adding strategies based on nlp-compromise?
   */
  strategies = [
    ...this.props.strategies,
    { strategy: delimiterStrategy, component: Delimiter },
    {
      strategy: () => {
        return true
      },
      component: Simple,
    },
  ]

  /**
   * Extras are methods and props, that will be passed to decorator components by ExtendedDecorator.
   *
   * See: hocs/ExtendedDecorator source code for details.
   */
  extras = {
    /**
     * If the Editor is read-only, decorators might want to know this to limit their behaviour.
     */
    readOnly: this.props.readOnly,
    /**
     * The 'register' function provide decorators with a method to store their data & props,
     * like client rect, text and range, so it can be then used to position other elements.
     *
     * See: hocs/withRegistry source code for details.
     */
    register: (offsetKey, offsetData) => {
      if (offsetData) {
        this.registry.set(offsetKey, offsetData)
      } else {
        this.registry.delete(offsetKey)
      }
    },
  }

  /**
   * The Decorator concept is based on scanning the content of a ContentBlock
   * for ranges of text that match a defined strategies, then rendering them,
   * with a specified React components (decorators).
   *
   * See: https://draftjs.org/docs/advanced-topics-decorators.html
   */
  decorator = new ExtendedDecorator(this.strategies, this.extras)

  state = {
    /**
     * Editor instance. See: https://github.com/facebook/draft-js/issues/473
     */
    editor: null,
    /**
     * Indicates, if decorations are enabled.
     */
    decorationsEnabled: true,
    /**
     * Initial value of the Editor State should come from the 'metadata' prop.
     * If 'metadata' is empty, it will be initialized only with the Decorator.
     */
    editorState:
      this.props.metadata && this.props.metadata.blocks && this.props.metadata.blocks.length
        ? EditorState.createWithContent(convertFromRaw(this.props.metadata), this.decorator)
        : EditorState.createEmpty(this.decorator),
  }

  componentDidMount() {
    this.setState({ editor: Editor })
  }

  /**
   * Disable / Enable decorations.
   */
  toggleDecorations = editorState => {
    this.setState(
      state => ({ decorations: !state.decorationsEnabled }),
      () => {
        this.onChange(
          EditorState.set(editorState, {
            decorator: this.state.decorationsEnabled
              ? new ExtendedDecorator(this.strategies, this.extras)
              : new ExtendedDecorator([], this.extras),
          }),
        )
      },
    )
  }

  /**
   * Handle custom keyboard commands.
   *
   * Note: The custom keys combinations are defined in bindings.js file.
   * See: https://draftjs.org/docs/quickstart-rich-styling.html#richutils-and-key-commands
   */
  handleKeyCommand = (command, editorState) => {
    switch (command) {
      case 'decorations-toggle':
        this.toggleDecorations(editorState)
        break
      case 'editor-logs':
        // print.info(
        console.log(
          'Current Content',
          JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2),
        )
        break
      default:
      // isFunction(this.props.onKeyCmd) && this.props.onKeyCmd(command)
    }

    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (!newState) return 'not-handled'

    this.onChange(newState)

    return 'handled'
  }

  /**
   * Handle key-down events.
   *
   * See: https://draftjs.org/docs/api-reference-editor.html#key-handlers-optional
   */
  handleKeyDown = event => {
    if (KeyBindingUtil.hasCommandModifier(event)) {
      /**
       * Returning custom key events will trigger 'handleKeyCommand'.
       */
      switch (event.keyCode) {
        case 68:
          return 'decorations-toggle' // Ctrl-D
        case 76:
          return 'editor-logs' // Ctrl-L
        default:
          return getDefaultKeyBinding(event)
      }
    }

    return getDefaultKeyBinding(event)
  }

  onChange = editorState => {
    this.setState({ editorState })
  }

  render() {
    const { readOnly } = this.props
    const { editorState } = this.state

    return (
      <Editor
        readOnly={readOnly}
        ref={this.editor}
        editorState={editorState}
        keyBindingFn={this.handleKeyDown}
        handleKeyCommand={this.handleKeyCommand}
        onChange={this.onChange}
      />
    )
  }
}

export default DraftEditor

export { getEntityStrategy }
