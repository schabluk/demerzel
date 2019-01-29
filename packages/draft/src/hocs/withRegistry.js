import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

/*
 * HoC providing Decorators Registry.
 *
 * Each decorator wrapped with this HoC, will register it's information,
 * i.e. text, position and client rect, using provided 'register' method.
 * The information then can be used by Editor in various cases, like
 * positioning popup for decorated text.
 */
function withRegistry(Component) {
  return class extends React.Component {
    static propTypes = {
      register: PropTypes.func.isRequired,
      children: PropTypes.node.isRequired,
      decoratedText: PropTypes.string,
      offsetKey: PropTypes.string,
    }

    node = React.createRef()

    setData = props => {
      const { decoratedText, offsetKey, children, register } = props

      // Find single child with matching offsetKey.
      const {
        props: { start, text },
      } = children.find(c => c.key === offsetKey)

      // Register Decorator information providing key and data object.
      register(offsetKey, {
        text: decoratedText,
        rect: this.node.current
          ? ReactDOM.findDOMNode(this.node.current).getBoundingClientRect()
          : null,
        start,
        end: start + text.length,
      })
    }

    componentDidMount() {
      this.setData(this.props)
    }

    componentDidUpdate() {
      this.setData(this.props)
    }

    componentWillUnmount() {
      const { register, offsetKey } = this.props

      // Un-register Decorator information by omitting second parameter.
      register(offsetKey)
    }

    render() {
      const { register, ...rest } = this.props

      return <Component ref={this.node} {...rest} />
    }
  }
}

export default withRegistry
