import axios, { AxiosResponse } from 'axios'
import {
  AddEducationAction,
  AddExperienceAction,
  CreateProfileAction,
  DeleteExperienceAction,
  ErrorRes,
  GetCurrentProfileAction,
  ProfileType,
  DeleteEducationAction,
  DeleteAccountAction,
  GetProfilesAction,
  GetProfileByIdAction,
  GetGithubReposAction
} from '../../common/types'
import { setAlert } from './alert'
import { ProfileStatus, AuthStatus } from './types'

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
          msg: (error.response.data.msg || error.response.statusText) as string,
          status: error.response.status as number
        }
      }
    })
  }
}

// Get all profiles
export const getProfiles: GetProfilesAction = () => async dispatch => {
  dispatch({
    type: ProfileStatus.CLEAR_PROFILE,
    payload: {}
  })

  try {
    const res = await axios.get<ProfileType[]>('/api/profiles')
    dispatch({
      type: ProfileStatus.GET_PROFILES,
      payload: { profiles: res.data }
    })
  } catch (error) {
    dispatch({
      type: ProfileStatus.PROFILE_ERROR,
      payload: {
        error: {
          msg: (error.response.data.msg || error.response.statusText) as string,
          status: error.response.status as number
        }
      }
    })
  }
}

// Get Profile by id
export const getProfileById: GetProfileByIdAction = userId => async dispatch => {
  try {
    const res = await axios.get<ProfileType>(`/api/profiles/user/${userId}`)
    dispatch({
      type: ProfileStatus.GET_PROFILE,
      payload: { profile: res.data }
    })
  } catch (error) {
    dispatch({
      type: ProfileStatus.PROFILE_ERROR,
      payload: {
        error: {
          msg: (error.response.data.msg || error.response.statusText) as string,
          status: error.response.status as number
        }
      }
    })
  }
}

// Get github repos
export const getGithubRepos: GetGithubReposAction = username => async dispatch => {
  try {
    const res = await axios.get<any[]>(`/api/profiles/github/${username}`)
    dispatch({
      type: ProfileStatus.GET_REPOS,
      payload: { repos: res.data }
    })
  } catch (error) {
    dispatch({
      type: ProfileStatus.PROFILE_ERROR,
      payload: {
        error: {
          msg: (error.response.data.msg || error.response.statusText) as string,
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
          msg: (error.response.data.msg || error.response.statusText) as string,
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
          msg: (error.response.data.msg || error.response.statusText) as string,
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
          msg: (error.response.data.msg || error.response.statusText) as string,
          status: error.response.status as number
        }
      }
    })
  }
}

// Delete Experience
export const deleteExperience: DeleteExperienceAction = id => async dispatch => {
  try {
    const res: AxiosResponse<ProfileType> = await axios.delete(`/api/profiles/experience/${id}`)
    dispatch({
      type: ProfileStatus.UPDATE_PROFILE,
      payload: { profile: res.data }
    })

    dispatch(setAlert('Experience Removed', 'success'))
  } catch (error) {
    dispatch({
      type: ProfileStatus.PROFILE_ERROR,
      payload: {
        error: {
          msg: (error.response.data.msg || error.response.statusText) as string,
          status: error.response.status as number
        }
      }
    })
  }
}

// Delete Education
export const deleteEducation: DeleteEducationAction = id => async dispatch => {
  try {
    const res: AxiosResponse<ProfileType> = await axios.delete(`/api/profiles/education/${id}`)
    dispatch({
      type: ProfileStatus.UPDATE_PROFILE,
      payload: { profile: res.data }
    })

    dispatch(setAlert('Education Removed', 'success'))
  } catch (error) {
    dispatch({
      type: ProfileStatus.PROFILE_ERROR,
      payload: {
        error: {
          msg: (error.response.data.msg || error.response.statusText) as string,
          status: error.response.status as number
        }
      }
    })
  }
}

// Delete Account and Profiles
export const deleteAccount: DeleteAccountAction = () => async dispatch => {
  if (window.confirm('Are you sure? This can Not be undone !'))
    try {
      await axios.delete('/api/profiles')

      dispatch({
        type: ProfileStatus.CLEAR_PROFILE,
        payload: {}
      })

      dispatch({
        type: AuthStatus.ACCOUNT_DELETED,
        payload: {}
      })

      dispatch(setAlert('Your account has been permanently deleted', 'info'))
    } catch (error) {
      dispatch({
        type: ProfileStatus.PROFILE_ERROR,
        payload: {
          error: {
            msg: (error.response.data.msg || error.response.statusText) as string,
            status: error.response.status as number
          }
        }
      })
    }
}
