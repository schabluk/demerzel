import React from 'react'
import { render } from 'react-testing-library'

import Foo from './Foo'

describe('JavaScript with React Testing Library', () => {
  it('Shows "Hello world!"', () => {
    const { getByText } = render(<Foo />)

    expect(getByText('Hello World!')).not.toBeNull()
  })
})
