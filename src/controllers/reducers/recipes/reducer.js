import { recipeActions } from '../../actions'
import { Rms, Themosis } from '../../../lib/api'

const initialState = {
  isLoading: true
}

const recipes = (state = initialState, { type, payload }) => {
  switch (type) {
    // case recipeActions.FETCH_RECIPES_PENDING:
    //   return {
    //     ...state,
    //     requesting: true,
    //     isLoading: true
    //   }
    case recipeActions.FETCH_RECIPES_FULFILLED:
      return {
        ...state,
        ...{
          payload,
          isLoading: false
        }
      }
    case recipeActions.CANCLED_FETCH_RECIPES:
      return {
        ...state,
        isLoading: false,
        terminateAllRequests: true,
      }
    default:
      return state
  }
}

export default recipes