import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from '../controllers/reducers/'
import promiseMiddleware from 'redux-promise-middleware'
import { compose, createStore, applyMiddleware } from 'redux'

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__
})

function configureStore(initialState = {}) {
  const enchancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      promiseMiddleware()
    ),
  )
  return createStore(reducers, initialState, enchancer)
}

const store = configureStore({})

export default store
