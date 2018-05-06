import { connect } from 'react-redux'
import { Link } from 'react-router-native'
import { menu2, menu, Line, Button, flipedText } from './styles'
import React, { Component, Fragment } from 'react'
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import { navigationActions as action } from '../../controllers/actions'
import { Text, View, Easing, Animated, FlatList, SectionList, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

class Navigation extends Component {
  
  state = {
    open: null,
    animation: {
      start: false,
      pause: false,
      complete: false,
      speed: {
        slow: 700,
        medium: 500,
        fast: 200,
        faster: 20,
      }
    },
    active: null
  }

  constructor(props) {
    super(props)
    this.animatedMenu = {
      block: {
        first: new Animated.Value(width),
        second: new Animated.Value(width),
      },
      active: new Animated.Value(0),
    }
  }

  componentWillMount() {
    let state = Object.assign({}, this.state)
    state.active = 'home' 
    this.setState(state)
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.state.open) {
      this.animateMenuIn()
    } else {
      this.animateMenuOut()
    }
  }
  
  _toggleNavigation({ title }) {
    let { props } = this
    // console.log(props)
    let { 
      payload 
    } = !this.state.open ? props.open() : props.close()
    let state = Object.assign({}, this.state)
    state = {
      ...payload,
      active: title
    }
    
    this.setState(state)
  }

  animateMenuIn() {
    let { block, active } = this.animatedMenu
    let { open, animation } = this.state
    Animated.sequence([
      Animated.timing(block.first, {
        toValue: width / width * 95.0,
        duration: animation.speed.medium,
      }),
      Animated.parallel([
        Animated.spring(block.second, {
          damping: 8,
          mass: .8,
          toValue: !open ? width : 0,
          duration: animation.speed.medium,
        }),
        Animated.spring(active, {
          damping: 8,
          mass: .8,
          toValue: width / 2,
          duration: animation.speed.medium,
        })
      ])
    ])
    .start()
  }

  animateMenuOut() {
    let { block, active } = this.animatedMenu
    let { open, animation } = this.state
    Animated.sequence([
      Animated.timing(active, {
        toValue: - (width / 2),
        easing: Easing.back(),
        duration: animation.speed.medium,
      }),
      Animated.timing(block.second, {
        toValue: width,
        easing: Easing.back(),
        duration: animation.speed.medium,
      }),
      Animated.timing(block.first, {
        toValue: width,
        easing: Easing.back(),
        duration: animation.speed.fast,
      }),
    ]).start()
  }

  getLinkActiveStyle({ active }) {
    
    let m = this.animatedMenu.active
    // console.log()
    let defaultStyle = {
      height: 1.5,
      position: 'absolute',
      bottom: 15,
      right: 0,
      zIndex: 7,
      backgroundColor: '#eeeeee50',
      display: 'flex',
      alignSelf: 'flex-start',
      width: active 
        ? m.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) 
        : m.interpolate({ inputRange: [0, 0], outputRange: [0, 0] })
    }
    return defaultStyle
  }

  isActive({ title }) {
    let result = (
      this.state.open && (this.state.active === title)
    ) && true
    
    return result 
  }

  render() {
    let { navigate } = this.state
    let linkStyle = {
      display: 'flex',
      marginBottom: 20,
      fontSize: 26,
      fontWeight: 'bold',
      alignSelf: 'flex-end',  
      color: '#ffffff',
      position: 'relative',
    }
    
    let menuStyle = [ menu, { 
      transform: [
        { translateX: this.animatedMenu.block.first }
      ]
    }]

    let menuStyle2 = [ menu2, {
      transform: [
        { translateX: this.animatedMenu.block.second }
      ]
    }]

    return (  
      <Fragment>
        <Button
          onPress={this._toggleNavigation.bind(this, {
            title: this.state.active
          })}>
          <Line inverse={this.state.open} fill={100} />
          <Line inverse={this.state.open} fill={70} />
        </Button>
        <Animated.View style={menuStyle}>
          <Link
            style={{
              position: 'relative'
            }} 
            to='/'
            underlayColor='transparent'
            onPress={this._toggleNavigation.bind(this, { 
              title: 'home'
            })}>
            <Fragment>
              <Text style={linkStyle}>
                Home              
              </Text>
              <Animated.View 
                style={this.getLinkActiveStyle({
                  active: this.isActive({ title: 'home' })
                })} />
            </Fragment>
          </Link>
          <Link 
            style={{
              position: 'relative'
            }} 
            to='/recipes'
            underlayColor='transparent'
            onPress={this._toggleNavigation.bind(this, { 
              title: 'recipes'
            })}>
            <Fragment>
              <Text style={linkStyle}>
                Recipes
              </Text>
              <Animated.View  
                style={this.getLinkActiveStyle({
                  active: this.isActive({ title: 'recipes' })
                })} />
            </Fragment>
          </Link>
        </Animated.View>
        <Animated.View style={menuStyle2}>
          <Text style={flipedText}>MENU</Text>
        </Animated.View>
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
