import * as actions from '../../actions/'
import { Rms, Themosis } from '../../../lib/api/'

const initialState = {
  state: {}
}

const recipes = (state = initialState, { type, payload }) => {
  
  if (typeof type !== 'undefined') {
    switch (type) {
      case actions.FETCH_RECIPES:
        return {
          state,
          payload,
          isLoading: false
        }
      default:
        return state
    }
  }
}

export default recipes