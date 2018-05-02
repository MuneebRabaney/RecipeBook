import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class HomeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home Screen',
    drawIcon: ({tintColor}) => {
      return (
        <MaterialIcons
          name='change-history'
          size={24}
          style={{ color: tintColor }}>
        </MaterialIcons>
      )
    }
  }
  
  render() {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Open Navigation"
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
        />
      </View>
    )
  }
}

export default HomeScreen
