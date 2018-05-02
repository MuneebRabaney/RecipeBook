import { combineReducers } from 'redux'

export const OPEN = 'OPEN'
export const CLOSE = 'CLOSE'

const open = () => {
  return {
    type: OPEN,
  }
}

const close = () => {
  return {
    type: '',
  }
}

const reducer = combineReducers({
  open, 
  close,
})

export default reducer

