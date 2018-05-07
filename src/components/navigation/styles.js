import styled from 'styled-components/native'
import { Animated, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

let Text = Animated.Text

let menu = {
  paddingTop: 110,
  paddingBottom: 80,
  paddingRight: 50,
  paddingLeft: 50,
  position: 'absolute',
  zIndex: 3,
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
  zIndex: 2,
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
  ${'' /* margin: 40px 20px 0 0; */}
  top: 35px;
  right: 0px;
  width: 70px;
  height: 50px;
  align-self: flex-end;
  position: relative;
  z-index: 4;
  display: flex;
  padding: 15px;
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

let buttonLine = {
  // position: 'relative',
  top: 0,
  zIndex: 10,
  height: 2,
  backgroundColor: '#000000',
  marginBottom: 5,
  alignSelf: 'flex-end',
  transform: [
    { rotateZ: '0deg' }
  ]
}

export {
  menu,
  menu2,
  Line,
  buttonLine,
  Button,
  flipedText,
}
