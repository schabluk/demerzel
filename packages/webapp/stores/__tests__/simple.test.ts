import { getSnapshot } from 'mobx-state-tree'
import { ListStore } from '../simple'

const snapshot = {
  items: [{ id: 0, name: 'Foo' }, { id: 1, name: 'Bar' }],
}

describe('Store initialization', () => {
  it('Initialize with empty list', () => {
    const list = ListStore.create({})

    expect(list.size).toBe(0)
  })

  it('Initialize with two items', () => {
    const list = ListStore.create(snapshot)

    expect(list.size).toBe(2)
  })
})

it('Matches the file snapshot', () => {
  const list = ListStore.create(snapshot)

  expect(getSnapshot(list)).toMatchSnapshot()
})

it('Matches the inline snapshot', () => {
  const list = ListStore.create(snapshot)

  expect(getSnapshot(list)).toMatchInlineSnapshot(`
Object {
  "items": Array [
    Object {
      "id": 0,
      "name": "Foo",
    },
    Object {
      "id": 1,
      "name": "Bar",
    },
  ],
}
`)
})

test.todo('write more test cases')
