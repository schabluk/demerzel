import styled from 'styled-components'

const Main = styled.main`
  background-color: ${props => props.theme.baseColor};
  grid-area: c;
  position: relative;
`

Main.defaultProps = {
  theme: {
    baseColor: '#eee',
  },
}

export default Main
