import styled from 'styled-components'

const Footer = styled.footer`
  background-color: ${props => props.theme.baseColor};
  grid-area: f;
  display: flex;
  align-items: center;
  padding: 8px;
`

Footer.defaultProps = {
  theme: {
    baseColor: '#eee',
  },
}

export default Footer
