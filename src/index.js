import React, { Component, Fragment } from 'react'
import Navigation from './components/navigation'
import { NativeRouter as Router, Route, Link } from 'react-router-native'

import HomeScreen from './screens/home'
import { RecipesScreen, RecipeScreen } from './screens/recipe'

class Main extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Navigation />
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/recipes' component={RecipesScreen} />
          <Route exact path='/recipe/:id' component={RecipeScreen} />
        </Fragment>
      </Router>
    )
  }
}

export default Main
