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
import { ProfileStatus, AuthStatus } from './types'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import setAlert from '../utils/setAlert'

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
  // dispatch({
  //   type: ProfileStatus.CLEAR_PROFILE,
  //   payload: {}
  // })

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

    setAlert(edit ? 'Profile Updated' : 'Profile Created', toast.TYPE.SUCCESS)

    if (!edit) history.push('/dashboard')
  } catch (error) {
    const errors: ErrorRes[] = error.response.data.errors
    if (errors) errors.forEach(error => setAlert(error.msg, toast.TYPE.ERROR))

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

    setAlert('Experience Added', toast.TYPE.SUCCESS)
    history.push('/dashboard')
  } catch (error) {
    console.error(error)
    const errors: ErrorRes[] = error.response.data.errors
    if (errors) errors.forEach(error => setAlert(error.msg, toast.TYPE.ERROR))

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

    setAlert('Education Added', toast.TYPE.SUCCESS)
    history.push('/dashboard')
  } catch (error) {
    const errors: ErrorRes[] = error.response.data.errors
    if (errors) errors.forEach(error => setAlert(error.msg, toast.TYPE.ERROR))

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

    setAlert('Experience Removed', toast.TYPE.SUCCESS)
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

    setAlert('Education Removed', toast.TYPE.SUCCESS)
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
  Swal.fire({
    title: 'Are you sure?',
    text: 'This will permanently delete you account!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async result => {
    if (result.value) {
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

        setAlert('Your account has been permanently deleted', toast.TYPE.INFO)
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
      Swal.fire('Deleted!', 'Your account has been deleted.', 'success')
    }
  })
}
