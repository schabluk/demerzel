import styled from 'styled-components'

const Header = styled.header`
  background-color: ${props => props.theme.baseColor};
  grid-area: h;
  display: flex;
  align-items: center;
`

Header.defaultProps = {
  theme: {
    baseColor: '#eee'
  }
}

export default Header
