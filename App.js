import  React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import {
  compose,
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import Navigation from './src/components/navigation'
import Main from './src/'
import reducer from './src/controllers/reducers/navigation/reducer'

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__
})

function configureStore(initialState = {}) {
  // console.log(process)
  const enchancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ),
  )
  return createStore(reducer, initialState, enchancer)
}

const store = configureStore()
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}

export default App
