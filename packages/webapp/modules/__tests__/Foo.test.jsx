/**
 * This is an example of testing JavaScript React component.
 */

import React from 'react'
import { render } from 'react-testing-library'

import Foo from '../Foo'

describe('JavaScript with React Testing Library', () => {
  const expected = 'Hello World!'

  it(`Shows "${expected}"`, () => {
    const { getByText } = render(<Foo />)

    expect(getByText(expected)).not.toBeNull()
  })
})
