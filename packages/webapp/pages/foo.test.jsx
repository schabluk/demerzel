import React from 'react'
import { render } from 'react-testing-library'

import Page from './foo'

describe('With React Testing Library', () => {
  it('Shows "Hello world!"', () => {
    const { getByText } = render(<Page />)

    expect(getByText('Hello World!')).not.toBeNull()
  })
})
