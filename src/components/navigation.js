import { connect } from 'react-redux'
import { Link } from 'react-router-native'
import styled from 'styled-components/native'
import React, { Component, Fragment } from 'react'
import { Text, View, FlatList, SectionList } from 'react-native'
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import { navigationActions as action } from '../controllers/actions'

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
  right: 100%;
  ${({ open }) => open && `
    right: 0;
  `}
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
    open: false
  }
  
  _toggleNavigation() {
    let { props } = this
    let { 
      payload 
    } = !this.state.open ? props.open() : props.close()
    let state = Object.assign({}, this.state)
    state = payload
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
          open={this.state.open}>
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

const mapStateToProps = ({ navigation }) => navigation
const mapDispatchToProps = dispatch => ({
  open: () => dispatch(action.open()),
  close: () => dispatch(action.close()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
