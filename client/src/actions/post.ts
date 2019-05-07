import React from 'react'
import { GetPostsAction, PostType } from '../../common/types'
import axios from 'axios'
import { PostStatus } from './types'

// Get all posts
export const getPosts: GetPostsAction = () => async dispatch => {
  try {
    const res = await axios.get<PostType[]>('/api/posts')
    dispatch({
      type: PostStatus.GET_POSTS,
      payload: { posts: res.data }
    })
  } catch (error) {
    dispatch({
      type: PostStatus.POST_ERROR,
      payload: {
        error: {
          msg: (error.response.data.msg || error.response.statusText) as string,
          status: error.response.status as number
        }
      }
    })
  }
}
