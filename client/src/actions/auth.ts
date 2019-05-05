import axios, { AxiosResponse } from 'axios'
import { AuthStatus } from '../actions/types'
import { setAlert } from './alert'
import { RegisterAction, ErrorRes, SetAlertAction, AuthPayload } from '../../common/types'

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
