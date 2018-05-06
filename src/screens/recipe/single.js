import React, { Component, Fragment } from 'react'
import { 
  Text, 
  View, 
  Image, 
  Asset,
  ScrollView, 
  ActivityIndicator
} from 'react-native' 
import Loading from '../../components/loading'
import { Container } from '../../components/ui'
import { Rms } from '../../lib/api'
import { Link } from 'react-router-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { recipeActions as action } from '../../controllers/actions'

const Button = ({ title }) => {
  const Blueprint = styled.Text`
    top: -23px;
    left: 15px;
    width: 60px;
    align-self: flex-start;
    position: absolute;
    font-size: 30px;
  `
  return <Blueprint>{title}</Blueprint>
}

class Recipe extends Component {

  state = {
    isLoading: true,
    data: null,
  }

  componentWillMount() {
    let { id } = this.props.match.params
    let { payload } = this.props.fetch.recipe({
      route: 'recipes',
      params: { id: parseInt(id) }
    })
    payload.then(result => {
      let state = Object.assign({}, this.state)
      state.data = result
      state.isLoading = false
      this.setState(state)
    })
  }

  _layout({ data }) {
    console.log(data)
    let { 
      title,
      cover_image, 
      description, 
      serves,
    } = data
  
    return (
      <Fragment>
        <Link style={{ zIndex: 2 }} underlayColor="transparent" to='/recipes'>
          <Button title='&larr;' />
        </Link>
        {
          cover_image.thumb_uri &&
          <Image
            style={{ 
              width: '100%', 
              height: 200, 
              zIndex: 1, 
              marginTop: -30, 
              marginBottom: -20 
            }}
            source={{ uri: `https:${cover_image.thumb_uri}` }} />
        }
        <View style={{ flex: 1, paddingTop: 20, paddingBottom: 20 }}>
          <ScrollView style={{ flex: 1, padding: 20 }}>
            <View style={{ paddingBottom: 20 }}>
              <Text>{title.trim()}</Text>
              <Text>{description.trim()}</Text>
              Fla
              <Text>Serves: {serves}</Text>
            </View>
          </ScrollView>
        </View>
      </Fragment>
    )
  }

  render() {
    if (!this.state.isLoading && this.state.data) {
      return <Container render={() => this._layout(this.state)} /> 
    }
    return <Loading isLoading={this.state.isLoading} />
  }
}


const mapStateToProps = ({ recipes = {} }) => recipes

const mapDispatchToProps = dispatch => ({
  fetch: {
    recipe: (id = null) => {
      return dispatch(action.fetchRecipe(id))
    },
  }
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Recipe)
