import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
//composeWithDevTools(applyMiddleware(logger, thunk))

import rootReducer from './rootReducer'

const store = createStore(
  rootReducer,
  //applyMiddleware(logger, thunk)
  composeWithDevTools(applyMiddleware(logger, thunk))
)

export default store