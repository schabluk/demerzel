import { types } from 'mobx-state-tree'

// Model definition.
export const ListItem = types.model('ListItem', {
  id: types.number,
  name: types.string,
})

// Store definition.
export const ListStore = types
  .model('SimpleStore', {
    items: types.optional(types.array(ListItem), []),
  })
  .views(self => ({
    get size() {
      return self.items.length
    },
  }))
// .actions(self => {
//   return {
//     afterCreate() {
//       console.log('SimpleStore afterCreate', getSnapshot(self))
//     },
//   }
// })
