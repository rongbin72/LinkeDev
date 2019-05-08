import axios, { AxiosResponse } from 'axios'
import {
  AddCommentAction,
  AddLikeAction,
  AddPostAction,
  CommentType,
  DeleteCommentAction,
  DeletePostAction,
  GetPostAction,
  GetPostsAction,
  LikeType,
  PostType,
  RemoveLikeAction
} from '../../common/types'
import setAlert from '../utils/setAlert'
import { PostStatus } from './types'

// Get all posts
export const getPosts: GetPostsAction = () => async dispatch => {
  try {
    const res = await axios.get<PostType[]>('/api/posts')
    dispatch({
      type: PostStatus.GET_POSTS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PostStatus.POST_ERROR,
      payload: {
        msg: (error.response.data.msg || error.response.statusText) as string,
        status: error.response.status as number
      }
    })
  }
}

// Get post by id
export const getPost: GetPostAction = post_id => async dispatch => {
  try {
    const res = await axios.get<PostType>(`/api/posts/${post_id}`)
    dispatch({
      type: PostStatus.GET_POST,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PostStatus.POST_ERROR,
      payload: {
        msg: (error.response.data.msg || error.response.statusText) as string,
        status: error.response.status as number
      }
    })
  }
}

// Add post
export const addPost: AddPostAction = formData => async dispatch => {
  try {
    const res = await axios.post<PostType>('/api/posts', formData)
    dispatch({
      type: PostStatus.ADD_POST,
      payload: res.data
    })
    setAlert('Post Created', 'success')
  } catch (error) {
    dispatch({
      type: PostStatus.POST_ERROR,
      payload: {
        msg: (error.response.data.msg || error.response.statusText) as string,
        status: error.response.status as number
      }
    })
  }
}

// Delete post by post_id
export const deletePost: DeletePostAction = post_id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${post_id}`)
    dispatch({
      type: PostStatus.DELETE_POST,
      payload: post_id
    })
    setAlert('Post Deleted', 'success')
  } catch (error) {
    dispatch({
      type: PostStatus.POST_ERROR,
      payload: {
        msg: (error.response.data.msg || error.response.statusText) as string,
        status: error.response.status as number
      }
    })
  }
}

// Add like
export const addLike: AddLikeAction = post_id => async dispatch => {
  try {
    const res = await axios.put<LikeType[]>(`/api/posts/like/${post_id}`)
    dispatch({
      type: PostStatus.UPDATE_LIKES,
      payload: { post_id, likes: res.data }
    })
  } catch (error) {
    if (error.response.status === 400) setAlert(error.response.data.msg, 'error')
    dispatch({
      type: PostStatus.POST_ERROR,
      payload: {
        msg: (error.response.data.msg || error.response.statusText) as string,
        status: error.response.status as number
      }
    })
  }
}

// remove like
export const removeLike: RemoveLikeAction = post_id => async dispatch => {
  try {
    const res: AxiosResponse<LikeType[]> = await axios.delete(`/api/posts/like/${post_id}`)
    dispatch({
      type: PostStatus.UPDATE_LIKES,
      payload: { post_id, likes: res.data }
    })
  } catch (error) {
    if (error.response.status === 400) setAlert(error.response.data.msg, 'error')
    dispatch({
      type: PostStatus.POST_ERROR,
      payload: {
        msg: (error.response.data.msg || error.response.statusText) as string,
        status: error.response.status as number
      }
    })
  }
}

// Add comment
export const addComment: AddCommentAction = (post_id, formData) => async dispatch => {
  try {
    const res = await axios.put<CommentType[]>(`/api/posts/comment/${post_id}`, formData)

    dispatch({
      type: PostStatus.ADD_COMMENT,
      payload: res.data
    })
    setAlert('Comment Added', 'success')
  } catch (error) {
    console.log(error)

    dispatch({
      type: PostStatus.POST_ERROR,
      payload: {
        msg: (error.response.data.msg || error.response.statusText) as string,
        status: error.response.status as number
      }
    })
  }
}

// Delete comment
export const deleteComment: DeleteCommentAction = (post_id, comment_id) => async dispatch => {
  try {
    const res: AxiosResponse<CommentType[]> = await axios.delete(
      `/api/posts/comment/${post_id}/${comment_id}`
    )
    dispatch({
      type: PostStatus.DELETE_COMMENT,
      payload: res.data
    })
    setAlert('Comment Deleted', 'success')
  } catch (error) {
    dispatch({
      type: PostStatus.POST_ERROR,
      payload: {
        msg: (error.response.data.msg || error.response.statusText) as string,
        status: error.response.status as number
      }
    })
  }
}
