import React, { Component, Fragment } from 'react'
import { 
  Text, 
  View, 
  Image, 
  Asset,
  Easing,
  Animated,
  Dimensions,
  ScrollView, 
  SectionList,
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

const { width, height } = Dimensions.get('window')

class Recipe extends Component {

  state = {
    isLoading: true,
    data: null,
  }

  constructor(props) {
    super(props)
    this.animation = {
      image: {
        top: new Animated.Value(0),
        scale: new Animated.Value(0)
      },
      ingredient: {
        underline: new Animated.Value(0)
      }
    }
  }

  _handleImageAnimation() {
    let { image, ingredient } = this.animation
    image.scale.setValue(0)
    image.top.setValue(0)
    ingredient.underline.setValue(0)

    Animated.parallel([
      Animated.timing(image.scale, {
        toValue: 1,
        duration: 1600,
        easing: Easing.linear(),
      }),
      Animated.timing(image.top, {
        toValue: 0,
        duration: 1700,
        easing: Easing.back(),
      }),
      Animated.timing(ingredient.underline, {
        toValue: width,
        duration: 1700,
        easing: Easing.back(),
      }),
    ]).start()
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
    this._handleImageAnimation()
  }

  _layout({ data }) {
    console.log(data)
    let { 
      title,
      cover_image, 
      description, 
      serves,
      ingredients
    } = data
    let {
      image,
      ingredient
    } = this.animation
    return (
      <Fragment>
        <Link style={{ zIndex: 2 }} underlayColor="transparent" to='/recipes'>
          <Button title='&larr;' />
        </Link>
        {
          cover_image.thumb_uri &&
          <Animated.Image
            style={[
              { 
                position: 'relative',
                width: '100%',
                height: 250,  
                zIndex: 1,  
                marginBottom: -40,
                top: -30,
                transform: [
                  { scale: .1 }
                ]
              }, { 
                transform: [
                  {
                    translateY: image.top.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1]
                    }) 
                  },
                  {
                    scale: image.scale.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1]
                    }), 
                  },
                  { perspective: 1000 }
                ]
              }
            ]}
            source={{ uri: `https:${cover_image.thumb_uri}` }} />
        }
        <View style={{ flex: 1, paddingTop: 20, paddingBottom: 20 }}>
          <ScrollView style={{ flex: 1, padding: 20 }}>
            <View style={{ paddingBottom: 20 }}>
              <Text style={{
                fontSize: 20,
                marginBottom: 20
              }}>{title.trim()}</Text>
              <Text>{description.trim()}</Text>
              { 
                ingredients && 
                <Fragment>
                  <Text style={{
                    marginTop: 20,
                    fontSize: 17,
                  }}>Ingredients:</Text>
                  <SectionList
                    style={{
                      marginBottom: 20,
                      marginTop: 20,
                      marginRight: 10,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                    renderItem={({ item, index, section }) => (
                      <Fragment>
                        <Text
                          key={index}
                          style={{
                            paddingBottom: 7,
                          }}>
                          {item}
                        </Text>
                        <Animated.View 
                          style={[
                            {
                              width: 0,
                              height: 1,
                              backgroundColor: '#00000030',
                              marginBottom: 10,
                            },
                            {
                              width: ingredient.underline
                            }
                          ]}
                        />   
                      </Fragment>   
                      
                    )}
                    sections={
                      ingredients.map(({ name, ingredient }) => ({
                        ...{
                          title: name.trim(),
                          data: [ingredient.trim()]
                        }
                      }))
                    }
                    keyExtractor={(item, index) => item + index}
                  />
                </Fragment>
              }
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
