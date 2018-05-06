import React, { Component } from 'react'
import { 
  Text, 
  View, 
  Image, 
  Asset, 
  ScrollView, 
  ActivityIndicator } from 'react-native'
import Loading from '../../components/loading' 
import { Container } from '../../components/ui' 
import { Rms, Themosis } from '../../lib/api/'
import { Link } from 'react-router-native'
import { connect } from 'react-redux'
import { recipeActions as action } from '../../controllers/actions'


class Recipes extends Component {

  state = {
    isLoading: true,
    data: null
  }

  componentDidMount() {
    let { payload } = this.props.fetch.recipes({
      route: 'recipes',
      params: {
        limit: 15
      }
    })
    payload.then(result => {
      let state = Object.assign({}, this.state)
      state.data = result
      state.isLoading = false
      this.setState(state)
    })

    // this is just a test to see if 
    // we able to pass and pull data 
    // from the Themosis CMS
    // NOTE: console logs happen in the 
    // API blueprint class
    // Themosis.post({
    //   params: {
    //     action: 'fetchContent',
    //     id: 5
    //   }
    // })
  }
  
  _handleLinkOnClick(id, event) {
    let { data } = this.state
    let { history } = this.props
    let url = `/recipes/${id}`
    return history.push(url, data)
  }

  _layout(data) {
    let { recipes } = data
    return (
      <View style={{ flex: 1, paddingTop: 20, paddingBottom: 20 }}>
        <ScrollView style={{ flex: 1, padding: 20 }}> 
          { recipes.map(({ id, title }, index) => (
            <View key={index} style={{ paddingBottom: 20 }}>
              <Link
                onPress={this._handleLinkOnClick.bind(this, id)} 
                underlayColor="transparent">
                <Text>
                  {title.trim()}
                </Text>
              </Link>
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

const mapStateToProps = ({ recipes }) => recipes

const mapDispatchToProps = dispatch => ({
  fetch: {
    recipes: (params = null) => {
      return dispatch(action.fetchRecipes(params))
    },
  }
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Recipes)
