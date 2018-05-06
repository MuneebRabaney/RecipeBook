import React, { Component } from 'react'
import { View,  ActivityIndicator } from 'react-native'


class Loading extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return this.props.isLoading ? 
      <View style={{ 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor:  '#000000',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: '100%',
        width: '100%',
      }}>
        <ActivityIndicator size='large' color="#fff" />
      </View>
     : null
  }
}

export default Loading
