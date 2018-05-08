import  React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import Navigation from './src/components/navigation'
import Main from './src/'
import store from './src/store'

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
