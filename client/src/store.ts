import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import rootReducer from './reducers'
import { StoreState, Actions, States } from '../common/types'

const initialState: StoreState = {}

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<States, Actions>))
)

export default store