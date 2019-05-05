import { TAction, AlertState, AlertPayload } from '../../common/types'
import { AlertStatus } from '../actions/types'

const initialState: AlertState = []
export default function(
  state = initialState,
  action: TAction<AlertStatus, AlertPayload>
): AlertState {
  const { type, payload } = action
  switch (type) {
    case AlertStatus.SET_ALERT:
      return [...state, payload]
    case AlertStatus.REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload.id)
    default:
      return state
  }
}
