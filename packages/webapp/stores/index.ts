import { applySnapshot, getEnv, Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree'

const MainStore = types
  .model('MainStore', {
    timestamp: types.optional(types.number, new Date().getTime()),
    ui: types.model('UiStore', {
      devTools: types.optional(types.boolean, false),
      lastUpdate: types.Date,
    }),
  })
  // .views(self => ({
  // }))
  .actions(self => {
    /**
     * Services injected as dependency.
     */
    const { Services: API } = getEnv(self)

    return {
      afterCreate() {
        console.log('MainStore afterCreate', API)
      },
      setTimestamp() {
        self.timestamp = new Date().getTime()
      },
    }
  })

/**
 * Top-Level Application State Interface.
 *
 * The following methods will be exposed to the Application,
 * as a Primary Communication Interface.
 */
const MainInterface = types
  .model('MainInterface', {
    // Required.
  })
  .actions(self => {
    return {
      handleSearch() {
        //
      },
    }
  })

const ApplicationStore = types.compose(
  MainStore,
  MainInterface,
)

// Define aliases for the Store interfaces.
type IStore = Instance<typeof ApplicationStore>
type IStoreSnapshotIn = SnapshotIn<typeof Store>
type IStoreSnapshotOut = SnapshotOut<typeof Store>

// Store instance.
let Store: IStore = null as any

// Declare required API methods.
interface IMethods {
  getShowByName: (name: string) => Promise<any>
  getShowById: (id: number) => Promise<any>
}

// Declare required API services.
interface IServices {
  show: IMethods
}

export interface IDependency {
  Services: IServices
}

export const getStore = (
  Dependencies: IDependency,
  isServer: boolean = false,
  Snapshot?: IStore,
) => {
  const initialState: IStoreSnapshotIn = {
    ui: { devTools: !isServer, lastUpdate: Date.now() },
  }

  if (isServer) {
    Store = ApplicationStore.create(initialState, Dependencies)
  }

  if (!Store) {
    Store = ApplicationStore.create(initialState, Dependencies)
  }

  if (Snapshot) {
    applySnapshot(Store, Snapshot)
  }

  return Store
}

export { IStore, IStoreSnapshotIn, IStoreSnapshotOut }
