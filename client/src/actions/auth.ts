import axios, { AxiosResponse } from 'axios'
import { AuthStatus } from '../actions/types'
import { setAlert } from './alert'
import {
  RegisterAction,
  ErrorRes,
  SetAlertAction,
  AuthPayload,
  LoadUserAction,
  TUser
} from '../../common/types'
import setAuthToken from '../utils/setAuthToken'

// Load User
export const loadUser: LoadUserAction = () => async dispatch => {
  if (localStorage.token) setAuthToken(localStorage.token)

  try {
    const res: AxiosResponse<TUser> = await axios.get('/api/auth')

    dispatch({
      type: AuthStatus.USER_LOADED,
      payload: { user: res.data }
    })
  } catch (error) {
    dispatch({
      type: AuthStatus.AUTH_ERROR,
      payload: {}
    })
  }
}

// Register User
export const register: RegisterAction = (name, email, password) => async dispatch => {
  try {
    const res: AxiosResponse<{ token: string }> = await axios.post('/api/users', {
      name,
      email,
      password
    })

    dispatch({
      type: AuthStatus.REGISTER_SUCCESS,
      payload: { token: res.data.token }
    })
  } catch (error) {
    const errors: ErrorRes[] = error.response.data.errors
    if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

    dispatch({
      type: AuthStatus.REGISTER_FAIL,
      payload: {}
    })
  }
}
