import React, { Component, Fragment } from 'react'
import Navigation from './components/navigation'
import { NativeRouter as Router, Route, Link } from 'react-router-native'
import { 
  Home,
  Recipe,
  Recipes
} from './screens'

class Main extends Component {
  
  render() {
    return (
      <Router>
        <Fragment>
          <Navigation />
          <Route exact path='/' component={Home}/>
          <Route exact path='/recipes' component={Recipes} />
          <Route exact path='/recipes/:id' component={Recipe} />
        </Fragment>
      </Router>
    )
  }

}

export default Main
