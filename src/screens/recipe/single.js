import React, { Component } from 'react'
import { ScrollView, ActivityIndicator, Text, View, Image, Asset, Button } from 'react-native'
import Loading from '../../components/loading'
import { Container } from '../../components/ui'
import { Rms } from '../../lib/api'

class RecipeScreen extends Component {

  state = {
    isLoading: true,
    data: null
  }

  async componentDidMount() {
    let { id } = this.props.navigation.state.params 
    let data = await Rms.get({
      route: 'recipes',
      params: {
        ...id
      } 
    }, { single: true })
    if (data) {
      let state = Object.assign({}, this.state)
      state.data = data
      state.isLoading = false
      this.setState(state)
    }
  }

  _handleGoBack({ navigation }, { data }, event) {
    return navigation.navigate('Recipes', {
      routeFrom: '/recipe',
      data: data
    })
  }

  _layout(data) {
    let { 
      title,
      cover_image, 
      description, 
      serves,
    } = data
    return (
      <View style={{ flex: 1, paddingTop: 20, paddingBottom: 20 }}>
        <Button
          back
          title='&larr;'
          onPress={this._handleGoBack.bind(this, this.props, this.state)}
        />
        <ScrollView style={{ flex: 1, padding: 20 }}>
          <View style={{ paddingBottom: 20 }}>
            <Text>{title.trim()}</Text>
            { cover_image.thumb_uri && (
              <Image
                style={{ width: '100%', height: 150 }}
                source={{ uri: `https:${cover_image.thumb_uri}` }} />
            ) }
            <Text>{description.trim()}</Text>
            <Text>Serves: {serves}</Text>
          </View>
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

export default RecipeScreen
