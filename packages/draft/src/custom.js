import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'

const { hasCommandModifier } = KeyBindingUtil

export const keyBindingFn = event => {
  if (hasCommandModifier(event)) {
    switch (event.keyCode) {
      case 76:
        return 'editor-logs' // Ctrl-L
      default:
        return getDefaultKeyBinding(event)
    }
  }

  return getDefaultKeyBinding(event)
}
