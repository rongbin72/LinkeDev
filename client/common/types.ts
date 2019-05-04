import { Action, ActionCreator } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Alert } from '../src/actions/types'
import { setAlert } from '../src/actions/alert'

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
  alerts?: AlertState
}

export type SetAlertAction = (
  msg: string,
  alertType: string,
  timeout?: number
) => ThunkAction<void, AlertState, null, AlertAction> | void

export interface StoreState {
  alert?: AlertState
}
export type Actions = AlertAction
