import { Alert } from '../actions/types'
import { AlertState, AlertAction, StoreState } from '../../common/types'
import { AnyAction } from 'redux'

const initialState: AlertState = []
export default function(state = initialState, action: AlertAction): AlertState {
  const { type, payload } = action
  switch (type) {
    case Alert.SET_ALERT:
      return [...state, payload]
    case Alert.REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload.id)
    default:
      return state
  }
}
