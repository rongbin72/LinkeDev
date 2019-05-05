import { AuthStatus } from '../actions/types'
import { AuthState, TAction, AuthPayload } from '../../common/types'

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuth: false,
  loading: true,
  user: null
}

export default function(state = initialState, action: TAction<AuthStatus, AuthPayload>) {
  const { type, payload } = action
  switch (type) {
    case AuthStatus.REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token as string)
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false
      }
    case AuthStatus.REGISTER_FAIL:
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
