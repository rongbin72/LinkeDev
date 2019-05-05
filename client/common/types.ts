import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AlertStatus, AuthStatus } from '../src/actions/types'

export interface AlertPayload {
  msg?: string
  alertType?: string
  id: Readonly<string>
}
export type AlertState = AlertPayload[]

export interface TAction<T, P> extends Action<T> {
  payload: P
}

export interface RegisterProps {
  setAlert: SetAlertAction | ((msg: string, alertType: string, timeout?: number) => void)
  register: RegisterAction
}

export interface AlertProps {
  alerts?: AlertState
}

export type SetAlertAction = (
  msg: string,
  alertType: string,
  timeout?: number
) => ThunkAction<void, States, null, Actions>

export interface AuthPayload {
  token?: string | null
}

export interface AuthState extends AuthPayload {
  isAuth: boolean
  loading: boolean
  user: any
}

export type RegisterAction = (
  name: string,
  email: string,
  password: string
) => ThunkAction<any, States, null, Actions>

export interface StoreState {
  alert?: AlertState
  auth?: AuthState
}
export type Actions = TAction<AlertStatus, AlertPayload> | TAction<AuthStatus, AuthPayload>

export type States = AuthState | AlertState
export interface ErrorRes {
  msg: string
}
