import React, { Component } from 'react'
import { ScrollView, ActivityIndicator, Text, View, Image, Asset } from 'react-native'
import Loading from '../../components/loading' 
import { Container } from '../../components/ui' 
import { Rms, Themosis } from '../../lib/api/'

class RecipesScreen extends Component {

  state = {
    isLoading: true,
    data: null
  }

  async componentDidMount() {
    let data = await Rms.get({
      route: 'recipes',
      params: {
        limit: 5
      } 
    })
    if (data) {
      let state = Object.assign({}, this.state)
      state.data = data
      state.isLoading = false
      this.setState(state)
    }

    let content = await Themosis.post({
      params: {
        action: 'fetchContent',
        id: 5
      } 
    })

    if (content) {
      console.log(content)
    }
  }

  _handlePageLink(id, event) {
    let { navigation } = this.props
    return navigation.navigate('Recipe', {
      id: id,
      routeFrom: '/recipes',
      data: 'just passing by'
    })
  }

  _layout(data) {
    let { recipes } = data
    return (
      <View style={{ flex: 1, paddingTop: 20, paddingBottom: 20 }}>
        <ScrollView style={{ flex: 1, padding: 20 }}> 
        { recipes.map(({ id, title }, index) => (
          <View key={index} style={{ paddingBottom: 20 }}>
            <Text onPress={this._handlePageLink.bind(this, {id: id})}>
              { title.trim() }
            </Text>
          </View>
        )) } 
        </ScrollView>
      </View>
    )
  }

  render() {
    if (!this.state.isLoading) {
      return <Container render={() => this._layout(this.state.data)} />
    }
    return <Loading isLoading={this.state.isLoading} />
  }
}

export default RecipesScreen
