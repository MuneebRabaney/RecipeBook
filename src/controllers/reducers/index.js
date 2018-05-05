import { combineReducers } from 'redux'
import recipes from './recipes/reducer'
import navigation from './navigation/reducer'

const reducers = combineReducers({
  recipes,
  navigation,
})

export default reducers