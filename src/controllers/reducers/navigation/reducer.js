import * as actions from '../../actions/'

const initialState = {
  state: {}
}

const navigation = (state = initialState, { type, payload = async () => await payload }) => {
  if (typeof type !== 'undefined') {
    // console.log(payload)
    switch (type) {
      case actions.OPEN:
        return {
          state,
          ...payload
        }
      case actions.CLOSE:
        return {
          state,
          ...payload
        }
      default:
        return state
    }
  }
}

export default navigation
