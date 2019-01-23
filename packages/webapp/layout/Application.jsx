import styled from 'styled-components'

const Application = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  display: block;
  position: absolute;
  height: auto;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  margin: 2px;
`

Application.defaultProps = {
  theme: {
    backgroundColor: '#fff',
  },
}

export default Application
