import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const NavigationButton = props => {
  let {
    handleOnPress,
    title = ''
  } = props
  return <Button title={title} onPress={() => handleOnPress()} />
}


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
        <NavigationButton 
          title='&rarr;'
        />
        <Text>Home Screen</Text>
        <Button
          title='Open Navigation'
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
        />
      </View>
    )
  }
}

export default HomeScreen
