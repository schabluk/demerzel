import { types, applySnapshot } from 'mobx-state-tree'

const Store = types
  .model('MainStore', {
    ui: types.model('UiStore', {
      devTools: types.optional(types.boolean, false)
    }),
    timestamp: types.optional(types.number, new Date().getTime())
  })
  // .views(self => ({
  // }))
  .actions(self => ({
    afterCreate () {
    },
    setTimestamp () {
      self.timestamp = new Date().getTime()
    }
  }))

let store = null

export default Store

export function getStore (isServer, snapshot = null) {
  if (isServer) {
    store = Store.create({ ui: { devTools: false } })
  }
  if (store === null) {
    store = Store.create({ ui: { devTools: true } })
  }
  if (snapshot) {
    applySnapshot(store, snapshot)
  }
  return store
}
