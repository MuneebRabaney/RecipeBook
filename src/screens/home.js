import React, { Component, Fragment } from 'react'
import {
  Text,
  View,
  Button,
  Easing,
  Animated,
} from 'react-native' 
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1; 
  align-items: center; 
  justify-content: center;
`
class Home extends Component {

  state = {
    animation: {
      start: false,
      pause: false,
      complete: false,
      speed: {
        slow: 15000,
        medium: 2800,
        fast: 1000,
      }
    } 
  }

  constructor(props) {
    super(props)
    // Initialize a new Animated instance
    this.animatedBlock = new Animated.Value(0)
  }

  /**
  * Triggers an opacticy animaiton when user event fires
  * 
  * @uses any react native animation object 
  * @returns Object
  **/
  _toggleAnimation() {
    let state = Object.assign({}, this.state)
    state.animation.start = !this.state.animation.start
    this.setState(state)
    if (this.state.animation.start) {
      return this._handleOpacityAnimation()
    }
    return null
  }

  _handleAnimationCompleted() {
    let state = Object.assign({}, this.state)
    state.animation.complete = true
    this.setState(state)
    console.log('animation competed')
  }

  /**
  * Boilerplate for opacticy animaiton
  * 
  * @uses any react native animation object 
  * @returns Object
  **/
  _handleOpacityAnimation() {
    let { animatedBlock, state } = this
    let { speed } = state.animation
    animatedBlock.setValue(0);
    Animated.timing(animatedBlock, {
      toValue: 1,
      duration: speed.fast,
      easing: Easing.linear
    })
    .start(() =>
      // on animation complete
      this._handleAnimationCompleted()
    )
  }

  render() {
    const opacity = this.animatedBlock.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1]
    })
    
    return (
      <Container>
        <Text>Home Screen</Text>
        <Button 
          style={{
            position: 'relative',
            zIndex: 2
          }}
          title='Press Me'
          onPress={this._toggleAnimation.bind(this)}
        />
        {
          this.state.animation.start &&
          <Animated.View
            style={[{
              position: 'absolute',
              bottom: '10%',
              zIndex: 1,
              height: 80,
              width: '100%',
              backgroundColor: 'tomato',
              transform: [
                { scale: 1 },
                { rotateY: '300deg' },
                { perspective: 100 }
              ]
            }, { opacity }]}> 
          </Animated.View>
        }
      </Container>
    )
  }
}

export default Home
