import React, { Component, Fragment } from 'react'
import { Text, View, FlatList, SectionList } from 'react-native'
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import NavigationAction from '../controllers/actions/'
import { Link } from 'react-router-native'

const Menu = styled.View`
  padding: 80px 50px;
  position: absolute;
  z-index: 1;
  background: lightblue;
  flex: 1;
  width: 80%;
  height: 100%;
  top: 0;
  bottom: 0;
  ${({ menu }) => {
    switch (menu) {
      case 'opened': 
        return `right: 0;`
      default:
        return `right: 100%;`
    }
  }}
`

const Button = styled.TouchableOpacity`
  margin: 40px 20px 0 0;
  width: 30px;
  align-self: flex-end;
  position: relative;
  z-index: 2;
`

const Line = styled.Text`
  height: 2.5px;
  background: #000000;
  margin-bottom: 5px;
  align-self: flex-end;
  ${({ fill }) => fill && `width: ${fill}%;`}
`

class Navigation extends Component {
  
  state = {
    active: false
  }

  _toggleNavigation() {
    let state = Object.assign({}, this.state)
    state.active = !this.state.active 
    this.setState(state)
  }
  
  render() {
    let { navigate } = this.state
    let linkStyle = {
      marginBottom: 10,
    }
    return (
      <Fragment>
        <Button
          onPress={this._toggleNavigation.bind(this)}>
          <Line fill={100} />
          <Line fill={70} />
        </Button>
        <Menu
          menu={this.state.active ? 'opened' : 'closed'}>
          <Link 
            to='/'
            underlayColor="transparent"
            style={linkStyle}
            onPress={this._toggleNavigation.bind(this)}>
            <Text>Home</Text>
          </Link>
          <Link 
            to='/recipes'
            underlayColor="transparent"
            style={linkStyle}
            onPress={this._toggleNavigation.bind(this)}>
            <Text>Recipes</Text>
          </Link>
        </Menu>
      </Fragment>
    )
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
