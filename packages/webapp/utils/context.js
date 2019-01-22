import React from 'react'
import PropTypes from 'prop-types'

import theme from './theme'

export const ThemeContext = React.createContext(theme)
export const LanguageContext = React.createContext('en')

/**
 * Application Context Providers.
 *
 * See: https://reactjs.org/docs/context.html
 */

const Providers = ({ children }) => (
  <ThemeContext.Provider>
    <LanguageContext.Provider>{children}</LanguageContext.Provider>
  </ThemeContext.Provider>
)

Providers.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Providers
