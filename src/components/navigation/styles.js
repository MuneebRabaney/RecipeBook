import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

let menu = {
  paddingTop: 110,
  paddingBottom: 80,
  paddingRight: 50,
  paddingLeft: 50,
  position: 'absolute',
  zIndex: 2,
  backgroundColor: '#000000',
  flex: 1,
  width: '85%',
  height: '100%',
  top: 0,
  bottom: 0,
  transform: [
    { perspective: 1000 }
  ]
}

let menu2 = {
  paddingTop: 80,
  paddingBottom: 80,
  paddingRight: 50,
  paddingLeft: 50,
  position: 'absolute',
  zIndex: 1,
  backgroundColor: '#ffffff',
  flex: 1,
  width: '100%',
  height: '100%',
  top: 0,
  bottom: 0,
  transform: [
    { perspective: 1000 }
  ]
  
}

const flipedText = {
  fontWeight: '500',
  letterSpacing: 2,
  fontSize: 30,
  position: 'absolute',
  color: '#000000',
  left: - width,
  paddingLeft: '28%',
  top: '65%',
  transform: [
    { rotateZ: '-90deg' },
    { translateY: height / 2 },
  ]
}

const Button = styled.TouchableOpacity`
  margin: 40px 20px 0 0;
  width: 30px;
  align-self: flex-end;
  position: relative;
  z-index: 3;
`

const Line = styled.Text`
  height: 2.5px;
  background: #000000;
  margin-bottom: 5px;
  align-self: flex-end; 
  ${({ inverse }) => inverse && `
    background: #ffffff;
  `}
  ${({ fill }) => fill && `width: ${fill}%;`}
`

export {
  menu,
  menu2,
  Line,
  Button,
  flipedText,
}
