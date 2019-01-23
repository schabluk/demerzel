import styled from 'styled-components'

const Sidebar = styled.nav`
  background-color: ${props => props.theme.baseColor};
  grid-area: n;
  display: flex;
  flex-direction: column;
`

Sidebar.defaultProps = {
  theme: {
    baseColor: '#eee',
  },
}

export default Sidebar
