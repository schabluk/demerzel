import Styled from 'styled-components'
import Posed from 'react-pose'

const Pose = Posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
})

const Box = Styled(Pose)`
  background-color: ${({ theme }) => theme.boxColor};
  width: 100px;
  height: 100px;
`

Box.defaultProps = {
  theme: {
    boxColor: '#ff1c68',
  },
}

export default Box
