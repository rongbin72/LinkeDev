import { PostPayload, PostState, TAction } from '../../common/types'
import { PostStatus } from '../actions/types'

const initialState: PostState = {
  post: null,
  posts: [],
  loading: true,
  error: null
}

export default function(state = initialState, action: TAction<PostStatus, PostPayload>): PostState {
  const { type, payload } = action
  switch (type) {
    case PostStatus.GET_POSTS:
      return {
        ...state,
        posts: payload.posts || [],
        loading: false
      }
    case PostStatus.POST_ERROR:
      return {
        ...state,
        error: payload.error || null
      }
    default:
      return state
  }
}
