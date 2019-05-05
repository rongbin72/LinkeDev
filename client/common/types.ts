import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AlertStatus, AuthStatus } from '../src/actions/types'
import { logout } from '../src/actions/auth'

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
  setAlert: SetAlertAction
  register: RegisterAction
  isAuth: boolean
}

export interface AlertProps {
  alerts?: AlertState
}
export interface LoginProps {
  login: LoginAction
  isAuth: boolean
}

export interface NavbarProps {
  isAuth: boolean
  loading: boolean
  logout: LogoutAction
}

export interface AuthPayload {
  token?: string | null
  user?: TUser | null
}

export interface AuthState extends AuthPayload {
  isAuth: boolean
  loading: boolean
}

export interface TUser {
  _id: string
  name: string
  email: string
  avatar: string
  date: string
  __v: string
}

export type SetAlertAction = (
  msg: string,
  alertType: string,
  timeout?: number
) => ThunkAction<any, States, undefined, Actions>

export type RegisterAction = (
  name: string,
  email: string,
  password: string
) => ThunkAction<any, States, undefined, Actions>

export type LoadUserAction = () => ThunkAction<any, States, undefined, Actions>

export type LoginAction = (
  email: string,
  password: string
) => ThunkAction<any, States, undefined, Actions>

export type LogoutAction = () => ThunkAction<any, States, undefined, Actions>

export interface StoreState {
  alert?: AlertState
  auth?: AuthState
}
export type Actions = TAction<AlertStatus, AlertPayload> | TAction<AuthStatus, AuthPayload>

export type States = AuthState | AlertState

export interface ErrorRes {
  msg: string
}
