import { connect } from 'react-redux'
import { Link } from 'react-router-native'
import { menu2, menu, buttonLine, Button, flipedText } from './styles'
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
      button: {
        color: new Animated.Value(0),
        width: new Animated.Value(0),
        rotate: new Animated.Value(0),
      }
    }
  }

  componentWillMount() {
    let state = Object.assign({}, this.state)
    state.active = 'home' 
    this.setState(state)
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextState.active === this.state.active && this.state.open) {
      this.animateMenuIn()
    } else {
      this.animateMenuOut()
    }
  }
  
  _toggleNavigation({ title }) {
    let { props } = this
    console.log(title)
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
    let { block, active, button } = this.animatedMenu
    let { open, animation } = this.state
    // console.log(button.rotate)
    Animated.parallel([
      Animated.timing(button.color, {
        toValue: 1,
        duration: animation.speed.slow,
        easing: Easing.linear(),
      }),
      Animated.timing(button.width, {
        toValue: 1,
        // damping: 5,
        // mass: .8,
        duration: animation.speed.slow,
        easing: Easing.linear(),
      }),
      Animated.timing(button.rotate, {
        toValue: 1,
        duration: animation.speed.slow,
        easing: Easing.linear(),
      }),
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
            toValue: 1,
            duration: animation.speed.medium,
          })
        ])
      ])
    ])
    .start()
  }

  animateMenuOut() {
    let { block, active, button } = this.animatedMenu
    let { open, animation } = this.state
    Animated.sequence([
      Animated.parallel([
        Animated.timing(button.width, {
          toValue: 0,
          duration: animation.speed.medium,
          easing: Easing.linear(),
        }),
        Animated.timing(button.rotate, {
          toValue: 0,
          duration: animation.speed.medium,
          easing: Easing.linear(),
        }),
      ]),
      Animated.parallel([
        Animated.spring(active, {
          toValue: 0,
          easing: Easing.back(),
          duration: animation.speed.slow,
        }),
        Animated.timing(block.second, {
          toValue: width,
          easing: Easing.back(),
          duration: animation.speed.fast,
        }),
      // ]),
      // Animated.parallel([
        Animated.timing(block.first, {
          toValue: width,
          easing: Easing.back(),
          duration: animation.speed.fast,
        }),
        Animated.timing(button.color, {
          toValue: 0,
          duration: animation.speed.slow,
          easing: Easing.linear(),
        }),
      ])
    ])
    .start()
  }

  getLinkActiveStyle({ active }) {
    return {
      height: 1,
      position: 'absolute',
      bottom: 15,
      right: 0,
      zIndex: 7,
      backgroundColor: '#eeeeee50',
      display: 'flex',
      alignSelf: 'flex-start',
      width: this.animatedMenu.active.interpolate({ 
        inputRange: [0, 1], 
        outputRange: [0, active && width / 2] 
      }) 
    }
  }

  isActive({ title }) {
    return (this.state.active === title) && true
  }

  render() {
    const { navigate, active, open } = this.state
    const { block, button } = this.animatedMenu
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
        { translateX: block.first }
      ]
    }]

    let menuStyle2 = [ menu2, {
      transform: [
        { translateX: block.second }
      ]
    }]

    let buttonLineStyle = ({ initialFill, rotateOnOpen }) => {
      return [
        buttonLine,
        {
          backgroundColor: button.color.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['#000',  '#999', '#fff']
          }),
          width: button.width.interpolate({
            inputRange: [0, 1],
            outputRange: [initialFill, 30]
          }),
          // top: '50%',
          // marginTop: -25,
          right: 15,
          transform: [
            {
              rotateZ: button.rotate.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', `${rotateOnOpen}deg`],
                
              }),
            },
          ],
          position: 'absolute'
        },
        !this.state.open && (initialFill <= 20) ? {
          top: 26
        } : { top: 18 },
        this.state.open && { top: 22 },
      ]
    }

    return (  
      <Fragment>
        <Button
          onPress={this._toggleNavigation.bind(this, {
            title: active
          })}>
          <Animated.View style={buttonLineStyle({
            initialFill: 35,
            rotateOnOpen: -225
          })}/>
          <Animated.View style={buttonLineStyle({ 
            initialFill: 20,
            rotateOnOpen: 225
          })}/>
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
