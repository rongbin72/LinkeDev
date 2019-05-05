import uuid from 'uuid'
import { SetAlertAction } from '../../common/types'
import { AlertStatus } from './types'

export const setAlert: SetAlertAction = (msg, alertType, timeout = 3000) => dispatch => {
  const id = uuid.v4()
  dispatch({
    type: AlertStatus.SET_ALERT,
    payload: { msg, alertType, id }
  })
  // remove Alert after timout
  setTimeout(() => {
    dispatch({ type: AlertStatus.REMOVE_ALERT, payload: { id } })
  }, timeout)
}
