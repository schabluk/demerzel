/**
 * This is an example of testing TypeScript React component.
 */

import * as React from 'react'
import { render } from 'react-testing-library'

import Editor from './index'

describe('TypeScript with React Testing Library', () => {
  const expected = 'Hello'
  const metaData = {
    blocks: [
      {
        key: '2sjp4',
        text: expected,
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  }

  it(`Shows "${expected}"`, () => {
    const { getByText } = render(<Editor metaData={metaData} />)

    expect(getByText(expected)).not.toBeNull()
  })
})
