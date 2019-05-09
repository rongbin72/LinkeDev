import {
  TAction,
  ProfilePayload,
  ProfileState,
  ProfileType,
  GithubRepo,
  TError
} from '../../common/types'
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
    case ProfileStatus.UPDATE_PROFILE:
      return {
        ...state,
        profile: payload as ProfileType,
        loading: false
      }
    case ProfileStatus.GET_PROFILES:
      return {
        ...state,
        profiles: payload as ProfileType[],
        loading: false
      }
    case ProfileStatus.GET_REPOS:
      return {
        ...state,
        repos: payload as GithubRepo[],
        loading: false
      }
    case ProfileStatus.PROFILE_ERROR:
      return {
        ...state,
        error: payload as TError,
        loading: false
      }
    case ProfileStatus.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: true
      }
    default:
      return state
  }
}
