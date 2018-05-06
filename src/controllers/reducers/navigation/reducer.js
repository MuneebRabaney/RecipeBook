import * as actions from '../../actions/'

const initialState = {
  state: {}
}

const navigation = (state = initialState, { type, payload }) => {
  if (typeof type !== 'undefined') {
    switch (type) {
      case actions.OPEN:
        return {
          payload,
          ...state
        }
      case actions.CLOSE:
        return {
          payload,
          ...state
        }
      default:
        return state
    }
  }
}

export default navigation
