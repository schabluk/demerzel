import styled from 'styled-components'

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 80px auto 80px;
  grid-template-areas: ${props => props.areas};
  transition: all 0.5s;
`

Grid.defaultProps = {
  areas: `
    'h h h h h h h h h h h h'
    'n c c c c c c c c c c c'
    'f f f f f f f f f f f f'
  `,
}

export default Grid
