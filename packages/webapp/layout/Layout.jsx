import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { IntlProvider } from 'react-intl'

import { ThemeContext, LanguageContext } from '../utils/context'
import { isSmallScreen } from '../utils'
import Application from './Application'
import Main from './Main'
import Footer from './Footer'
import Grid from './Grid'
import Header from './Header'
import Sidebar from './Sidebar'

function Layout ({
  children, screenSize, header, sidebar, footer
}) {
  const locale = useContext(LanguageContext)
  const theme = useContext(ThemeContext)

  const areas = isSmallScreen(screenSize)
    ? `'h h h h h h h n n n n n' 'c c c c c c c n n n n n' 'f f f f f f f f f f f f'`
    : `'. h h h h h h h h h h .' 'n c c c c c c c c c c .' 'f f f f f f f f f f f f'`

  return (
    <Fragment>
      <IntlProvider locale={locale}>
        <ThemeProvider theme={theme}>
          <Application>
            <Grid areas={areas}>
              <Header>
                {
                  header
                }
              </Header>
              <Sidebar>
                {
                  sidebar
                }
              </Sidebar>
              <Main>
                {
                  children
                }
              </Main>
              <Footer>
                {
                  footer
                }
              </Footer>
            </Grid>
          </Application>
        </ThemeProvider>
      </IntlProvider>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  screenSize: PropTypes.string,
  header: PropTypes.node,
  navigation: PropTypes.node,
  footer: PropTypes.node
}

export default Layout
