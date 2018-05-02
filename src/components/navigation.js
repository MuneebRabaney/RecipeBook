import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, SectionList } from 'react-native'
import { DrawerNavigator } from 'react-navigation'

import styled from 'styled-components/native'
import { connect } from 'react-redux'
import HomeScreen from '../screens/home'
import { RecipeScreen, RecipesScreen } from '../screens/recipe'

import NavigationAction from '../controllers/actions/'

const RootStack = DrawerNavigator({
  Home: {
    path: '/',
    screen: HomeScreen,
  },
  Recipes: {
    path: '/recipes',
    screen: RecipesScreen,
  },
  Recipe: {
    path: '/recipe',
    screen: RecipeScreen,
  },
}, {
  initialRouteName: 'Home',
  drawerPosition: 'left',
})

class Navigation extends Component {
  constructor(props) {
    super()
    // console.log(props)
  }
  render() {
    return <RootStack />
  }
}

function mapStateToProps(state) {
  return {
    state: state.navigation,
  }
}
let DecoratedModal = Navigation
DecoratedModal = connect(mapStateToProps, { NavigationAction })(DecoratedModal)
export default DecoratedModal

// export default DecoratedModal