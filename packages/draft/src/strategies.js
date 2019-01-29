import { findWithRegex } from './helpers'

/* eslint-disable */
export const DELIMITERS = /[\,\(\)\{\}\[\]\-\+\*\%\/\=\'\"\~\!\&\|\\\<\>\?\:\;\.\@]/g
/* eslint-enable */

export const delimiterStrategy = (contentBlock, callback, contentState) => {
  findWithRegex(DELIMITERS, contentBlock, callback)
}

export const getEntityStrategy = type => (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity()

    if (entityKey === null) return false

    return contentState.getEntity(entityKey).getType() === type
  }, callback)
}
