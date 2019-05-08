import {
  PostPayload,
  PostState,
  PostType,
  TAction,
  TError,
  UpdateLikes,
  CommentType
} from '../../common/types'
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
    case PostStatus.GET_POST:
      return {
        ...state,
        post: payload as PostType,
        loading: false
      }
    case PostStatus.GET_POSTS:
      return {
        ...state,
        posts: payload as PostType[],
        loading: false
      }
    case PostStatus.ADD_POST:
      return {
        ...state,
        posts: [payload as PostType, ...state.posts],
        loading: false
      }
    case PostStatus.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== (payload as string)),
        loading: false
      }
    case PostStatus.UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === (payload as UpdateLikes).post_id
            ? { ...post, likes: (payload as UpdateLikes).likes }
            : post
        ),
        loading: false
      }
    case PostStatus.ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post!, comments: payload as CommentType[] },
        loading: false
      }

    case PostStatus.DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post!,
          comments: payload as CommentType[]
        },
        loading: false
      }

    case PostStatus.CLEAR_POST:
      return {
        ...state,
        post: null,
        loading: true
      }

    case PostStatus.POST_ERROR:
      return {
        ...state,
        error: payload as TError,
        loading: false
      }
    default:
      return state
  }
}
