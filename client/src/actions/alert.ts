import { Alert } from './types'
import uuid from 'uuid'
import { ActionCreator, AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AlertAction, AlertState, SetAlertAction } from '../../common/types'

export const setAlert: SetAlertAction = (msg, alertType) => dispatch => {
  const id = uuid.v4()
  dispatch({
    type: Alert.SET_ALERT,
    payload: { msg, alertType, id }
  })
}
