import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1; 
  align-items: center; 
  justify-content: center;
`
class Home extends Component {
  render() {    
    return (
      <Container>
        <Text>Home Screen</Text>
      </Container>
    )
  }
}

export default Home
