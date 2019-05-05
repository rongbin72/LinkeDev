import { TAction, ProfilePayload, ProfileState } from '../../common/types'
import { ProfileStatus } from '../actions/types'

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: null
}

export default function(
  state = initialState,
  action: TAction<ProfileStatus, ProfilePayload>
): ProfileState {
  const { type, payload } = action
  switch (type) {
    case ProfileStatus.GET_PROFILE:
      return {
        ...state,
        profile: payload.profile,
        loading: false
      }
    case ProfileStatus.PROFILE_ERROR:
      return {
        ...state,
        error: payload.error,
        loading: false
      }
    default:
      return state
  }
}
