import { List } from 'immutable'
import { CompositeDecorator } from 'draft-js'

import withProps from './withProps'
import withRegistry from './withRegistry'

/*
 * Because of the way how CompositeDecorator compose Strategies with Decorators,
 * we have to wrap each component from the composition with a HoC,
 * to pass additional props. Each decorator will receive the same set of props.
 *
 * See: https://draftjs.org/docs/advanced-topics-decorators.html
 * and: https://git.io/v9OtM
 */

const ExtendedDecorator = (decorators, props) => {
  const mapper = decorator => ({
    ...decorator,
    component: withProps(withRegistry(decorator.component), props),
  })

  const convertedDecorators = List(decorators)
    .map(mapper)
    .toJS()

  return new CompositeDecorator(convertedDecorators)
}

export default ExtendedDecorator
