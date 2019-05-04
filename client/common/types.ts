import { Action } from 'redux'
import { Alert } from '../src/actions/types'
import { setAlert } from '../src/actions/alert'
import { ThunkAction } from 'redux-thunk'

interface AlertPayload {
  msg?: string
  alertType?: string
  id: Readonly<string>
}
export type AlertState = AlertPayload[]

export interface AlertAction extends Action<Alert> {
  payload: AlertPayload
}

export interface RegisterProps {
  setAlert: SetAlertAction
}

export interface AlertProps {
  alerts: AlertState
}

export type SetAlertAction = (
  msg: string,
  alertType: string
) => ThunkAction<any, AlertState, null, AlertAction>

export interface StoreState {
  alert: AlertState
}
export type Actions = AlertAction
