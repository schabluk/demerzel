/**
 * This is an example of testing TypeScript React component.
 */

import * as React from 'react'
import renderer from 'react-test-renderer'
import { render } from 'react-testing-library'

import Editor from '../src/index'

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

  /**
   * Cannot be used with Editor, because it renders with generated keys in attributes,
   * for example "data-editor".
   */
  it('Renders correctly', () => {
    const tree = renderer.create(<div>{expected}</div>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it(`Shows "${expected}"`, () => {
    const { getByText } = render(<Editor metaData={metaData} />)

    expect(getByText(expected)).not.toBeNull()
  })
})
