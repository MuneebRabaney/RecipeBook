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
    data: null,
  }

  static getDerrivedStateFromProps(nextProps) {
    console.log('nextprops', nextProps)
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    // @TODO: Move this into redux
    // Rms.get({ route: 'recipes', ...this.props.match }, { single: true })
    // .then(result => {
    //   let state = Object.assign({}, this.state)
    //   state.data = result
    //   state.isLoading = false
    //   this.setState(state)
    // })
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
              {<Text>{title}</Text>}
              {
                cover_image.thumb_uri && (
                <Image
                  style={{ width: '100%', height: 150 }}
                  source={{ uri: `https:${cover_image.thumb_uri}` }} />
                )
              }
              <Text>{description.trim()}</Text>
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
