import axios, { AxiosResponse } from 'axios'
import {
  ErrorMsg,
  LoadUserAction,
  LoginAction,
  LogoutAction,
  RegisterAction,
  TUser
} from '../../common/types'
import { AuthStatus, ProfileStatus } from '../actions/types'
import setAuthToken from '../utils/setAuthToken'
import { toast } from 'react-toastify'
import setAlert from '../utils/setAlert'

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
    // register & get token
    const res = await axios.post<{ token: string }>('/api/users', {
      name,
      email,
      password
    })

    dispatch({
      type: AuthStatus.REGISTER_SUCCESS,
      payload: { token: res.data.token }
    })
    dispatch(loadUser())
  } catch (error) {
    const errors: ErrorMsg[] = error.response.data.errors
    if (errors) errors.forEach(error => setAlert(error.msg, toast.TYPE.ERROR))

    dispatch({
      type: AuthStatus.REGISTER_FAIL,
      payload: {}
    })
  }
}

// Login User
export const login: LoginAction = (email, password) => async dispatch => {
  try {
    const res: AxiosResponse<{ token: string }> = await axios.post('/api/auth', {
      email,
      password
    })

    dispatch({
      type: AuthStatus.LOGIN_SUCCESS,
      payload: { token: res.data.token }
    })
    dispatch(loadUser())
  } catch (error) {
    const errors: ErrorMsg[] = error.response.data.errors
    if (errors) errors.forEach(error => setAlert(error.msg, toast.TYPE.ERROR))

    dispatch({
      type: AuthStatus.LOGIN_FAIL,
      payload: {}
    })
  }
}

// Logout User / Clear Profile
export const logout: LogoutAction = () => dispatch => {
  dispatch({
    type: AuthStatus.LOGOUT,
    payload: {}
  })
  dispatch({
    type: ProfileStatus.CLEAR_PROFILE,
    payload: {}
  })
}
