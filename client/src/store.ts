import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { Actions, StoreState } from '../common/types'
import rootReducer from './reducers'

const initialState: StoreState = {}

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<StoreState, Actions>))
)

export default store
