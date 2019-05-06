import axios from 'axios'
import {
  AddExperienceAction,
  CreateProfileAction,
  ErrorRes,
  GetCurrentProfileAction,
  ProfileType,
  AddEducationAction
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

// Add Experience
export const addExperience: AddExperienceAction = (formData, history) => async dispatch => {
  try {
    const res = await axios.put<ProfileType>('/api/profiles/experience', formData)
    dispatch({
      type: ProfileStatus.UPDATE_PROFILE,
      payload: { profile: res.data }
    })

    dispatch(setAlert('Experience Added', 'success '))
    history.push('/dashboard')
  } catch (error) {
    console.error(error)
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

// Add Education
export const addEducation: AddEducationAction = (formData, history) => async dispatch => {
  try {
    const res = await axios.put<ProfileType>('/api/profiles/education', formData)
    dispatch({
      type: ProfileStatus.UPDATE_PROFILE,
      payload: { profile: res.data }
    })

    dispatch(setAlert('Education Added', 'success '))
    history.push('/dashboard')
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
