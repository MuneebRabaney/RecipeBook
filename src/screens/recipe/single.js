import React, { Component, Fragment } from 'react'
import { ScrollView, ActivityIndicator, Text, View, Image, Asset } from 'react-native'
import Loading from '../../components/loading'
import { Container } from '../../components/ui'
import { Rms } from '../../lib/api'
import { Link } from 'react-router-native'
import styled from 'styled-components/native'

const Button = ({ title }) => {
  const Blueprint = styled.Text`
    margin: -20px 20px 0 20px;
    width: 30px;
    align-self: flex-start;
    position: relative;
    font-size: 20px;
  `
  return <Blueprint>{title}</Blueprint>
}

class Recipe extends Component {

  state = {
    isLoading: true,
    data: null
  }

  componentDidMount() {
    Rms.get({
      route: 'recipes',
      ...this.props.match
    }, { 
      single: true 
    })
    .then(result => {
      let state = Object.assign({}, this.state)
      state.data = result
      state.isLoading = false
      this.setState(state)
    })
  }

  _layout({ data }) {
    let { 
      title,
      cover_image, 
      description, 
      serves,
    } = data
    return (
      <Fragment>
        <Link underlayColor="transparent" to='/recipes'>
          <Button title='&larr;' />
        </Link>
        <View style={{ flex: 1, paddingTop: 20, paddingBottom: 20 }}>
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
      </Fragment>
    )
  }

  render() {
    if (!this.state.isLoading) {
      return <Container render={() => this._layout(this.state)} /> 
    }
    return <Loading isLoading={this.state.isLoading} />
  }
}

export default Recipe
