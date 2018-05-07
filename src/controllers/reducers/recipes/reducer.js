import { recipeActions } from '../../actions'
import { Rms, Themosis } from '../../../lib/api'

const initialState = {
  isLoading: true
}

const recipes = (state = initialState, { type, payload }) => {
  // console.log(recipeActions)
  
  
  if (typeof type !== 'undefined') {
    switch (type) {
      case recipeActions.FETCH_RECIPES:
        return {
          ...state,
          payload,
          isLoading: false
        }
      default:
        return state
    }
  }
}

export default recipes