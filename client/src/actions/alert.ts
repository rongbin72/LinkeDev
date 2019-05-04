import uuid from 'uuid'
import { SetAlertAction } from '../../common/types'
import { Alert } from './types'

export const setAlert: SetAlertAction = (msg, alertType, timeout = 2000) => dispatch => {
  const id = uuid.v4()
  dispatch({
    type: Alert.SET_ALERT,
    payload: { msg, alertType, id }
  })
  // remove Alert after timout
  setTimeout(() => {
    dispatch({ type: Alert.REMOVE_ALERT, payload: { id } })
  }, timeout)
}
