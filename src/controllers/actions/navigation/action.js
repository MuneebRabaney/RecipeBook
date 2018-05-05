// Action Types
const OPEN = 'OPEN'
const CLOSE = 'CLOSE'

export function open() {
  return {
    type: OPEN,
    payload: {
      open: true
    }
  }
}

export function close() {
  return {
    type: CLOSE,
    payload: {
      open: false
    }
  }
}
