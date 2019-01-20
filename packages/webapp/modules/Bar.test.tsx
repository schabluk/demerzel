import * as React from 'react'
import { render } from 'react-testing-library'

import Bar from './Bar'

describe('TypeScript with React Testing Library', () => {
  it('Shows "Hello from Bar on level 1"', () => {
    const { getByText } = render(<Bar title='Bar' level={1} />)

    expect(getByText('Hello from Bar on level 1')).not.toBeNull()
  })
})
