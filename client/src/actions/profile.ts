import axios from 'axios'
import {
  CreateProfileAction,
  ErrorRes,
  GetCurrentProfileAction,
  ProfileType
} from '../../common/types'
import { setAlert } from './alert'
import { ProfileStatus } from './types'

// Get current users profile
export const getCurrentProfile: GetCurrentProfileAction = () => async dispatch => {
  try {
    const res = await axios.get<ProfileType>('/api/profiles/me')
    dispatch({
      type: ProfileStatus.GET_PROFILE,
      payload: { profile: res.data }
    })
  } catch (error) {
    dispatch({
      type: ProfileStatus.PROFILE_ERROR,
      payload: {
        error: {
          msg: error.response.data.msg as string,
          status: error.response.status as number
        }
      }
    })
  }
}

// Create or Update a Profile
export const createProfile: CreateProfileAction = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const res = await axios.post<ProfileType>('/api/profiles', formData)
    dispatch({
      type: ProfileStatus.GET_PROFILE,
      payload: { profile: res.data }
    })

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success '))

    if (!edit) history.push('/dashboard')
  } catch (error) {
    const errors: ErrorRes[] = error.response.data.errors
    if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

    dispatch({
      type: ProfileStatus.PROFILE_ERROR,
      payload: {
        error: {
          msg: error.response.data.msg as string,
          status: error.response.status as number
        }
      }
    })
  }
}
