import React, { Component, Fragment } from 'react'
import Navigation from './components/navigation'
import { MemoryRouter as Router, Route, Link } from 'react-router-native'
import { 
  Home,
  Recipe,
  Recipes
} from './screens'

class Main extends Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    let { store } = this.props
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
