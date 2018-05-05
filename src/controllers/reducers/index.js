import { combineReducers } from 'redux'
import recipes from './recipes/reducer'
// import * as AnimationReducer from './animation/reducer'
// import * as NavigationReducer from './navigation/reducer'

const reducers = combineReducers({
  recipes,
  // AnimationReducer,
  // NavigationReducer
})

export default reducers