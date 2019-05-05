import { AuthStatus } from '../actions/types'
import { AuthState, TUser, TAction, AuthPayload } from '../../common/types'

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuth: false,
  loading: true,
  user: null
}

export default function(state = initialState, action: TAction<AuthStatus, AuthPayload>) {
  const { type, payload } = action
  switch (type) {
    case AuthStatus.USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload.user
      }
    case AuthStatus.REGISTER_SUCCESS:
    case AuthStatus.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token as string)
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false
      }
    case AuthStatus.LOGIN_FAIL:
    case AuthStatus.REGISTER_FAIL:
    case AuthStatus.AUTH_ERROR:
    case AuthStatus.LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false
      }
    default:
      return state
  }
}
