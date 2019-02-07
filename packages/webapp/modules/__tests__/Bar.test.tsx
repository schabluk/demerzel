/**
 * This is an example of testing TypeScript React component.
 */

import * as React from 'react'
import { render } from 'react-testing-library'

import Bar from '../Bar'

describe('TypeScript with React Testing Library', () => {
  const expected = 'Hello from Bar on level 1'

  it(`Shows "${expected}"`, () => {
    const { getByText } = render(<Bar title='Bar' level={1} />)

    expect(getByText(expected)).not.toBeNull()
  })
})
