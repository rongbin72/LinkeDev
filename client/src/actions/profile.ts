import axios from 'axios'
import { GetCurrentProfile, ProfileType } from '../../common/types'
import { ProfileStatus } from './types'

// Get current users profile
export const getCurrentProfile: GetCurrentProfile = () => async dispatch => {
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
