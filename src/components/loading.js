import React, { Component } from 'react'
import { View,  ActivityIndicator } from 'react-native'

class Loading extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return this.props.isLoading ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    ) : null
  }
}

export default Loading
